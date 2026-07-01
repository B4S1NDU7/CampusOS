import { z } from 'zod';

// ==================== User & Auth Schemas ====================
export const registerSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Invalid password'),
});

export const resetPasswordSchema = z.object({
  token: z.string(),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
});

export const updateProfileSchema = z.object({
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  phone: z.string().optional(),
  profilePicture: z.string().url().optional(),
});

// ==================== Student & Profile Schemas ====================
export const createStudentSchema = z.object({
  matriculationNumber: z.string().min(1, 'Matric number is required'),
  userId: z.string(),
  departmentId: z.string(),
  level: z.enum(['100', '200', '300', '400']),
  gpa: z.number().min(0).max(5).optional(),
  admissionDate: z.string().datetime(),
});

export const updateStudentSchema = createStudentSchema.partial();

export const bulkRegisterStudentsSchema = z.object({
  students: z.array(
    z.object({
      email: z.string().email(),
      firstName: z.string(),
      lastName: z.string(),
      matriculationNumber: z.string(),
      departmentId: z.string(),
      level: z.enum(['100', '200', '300', '400']),
    })
  ),
});

// ==================== Lecturer & Profile Schemas ====================
export const createLecturerSchema = z.object({
  employeeId: z.string(),
  userId: z.string(),
  departmentId: z.string(),
  specialization: z.string(),
  qualification: z.enum(['Bachelor', 'Master', 'PhD']),
  yearsOfExperience: z.number().min(0).max(60),
});

export const updateLecturerSchema = createLecturerSchema.partial();

// ==================== Course Schemas ====================
export const createCourseSchema = z.object({
  code: z.string().regex(/^[A-Z]{2,4}\d{3}$/, 'Invalid course code format'),
  title: z.string().min(3, 'Course title must be at least 3 characters'),
  description: z.string().optional(),
  credits: z.number().min(1).max(10),
  departmentId: z.string(),
  lecturerId: z.string(),
  capacity: z.number().min(1).max(500),
  prerequisites: z.array(z.string()).optional(),
  semester: z.enum(['1', '2']),
  academicYear: z.string().regex(/^\d{4}\/\d{4}$/),
});

export const updateCourseSchema = createCourseSchema.partial();

// ==================== Enrollment Schemas ====================
export const createEnrollmentSchema = z.object({
  studentId: z.string(),
  courseId: z.string(),
  enrollmentDate: z.string().datetime().optional(),
  status: z.enum(['ENROLLED', 'DROPPED', 'COMPLETED']).optional(),
});

export const updateEnrollmentSchema = z.object({
  status: z.enum(['ENROLLED', 'DROPPED', 'COMPLETED']),
});

// ==================== Department Schemas ====================
export const createDepartmentSchema = z.object({
  name: z.string().min(3, 'Department name must be at least 3 characters'),
  code: z.string().regex(/^[A-Z]{2,4}$/),
  head: z.string().optional(),
  description: z.string().optional(),
});

export const updateDepartmentSchema = createDepartmentSchema.partial();

// ==================== Assignment Schemas ====================
export const createAssignmentSchema = z.object({
  courseId: z.string(),
  title: z.string().min(3),
  description: z.string(),
  maxScore: z.number().min(0).max(100),
  dueDate: z.string().datetime(),
  createdBy: z.string(),
  attachments: z.array(z.string().url()).optional(),
});

export const updateAssignmentSchema = createAssignmentSchema.partial();

export const submitAssignmentSchema = z.object({
  studentId: z.string(),
  assignmentId: z.string(),
  submissionText: z.string().optional(),
  attachments: z.array(z.string().url()).optional(),
});

export const gradeAssignmentSchema = z.object({
  submissionId: z.string(),
  score: z.number().min(0).max(100),
  feedback: z.string().optional(),
  gradedBy: z.string(),
});

// ==================== Exam Schemas ====================
export const createExamSchema = z.object({
  courseId: z.string(),
  title: z.string().min(3),
  type: z.enum(['MIDTERM', 'FINAL', 'QUIZ', 'PRACTICAL']),
  totalMarks: z.number().min(1).max(100),
  duration: z.number().min(15).max(480), // minutes
  examDate: z.string().datetime(),
  venue: z.string().optional(),
  createdBy: z.string(),
});

export const updateExamSchema = createExamSchema.partial();

export const recordExamResultSchema = z.object({
  examId: z.string(),
  studentId: z.string(),
  score: z.number().min(0).max(100),
  remarks: z.string().optional(),
  recordedBy: z.string(),
});

// ==================== Attendance Schemas ====================
export const createAttendanceSessionSchema = z.object({
  courseId: z.string(),
  sessionDate: z.string().datetime(),
  totalStudents: z.number().min(0),
  createdBy: z.string(),
});

export const recordAttendanceSchema = z.object({
  sessionId: z.string(),
  studentId: z.string(),
  status: z.enum(['PRESENT', 'ABSENT', 'LATE']),
});

