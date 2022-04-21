import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import SocketClient from "../services/SocketClient";
import config from "../utils/config";

interface IProvider {
  children: ReactNode;
}

type ISocketContext = {
  socket: SocketClient;
  room: string;
} | null;

const SocketContext = createContext<ISocketContext>(null);

const SocketProvider = ({ children }: IProvider): React.ReactElement => {
  const [socket, setSocket] = useState<ISocketContext>(null);

  useEffect(() => {
    if (!socket)
      setSocket({
        socket: new SocketClient(config.BASE_URL, "Sala 1"),
        room: "Sala 1",
      });
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = (): ISocketContext => {
  return useContext(SocketContext)!!;
};

export default SocketProvider;
