"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ai_controller_1 = require("../controllers/ai.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post('/ask', auth_middleware_1.protect, ai_controller_1.askAI);
router.post('/questions', auth_middleware_1.protect, ai_controller_1.generateQuestions);
router.post('/assignment-feedback', auth_middleware_1.protect, ai_controller_1.assignmentFeedback);
router.post('/gpa-prediction', auth_middleware_1.protect, ai_controller_1.predictGpa);
router.post('/dropout-risk', auth_middleware_1.protect, ai_controller_1.dropoutRisk);
router.post('/course-recommendations', auth_middleware_1.protect, ai_controller_1.courseRecommendations);
exports.default = router;
//# sourceMappingURL=ai.routes.js.map