import { CommentModel } from '../models/comment.model';
import { Comment } from '../types';

const getAll = async (taskId: string): Promise<Comment[]> => {
  return await CommentModel.findAll(taskId);
};

const create = async (content: string, taskId: string, userId: string): Promise<Comment> => {
  return await CommentModel.create(content, taskId, userId);
};

const remove = async (id: string, userId: string): Promise<void> => {
  const comment = await CommentModel.findById(id);
  if (!comment) throw new Error('Comment not found');
  if (comment.user_id !== userId) throw new Error('Unauthorized');
  await CommentModel.delete(id);
};

export const CommentService = {
  getAll,
  create,
  remove,
};
