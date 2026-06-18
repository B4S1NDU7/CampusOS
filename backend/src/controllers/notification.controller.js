"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = exports.create = void 0;
const express_1 = require("express");
const Notification_1 = require("../models/Notification");
const create = async (req, res) => {
    try {
        const doc = await Notification_1.Notification.create(req.body);
        res.status(201).json(doc);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.create = create;
const getAll = async (req, res) => {
    try {
        const data = await Notification_1.Notification.find();
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.getAll = getAll;
//# sourceMappingURL=notification.controller.js.map