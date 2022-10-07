import config from '../config';
import jwt from 'jsonwebtoken';
import { User } from '../db/models/User';

export default function authSocket(socket: any, next: any) {
  const token = socket.handshake.auth.token;
  try {
    jwt.verify(
      token,
      config.get('jwtSecret'),
      async (err: any, decoded: any) => {
        if (err) {
          return next(new Error('Authentication error'));
        } else {
          const user = await User.findById(decoded.user.id);
          if (!user) return next(new Error('Authentication error'));
          (socket as any).user = user;
          next();
        }
      }
    );
  } catch (error) {
    console.log(error);
    return next(new Error('Authentication error'));
  }
}
