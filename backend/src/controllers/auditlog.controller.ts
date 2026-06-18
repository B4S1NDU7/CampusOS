import { Request, Response } from 'express';
import { AuditLog } from '../models/AuditLog';

export const create = async (req: Request, res: Response) => {
  try {
    const doc = await AuditLog.create(req.body);
    res.status(201).json(doc);
  } catch (error) { res.status(500).json({ error }); }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const data = await AuditLog.find();
    res.status(200).json(data);
  } catch (error) { res.status(500).json({ error }); }
};
