import { Document, model, Schema } from 'mongoose';
import { IRoom } from './Room';
import { IUser } from './User';

interface IMessage extends Document {
  user: IUser;
  message: string;
  likes: IUser[];
  room: IRoom;
}

export const MessageSchema = new Schema<IMessage>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  likes: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
  room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
});

export const Message = model<IMessage>('Message', MessageSchema);
