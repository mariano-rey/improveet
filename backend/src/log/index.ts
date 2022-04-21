import { SOCKET_EVENTS } from "../socket";

interface ILog {
  from: string;
  action: SOCKET_EVENTS;
  room: string;
  roomSize: number;
  message?: any;
}

export const Logger = ({ from, message, action, room, roomSize }: ILog) => {
  let log = `FROM: ${from}, ACTION: ${action}, ROOM: ${room}, ROOM_LENGTH: ${roomSize}`;
  if (message) log += `, MESSAGE: ${message}`;
  console.log(log);
};
