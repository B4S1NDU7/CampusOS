import { Router } from 'express';
import { createDepartment, getDepartments, getDepartmentById, updateDepartment, deleteDepartment } from '../controllers/department.controller';
import { protect, authorize } from '../middlewares/auth.middleware';
import { Role } from '../models/User';

const router = Router();

router.route('/')
  .get(protect, getDepartments) // Anyone logged in can see departments
  .post(protect, authorize(Role.ADMIN), createDepartment);

router.route('/:id')
  .get(protect, getDepartmentById)
  .put(protect, authorize(Role.ADMIN), updateDepartment)
  .delete(protect, authorize(Role.ADMIN), deleteDepartment);

export default router;
