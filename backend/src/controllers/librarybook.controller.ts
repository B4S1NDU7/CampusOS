import { Request, Response } from 'express';
import { LibraryBook } from '../models/LibraryBook';
import { crudFactory } from '../utils/crudFactory';

const crud = crudFactory(LibraryBook, { searchable: ['title', 'author', 'isbn', 'category'] });

export const create = crud.create;
export const getAll = crud.getAll;
export const getById = crud.getById;
export const update = crud.update;
export const remove = crud.remove;

export const borrowBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.body.user || (req as any).user?._id;
    const dueAt = req.body.dueAt || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
    const book = await LibraryBook.findById(req.params.id);

    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }

    if ((book as any).copiesAvailable <= 0) {
      res.status(409).json({ message: 'No available copies' });
      return;
    }

    (book as any).borrowedBy.push({ user, dueAt });
    (book as any).copiesAvailable -= 1;
    await book.save();
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Failed to borrow book', error });
  }
};

export const returnBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.body.user || (req as any).user?._id;
    const book = await LibraryBook.findById(req.params.id);

    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }

    const borrowRecord = (book as any).borrowedBy.find((item: any) => item.user?.toString() === user.toString() && !item.returnedAt);
    if (!borrowRecord) {
      res.status(404).json({ message: 'Active borrow record not found' });
      return;
    }

    borrowRecord.returnedAt = new Date();
    const overdueDays = Math.max(0, Math.ceil((Date.now() - new Date(borrowRecord.dueAt).getTime()) / (24 * 60 * 60 * 1000)));
    borrowRecord.fine = overdueDays * Number(process.env.LIBRARY_DAILY_FINE || 1);
    (book as any).copiesAvailable += 1;
    await book.save();
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Failed to return book', error });
  }
};
