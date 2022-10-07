import { Server } from 'socket.io';
import { SocketEvents } from '../../constants/socket-io';
import { connections, serverMeta } from './_connections';
import authSocket from '../../middlewares/auth-socket';
import { getUserRooms } from './room';
import { createMessage, getRoomMessages, messageRead } from './message';

export default function createSocketIoServer(server: any) {
  const io = new Server(server, {
    cors: {
      origin: '*',
      credentials: true,
    },
  });
  (serverMeta as any).io = io;
  io.use(authSocket);
  io.on('connection', (socket: any) => {
    connections.set(socket.user.id, socket.id);
    socket.on(SocketEvents.ALL_ROOMS, () => getUserRooms(socket));
    socket.on(SocketEvents.MESSAGE_CREATE, (data: any) =>
      createMessage(socket, data)
    );
    socket.on(SocketEvents.GET_ROOM_MESSAGES, (data: any) => {
      getRoomMessages(socket, data);
    });
    socket.on(SocketEvents.MESSAGE_READ, (data: any) => {
      messageRead(socket, data);
    });
  });
  io.on('disconnect', (socket: any) => connections.set(socket.user.id, null));
}
