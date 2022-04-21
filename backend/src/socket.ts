import { Server } from "socket.io";
import { Server as ServerHttp } from "http";
import { Logger } from "./log";

interface ISocket {
  httpServer: ServerHttp;
}

type IChat = { room: string; msg: string };

export enum SOCKET_EVENTS {
  CONNECTION = "connection",
  DISCONNECT = "disconnect",
  CHAT = "chat",
  JOIN = "join",
}

const initSocket = ({ httpServer }: ISocket): void => {
  let roomSize = 0;
  const io = new Server(httpServer);

  io.on(SOCKET_EVENTS.CONNECTION, (socket) => {
    socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      console.log(`user disconnected`);
    });

    socket.on(SOCKET_EVENTS.JOIN, (room: string) => {
      socket.join(room);
      roomSize = io.sockets.adapter.rooms.get(room)?.size || 1;
      Logger({ from: socket.id, action: SOCKET_EVENTS.JOIN, room, roomSize });
    });

    socket.on(SOCKET_EVENTS.CHAT, ({ room, msg }: IChat) => {
      Logger({
        from: socket.id,
        action: SOCKET_EVENTS.CHAT,
        message: msg,
        room,
        roomSize,
      });
      
    });
  });
};

export default initSocket;
