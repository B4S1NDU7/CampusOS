import { Request, Response } from 'express';
import { Attendance } from '../models/Attendance';
import { Course } from '../models/Course';
import { Enrollment } from '../models/Enrollment';
import { Finance } from '../models/Finance';
import { Grade } from '../models/Grade';
import { StudentProfile } from '../models/StudentProfile';
import { User, Role } from '../models/User';

export const getDashboardAnalytics = async (_req: Request, res: Response): Promise<void> => {
  try {
    const [
      usersByRole,
      courseCount,
      enrollmentCount,
      studentCount,
      paidFinance,
      outstandingFinance,
      attendanceSessions,
      averageGrade
    ] = await Promise.all([
      User.aggregate([{ $group: { _id: '$role', count: { $sum: 1 } } }]),
      Course.countDocuments(),
      Enrollment.countDocuments({ status: 'enrolled' }),
      StudentProfile.countDocuments(),
      Finance.aggregate([{ $match: { status: 'paid' } }, { $group: { _id: null, total: { $sum: '$amount' } } }]),
      Finance.aggregate([{ $match: { status: { $in: ['issued', 'overdue'] } } }, { $group: { _id: null, total: { $sum: '$amount' } } }]),
      Attendance.countDocuments(),
      Grade.aggregate([{ $group: { _id: null, average: { $avg: '$score' } } }])
    ]);

    res.status(200).json({
      usersByRole,
      courseCount,
      enrollmentCount,
      studentCount,
      finance: {
        paid: paidFinance[0]?.total || 0,
        outstanding: outstandingFinance[0]?.total || 0
      },
      attendanceSessions,
      averageGrade: averageGrade[0]?.average || 0,
      portals: {
        admin: [Role.SUPER_ADMIN, Role.UNIVERSITY_ADMIN, Role.DEPARTMENT_ADMIN, Role.ADMIN],
        lecturer: [Role.LECTURER],
        student: [Role.STUDENT],
        parent: [Role.PARENT]
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load analytics', error });
  }
};
