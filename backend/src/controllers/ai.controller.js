"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRecommendations = exports.dropoutRisk = exports.predictGpa = exports.assignmentFeedback = exports.generateQuestions = exports.askAI = void 0;
const generative_ai_1 = require("@google/generative-ai");
const AIRequest_1 = require("../models/AIRequest");
const featurePrompts = {
    'study-assistant': 'You are a concise university study assistant. Help the student understand the topic and propose next steps.',
    'question-generator': 'Generate exam questions with answers, difficulty labels, and a marking rubric.',
    'assignment-feedback': 'Give constructive assignment feedback with strengths, issues, and improvement actions.',
    'gpa-prediction': 'Predict GPA direction using the provided academic signals. Explain uncertainty and assumptions.',
    'dropout-risk': 'Assess dropout risk using academic, attendance, finance, and engagement signals. Include non-punitive interventions.',
    'course-recommendations': 'Recommend courses based on prerequisites, goals, performance, and workload balance.'
};
const runGemini = async (prompt) => {
    if (!process.env.GEMINI_API_KEY) {
        return {
            provider: 'fallback',
            text: 'AI provider is not configured. Add GEMINI_API_KEY to enable live AI responses.'
        };
    }
    const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return { provider: 'gemini', text: response.text() };
};
const handleAI = (feature) => async (req, res) => {
    try {
        const prompt = req.body.prompt || req.body.context || '';
        if (!prompt) {
            res.status(400).json({ message: 'prompt or context is required' });
            return;
        }
        const finalPrompt = `${featurePrompts[feature]}\n\nContext:\n${typeof prompt === 'string' ? prompt : JSON.stringify(prompt, null, 2)}`;
        const result = await runGemini(finalPrompt);
        await AIRequest_1.AIRequest.create({
            user: req.user?._id,
            feature,
            prompt: finalPrompt,
            response: result.text,
            provider: result.provider,
            metadata: req.body.metadata
        });
        res.status(200).json({ feature, provider: result.provider, text: result.text });
    }
    catch (error) {
        res.status(500).json({ message: 'AI generation failed', error });
    }
};
exports.askAI = handleAI('study-assistant');
exports.generateQuestions = handleAI('question-generator');
exports.assignmentFeedback = handleAI('assignment-feedback');
exports.predictGpa = handleAI('gpa-prediction');
exports.dropoutRisk = handleAI('dropout-risk');
exports.courseRecommendations = handleAI('course-recommendations');
//# sourceMappingURL=ai.controller.js.map