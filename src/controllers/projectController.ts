import { Request, Response } from "express";
import { projectSchema } from "../schemas/projectSchemas.js";
import { projectService } from "../services/projectsService.js";
import { wrongSchemaError } from "../utils/errorUtils.js";

async function insert(req: Request, res: Response) {
  const validation = projectSchema.validate(req.body);
  if (validation.error) {
    throw wrongSchemaError();
  }

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
