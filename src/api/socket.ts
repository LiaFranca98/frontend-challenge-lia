import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_WS_URL || 'ws://localhost:5174';

export const socket = io(URL, {
  autoConnect: false, // We'll connect manually when needed
  transports: ['websocket'], // Force WebSocket so MSW can intercept it
});

export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};
