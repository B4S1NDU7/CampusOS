import { Request, Response } from 'express';
import { Grade } from '../models/Grade';

export const create = async (req: Request, res: Response) => {
  try {
    const doc = await Grade.create(req.body);
    res.status(201).json(doc);
  } catch (error) { res.status(500).json({ error }); }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const data = await Grade.find();
    res.status(200).json(data);
  } catch (error) { res.status(500).json({ error }); }
};
