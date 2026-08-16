import { TaskModel } from '../models/task.model';
import { ProjectModel } from '../models/project.model';
import { Task } from '../types';

const getAll = async (projectId: string, userId: string): Promise<Task[]> => {
  const project = await ProjectModel.findById(projectId);
  if (!project) throw new Error('Project not found');
  if (project.owner_id !== userId) throw new Error('Unauthorized');
  return await TaskModel.findAll(projectId);
};

const getById = async (id: string): Promise<Task> => {
  const task = await TaskModel.findById(id);
  if (!task) throw new Error('Task not found');
  return task;
};

const create = async (
  title: string,
  description: string | null,
  projectId: string,
  createdBy: string,
  assignedTo: string | null,
  priority: string = 'medium',
  dueDate: Date | null = null
): Promise<Task> => {
  const project = await ProjectModel.findById(projectId);
  if (!project) throw new Error('Project not found');
  return await TaskModel.create(title, description, projectId, createdBy, assignedTo, priority, dueDate);
};

const update = async (id: string, data: Partial<Task>, userId: string): Promise<Task> => {
  const task = await TaskModel.findById(id);
  if (!task) throw new Error('Task not found');
  const project = await ProjectModel.findById(task.project_id);
  if (!project) throw new Error('Project not found');
  if (project.owner_id !== userId && task.assigned_to !== userId) {
    throw new Error('Unauthorized');
  }
  const updated = await TaskModel.update(id, data);
  return updated!;
};

const remove = async (id: string, userId: string): Promise<void> => {
  const task = await TaskModel.findById(id);
  if (!task) throw new Error('Task not found');
  const project = await ProjectModel.findById(task.project_id);
  if (!project) throw new Error('Project not found');
  if (project.owner_id !== userId) throw new Error('Unauthorized');
  await TaskModel.delete(id);
};

export const TaskService = {
  getAll,
  getById,
  create,
  update,
  remove,
};
