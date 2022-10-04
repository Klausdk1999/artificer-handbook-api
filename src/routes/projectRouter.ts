import { Router } from "express";
import { projectController } from "../controllers/projectController.js";

const projectRouter = Router();

projectRouter.post("/", projectController.insert);
projectRouter.get("/", projectController.get);
projectRouter.get("/:id", projectController.getById);

export default projectRouter;
