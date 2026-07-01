import { Socket, io } from "socket.io-client";
import { Logger } from "./utils/log";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(process.env.SOCKET_ENDPOINT!, {
  autoConnect: false,
  transports: ["websocket"],
});

const logger = new Logger("WS");

socket.onAny((event, ...args) => {
  logger.debug(`Event: ${event}`);
});

export default socket;
