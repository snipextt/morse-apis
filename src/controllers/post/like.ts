import { Request, Response } from 'express';
import { Notification } from '../../db/models/Notification';
import { Post } from '../../db/models/Post';

export async function likePost(req: Request, res: Response) {
  const { user } = req as any;
  const { id } = req.params;
  const post = await Post.findByIdAndUpdate(id, { $push: { likes: user._id } });
  if (!post) return res.status(400).json({ message: 'Post does not exist' });
  res.json({ post });
  if (user._id.toString() !== post.user.toString()) {
    const notification = new Notification({
      user: post.user,
      message: `${user.name} liked your post`,
      meta: {
        type: 'like',
        post: post._id,
      },
    });
    await notification.save();
  }
}

export async function unlikePost(req: Request, res: Response) {
  const { user } = req as any;
  const { id } = req.params;
  const post = await Post.findByIdAndUpdate(id, { $pull: { likes: user._id } });
  if (!post) return res.status(400).json({ message: 'Post does not exist' });
  res.json({ post });
}

export async function getPopulatedLikedList(req: Request, res: Response) {
  const { id } = req.params;
  // TODO: Complete this query
  const post = await Post.findById(id)
    .select('likes')
    .populate('likes', 'username profilePicture');
  if (!post) return res.status(400).json({ message: 'Post does not exist' });
  res.json({ post });
}
