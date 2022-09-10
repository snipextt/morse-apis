import express from 'express';
import cors from 'cors';
import baseRouter from './routers';
import fileUpload from 'express-fileupload';
import { uploadProfilePicture } from '../controllers/user/profile';
import auth from '../middlewares/auth';
import { likeComment } from '../controllers/post';

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use('/api', baseRouter);
// app.use('/', auth, likeComment);

export default app;
