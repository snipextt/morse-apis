import { Document, model, Schema } from 'mongoose';
import { IUser } from './User';

interface NotificationMeta {
  type: string;
  post?: string;
}
export interface INotification extends Document {
  user: IUser;
  message: string;
  isRead: boolean;
  meta: NotificationMeta;
}

const NotificationSchema = new Schema<INotification>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  meta: { type: Object, required: true },
});

export const Notification = model<INotification>(
  'Notification',
  NotificationSchema
);
