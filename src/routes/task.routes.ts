import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createTaskSchema, updateTaskSchema } from '../schemas/task.schema';

const router = Router({ mergeParams: true });

router.use(authMiddleware);

router.get('/', TaskController.getAll);
router.get('/:id', TaskController.getById);
router.post('/', validate(createTaskSchema), TaskController.create);
router.patch('/:id', validate(updateTaskSchema), TaskController.update);
router.delete('/:id', TaskController.delete);

export default router;
