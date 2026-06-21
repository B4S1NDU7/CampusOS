import { Request, Response } from 'express';
import { Notification } from '../models/Notification';
import { crudFactory } from '../utils/crudFactory';
import { emitToRole, emitToUser } from '../services/socket.service';

const crud = crudFactory(Notification, { populate: 'recipient', searchable: ['title', 'message', 'type'] });

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const doc = await Notification.create(req.body);
    if ((doc as any).recipient) emitToUser(String((doc as any).recipient), 'notification:new', doc);
    for (const role of ((doc as any).audienceRoles || [])) emitToRole(role, 'notification:new', doc);
    res.status(201).json(doc);
  } catch (error) { res.status(500).json({ error }); }
};

export const getAll = crud.getAll;
export const getById = crud.getById;
export const update = crud.update;
export const remove = crud.remove;

export const markRead = async (req: Request, res: Response): Promise<void> => {
  try {
    const notification = await Notification.findByIdAndUpdate(req.params.id, { readAt: new Date() }, { new: true });
    if (!notification) {
      res.status(404).json({ message: 'Notification not found' });
      return;
    }
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Failed to mark notification read', error });
  }
};
