import { Document, model, Schema } from 'mongoose';

export interface IUser extends Document {
  name?: string;
  email?: string;
  password: string;
  username?: string;
  profilePicture?: string;
  followers?: IUser[] | string[];
  followings?: IUser[] | string[];
  bio?: string;
  city?: string;
  from?: string;
  relationship?: 1 | 2 | 3;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: '',
    },
    followers: {
      type: [Schema.Types.ObjectId],
      default: [],
      ref: 'User',
    },
    followings: {
      type: [Schema.Types.ObjectId],
      default: [],
      ref: 'User',
    },
    bio: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    from: {
      type: String,
      max: 50,
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
  },
  { timestamps: true }
);

export const User = model<IUser>('User', UserSchema);
