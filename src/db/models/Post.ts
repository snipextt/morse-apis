import { Document, model, Schema } from 'mongoose';
import { IUser } from './User';

export interface IPost extends Document {
  caption: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  likes: IUser[] | string[];
  user: IUser | string;
}

const PostSchema = new Schema<IPost>(
  {
    caption: { type: String, required: true },
    imageUrl: { type: String, required: true },
    likes: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export const Post = model<IPost>('Post', PostSchema);
