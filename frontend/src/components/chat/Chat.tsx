import Inputs from "../ui/Inputs";
import Buttons from "../ui/Buttons";
import { useSocket } from "../../contexts/SocketContext";
import { useEffect, useRef } from "react";
import { SOCKET_EVENTS } from "../../services/SocketClient";

export default () => {
  const refForm = useRef<HTMLFormElement | null>(null);
  const { room, socket: socketClient } = useSocket() || {};

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = (e.target as any)[0].value;
    if (socketClient && room)
      socketClient.emit(SOCKET_EVENTS.CHAT, room, message);
  };

  useEffect(() => {
    const listener = (event: any) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        refForm.current?.dispatchEvent(new Event("submit", { bubbles: true }));
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div style={{ padding: 4 }}>
      <div style={{ width: "100%", height: 300, border: "1px solid" }}></div>
      <form ref={(e) => (refForm.current = e)} onSubmit={handleSubmit}>
        <div style={{ display: "flex", marginTop: 8 }}>
          <Inputs placeholder="Escriba su mensaje aquí" />
          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  );
};
