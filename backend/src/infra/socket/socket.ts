import { Server } from "socket.io";
import http from "http";

let io: Server;

export function initSocket(server: http.Server) {
  io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("Frontend conectado:", socket.id);
  });
}

export function emitNotification(message: string) {
  if (io) {
    io.emit("notification", message);
  }
}
