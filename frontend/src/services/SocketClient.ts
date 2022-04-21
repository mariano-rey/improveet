import { toast } from "react-toastify";
import { io, Socket } from "socket.io-client";

export enum SOCKET_EVENTS {
  CONNECTION = "connection",
  DISCONNECT = "disconnect",
  CHAT = "chat",
  JOIN = "join",
}

class SocketClient {
  #socket: Socket | null = null;

  constructor(_baseUrl: string, _room: string) {
    this.#socket = io(_baseUrl, { transports: ["websocket"] });
    this.suscribe(_room);
  }

  emit = (_event: SOCKET_EVENTS, _room: string, _data: any) => {
    console.log(`EVENTO: ${_event}`, `DATA: ${_data}, ROOM: ${_room}`);
    this.#socket?.emit(_event, { room: _room, msg: _data });
  };

  private suscribe = (_room: string): void => {
    if (this.#socket) {
      this.#socket.on(SOCKET_EVENTS.CONNECTION, () => {
        toast.success("Conectado a la red", {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 2000,
          hideProgressBar: true,
          theme: "colored",
          progress: undefined,
        });
        this.#socket?.emit("join", _room);
      });

      this.#socket.on(SOCKET_EVENTS.CHAT, (_event: any) => {
        console.info("MESSAGE", { _event });
      });
    }
  };
}

export default SocketClient;
