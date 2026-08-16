import { Router } from 'express';
import { CommentController } from '../controllers/comment.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createCommentSchema } from '../schemas/comment.schema';

const router = Router({ mergeParams: true });

router.use(authMiddleware);

router.get('/', CommentController.getAll);
router.post('/', validate(createCommentSchema), CommentController.create);
router.delete('/:id', CommentController.delete);

export default router;
