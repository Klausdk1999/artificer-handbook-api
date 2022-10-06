import { Router } from "express";
import { projectController } from "../controllers/projectController";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import { projectSchema } from "../schemas/projectSchemas";

const projectRouter = Router();

projectRouter.post("/project",  validateSchemaMiddleware(projectSchema), projectController.insert);
projectRouter.get("/project", projectController.get);
projectRouter.get("/project/:id", projectController.getById);

export default projectRouter;
