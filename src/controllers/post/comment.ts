import { Request, Response } from 'express';
import { Comment, IComment } from '../../db/models/Comment';
import { Notification } from '../../db/models/Notification';
import { Post } from '../../db/models/Post';

export async function createComment(req: Request, res: Response) {
  const { id } = req.params;
  const { user } = req as any;
  const { comment: commentBody } = req.body;
  if (!commentBody)
    return res.status(400).json({ message: 'Comment body is required' });
  const post = await Post.findById(id);
  if (!post) return res.status(400).json({ message: 'Post does not exist' });
  const comment = new Comment({
    user: user._id,
    post: post._id,
    comment: commentBody,
  });
  await comment.save();
  res.status(200).json({ comment });
  if (user._id.toString() !== post.user.toString()) {
    const notification = new Notification({
      user: post.user,
      message: `${user.name} commented on your post`,
      meta: {
        type: 'comment',
        post: post._id,
      },
    });
    await notification.save();
  }
}

export async function getCommentsOnPost(req: Request, res: Response) {
  const { id } = req.params;
  const { user } = req as any;
  let { page, perPage } = req.query;
  if (!page) page = '1';
  if (!perPage) perPage = '100';
  try {
    let userCommentsOnCurrentPost: IComment[] = [];
    if (+page === 1)
      userCommentsOnCurrentPost = await Comment.find({
        user: user._id,
        post: id,
      })
        .populate('user', 'username profilePicture')
        .sort({ createdAt: -1 });

    const comments = await Comment.find({ post: id, user: { $ne: user._id } })
      .populate('user', 'username profilePicture')
      // .skip((+page - 1) * +perPage)
      // .limit(+perPage)
      .sort({ createdAt: -1 });
    // const totalCommentsCount = await Comment.count({ post: id }).count();
    console.log(comments);
    res.status(200).json({
      comments: [...userCommentsOnCurrentPost, ...comments],
    });
  } catch (error) {
    res.status(400).json({ message: 'Invalid query' });
  }
}

export async function deleteComment(req: Request, res: Response) {
  const { id } = req.params;
  const { user } = req as any;
  const comment = await Comment.findOneAndDelete({ _id: id, user: user._id });
  if (!comment)
    return res.status(400).json({ message: 'Unable to delete comment' });
  res.status(200).json({ message: 'Comment deleted' });
}

export async function updateComment(req: Request, res: Response) {
  const { id } = req.params;
  const { user } = req as any;
  const { comment } = req.body;
  if (!comment)
    return res.status(400).json({ message: 'Comment body is required' });
  const commentFromDB = await Comment.findOneAndUpdate(
    { _id: id, user: user._id },
    { comment }
  );
  if (!commentFromDB)
    return res.status(400).json({ message: 'Unable to update comment' });
  res.status(200).json({ comment: commentFromDB });
}

export async function likeComment(req: Request, res: Response) {
  const { id } = req.params;
  const { user } = req as any;
  const comment = await Comment.findByIdAndUpdate(id, {
    $push: { likes: user._id },
  });
  if (!comment)
    return res.status(400).json({ message: 'Comment does not exist' });
  res.json({ comment });
}

export async function unlikeComment(req: Request, res: Response) {
  const { id } = req.params;
  const { user } = req as any;
  const comment = await Comment.findByIdAndUpdate(id, {
    $pull: { likes: user._id },
  });
  if (!comment)
    return res.status(400).json({ message: 'Comment does not exist' });
  res.json({ comment });
}
