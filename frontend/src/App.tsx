import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
import SocketProvider from "./contexts/SocketContext";
import Chat from "./components/chat/Chat";

function App() {
  return (
    <div>
      <SocketProvider>
        <Chat />
      </SocketProvider>
      <ToastContainer limit={3} />
    </div>
  );
}

export default App;
