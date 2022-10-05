import { Request, Response } from "express";
import { projectService } from "../services/projectsService";

async function insert(req: Request, res: Response) {

  await projectService.insert(req.body);

  res.sendStatus(201);
}

async function get(req: Request, res: Response) {

  const projects = await projectService.get();

  res.send(projects);
}

async function getById(req: Request, res: Response) {
  const { id } = req.params;

  const project = await projectService.getById(+id);
  res.send(project);
}

export const projectController = {
  insert,
  get,
  getById,
};
