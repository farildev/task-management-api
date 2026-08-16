import { Request, Response, NextFunction } from 'express';
import { TaskService } from '../services/task.services';
export const TaskController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const tasks = await TaskService.getAll(id, req.user!.id);
      res.json({ success: true, data: tasks });
    } catch (err) {
      next(err);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const task = await TaskService.getById(id);
      res.json({ success: true, data: task });
    } catch (err) {
      next(err);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const { title, description, assignedTo, priority, dueDate } = req.body;
      const task = await TaskService.create(
        title,
        description ?? null,
        id,
        req.user!.id,
        assignedTo ?? null,
        priority,
        dueDate ?? null
      );
      res.status(201).json({ success: true, data: task });
    } catch (err) {
      next(err);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const task = await TaskService.update(id, req.body, req.user!.id);
      res.json({ success: true, data: task });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      await TaskService.remove(id, req.user!.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
