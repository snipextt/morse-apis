import { Router } from 'express';
import { createStory, getStories } from '../../controllers/story';

const storyRouter = Router();

storyRouter.get('/', getStories);
storyRouter.post('/', createStory);

export default storyRouter;
