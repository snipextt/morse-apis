import { Router } from 'express';
import auth from '../../middlewares/auth';
import authRouter from './auth';
import postRouter from './post';
import storyRouter from './story';
import userRouter from './user';

const baseRouter = Router();

baseRouter.use('/auth', authRouter);
baseRouter.use('/user', auth, userRouter);
baseRouter.use('/post', auth, postRouter);
baseRouter.use('/story', auth, storyRouter);

export default baseRouter;
