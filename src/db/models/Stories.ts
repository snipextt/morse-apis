import { Document, model, Schema } from 'mongoose';
import { IUser } from './User';

export interface Story extends Document {
  user: IUser;
  media: string;
  mediaType: 'image' | 'video' | 'text';
  createdAt: Date;
  updatedAt: Date;
  backgroundColor: string;
  caption: string;
}

const storySchema = new Schema<Story>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    media: { type: String, required: true },
    mediaType: { type: String, required: true },
    backgroundColor: { type: String },
    caption: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Story = model<Story>('Story', storySchema);
