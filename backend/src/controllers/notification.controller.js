"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markRead = exports.remove = exports.update = exports.getById = exports.getAll = exports.create = void 0;
const Notification_1 = require("../models/Notification");
const crudFactory_1 = require("../utils/crudFactory");
const socket_service_1 = require("../services/socket.service");
const crud = (0, crudFactory_1.crudFactory)(Notification_1.Notification, { populate: 'recipient', searchable: ['title', 'message', 'type'] });
const create = async (req, res) => {
    try {
        const doc = await Notification_1.Notification.create(req.body);
        if (doc.recipient)
            (0, socket_service_1.emitToUser)(String(doc.recipient), 'notification:new', doc);
        for (const role of (doc.audienceRoles || []))
            (0, socket_service_1.emitToRole)(role, 'notification:new', doc);
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
const markRead = async (req, res) => {
    try {
        const notification = await Notification_1.Notification.findByIdAndUpdate(req.params.id, { readAt: new Date() }, { new: true });
        if (!notification) {
            res.status(404).json({ message: 'Notification not found' });
            return;
        }
        res.status(200).json(notification);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to mark notification read', error });
    }
};
exports.markRead = markRead;
//# sourceMappingURL=notification.controller.js.map