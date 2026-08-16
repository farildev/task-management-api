import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get('/', TaskController.getAll);
router.get('/:id', TaskController.getById);
router.post('/', TaskController.create);
router.patch('/:id', TaskController.update);
router.delete('/:id', TaskController.delete);

export default router;
