import { Request, Response } from 'express';
import { v4 } from 'uuid';
import { Story } from '../../db/models/Stories';
import { putObject } from '../../utils';

export const getStories = async (req: Request, res: Response) => {
  const { user } = req as any;
  const storiesFromUserFollowers = await Story.find({
    user: { $in: user.following },
    createdAt: {
      $gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
    },
  }).populate('user', 'username profilePicture');
  res.json(storiesFromUserFollowers);
};

export const createStory = async (req: Request, res: Response) => {
  const { user } = req as any;
  const { media } = req.files!;
  if (!media) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  const mediaInS3: any = await putObject(
    (media as any).data,
    `${v4()}.${(media as any).mimetype.split('/')[1]}`
  );
  const story = new Story({
    media: mediaInS3.Location,
    user: user._id,
    mediaType: (media as any).mimetype.split('/')[0] || 'text',
  });
  await story.save();
  res.status(201).send({ story });
};
