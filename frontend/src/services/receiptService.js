import api from "./api";

const uploadReceipt = async (file) => {
    const formData = new FormData();

    formData.append("image", file);

    const response = await api.post(
        "/receipt/scan",
        formData
    );

    return response.data;
};

export default {
    uploadReceipt,
};