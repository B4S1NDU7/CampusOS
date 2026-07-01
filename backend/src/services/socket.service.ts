import { Server } from 'socket.io';

let io: Server | undefined;

export const setSocketServer = (server: Server) => {
  io = server;
};

export const emitToUser = (userId: string, event: string, payload: unknown) => {
  io?.to(`user:${userId}`).emit(event, payload);
};

export const emitToRole = (role: string, event: string, payload: unknown) => {
  io?.to(`role:${role}`).emit(event, payload);
};

export const emitGlobal = (event: string, payload: unknown) => {
  io?.emit(event, payload);
};
