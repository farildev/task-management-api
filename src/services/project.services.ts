import { ProjectModel } from "../models/project.model";
import { Project } from "../types";

const getAll = async (userId: string, page: number, limit: number, offset: number) => {
  const { rows, total } = await ProjectModel.findAll(userId, limit, offset);
  return {
    data: rows,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getById = async (id: string, userId: string) : Promise<Project> => {
  const project = await ProjectModel.findById(id);
  if (!project) {
      throw new Error('Project not found');
    }
  if (project.owner_id !== userId) {
    throw new Error('Unauthorized');
  }
  return project;
}

const create = async (name: string, description: string | null, userId: string) : Promise<Project> => {
  return await ProjectModel.create(name, description, userId);
}

const update = async (id: string, data: Partial<Project>, userId : string) : Promise<Project> => {
  const project = await ProjectModel.findById(id);

  if(!project){
    throw new Error("Project not found.");
  }

  if (project.owner_id !== userId) {
    throw new Error('Unauthorized');
  }
  const updated = await ProjectModel.update(id, data)
  return updated!
}

const remove = async (id: string, userId: string) : Promise<void> => {
  const project = await ProjectModel.findById(id);
  if(!project){
    throw new Error('Project not found.')
  }
  if (project.owner_id !== userId){
    throw new Error("Unauthorized access"                                                                                                                                                                           );
  }
  await ProjectModel.delete(id);
}

export const ProjectService = {getAll, getById, create, update, remove}
