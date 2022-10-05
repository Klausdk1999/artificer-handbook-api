import { Router } from "express";
import { projectController } from "../controllers/projectController";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import { projectSchema } from "../schemas/projectSchemas";

const projectRouter = Router();

projectRouter.post("/",  validateSchemaMiddleware(projectSchema), projectController.insert);
projectRouter.get("/", projectController.get);
projectRouter.get("/:id", projectController.getById);

export default projectRouter;
