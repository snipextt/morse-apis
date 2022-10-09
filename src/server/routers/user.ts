import { Router } from 'express';
import { getPostForUser } from '../../controllers/post';
import {
  deleteProfile,
  getProfile,
  getProfilebById,
  getUserFeed,
  searchUsersByUsername,
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
userRouter.get('/search/:username', searchUsersByUsername);
userRouter.get('/profile/post', getPostForUser);
userRouter.get('/profile/:id/post', getPostForUser);
userRouter.get('/profile/:id', getProfilebById);
userRouter.put('/profile', updateProfile);
userRouter.delete('/profile', deleteProfile);
userRouter.post('/profile/picture', uploadProfilePicture);
userRouter.post('/follow/:id', followUser);
userRouter.post('/unfollow/:id', unfollowUser);
userRouter.get('/followers/:id', getFollowers);
userRouter.get('/followings/:id', getFollowings);
userRouter.get('/feed', getUserFeed);

export default userRouter;
