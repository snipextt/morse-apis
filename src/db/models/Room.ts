import { Document, model, Schema } from 'mongoose';
import { IMessage } from './Message';
import { IUser } from './User';

export interface IRoom extends Document {
  participants: IUser[];
  attachments: string[];
  lastTenMessages: IMessage[];
  isArchived: boolean;
}

const RoomSchema = new Schema<IRoom>(
  {
    participants: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
    attachments: { type: [String], default: [] },
    isArchived: { type: Boolean, default: false },
    lastTenMessages: {
      type: [Schema.Types.ObjectId],
      ref: 'Message',
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Room = model<IRoom>('Room', RoomSchema);
