import { Server } from 'socket.io';
import { url } from '../config/const.js';

let io;
export const socketConnection = (server) => {
  io = new Server(server, {
    cors: {
      origin: url,
      credentials: true,
      methods: ['GET', 'POST']
    }
  });
};

export const verifySignIn = (socketId, email, key) => io.to(socketId).emit('verifySignIn', { email, key });

export const isSocketIdConnected = async (socketId) => {
  let sockets = await io.in(socketId).fetchSockets();
  if (sockets.length > 0) return true;
  return false;
};
