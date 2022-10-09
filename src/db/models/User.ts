import { Document, model, Schema } from 'mongoose';
import { onBoardingState } from '../../constants/onboarding';

export interface IUser extends Document {
  name?: string;
  email?: string;
  password: string;
  username?: string;
  profilePicture?: string;
  followers?: IUser[] | string[];
  followings?: IUser[] | string[];
  bio?: string;
  phoneNumber?: string;
  college?: string;
  branch?: string;
  currentAcademicStatus?: string;
  registrationNumber?: string;
  gender?: string;
  dob?: Date;
  onBoardingState: onBoardingState;
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
    onBoardingState: {
      type: String,
      enum: Object.keys(onBoardingState),
      default: onBoardingState.onBoarding,
    },
    phoneNumber: {
      type: String,
    },
    college: {
      type: String,
    },
    branch: {
      type: String,
    },
    currentAcademicStatus: {
      type: String,
    },
    registrationNumber: {
      type: String,
    },
    gender: {
      type: String,
    },
    dob: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const User = model<IUser>('User', UserSchema);
