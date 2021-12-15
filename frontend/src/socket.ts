import { io } from 'socket.io-client';
import dotenv from 'dotenv';
dotenv.config();

const socket = io(`ws://${process.env.REACT_APP_SOCKET_END_POINT}`);
console.log(`ws://${process.env.REACT_APP_SOCKET_END_POINT}`);
socket.on('connect', () => {
  console.log('Socket ready');
});

export { socket };
