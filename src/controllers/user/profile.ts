import { Request, Response } from 'express';
import { Comment } from '../../db/models/Comment';
import { Post } from '../../db/models/Post';
import { User } from '../../db/models/User';
import { putObject } from '../../utils';

export async function getProfile(req: Request, res: Response) {
  const { user } = req as any;
  res.json({ user });
}

export async function getProfilebById(req: Request, res: Response) {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return res.status(400).json({ message: 'User does not exist' });
  res.json({ user });
}

export async function updateProfile(req: Request, res: Response) {
  const { user } = req as any;
  const userFromDB = await User.findByIdAndUpdate(user.id, req.body);
  res.json({ user: userFromDB });
}

export async function deleteProfile(req: Request, res: Response) {
  const { user } = req as any;
  await User.findByIdAndDelete(user.id);
  await Post.deleteMany({ user: user.id });
  await Comment.deleteMany({ user: user.id });
  res.json({ message: 'User deleted' });
}

export async function uploadProfilePicture(req: Request, res: Response) {
  const { user } = req as any;
  if (!req.files)
    return res.status(400).json({ message: 'No files were uploaded' });
  if (!req.files.picture)
    return res.status(400).json({ message: 'No picture was uploaded' });

  const picture = req.files.picture;
  const uploadRes: any = await putObject(
    (picture as any).data,
    `${user.id}-profile-picture.${(picture as any).mimetype.split('/')[1]}`
  );
  user.profilePicture = uploadRes.Location;
  await user.save();
  res.status(200).end();
}
