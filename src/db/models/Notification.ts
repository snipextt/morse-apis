import { Document } from 'mongoose';

export interface INotification extends Document {
  user: string;
  message: string;
  isRead: boolean;
}
