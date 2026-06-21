"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allocateRoom = exports.requestRoom = exports.remove = exports.update = exports.getById = exports.getAll = exports.create = void 0;
const HostelRoom_1 = require("../models/HostelRoom");
const crudFactory_1 = require("../utils/crudFactory");
const crud = (0, crudFactory_1.crudFactory)(HostelRoom_1.HostelRoom, { populate: ['occupants', 'requests.student'], searchable: ['roomNumber', 'block', 'status'] });
exports.create = crud.create;
exports.getAll = crud.getAll;
exports.getById = crud.getById;
exports.update = crud.update;
exports.remove = crud.remove;
const requestRoom = async (req, res) => {
    try {
        const student = req.body.student || req.user?._id;
        const room = await HostelRoom_1.HostelRoom.findByIdAndUpdate(req.params.id, { $push: { requests: { student, note: req.body.note } } }, { new: true });
        if (!room) {
            res.status(404).json({ message: 'Hostel room not found' });
            return;
        }
        res.status(200).json(room);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to request room', error });
    }
};
exports.requestRoom = requestRoom;
const allocateRoom = async (req, res) => {
    try {
        const { student } = req.body;
        const room = await HostelRoom_1.HostelRoom.findById(req.params.id);
        if (!room) {
            res.status(404).json({ message: 'Hostel room not found' });
            return;
        }
        if (room.occupants.length >= room.capacity) {
            res.status(409).json({ message: 'Room is already full' });
            return;
        }
        room.occupants.addToSet(student);
        room.status = room.occupants.length + 1 >= room.capacity ? 'full' : 'available';
        await room.save();
        res.status(200).json(room);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to allocate room', error });
    }
};
exports.allocateRoom = allocateRoom;
//# sourceMappingURL=hostelroom.controller.js.map