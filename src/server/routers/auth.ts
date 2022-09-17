import { Router } from 'express';
import login from '../../controllers/auth/login';
import register from '../../controllers/auth/register';
import {
  checkEmailAvailability,
  checkUsernameAvailability,
} from '../../controllers/auth/validations';

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.post('/check-username', checkUsernameAvailability);
authRouter.post('/check-email', checkEmailAvailability);

export default authRouter;
