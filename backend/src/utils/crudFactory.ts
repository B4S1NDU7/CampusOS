import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { AuditLog } from '../models/AuditLog';

type CrudOptions = {
  searchable?: string[];
  populate?: string | string[];
  defaultSort?: string;
};

const reservedQueryKeys = new Set(['page', 'limit', 'sort', 'search', 'fields']);

const normalizePagination = (req: Request) => {
  const page = Math.max(parseInt(String(req.query.page || '1'), 10), 1);
  const limit = Math.min(Math.max(parseInt(String(req.query.limit || '10'), 10), 1), 100);
  return { page, limit, skip: (page - 1) * limit };
};

const buildFilter = (req: Request, searchable: string[]) => {
  const filter: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(req.query)) {
    if (!reservedQueryKeys.has(key) && value !== undefined && value !== '') {
      filter[key] = value;
    }
  }

  if (req.query.search && searchable.length > 0) {
    filter.$or = searchable.map((field) => ({
      [field]: { $regex: String(req.query.search), $options: 'i' }
    }));
  }

  return filter;
};

const audit = async (req: Request, action: string, entity: string, entityId?: unknown, before?: unknown, after?: unknown) => {
  try {
    await (AuditLog as any).create({
      actor: (req as any).user?._id,
      action,
      entity,
      entityId,
      before,
      after,
      ip: req.ip,
      userAgent: req.get('user-agent')
    });
  } catch {
    // Audit logging must never break the primary request.
  }
};

export const crudFactory = (model: Model<any>, options: CrudOptions = {}) => {
  const entity = model.modelName;
  const searchable = options.searchable || ['name', 'title', 'code'];
  const defaultSort = options.defaultSort || '-createdAt';

  const withPopulate = (query: any) => {
    if (options.populate) return query.populate(options.populate);
    return query;
  };

  return {
    create: async (req: Request, res: Response): Promise<void> => {
      try {
        const doc = await model.create(req.body);
        await audit(req, 'create', entity, doc._id, undefined, doc.toObject?.() || doc);
        res.status(201).json(doc);
      } catch (error) {
        res.status(500).json({ message: `Failed to create ${entity}`, error });
      }
    },

    getAll: async (req: Request, res: Response): Promise<void> => {
      try {
        const { page, limit, skip } = normalizePagination(req);
        const filter = buildFilter(req, searchable);
        const sort = String(req.query.sort || defaultSort).replaceAll(',', ' ');

        const [data, total] = await Promise.all([
          withPopulate(model.find(filter).sort(sort).skip(skip).limit(limit)),
          model.countDocuments(filter)
        ]);

        res.status(200).json({
          data,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
          }
        });
      } catch (error) {
        res.status(500).json({ message: `Failed to list ${entity}`, error });
      }
    },

    getById: async (req: Request, res: Response): Promise<void> => {
      try {
        const doc = await withPopulate(model.findById(req.params.id));
        if (!doc) {
          res.status(404).json({ message: `${entity} not found` });
          return;
        }
        res.status(200).json(doc);
      } catch (error) {
        res.status(500).json({ message: `Failed to fetch ${entity}`, error });
      }
    },

    update: async (req: Request, res: Response): Promise<void> => {
      try {
        const before = await model.findById(req.params.id).lean();
        const doc = await model.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true
        });
        if (!doc) {
          res.status(404).json({ message: `${entity} not found` });
          return;
        }
        await audit(req, 'update', entity, doc._id, before, doc.toObject?.() || doc);
        res.status(200).json(doc);
      } catch (error) {
        res.status(500).json({ message: `Failed to update ${entity}`, error });
      }
    },

    remove: async (req: Request, res: Response): Promise<void> => {
      try {
        const doc = await model.findByIdAndDelete(req.params.id);
        if (!doc) {
          res.status(404).json({ message: `${entity} not found` });
          return;
        }
        await audit(req, 'delete', entity, doc._id, doc.toObject?.() || doc);
        res.status(200).json({ message: `${entity} deleted successfully` });
      } catch (error) {
        res.status(500).json({ message: `Failed to delete ${entity}`, error });
      }
    }
  };
};
