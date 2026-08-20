import { useEffect, useRef, useState } from "react";
import { FaReceipt } from "react-icons/fa";

import receiptService from "../../../services/receiptService";
import { useSettings } from "../../../context/SettingsContext";

export default function ReceiptUpload({ onReceiptProcessed }) {
    const { settings } = useSettings();

    const inputRef = useRef(null);
    const previewUrlRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState("");

    /*
     * Clean up generated preview URLs when this
     * component is removed.
     */
    useEffect(() => {
        return () => {
            if (previewUrlRef.current) {
                URL.revokeObjectURL(previewUrlRef.current);
            }
        };
    }, []);

    /*
     * Creates/replaces the local receipt preview.
     */
    const createPreview = (file) => {
        if (previewUrlRef.current) {
            URL.revokeObjectURL(previewUrlRef.current);
        }

        const url = URL.createObjectURL(file);

        previewUrlRef.current = url;
        setPreview(url);
    };

    /*
     * Load an image file into an HTML Image object.
     */
    const loadImage = (file) => {
        return new Promise((resolve, reject) => {
            const image = new Image();
            const objectUrl = URL.createObjectURL(file);

            image.onload = () => {
                URL.revokeObjectURL(objectUrl);
                resolve(image);
            };

            image.onerror = () => {
                URL.revokeObjectURL(objectUrl);

                reject(
                    new Error(
                        "Unable to read the selected receipt image."
                    )
                );
            };

            image.src = objectUrl;
        });
    };

    /*
     * Convert canvas content into a File so that
     * receiptService can upload it normally using
     * multipart/form-data.
     */
    const canvasToFile = (
        canvas,
        originalFile,
        quality
    ) => {
        return new Promise((resolve, reject) => {
            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        reject(
                            new Error(
                                "Unable to prepare receipt image."
                            )
                        );
                        return;
                    }

                    const originalName =
                        originalFile.name || "receipt.jpg";

                    const baseName =
                        originalName.replace(
                            /\.[^/.]+$/,
                            ""
                        );

                    const processedFile = new File(
                        [blob],
                        `${baseName}-processed.jpg`,
                        {
                            type: "image/jpeg",
                            lastModified: Date.now(),
                        }
                    );

                    resolve(processedFile);
                },
                "image/jpeg",
                quality
            );
        });
    };

    /*
     * Detect light/white borders around the receipt.
     *
     * This is intentionally conservative because we
     * do not want to accidentally cut receipt text.
     */
    const findReceiptBounds = (
        context,
        width,
        height
    ) => {
        const imageData =
            context.getImageData(
                0,
                0,
                width,
                height
            );

        const { data } = imageData;

        let minX = width;
        let minY = height;
        let maxX = -1;
        let maxY = -1;

        /*
         * Skip a few pixels at a time.
         *
         * This makes processing faster for large
         * phone camera images.
         */
        const step = Math.max(
            1,
            Math.floor(
                Math.max(width, height) / 1200
            )
        );

        /*
         * Pixels darker than this threshold are
         * considered possible receipt content.
         */
        const threshold = 235;

        for (let y = 0; y < height; y += step) {
            for (let x = 0; x < width; x += step) {
                const index =
                    (y * width + x) * 4;

                const red = data[index];
                const green = data[index + 1];
                const blue = data[index + 2];

                const brightness =
                    (red + green + blue) / 3;

                if (brightness < threshold) {
                    minX = Math.min(minX, x);
                    minY = Math.min(minY, y);
                    maxX = Math.max(maxX, x);
                    maxY = Math.max(maxY, y);
                }
            }
        }

        /*
         * If we cannot confidently detect content,
         * use the entire image.
         */
        if (
            maxX < 0 ||
            maxY < 0 ||
            minX >= maxX ||
            minY >= maxY
        ) {
            return {
                x: 0,
                y: 0,
                width,
                height,
            };
        }

        /*
         * Add padding so text close to receipt edges
         * is not removed.
         */
        const paddingX =
            Math.round(width * 0.03);

        const paddingY =
            Math.round(height * 0.03);

        const x =
            Math.max(
                0,
                minX - paddingX
            );

        const y =
            Math.max(
                0,
                minY - paddingY
            );

        const right =
            Math.min(
                width,
                maxX + paddingX
            );

        const bottom =
            Math.min(
                height,
                maxY + paddingY
            );

        const croppedWidth =
            right - x;

        const croppedHeight =
            bottom - y;

        /*
         * Avoid aggressive cropping.
         *
         * If detected content is suspiciously small,
         * retain the original image.
         */
        if (
            croppedWidth < width * 0.45 ||
            croppedHeight < height * 0.45
        ) {
            return {
                x: 0,
                y: 0,
                width,
                height,
            };
        }

        return {
            x,
            y,
            width: croppedWidth,
            height: croppedHeight,
        };
    };

    /*
     * Apply receipt scanner image settings.
     *
     * Auto Crop:
     * Removes obvious light borders.
     *
     * High Quality:
     * Uses a larger OCR image and higher JPEG quality.
     *
     * Normal Quality:
     * Uses a smaller image to reduce upload size.
     */
    const prepareReceiptImage = async (file) => {
        const shouldCrop =
            settings.receipt.autoCrop;

        const highQuality =
            settings.receipt.highQuality;

        /*
         * If neither feature is enabled we can send
         * the original file directly to the backend.
         */
        if (!shouldCrop && !highQuality) {
            return file;
        }

        const image =
            await loadImage(file);

        const sourceCanvas =
            document.createElement("canvas");

        sourceCanvas.width =
            image.naturalWidth;

        sourceCanvas.height =
            image.naturalHeight;

        const sourceContext =
            sourceCanvas.getContext(
                "2d",
                {
                    willReadFrequently: true,
                }
            );

        if (!sourceContext) {
            throw new Error(
                "Image processing is not supported by this browser."
            );
        }

        sourceContext.drawImage(
            image,
            0,
            0
        );

        let bounds = {
            x: 0,
            y: 0,
            width: image.naturalWidth,
            height: image.naturalHeight,
        };

        if (shouldCrop) {
            bounds =
                findReceiptBounds(
                    sourceContext,
                    image.naturalWidth,
                    image.naturalHeight
                );
        }

        /*
         * Keep enough resolution for OCR.
         */
        const maxDimension =
            highQuality
                ? 2400
                : 1600;

        const largestDimension =
            Math.max(
                bounds.width,
                bounds.height
            );

        const scale =
            largestDimension > maxDimension
                ? maxDimension /
                  largestDimension
                : 1;

        const targetWidth =
            Math.max(
                1,
                Math.round(
                    bounds.width * scale
                )
            );

        const targetHeight =
            Math.max(
                1,
                Math.round(
                    bounds.height * scale
                )
            );

        const outputCanvas =
            document.createElement("canvas");

        outputCanvas.width =
            targetWidth;

        outputCanvas.height =
            targetHeight;

        const outputContext =
            outputCanvas.getContext("2d");

        if (!outputContext) {
            throw new Error(
                "Unable to prepare receipt image."
            );
        }

        /*
         * Better interpolation when resizing.
         */
        outputContext.imageSmoothingEnabled =
            true;

        outputContext.imageSmoothingQuality =
            highQuality
                ? "high"
                : "medium";

        outputContext.drawImage(
            sourceCanvas,

            bounds.x,
            bounds.y,
            bounds.width,
            bounds.height,

            0,
            0,
            targetWidth,
            targetHeight
        );

        const jpegQuality =
            highQuality
                ? 0.95
                : 0.82;

        return canvasToFile(
            outputCanvas,
            file,
            jpegQuality
        );
    };

    const handleUpload = async (e) => {
        const file =
            e.target.files?.[0];

        if (!file) {
            return;
        }

        /*
         * Receipt scanner master switch.
         */
        if (!settings.receipt.enabled) {
            setError(
                "Receipt Scanner is disabled. Enable it from Settings → Receipt Scanner."
            );

            e.target.value = "";
            return;
        }

        /*
         * Validate that the selected file is an image.
         */
        if (
            file.type &&
            !file.type.startsWith("image/")
        ) {
            setError(
                "Please select a valid receipt image."
            );

            e.target.value = "";
            return;
        }

        setLoading(true);
        setError("");

        /*
         * Show the original receipt while processing.
         */
        createPreview(file);

        try {
            /*
             * Apply Auto Crop / High Quality settings
             * before sending the image to OCR.
             */
            const uploadFile =
                await prepareReceiptImage(file);

            console.log(
                "========== RECEIPT IMAGE SETTINGS =========="
            );

            console.log(
                "Auto Crop:",
                settings.receipt.autoCrop
            );

            console.log(
                "High Quality:",
                settings.receipt.highQuality
            );

            console.log(
                "AI Categorization:",
                settings.receipt.autoCategorize
            );

            console.log(
                "Save Images:",
                settings.receipt.saveImages
            );

            console.log(
                "Original File Size:",
                file.size
            );

            console.log(
                "Upload File Size:",
                uploadFile.size
            );

            console.log(
                "============================================"
            );

            /*
             * Existing working backend:
             *
             * POST /api/receipt/scan
             *
             * Backend performs OCR + AI extraction.
             */
            const receipt =
                await receiptService.uploadReceipt(
                    uploadFile
                );

            console.log(
                "========== RECEIPT RESPONSE =========="
            );

            console.log(receipt);

            console.log(
                "======================================="
            );

            /*
             * AI Categorization setting.
             *
             * ON:
             * Use category returned by AI.
             *
             * OFF:
             * Leave category empty so the user can
             * select it manually in ExpenseForm.
             */
            const processedReceipt = {
                ...receipt,

                category:
                    settings.receipt.autoCategorize
                        ? receipt.category
                        : "",
            };

            /*
             * Save Receipt Images setting.
             *
             * At present PaisaTrack is not storing
             * receipt image binaries on the backend.
             *
             * Therefore this setting controls whether
             * the local preview is retained after
             * successful processing.
             *
             * Actual permanent image storage can be
             * connected later when receipt-image
             * persistence is implemented.
             */
            if (!settings.receipt.saveImages) {
                if (previewUrlRef.current) {
                    URL.revokeObjectURL(
                        previewUrlRef.current
                    );

                    previewUrlRef.current =
                        null;
                }

                setPreview(null);
            }

            /*
             * Send extracted values to
             * AddExpenseModal.
             */
            onReceiptProcessed?.(
                processedReceipt
            );

        } catch (err) {
            console.error(
                "========== RECEIPT ERROR =========="
            );

            console.error(err);

            console.error(
                "Status:",
                err?.response?.status
            );

            console.error(
                "Response:",
                err?.response?.data
            );

            console.error(
                "Message:",
                err?.message
            );

            console.error(
                "==================================="
            );

            const responseMessage =
                err?.response?.data?.message;

            const responseData =
                err?.response?.data;

            if (
                typeof responseMessage ===
                "string"
            ) {
                setError(responseMessage);
            } else if (
                typeof responseData ===
                "string"
            ) {
                setError(responseData);
            } else {
                setError(
                    err?.message ||
                    "Unable to process receipt."
                );
            }
        } finally {
            setLoading(false);

            /*
             * Allows selecting the same receipt again.
             */
            if (inputRef.current) {
                inputRef.current.value = "";
            }
        }
    };

    const openFilePicker = () => {
        setError("");

        if (!settings.receipt.enabled) {
            setError(
                "Receipt Scanner is disabled. Enable it from Settings → Receipt Scanner."
            );

            return;
        }

        inputRef.current?.click();
    };

    return (
        <div className="border-2 border-dashed border-gray-300 rounded-3xl p-16 text-center">

            <input
                ref={inputRef}
                type="file"
                hidden
                accept="image/*"
                onChange={handleUpload}
            />

            {loading ? (
                <>
                    <div className="animate-spin w-12 h-12 mx-auto rounded-full border-4 border-[#0B6B57] border-t-transparent" />

                    <h2 className="text-2xl font-bold mt-6">
                        Processing Receipt...
                    </h2>

                    <p className="text-gray-500 mt-3">
                        Preparing receipt image...
                        <br />
                        OCR and AI are extracting expense details...
                    </p>
                </>
            ) : (
                <>
                    {preview ? (
                        <img
                            src={preview}
                            alt="Receipt"
                            className="mx-auto max-h-72 rounded-xl shadow"
                        />
                    ) : (
                        <FaReceipt
                            size={70}
                            className={
                                settings.receipt.enabled
                                    ? "mx-auto text-[#0B6B57]"
                                    : "mx-auto text-gray-400"
                            }
                        />
                    )}

                    <h2 className="text-2xl font-bold mt-6">
                        {settings.receipt.enabled
                            ? "Upload Receipt"
                            : "Receipt Scanner Disabled"}
                    </h2>

                    <p className="text-gray-500 mt-3">
                        {settings.receipt.enabled ? (
                            <>
                                AI will automatically detect
                                <br />
                                Merchant • Amount •{" "}
                                {settings.receipt.autoCategorize
                                    ? "Category • "
                                    : ""}
                                Date
                            </>
                        ) : (
                            <>
                                Enable Receipt Scanner from
                                <br />
                                Settings → Receipt Scanner
                            </>
                        )}
                    </p>

                    <button
                        type="button"
                        onClick={openFilePicker}
                        className={`mt-8 px-8 py-3 rounded-xl transition ${
                            settings.receipt.enabled
                                ? "bg-[#0B6B57] hover:bg-[#095846] text-white"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                        {settings.receipt.enabled
                            ? "Choose Receipt"
                            : "Receipt Scanner Disabled"}
                    </button>

                    {settings.receipt.enabled && (
                        <div className="flex flex-wrap justify-center gap-2 mt-5 text-xs text-gray-500">

                            {settings.receipt.autoCrop && (
                                <span className="bg-gray-100 px-3 py-1 rounded-full">
                                    Auto Crop
                                </span>
                            )}

                            {settings.receipt.highQuality && (
                                <span className="bg-gray-100 px-3 py-1 rounded-full">
                                    High Quality
                                </span>
                            )}

                            {settings.receipt.autoCategorize && (
                                <span className="bg-gray-100 px-3 py-1 rounded-full">
                                    AI Categorization
                                </span>
                            )}

                        </div>
                    )}

                    {error && (
                        <p className="text-red-500 mt-5">
                            {error}
                        </p>
                    )}
                </>
            )}

        </div>
    );
}