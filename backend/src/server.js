"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const morgan_1 = __importDefault(require("morgan"));
const socket_io_1 = require("socket.io");
const db_1 = require("./config/db");
const socket_service_1 = require("./services/socket.service");
dotenv_1.default.config();
const app = (0, express_1.default)();
const clientOrigin = process.env.CLIENT_URL || 'http://localhost:5173';
// Middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({ origin: clientOrigin, credentials: true }));
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    limit: Number(process.env.RATE_LIMIT_MAX || 300)
}));
app.use((0, morgan_1.default)(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// Database connection
(0, db_1.connectDB)();
// Routes
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const course_routes_1 = __importDefault(require("./routes/course.routes"));
const department_routes_1 = __importDefault(require("./routes/department.routes"));
const student_routes_1 = __importDefault(require("./routes/student.routes"));
const lecturer_routes_1 = __importDefault(require("./routes/lecturer.routes"));
const ai_routes_1 = __importDefault(require("./routes/ai.routes"));
const assignment_routes_1 = __importDefault(require("./routes/assignment.routes"));
const exam_routes_1 = __importDefault(require("./routes/exam.routes"));
const attendance_routes_1 = __importDefault(require("./routes/attendance.routes"));
const librarybook_routes_1 = __importDefault(require("./routes/librarybook.routes"));
const hostelroom_routes_1 = __importDefault(require("./routes/hostelroom.routes"));
const finance_routes_1 = __importDefault(require("./routes/finance.routes"));
const event_routes_1 = __importDefault(require("./routes/event.routes"));
const grade_routes_1 = __importDefault(require("./routes/grade.routes"));
const notification_routes_1 = __importDefault(require("./routes/notification.routes"));
const auditlog_routes_1 = __importDefault(require("./routes/auditlog.routes"));
const enrollment_routes_1 = __importDefault(require("./routes/enrollment.routes"));
const analytics_routes_1 = __importDefault(require("./routes/analytics.routes"));
const upload_routes_1 = __importDefault(require("./routes/upload.routes"));
app.use('/api/auth', auth_routes_1.default);
app.use('/api/users', user_routes_1.default);
app.use('/api/courses', course_routes_1.default);
app.use('/api/departments', department_routes_1.default);
app.use('/api/students', student_routes_1.default);
app.use('/api/lecturers', lecturer_routes_1.default);
app.use('/api/ai', ai_routes_1.default);
app.use('/api/assignments', assignment_routes_1.default);
app.use('/api/exams', exam_routes_1.default);
app.use('/api/attendance', attendance_routes_1.default);
app.use('/api/library', librarybook_routes_1.default);
app.use('/api/hostels', hostelroom_routes_1.default);
app.use('/api/finance', finance_routes_1.default);
app.use('/api/events', event_routes_1.default);
app.use('/api/grades', grade_routes_1.default);
app.use('/api/notifications', notification_routes_1.default);
app.use('/api/audit-logs', auditlog_routes_1.default);
app.use('/api/enrollments', enrollment_routes_1.default);
app.use('/api/analytics', analytics_routes_1.default);
app.use('/api/uploads', upload_routes_1.default);
// Health check
app.get('/', (req, res) => {
    res.send('CampusOS API is running...');
});
const PORT = process.env.PORT || 5000;
const httpServer = http_1.default.createServer(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: clientOrigin,
        credentials: true
    }
});
(0, socket_service_1.setSocketServer)(io);
io.on('connection', (socket) => {
    const { userId, role } = socket.handshake.auth || {};
    if (userId)
        socket.join(`user:${userId}`);
    if (role)
        socket.join(`role:${role}`);
    socket.on('announcement:send', (payload) => {
        io.emit('announcement:new', payload);
    });
});
app.use((req, res) => {
    res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});
httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map