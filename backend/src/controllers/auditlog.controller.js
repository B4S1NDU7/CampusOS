"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getById = exports.getAll = exports.create = void 0;
const AuditLog_1 = require("../models/AuditLog");
const crudFactory_1 = require("../utils/crudFactory");
const crud = (0, crudFactory_1.crudFactory)(AuditLog_1.AuditLog, { populate: 'actor', searchable: ['action', 'entity'] });
exports.create = crud.create;
exports.getAll = crud.getAll;
exports.getById = crud.getById;
exports.update = crud.update;
exports.remove = crud.remove;
//# sourceMappingURL=auditlog.controller.js.map