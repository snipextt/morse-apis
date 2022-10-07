import express from 'express';
import cors from 'cors';
import baseRouter from './routers';
import fileUpload from 'express-fileupload';
import { createServer } from 'http';
import createSocketIoServer from './ws';

const app = express();
const server = createServer(app);

createSocketIoServer(server);

app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use('/api', baseRouter);

export default server;
