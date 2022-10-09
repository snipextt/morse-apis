import { Router } from 'express';
import {
  createComment,
  createPost,
  deleteComment,
  deletePost,
  getCommentsOnPost,
  getPostById,
  likeComment,
  likePost,
  unlikeComment,
  unlikePost,
  updateComment,
  updatePost,
} from '../../controllers/post';

const postRouter = Router();

postRouter.post('/', createPost);
postRouter.delete('/:id', deletePost);
postRouter.get('/:id', getPostById);
postRouter.put('/:id', updatePost);
postRouter.put('/:id/like', likePost);
postRouter.put('/:id/unlike', unlikePost);
postRouter.get('/:id/comments', getCommentsOnPost);
postRouter.post('/:id/comment', createComment);
postRouter.delete('/comment/:id', deleteComment);
postRouter.put('/comment/:id', updateComment);
postRouter.put('/comment/:id/like', likeComment);
postRouter.put('/comment/:id/unlike', unlikeComment);

export default postRouter;
