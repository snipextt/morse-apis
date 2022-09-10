import connect from './db';
import app from './server';
import dotenv from 'dotenv';

dotenv.config();

connect().then(() => {
  app.listen(8000);
});
