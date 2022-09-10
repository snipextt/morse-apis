import { Router } from 'express';
import {
  deleteProfile,
  getProfile,
  getProfilebById,
  updateProfile,
  uploadProfilePicture,
} from '../../controllers/user/profile';
import followUser, {
  getFollowers,
  getFollowings,
  unfollowUser,
} from '../../controllers/user/social';

const userRouter = Router();

userRouter.get('/profile', getProfile);
userRouter.get('/profile/:id', getProfilebById);
userRouter.put('/profile', updateProfile);
userRouter.delete('/profile', deleteProfile);
userRouter.post('/profile/picture', uploadProfilePicture);
userRouter.post('/follow/:id', followUser);
userRouter.post('unfollow/:id', unfollowUser);
userRouter.get('/followers/:id', getFollowers);
userRouter.get('/followings/:id', getFollowings);

export default userRouter;
