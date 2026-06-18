import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app: Express = express();

// Middlewares
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
connectDB();

// Routes
import authRoutes from './routes/auth.routes';
import courseRoutes from './routes/course.routes';
import aiRoutes from './routes/ai.routes';
import departmentRoutes from './routes/department.routes';
import assignmentRoutes from './routes/assignment.routes';
import examRoutes from './routes/exam.routes';
import librarybookRoutes from './routes/librarybook.routes';
import hostelroomRoutes from './routes/hostelroom.routes';
import financeRoutes from './routes/finance.routes';
import eventRoutes from './routes/event.routes';

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/library', librarybookRoutes);
app.use('/api/hostels', hostelroomRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/events', eventRoutes);

// Health check
app.get('/', (req: Request, res: Response) => {
  res.send('CampusOS API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});