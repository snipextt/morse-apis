import { Router } from 'express';
import auth from '../../middlewares/auth';
import authRouter from './auth';
import postRouter from './post';
import userRouter from './user';

const baseRouter = Router();

baseRouter.use('/auth', authRouter);
baseRouter.use('/user', auth, userRouter);
baseRouter.use('/post', auth, postRouter);

export default baseRouter;
