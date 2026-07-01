import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

// Custom error class
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public isOperational: boolean = true
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

// Error response interface
interface ErrorResponse {
  success: false;
  message: string;
  statusCode: number;
  stack?: string;
  details?: any;
}

// Global error handler middleware
export const errorHandler = (
  err: Error | AppError | ZodError | any,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) => {
  let error = err;

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of err.issues) {
      const path = issue.path.map(String).join('.');
      fieldErrors[path] = issue.message;
    }

    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      statusCode: 400,
      ...(process.env.NODE_ENV === 'development' && { details: fieldErrors }),
    });
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    const fieldErrors = Object.entries(err.errors || {}).reduce(
      (acc, [key, value]: [string, any]) => {
        acc[key] = value.message;
        return acc;
      },
      {} as Record<string, string>
    );

    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      statusCode: 400,
      ...(process.env.NODE_ENV === 'development' && { details: fieldErrors }),
    });
  }

  // Handle Mongoose duplicate key errors
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      success: false,
      message: `${field} already exists`,
      statusCode: 409,
    });
  }

  // Handle Mongoose CastError
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format',
      statusCode: 400,
    });
  }

  // Default to AppError
  if (!(error instanceof AppError)) {
    error = new AppError(
      err.message || 'Internal server error',
      err.statusCode || 500,
      true
    );
  }

  // Send error response
  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    statusCode: error.statusCode,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  });
};

// Async error wrapper
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// 404 handler
export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
    statusCode: 404,
  });
};
