import { Router } from 'express';
import { CommentController } from '../controllers/comment.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router({ mergeParams: true });

router.use(authMiddleware);

router.get('/', CommentController.getAll);
router.post('/', CommentController.create);
router.delete('/:id', CommentController.delete);

export default router;
