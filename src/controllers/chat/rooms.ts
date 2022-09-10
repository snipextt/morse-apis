import { Request, Response } from 'express';
import { Room } from '../../db/models/Room';

export async function getRooms(req: Request, res: Response) {
  const { user } = req as any;
  const rooms = await Room.find({ participants: { $in: user._id } });
  res.json({ rooms });
}

export async function createRoom(req: Request, res: Response) {
  const { user } = req as any;
  const { id } = req.params;
  const room = await Room.findOne({
    $or: [{ participants: [user._id, id] }, { participants: [id, user._id] }],
  });
  if (room) return res.json({ room });
  const newRoom = await Room.create({ participants: [user._id, id] });
  res.json({ room: newRoom });
}
