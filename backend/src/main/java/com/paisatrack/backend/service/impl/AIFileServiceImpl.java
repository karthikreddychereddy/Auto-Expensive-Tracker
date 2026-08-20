package com.paisatrack.backend.service.impl;

import com.paisatrack.backend.service.AIFileService;

import lombok.RequiredArgsConstructor;

import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFTable;
import org.apache.poi.xwpf.usermodel.XWPFTableRow;
import org.apache.poi.xwpf.usermodel.XWPFTableCell;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class AIFileServiceImpl implements AIFileService {

    private final Tesseract tesseract;

    /*
     * Prevent extremely large files from creating
     * enormous AI prompts.
     */
    private static final long MAX_FILE_SIZE =
            10 * 1024 * 1024;

    /*
     * Limit extracted text sent to the LLM.
     */
    private static final int MAX_TEXT_LENGTH =
            30_000;

    @Override
    public String extractText(
            MultipartFile file
    ) {

        validateFile(file);

        String extension =
                getExtension(
                        file.getOriginalFilename()
                );

        try {

            String extractedText =
                    switch (extension) {

                        case "txt", "csv" ->
                                extractPlainText(file);

                        case "pdf" ->
                                extractPdf(file);

                        case "docx" ->
                                extractDocx(file);

                        case "xls", "xlsx" ->
                                extractExcel(file);

                        case "jpg",
                             "jpeg",
                             "png",
                             "webp" ->
                                extractImage(file);

                        default ->
                                throw new IllegalArgumentException(
                                        "Unsupported attachment type: "
                                                + extension
                                );
                    };

            return normalizeAndLimit(
                    extractedText
            );

        } catch (IOException ex) {

            throw new RuntimeException(
                    "Unable to read attached file.",
                    ex
            );
        }
    }

    private String extractPlainText(
            MultipartFile file
    ) throws IOException {

        return new String(
                file.getBytes(),
                StandardCharsets.UTF_8
        );
    }

    private String extractPdf(
            MultipartFile file
    ) throws IOException {

        try (
                PDDocument document =
                        Loader.loadPDF(
                                file.getBytes()
                        )
        ) {

            PDFTextStripper stripper =
                    new PDFTextStripper();

            String text =
                    stripper.getText(document);

            if (
                    text == null ||
                    text.isBlank()
            ) {

                throw new RuntimeException(
                        "No readable text was found in the PDF. " +
                        "Scanned PDFs will be supported through OCR later."
                );
            }

            return text;
        }
    }

    private String extractDocx(
            MultipartFile file
    ) throws IOException {

        StringBuilder text =
                new StringBuilder();

        try (
                XWPFDocument document =
                        new XWPFDocument(
                                file.getInputStream()
                        )
        ) {

            for (
                    XWPFParagraph paragraph :
                    document.getParagraphs()
            ) {

                String paragraphText =
                        paragraph.getText();

                if (
                        paragraphText != null &&
                        !paragraphText.isBlank()
                ) {

                    text
                            .append(paragraphText)
                            .append("\n");
                }
            }

            for (
                    XWPFTable table :
                    document.getTables()
            ) {

                for (
                        XWPFTableRow row :
                        table.getRows()
                ) {

                    for (
                            XWPFTableCell cell :
                            row.getTableCells()
                    ) {

                        text
                                .append(
                                        cell.getText()
                                )
                                .append("\t");
                    }

                    text.append("\n");
                }
            }
        }

        return text.toString();
    }

    private String extractExcel(
            MultipartFile file
    ) throws IOException {

        StringBuilder text =
                new StringBuilder();

        DataFormatter formatter =
                new DataFormatter();

        try (
                Workbook workbook =
                        WorkbookFactory.create(
                                file.getInputStream()
                        )
        ) {

            for (
                    Sheet sheet :
                    workbook
            ) {

                text
                        .append("\nSHEET: ")
                        .append(
                                sheet.getSheetName()
                        )
                        .append("\n");

                for (
                        Row row :
                        sheet
                ) {

                    for (
                            Cell cell :
                            row
                    ) {

                        String value =
                                formatter.formatCellValue(
                                        cell
                                );

                        text
                                .append(value)
                                .append("\t");
                    }

                    text.append("\n");
                }
            }
        }

        return text.toString();
    }

    private String extractImage(
            MultipartFile file
    ) {

        File tempFile = null;

        try {

            String extension =
                    getExtension(
                            file.getOriginalFilename()
                    );

            tempFile =
                    File.createTempFile(
                            "ai-attachment-",
                            "." + extension
                    );

            file.transferTo(tempFile);

            String text =
                    tesseract.doOCR(
                            tempFile
                    );

            if (
                    text == null ||
                    text.isBlank()
            ) {

                throw new RuntimeException(
                        "No readable text was found in the image."
                );
            }

            return text;

        } catch (
                IOException |
                TesseractException ex
        ) {

            throw new RuntimeException(
                    "Unable to read text from attached image.",
                    ex
            );

        } finally {

            if (
                    tempFile != null &&
                    tempFile.exists()
            ) {

                if (!tempFile.delete()) {
                    tempFile.deleteOnExit();
                }
            }
        }
    }

    private void validateFile(
            MultipartFile file
    ) {

        if (
                file == null ||
                file.isEmpty()
        ) {

            throw new IllegalArgumentException(
                    "Attachment is required."
            );
        }

        if (
                file.getSize() >
                MAX_FILE_SIZE
        ) {

            throw new IllegalArgumentException(
                    "Attachment must be smaller than 10 MB."
            );
        }

        String extension =
                getExtension(
                        file.getOriginalFilename()
                );

        boolean supported =
                switch (extension) {

                    case "pdf",
                         "txt",
                         "csv",
                         "jpg",
                         "jpeg",
                         "png",
                         "webp",
                         "docx",
                         "xls",
                         "xlsx" ->
                            true;

                    default ->
                            false;
                };

        if (!supported) {

            throw new IllegalArgumentException(
                    "Unsupported attachment type."
            );
        }
    }

    private String getExtension(
            String filename
    ) {

        if (
                filename == null ||
                !filename.contains(".")
        ) {

            return "";
        }

        return filename
                .substring(
                        filename.lastIndexOf(".") + 1
                )
                .toLowerCase(
                        Locale.ROOT
                );
    }

    private String normalizeAndLimit(
            String text
    ) {

        if (
                text == null ||
                text.isBlank()
        ) {

            throw new RuntimeException(
                    "No readable content was found in the attachment."
            );
        }

        String cleaned =
                text
                        .replace("\u0000", "")
                        .trim();

        if (
                cleaned.length() >
                MAX_TEXT_LENGTH
        ) {

            cleaned =
                    cleaned.substring(
                            0,
                            MAX_TEXT_LENGTH
                    )
                    +
                    "\n\n[Attachment content truncated]";
        }

        return cleaned;
    }
}