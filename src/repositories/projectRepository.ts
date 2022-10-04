import prisma from "../config/database.js";
import { CreateProjectData } from "../services/projectsService.js";

async function create(createProjectData: CreateProjectData) {
  await prisma.project.create({
    data: createProjectData,
  });
}

function getAll() {

  return prisma.project.findMany({
    orderBy: { date: "desc" }
  });
}

function find(id: number) {
  return prisma.project.findUnique({
    where: { id },
  });
}

function findByTitle(title: string) {
  return prisma.project.findUnique({
    where: { title },
  });
}

async function remove(id: number) {
  await prisma.project.delete({
    where: { id },
  });
}

export const projectRepository = {
  create,
  getAll,
  find,
  findByTitle,
  remove,
};
