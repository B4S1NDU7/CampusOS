import { Request, Response } from 'express';
import { Attendance } from '../models/Attendance';

export const recordAttendance = async (req: Request, res: Response): Promise<void> => {
  try {
    const { course, date, records } = req.body;
    
    // Normalize date to start of day to prevent multiple records for same day with different times
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const attendance = await Attendance.findOneAndUpdate(
      { course, date: startOfDay },
      { records },
      { new: true, upsert: true }
    );

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const getAttendance = async (req: Request, res: Response): Promise<void> => {
  try {
    const { courseId, date } = req.query;
    const filter: any = {};
    if (courseId) filter.course = courseId;
    if (date) {
      const startOfDay = new Date(date as string);
      startOfDay.setUTCHours(0, 0, 0, 0);
      filter.date = startOfDay;
    }

    const attendance = await Attendance.find(filter)
      .populate('course', 'name code')
      .populate('records.student', 'firstName lastName studentId');
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const getStudentAttendance = async (req: Request, res: Response): Promise<void> => {
  try {
    const studentId = (req as any).user._id;
    // Find all attendance documents where this student appears in records
    const attendances = await Attendance.find({ 'records.student': studentId })
      .populate('course', 'name code');

    // Filter down to just this student's records
    const studentRecords = attendances.map(a => {
      const record = a.records.find(r => r.student.toString() === studentId.toString());
      return {
        course: a.course,
        date: a.date,
        status: record?.status
      };
    });

    res.status(200).json(studentRecords);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const updateAttendance = async (req: Request, res: Response): Promise<void> => {
  try {
    const { attendanceId } = req.params;
    const { records } = req.body;

    const attendance = await Attendance.findByIdAndUpdate(
      attendanceId,
      { records },
      { new: true }
    ).populate('course', 'name code').populate('records.student', 'firstName lastName studentId');

    if (!attendance) {
      res.status(404).json({ message: 'Attendance record not found' });
      return;
    }

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const deleteAttendance = async (req: Request, res: Response): Promise<void> => {
  try {
    const { attendanceId } = req.params;
    
    const attendance = await Attendance.findByIdAndDelete(attendanceId);

    if (!attendance) {
      res.status(404).json({ message: 'Attendance record not found' });
      return;
    }

    res.status(200).json({ message: 'Attendance record deleted successfully', attendance });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
