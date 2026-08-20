import api from "./api";

const receiptAIService = {

  improveReceipt(extractedText) {
    return api.post("/receipt/ai-test", {
      extractedText
    });
  }

};

export default receiptAIService;