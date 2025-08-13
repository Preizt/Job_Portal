import { io } from "socket.io-client";
import baseURL from "../services/baseURL";

const SOCKET_URL = baseURL; // backend server URL

// Single socket connection
const socket = io(SOCKET_URL, {
  autoConnect: false, // connect only when needed
});

export const connectSocket = (token) => {
  if (!socket.connected) {
    socket.auth = { token }; // send auth token if needed
    socket.connect();
    console.log("Socket connected");
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
    console.log("Socket disconnected");
  }
};

// Listen for "new job posted"
export const onNewJobPost = (callback) => {
  socket.on("newJobPost", callback);
};

// Listen for "application accepted"
export const onApplicationAccepted = (callback) => {
  socket.on("applicationAccepted", callback);
};

// Listen for "application rejected"
export const onApplicationRejected = (callback) => {
  socket.on("applicationRejected", callback);
};

export default socket;