// ==================== Grade Schemas ====================
export const createGradeSchema = z.object({
  studentId: z.string(),
  courseId: z.string(),
  score: z.number().min(0).max(100),
  grade: z.enum(['A', 'B', 'C', 'D', 'E', 'F']),
  recordedBy: z.string(),
  academicYear: z.string(),
  semester: z.enum(['1', '2']),
});

export const updateGradeSchema = createGradeSchema.partial();

// ==================== Library Book Schemas ====================
export const createLibraryBookSchema = z.object({
  title: z.string().min(3),
  author: z.string().min(3),
  isbn: z.string().regex(/^\d{13}$/),
  totalCopies: z.number().min(1),
  category: z.string(),
  publicationYear: z.number().min(1900).max(new Date().getFullYear()),
  publisher: z.string().optional(),
});

export const updateLibraryBookSchema = createLibraryBookSchema.partial();

export const borrowBookSchema = z.object({
  studentId: z.string(),
  bookId: z.string(),
  borrowDate: z.string().datetime().optional(),
  dueDate: z.string().datetime(),
});

export const returnBookSchema = z.object({
  borrowId: z.string(),
  returnDate: z.string().datetime().optional(),
});

// ==================== Hostel Room Schemas ====================
export const createHostelRoomSchema = z.object({
  roomNumber: z.string(),
  capacity: z.number().min(1).max(10),
  building: z.string(),
  floor: z.number().min(0).max(20),
  type: z.enum(['SINGLE', 'DOUBLE', 'SHARED']),
  costPerYear: z.number().min(0),
  amenities: z.array(z.string()).optional(),
});

export const updateHostelRoomSchema = createHostelRoomSchema.partial();

export const allocateRoomSchema = z.object({
  studentId: z.string(),
  roomId: z.string(),
  academicYear: z.string(),
  semester: z.enum(['1', '2']),
});

// ==================== Finance Schemas ====================
export const createFinanceSchema = z.object({
  studentId: z.string(),
  invoiceNumber: z.string().min(1, 'Invoice number is required'),
  amount: z.number().min(0),
  description: z.string(),
  dueDate: z.string().datetime(),
  category: z.enum(['TUITION', 'HOSTEL', 'LIBRARY', 'ACTIVITIES', 'OTHER']),
  status: z.enum(['PENDING', 'PAID', 'OVERDUE']).optional(),
});

export const updateFinanceSchema = createFinanceSchema.partial();

export const recordPaymentSchema = z.object({
  financeId: z.string(),
  amount: z.number().min(0),
  paymentMethod: z.enum(['CARD', 'BANK_TRANSFER', 'CASH', 'CHEQUE']),
  transactionId: z.string(),
  paymentDate: z.string().datetime().optional(),
});

// ==================== Event Schemas ====================
export const createEventSchema = z.object({
  title: z.string().min(3),
  description: z.string(),
  eventDate: z.string().datetime(),
  location: z.string(),
  capacity: z.number().min(1),
  category: z.enum(['ACADEMIC', 'SOCIAL', 'SPORTS', 'CULTURAL', 'OTHER']),
  organizer: z.string(),
  image: z.string().url().optional(),
});

export const updateEventSchema = createEventSchema.partial();

export const registerEventSchema = z.object({
  eventId: z.string(),
  userId: z.string(),
});

// ==================== Notification Schemas ====================
export const createNotificationSchema = z.object({
  recipient: z.string().or(z.array(z.string())), // userId or array of userIds
  title: z.string().min(3),
  message: z.string().min(3),
  type: z.enum(['INFO', 'SUCCESS', 'WARNING', 'ERROR']),
  link: z.string().url().optional(),
});

// ==================== Export all schemas ====================
export const validationSchemas = {
  auth: { registerSchema, loginSchema, resetPasswordSchema, updateProfileSchema },
  student: { createStudentSchema, updateStudentSchema, bulkRegisterStudentsSchema },
  lecturer: { createLecturerSchema, updateLecturerSchema },
  course: { createCourseSchema, updateCourseSchema },
  enrollment: { createEnrollmentSchema, updateEnrollmentSchema },
  department: { createDepartmentSchema, updateDepartmentSchema },
  assignment: { createAssignmentSchema, updateAssignmentSchema, submitAssignmentSchema, gradeAssignmentSchema },
  exam: { createExamSchema, updateExamSchema, recordExamResultSchema },
  attendance: { createAttendanceSessionSchema, recordAttendanceSchema },
  grade: { createGradeSchema, updateGradeSchema },
  library: { createLibraryBookSchema, updateLibraryBookSchema, borrowBookSchema, returnBookSchema },
  hostel: { createHostelRoomSchema, updateHostelRoomSchema, allocateRoomSchema },
  finance: { createFinanceSchema, updateFinanceSchema, recordPaymentSchema },
  event: { createEventSchema, updateEventSchema, registerEventSchema },
  notification: { createNotificationSchema },
};
