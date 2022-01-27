import { io } from 'socket.io-client';
import dotenv from 'dotenv';
dotenv.config();

const socket = io(`ws://${process.env.REACT_APP_SOCKET_END_POINT}`);

export const sendMessage = <T>(eventType: string, message: T) => {
  socket.emit(eventType, message);
};

socket.on('connect', () => {
  console.log('connect');
});
socket.on('disconnect', () => {
  console.log('disconnect');
});
socket.onAny((eventName, ...args) => {
  console.log(eventName, args);
});
export default socket;
