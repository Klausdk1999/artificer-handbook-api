import { Project } from "@prisma/client";
import { projectRepository } from "../repositories/projectRepository";
import { notFoundError } from "../utils/errorUtils.js";

export type CreateProjectData = Omit<Project, "id" | "date">;

async function insert(createProjectData: CreateProjectData) {
  const existingproject = await projectRepository.findByTitle(
    createProjectData.title
  );
  if (existingproject){
    createProjectData.title+="(1)";
  }
  await projectRepository.create(createProjectData);
}

async function getById(id: number) {
  const project = await projectRepository.find(id);
  if (!project) throw notFoundError();

  return project;
}

async function get() {
  return projectRepository.getAll();
}

export const projectService = {
  insert,
  get,
  getById
};
