import { Request, Response } from 'express';
import { User } from '../../db/models/User';

export default async function followUser(req: Request, res: Response) {
  const { user } = req as any;
  const { id } = req.params;
  const userToFollow = await User.findById(id)!;
  if (!userToFollow)
    return res.status(400).json({ message: 'User does not exist' });
  user.followings.push(userToFollow);
  await user.save();
  userToFollow.followers!.push(user._id);
  await userToFollow.save();
  res.json({ message: 'User followed' });
}

export async function unfollowUser(req: Request, res: Response) {
  const { user } = req as any;
  const { id } = req.params;
  const userToUnfollow = await User.findById(id)!;
  if (!userToUnfollow)
    return res.status(400).json({ message: 'User does not exist' });
  user.followings = user.followings.filter(
    (following: any) => following.toString() !== userToUnfollow._id.toString()
  );
  await user.save();
  userToUnfollow.followers = (userToUnfollow.followers as string[])!.filter(
    (follower: string) => follower.toString() !== user._id.toString()
  );
  await userToUnfollow.save();
  res.json({ message: 'User unfollowed' });
}

export async function getFollowers(req: Request, res: Response) {
  const { id } = req.params;
  const user = await User.findById(id, { followers: 1 }).populate('followers')!;
  if (!user) return res.status(400).json({ message: 'User does not exist' });
  res.json({ followers: user.followers });
}

export async function getFollowings(req: Request, res: Response) {
  const { id } = req.params;
  const user = await User.findById(id, { followings: 1 }).populate(
    'followings'
  )!;
  if (!user) return res.status(400).json({ message: 'User does not exist' });
  res.json({ followings: user.followings });
}
