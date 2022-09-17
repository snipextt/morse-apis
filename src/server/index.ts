import express from 'express';
import cors from 'cors';
import baseRouter from './routers';
import fileUpload from 'express-fileupload';

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use('/api', baseRouter);

export default app;
