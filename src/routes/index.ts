import { Router } from "express";
import authRouter from "./auth.routes";
import projectsRouter from "./project.routes";
import tasksRouter from "./task.routes"
import commentsRouter from "./comments.routes";
const router = Router();

router.use('/auth', authRouter);
router.use('/projects', projectsRouter);
router.use('/projects/:projectId/tasks', tasksRouter);
router.use('/tasks/:taskId/comments', commentsRouter);

export default router;
