import { Socket, io } from "socket.io-client";
import { log } from "./utils/log";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(process.env.SOCKET_ENDPOINT!, {
  autoConnect: false,
  transports: ["websocket"],
});

socket.onAny((event, ...args) => {
  log("info", `Socket event: ${event}`);
});

export default socket;
