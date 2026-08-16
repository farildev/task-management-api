import { Request, Response, NextFunction } from 'express';
import { CommentService } from '../services/comment.services';
export const CommentController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const comments = await CommentService.getAll(id);
      res.json({ success: true, data: comments });
    } catch (err) {
      next(err);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const { content } = req.body;
      const comment = await CommentService.create(content, id, req.user!.id);
      res.status(201).json({ success: true, data: comment });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      await CommentService.remove(id, req.user!.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
