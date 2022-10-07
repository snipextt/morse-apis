import { Socket } from 'socket.io';
import { SocketEvents } from '../../constants/socket-io';
import { IMessage, Message } from '../../db/models/Message';
import { Room } from '../../db/models/Room';
import { connections, serverMeta } from './_connections';

interface MessageCreateData {
  message: string;
  roomId?: string;
  userId?: string;
}

export async function createMessage(socket: Socket, data: MessageCreateData) {
  const currentuserId = (socket as any)?.user?.id;
  const { message, roomId, userId } = data;
  if (roomId) {
    const newMessage = new Message({
      message,
      room: roomId,
      user: currentuserId,
      participants: [currentuserId, userId],
      readBy: [currentuserId],
    });
    await newMessage.save();
  } else {
    const channel = new Room({
      participants: [currentuserId, userId],
    });
    await channel.save();
    const newMessage = new Message({
      message,
      room: channel.id,
      user: currentuserId,
      participants: [currentuserId, userId],
      readBy: [currentuserId],
    });
    await newMessage.save();
  }
}

export async function sendMessageCreateEvent(data: IMessage) {
  const participants = data.participants;
  const ioInstance = serverMeta.io;
  participants.forEach((participant) => {
    const id = connections.get(participant._id.toString());
    if (id) ioInstance.to(id).emit(SocketEvents.MESSAGE_CREATE, data);
  });
}

export async function getRoomMessages(socket: Socket, roomId: string) {
  const messages = await Message.find({ room: roomId });
  socket.emit(SocketEvents.GET_ROOM_MESSAGES, messages);
}

export async function messageRead(socket: Socket, messageId: string) {
  const user = (socket as any)?.user?.id;
  const message = await Message.findOneAndUpdate(
    { _id: messageId, readBy: { $ne: user } },
    { $push: { readBy: user } }
  );
  message?.readBy.push(user);
  message?.participants.forEach((participant) => {
    const id = connections.get(participant.toString());
    if (id) serverMeta.io.to(id).emit(SocketEvents.MESSAGE_READ, message);
  });
}
