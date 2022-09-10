import { Document, model, Schema } from 'mongoose';
import { IUser } from './User';

export interface IRoom extends Document {
  participants: IUser[];
  attachments: string[];
  isArchived: boolean;
}

const RoomSchema = new Schema<IRoom>(
  {
    participants: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
    attachments: { type: [String], default: [] },
    isArchived: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Room = model<IRoom>('Room', RoomSchema);
