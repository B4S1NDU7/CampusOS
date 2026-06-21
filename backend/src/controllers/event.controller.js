"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerForEvent = exports.remove = exports.update = exports.getById = exports.getAll = exports.create = void 0;
const Event_1 = require("../models/Event");
const crudFactory_1 = require("../utils/crudFactory");
const socket_service_1 = require("../services/socket.service");
const crud = (0, crudFactory_1.crudFactory)(Event_1.Event, {
    populate: ['organizer', 'registeredUsers'],
    searchable: ['title', 'description', 'location', 'status']
});
const create = async (req, res) => {
    try {
        const doc = await Event_1.Event.create({ ...req.body, organizer: req.body.organizer || req.user?._id });
        (0, socket_service_1.emitGlobal)('event:created', doc);
        res.status(201).json(doc);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.create = create;
exports.getAll = crud.getAll;
exports.getById = crud.getById;
exports.update = crud.update;
exports.remove = crud.remove;
const registerForEvent = async (req, res) => {
    try {
        const userId = req.body.user || req.user?._id;
        const event = await Event_1.Event.findByIdAndUpdate(req.params.id, { $addToSet: { registeredUsers: userId } }, { new: true });
        if (!event) {
            res.status(404).json({ message: 'Event not found' });
            return;
        }
        res.status(200).json(event);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to register for event', error });
    }
};
exports.registerForEvent = registerForEvent;
//# sourceMappingURL=event.controller.js.map