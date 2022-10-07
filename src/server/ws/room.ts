import { Socket } from 'socket.io';
import { SocketEvents } from '../../constants/socket-io';
import { Message } from '../../db/models/Message';
import { Room } from '../../db/models/Room';
import { getUser } from '../../utils/getUser';

export async function getUserRooms(socket: Socket) {
  const user = await getUser(socket);
  const userRooms = await Room.find(
    { participants: user.id },
    {
      lastTenMessages: { $slice: -10 },
    }
  )
    .populate('participants')
    .populate('lastTenMessages')
    .exec();
  socket.emit(SocketEvents.ALL_ROOMS, userRooms);
}

export async function markRoomAsRead(socket: Socket, roomId: string) {
  const user = await getUser(socket);
  const room = await Room.findById(roomId);
  await Message.updateMany(
    {
      room: room,
      readBy: { $ne: user.id },
    },
    {
      $push: { readBy: user.id },
    }
  );
  socket.emit(SocketEvents.ROOM_READ, roomId);
}
