import { Request, Response, NextFunction } from 'express';
import { ProjectService } from '../services/project.services';
import { getPagination } from '../utils/pagination';
export const ProjectController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit, offset } = getPagination(req.query);
    const result = await ProjectService.getAll(req.user!.id, page, limit, offset);
    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
},

  getById: async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const project = await ProjectService.getById(id, req.user!.id);
    res.json({
      success: true,
      data: project,
    });
  } catch (err) {
    next(err);
  }
},

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, description } = req.body;
      const project = await ProjectService.create(name, description ?? null, req.user!.id);
      res.status(201).json({ success: true, data: project });
    } catch (err) {
      next(err);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const project = await ProjectService.update(id, req.body, req.user!.id);
      res.json({ success: true, data: project });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      await ProjectService.remove(id, req.user!.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
