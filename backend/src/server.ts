import express, { Express, Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { Server } from 'socket.io';
import { connectDB } from './config/db';
import { setSocketServer } from './services/socket.service';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';

dotenv.config();

const app: Express = express();
const clientOrigin = process.env.CLIENT_URL || 'http://localhost:5173';

// Middlewares
app.use(helmet());
app.use(cors({ origin: clientOrigin, credentials: true }));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: Number(process.env.RATE_LIMIT_MAX || 300)
}));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Database connection
connectDB();

// Routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import courseRoutes from './routes/course.routes';
import departmentRoutes from './routes/department.routes';
import studentRoutes from './routes/student.routes';
import lecturerRoutes from './routes/lecturer.routes';
import aiRoutes from './routes/ai.routes';
import assignmentRoutes from './routes/assignment.routes';
import examRoutes from './routes/exam.routes';
import attendanceRoutes from './routes/attendance.routes';
import librarybookRoutes from './routes/librarybook.routes';
import hostelroomRoutes from './routes/hostelroom.routes';
import financeRoutes from './routes/finance.routes';
import eventRoutes from './routes/event.routes';
import gradeRoutes from './routes/grade.routes';
import notificationRoutes from './routes/notification.routes';
import auditLogRoutes from './routes/auditlog.routes';
import enrollmentRoutes from './routes/enrollment.routes';
import analyticsRoutes from './routes/analytics.routes';
import uploadRoutes from './routes/upload.routes';

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/lecturers', lecturerRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/library', librarybookRoutes);
app.use('/api/hostels', hostelroomRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/audit-logs', auditLogRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/uploads', uploadRoutes);

// Health check
app.get('/', (req: Request, res: Response) => {
  res.send('CampusOS API is running...');
});

const PORT = process.env.PORT || 5000;
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: clientOrigin,
    credentials: true
  }
});

setSocketServer(io);

io.on('connection', (socket) => {
  const { userId, role } = socket.handshake.auth || {};
  if (userId) socket.join(`user:${userId}`);
  if (role) socket.join(`role:${role}`);

  socket.on('announcement:send', (payload) => {
    io.emit('announcement:new', payload);
  });
});

app.use((req: Request, res: Response) => {
  notFoundHandler(req, res);
});

// Global error handler middleware (must be last)
app.use(errorHandler);

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
