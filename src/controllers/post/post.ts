import { Request, Response } from 'express';
import { Post } from '../../db/models/Post';
import { putObject } from '../../utils';
import { v4 } from 'uuid';
import { IUser, User } from '../../db/models/User';

export async function createPost(req: Request, res: Response) {
  const { user } = req as any;
  const { caption } = req.body;
  if (!req.files) return res.status(400).json({ message: 'No file provided' });
  const { image } = req.files!;
  if (!image || !caption) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  const imageInS3: any = await putObject(
    (image as any).data,
    `${v4()}.${(image as any).mimetype.split('/')[1]}`
  );
  const post = new Post({
    caption,
    imageUrl: imageInS3.Location,
    user: user._id,
  });
  await post.save();
  res.status(201).send({ post });
}

export async function getPostById(req: Request, res: Response) {
  const { id } = req.params;
  const post = await Post.findById(id).populate(
    'user',
    'username profilePicture name'
  );
  if (!post) return res.status(404).json({ message: 'Post does not exist' });
  let firstPostLikeUser: IUser | null = null;
  if (post.likes.length) {
    firstPostLikeUser = await User.findById(post.likes[0]);
  }
  res.json({ post, firstLike: firstPostLikeUser });
}

export async function updatePost(req: Request, res: Response) {
  const { id } = req.params;
  const { user } = req as any;
  const { title, caption } = req.body;
  const post = await Post.findOneAndUpdate(
    { _id: id, user: user._id },
    { title, caption }
  );
  res.json({ post });
}

export async function deletePost(req: Request, res: Response) {
  const { id } = req.params;
  const { user } = req as any;
  await Post.findOneAndDelete({
    _id: id,
    user: user._id,
  });
  res.json({ message: 'Post deleted' });
}

export async function getPostForUser(req: Request, res: Response) {
  const { id } = req.params;
  const { user } = req as any;
  const posts = await Post.find({ user: id || user._id });
  // const totalPostCount = await Post.find({ user: id || user._id }).count();
  res.json({ posts });
}
