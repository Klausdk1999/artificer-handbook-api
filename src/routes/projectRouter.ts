import { Router } from "express";
import { projectController } from "../controllers/projectController";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import { projectSchema } from "../schemas/projectSchemas";

const projectRouter = Router();
//validateSchemaMiddleware(projectSchema)
projectRouter.post("/project", projectController.insert);
projectRouter.get("/projects", projectController.get);
projectRouter.get("/projects/:id", projectController.getByUser);
projectRouter.get("/project/:id", projectController.getById);
projectRouter.post('/upload/:id', projectController.fileSave);
projectRouter.get("/project/file/:id", projectController.sendFile);

export default projectRouter;
