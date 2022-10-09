import { model, Schema } from 'mongoose';
import { IPost } from './Post';
import { IUser } from './User';
import { Notification } from './Notification';

export interface IComment extends Document {
  user: IUser | string;
  comment: string;
  likes: IUser[];
  post: IPost | string;
}

const CommentSchema = new Schema<IComment>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    comment: { type: String, required: true },
    likes: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  },
  {
    timestamps: true,
  }
);

export const Comment = model<IComment>('Comment', CommentSchema);
