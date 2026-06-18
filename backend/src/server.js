"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)({ origin: 'http://localhost:5173', credentials: true }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Database connection
(0, db_1.connectDB)();
// Routes
const auth_routes_2 = __importDefault(require("./routes/auth.routes"));
const course_routes_1 = __importDefault(require("./routes/course.routes"));
const ai_routes_1 = __importDefault(require("./routes/ai.routes"));
const department_routes_1 = __importDefault(require("./routes/department.routes"));
const assignment_routes_1 = __importDefault(require("./routes/assignment.routes"));
const exam_routes_1 = __importDefault(require("./routes/exam.routes"));
const librarybook_routes_1 = __importDefault(require("./routes/librarybook.routes"));
const hostelroom_routes_1 = __importDefault(require("./routes/hostelroom.routes"));
const finance_routes_1 = __importDefault(require("./routes/finance.routes"));
const event_routes_1 = __importDefault(require("./routes/event.routes"));
app.use('/api/auth', auth_routes_1.default);
app.use('/api/courses', course_routes_1.default);
app.use('/api/ai', ai_routes_1.default);
app.use('/api/departments', department_routes_1.default);
app.use('/api/assignments', assignment_routes_1.default);
app.use('/api/exams', exam_routes_1.default);
app.use('/api/library', librarybook_routes_1.default);
app.use('/api/hostels', hostelroom_routes_1.default);
app.use('/api/finance', finance_routes_1.default);
app.use('/api/events', event_routes_1.default);
// Health check
app.get('/', (req, res) => {
    res.send('CampusOS API is running...');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map