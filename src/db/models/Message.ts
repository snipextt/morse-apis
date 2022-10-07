import { Document, model, Schema } from 'mongoose';
import { sendMessageCreateEvent } from '../../server/ws/message';
import { IRoom, Room } from './Room';
import { IUser, User } from './User';

export interface IMessage extends Document {
  user: IUser;
  message: string;
  likes: IUser[];
  room: IRoom;
  participants: IUser[];
  readBy: IUser[];
}

export const MessageSchema = new Schema<IMessage>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    likes: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
    room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    participants: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
    readBy: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
  },
  {
    timestamps: true,
  }
);

// TODO: write a cron job to clean up old messages
MessageSchema.post('save', async (doc: IMessage) => {
  const room = await Room.findOneAndUpdate(
    { _id: doc.room },
    {
      $push: { lastTenMessages: doc._id },
    }
  );
});

export const Message = model<IMessage>('Message', MessageSchema);

Message.watch().on('change', async (data) => {
  if (data.operationType === 'insert') {
    const documentCreated = data.fullDocument;
    const participants = await User.find({
      _id: { $in: documentCreated.participants },
    });
    documentCreated.participants = participants;
    sendMessageCreateEvent(documentCreated);
  }
});
