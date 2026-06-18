"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = exports.create = void 0;
const express_1 = require("express");
const Exam_1 = require("../models/Exam");
const create = async (req, res) => {
    try {
        const doc = await Exam_1.Exam.create(req.body);
        res.status(201).json(doc);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.create = create;
const getAll = async (req, res) => {
    try {
        const data = await Exam_1.Exam.find();
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.getAll = getAll;
//# sourceMappingURL=exam.controller.js.map