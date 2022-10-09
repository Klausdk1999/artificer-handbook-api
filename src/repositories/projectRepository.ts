import prisma from "../config/database";
import { CreateProjectData,CreateFileData } from "../services/projectsService";

async function create(createProjectData: CreateProjectData) {
  let project = await prisma.project.create({
    data: createProjectData,
  });

  return project;
}

async function createFile(CreateFileData:CreateFileData) {
  await prisma.$queryRaw`INSERT INTO files(name,media,"projectId") VALUES (${CreateFileData.name},${CreateFileData.media},${Number(CreateFileData.projectId)});`;
}

async function readFile(id:number) {
  return await prisma.file.findFirst({
    where: { projectId: Number(id) }
  });
}

function getAll() {
  return prisma.project.findMany({
    orderBy: { date: "desc" }
  });
}

function findById(id: number) {
  return prisma.project.findUnique({
    where: { id },
  });
}

function findByUser(id: number) {
  return prisma.$queryRaw`SELECT * FROM projects WHERE "userId"=${id}`;
}

function findByTitle(title: string) {
  return prisma.project.findMany({
    where: { title:title },
  });
}

async function remove(id: number) {
  await prisma.project.delete({
    where: { id },
  });
}

export const projectRepository = {
  create,
  createFile,
  getAll,
  findById,
  findByUser,
  findByTitle,
  remove,
  readFile
};
