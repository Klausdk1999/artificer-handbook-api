import { Project , File } from "@prisma/client";
import { projectRepository } from "../repositories/projectRepository";
import { notFoundError } from "../utils/errorUtils";

export type CreateProjectData = Omit<Project, "id" | "date">;
export type CreateFileData = Omit<File, "id">;

async function insert(createProjectData: CreateProjectData) {
  const existingproject = await projectRepository.findByTitle(
    createProjectData.title
  );
  if (existingproject.length>0){
    createProjectData.title+="(1)";
  }
  return await projectRepository.create(createProjectData);
}

async function getById(id: number) {
  const project = await projectRepository.findById(id);
  if (!project) throw notFoundError();

  return project;
}

async function get() {
  return projectRepository.getAll();
}

async function saveFile(filepath:string,id:number,name:string) {
  let data:CreateFileData = {
    name:name,media:filepath,projectId:id
  }

  await projectRepository.createFile(data);
  
}

async function getFile(id:number) {

  return await projectRepository.readFile(id);
  
}

export const projectService = {
  insert,
  get,
  getById,
  saveFile,
  getFile
};
