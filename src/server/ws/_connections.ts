// TODO: Move this logic to redis

import { Socket } from 'socket.io';

export const connections = new Map();
export const serverMeta: { io?: any } = {};
