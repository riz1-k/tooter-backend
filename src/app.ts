import express from 'express';
import { Server, type Socket } from 'socket.io';

import mainLoader from './loaders';
import env from './loaders/env';
import logger from './utils/logger';

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

console.clear();
const spinner = ['|', '/', '-', '\\'];
let i = 0;
const interval = setInterval(() => {
  process.stdout.write(`\r${spinner[i++ % spinner.length]} Initializing...`);
}, 100);

async function initialize() {
  const app = express();
  await mainLoader(app);

  const server = app.listen(env.PORT, () => {
    clearInterval(interval);
    logger.info(`🚀 Server is running on port ${env.PORT}`);
  });

  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket: Socket) => {
    logger.info(`Socket connected: ${socket.id}`);

    socket.on(
      'send_message',
      (data: { message: string; sender: string; date: string }) => {
        socket.broadcast.emit('receive_message', data);
        socket.emit('receive_message', data);
      }
    );

    socket.on('typing', (data: { sender: string }) => {
      socket.broadcast.emit('typing', data);
      console.log(data);
    });
  });
}

void initialize();
