import prisma from "../config/database";
import { CreateProjectData } from "../services/projectsService";

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

function findById(id: number) {
  return prisma.project.findUnique({
    where: { id },
  });
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
  getAll,
  findById,
  findByTitle,
  remove,
};
