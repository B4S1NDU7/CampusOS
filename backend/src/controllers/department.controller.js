"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = exports.create = void 0;
const express_1 = require("express");
const Department_1 = require("../models/Department");
const create = async (req, res) => {
    try {
        const doc = await Department_1.Department.create(req.body);
        res.status(201).json(doc);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.create = create;
const getAll = async (req, res) => {
    try {
        const data = await Department_1.Department.find();
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.getAll = getAll;
//# sourceMappingURL=department.controller.js.map