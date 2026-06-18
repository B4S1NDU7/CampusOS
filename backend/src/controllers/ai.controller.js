"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.askAI = void 0;
const express_1 = require("express");
const generative_ai_1 = require("@google/generative-ai");
const askAI = async (req, res) => { try {
    const { prompt } = req.body;
    if (!process.env.GEMINI_API_KEY) {
        res.status(500).json({ message: 'AI API NOT CONFIGURED' });
        return;
    }
    const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    res.status(200).json({ text: response.text() });
}
catch (error) {
    res.status(500).json({ message: 'AI Generation Failed', error });
} };
exports.askAI = askAI;
//# sourceMappingURL=ai.controller.js.map