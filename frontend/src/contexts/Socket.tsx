import React, { createContext } from 'react';
import { io } from 'socket.io-client';
import dotenv from 'dotenv';
dotenv.config();

export const socket = io(`ws://${process.env.REACT_APP_SOCKET_END_POINT}`);
export const SocketContext = createContext(null);
