import connect from './db';
import app from './server';
import dotenv from 'dotenv';

dotenv.config();

connect().then(() => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
});
