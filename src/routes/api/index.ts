import { Router } from 'express';
import { thoughtsRouter } from './thoughts-routes.js';
import { usersRouter } from './users-routes.js';


const router = Router();

router.use('/thoughts', thoughtsRouter);
router.use('/users', usersRouter);

export default router;
