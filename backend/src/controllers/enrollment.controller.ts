import { Request, Response } from 'express';
import { Course } from '../models/Course';
import { Enrollment } from '../models/Enrollment';
import { crudFactory } from '../utils/crudFactory';
import { resolveCourseReference } from '../utils/courseLookup';

const crud = crudFactory(Enrollment, {
  populate: ['student', 'course'],
  searchable: ['status', 'finalGrade']
});

export const getEnrollments = crud.getAll;
export const getEnrollmentById = crud.getById;
export const updateEnrollment = crud.update;
export const deleteEnrollment = crud.remove;

export const enrollStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const student = req.body.student || (req as any).user?._id;
    const { course } = req.body;

    const courseDoc = await resolveCourseReference(course);
    if (!courseDoc) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }

    const courseId = courseDoc._id.toString();
    const activeCount = await Enrollment.countDocuments({ course: courseId, status: 'enrolled' });
    if (activeCount >= courseDoc.capacity) {
      res.status(409).json({ message: 'Course capacity has been reached' });
      return;
    }

    const enrollment = await Enrollment.findOneAndUpdate(
      { student, course: courseId },
      { student, course: courseId, status: 'enrolled', enrolledAt: new Date(), $unset: { droppedAt: '' } },
      { new: true, upsert: true, runValidators: true }
    ).populate(['student', 'course']);

    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to enroll student', error });
  }
};

export const dropEnrollment = async (req: Request, res: Response): Promise<void> => {
  try {
    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      { status: 'dropped', droppedAt: new Date() },
      { new: true }
    );

    if (!enrollment) {
      res.status(404).json({ message: 'Enrollment not found' });
      return;
    }

    res.status(200).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to drop enrollment', error });
  }
};
