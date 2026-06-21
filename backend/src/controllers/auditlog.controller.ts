import { Request, Response } from 'express';
import { AuditLog } from '../models/AuditLog';
import { crudFactory } from '../utils/crudFactory';

const crud = crudFactory(AuditLog, { populate: 'actor', searchable: ['action', 'entity'] });

export const create = crud.create;
export const getAll = crud.getAll;
export const getById = crud.getById;
export const update = crud.update;
export const remove = crud.remove;
