import { NextFunction, Request, Response } from 'express';
import { z, ZodSchema } from 'zod';

export const roleSchema = z.enum([
  'Super Admin',
  'University Admin',
  'Department Admin',
  'Lecturer',
  'Student',
  'Parent',
  'Admin'
]);

export const registerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: roleSchema.optional()
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        message: 'Validation failed',
        issues: result.error.flatten()
      });
      return;
    }
    req.body = result.data;
    next();
  };
