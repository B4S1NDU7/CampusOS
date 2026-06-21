import { Request, Response } from 'express';
import { HostelRoom } from '../models/HostelRoom';
import { crudFactory } from '../utils/crudFactory';

const crud = crudFactory(HostelRoom, { populate: ['occupants', 'requests.student'], searchable: ['roomNumber', 'block', 'status'] });

export const create = crud.create;
export const getAll = crud.getAll;
export const getById = crud.getById;
export const update = crud.update;
export const remove = crud.remove;

export const requestRoom = async (req: Request, res: Response): Promise<void> => {
  try {
    const student = req.body.student || (req as any).user?._id;
    const room = await HostelRoom.findByIdAndUpdate(
      req.params.id,
      { $push: { requests: { student, note: req.body.note } } },
      { new: true }
    );

    if (!room) {
      res.status(404).json({ message: 'Hostel room not found' });
      return;
    }

    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: 'Failed to request room', error });
  }
};

export const allocateRoom = async (req: Request, res: Response): Promise<void> => {
  try {
    const { student } = req.body;
    const room = await HostelRoom.findById(req.params.id);

    if (!room) {
      res.status(404).json({ message: 'Hostel room not found' });
      return;
    }

    if ((room as any).occupants.length >= (room as any).capacity) {
      res.status(409).json({ message: 'Room is already full' });
      return;
    }

    (room as any).occupants.addToSet(student);
    (room as any).status = (room as any).occupants.length + 1 >= (room as any).capacity ? 'full' : 'available';
    await room.save();
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: 'Failed to allocate room', error });
  }
};
