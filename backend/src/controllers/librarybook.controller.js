"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnBook = exports.borrowBook = exports.remove = exports.update = exports.getById = exports.getAll = exports.create = void 0;
const LibraryBook_1 = require("../models/LibraryBook");
const crudFactory_1 = require("../utils/crudFactory");
const crud = (0, crudFactory_1.crudFactory)(LibraryBook_1.LibraryBook, { searchable: ['title', 'author', 'isbn', 'category'] });
exports.create = crud.create;
exports.getAll = crud.getAll;
exports.getById = crud.getById;
exports.update = crud.update;
exports.remove = crud.remove;
const borrowBook = async (req, res) => {
    try {
        const user = req.body.user || req.user?._id;
        const dueAt = req.body.dueAt || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
        const book = await LibraryBook_1.LibraryBook.findById(req.params.id);
        if (!book) {
            res.status(404).json({ message: 'Book not found' });
            return;
        }
        if (book.copiesAvailable <= 0) {
            res.status(409).json({ message: 'No available copies' });
            return;
        }
        book.borrowedBy.push({ user, dueAt });
        book.copiesAvailable -= 1;
        await book.save();
        res.status(200).json(book);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to borrow book', error });
    }
};
exports.borrowBook = borrowBook;
const returnBook = async (req, res) => {
    try {
        const user = req.body.user || req.user?._id;
        const book = await LibraryBook_1.LibraryBook.findById(req.params.id);
        if (!book) {
            res.status(404).json({ message: 'Book not found' });
            return;
        }
        const borrowRecord = book.borrowedBy.find((item) => item.user?.toString() === user.toString() && !item.returnedAt);
        if (!borrowRecord) {
            res.status(404).json({ message: 'Active borrow record not found' });
            return;
        }
        borrowRecord.returnedAt = new Date();
        const overdueDays = Math.max(0, Math.ceil((Date.now() - new Date(borrowRecord.dueAt).getTime()) / (24 * 60 * 60 * 1000)));
        borrowRecord.fine = overdueDays * Number(process.env.LIBRARY_DAILY_FINE || 1);
        book.copiesAvailable += 1;
        await book.save();
        res.status(200).json(book);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to return book', error });
    }
};
exports.returnBook = returnBook;
//# sourceMappingURL=librarybook.controller.js.map