import { Socket, io } from "socket.io-client";
import { logger } from "./utils/log";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(process.env.SOCKET_ENDPOINT!, {
  autoConnect: false,
  transports: ["websocket"],
});

socket.onAny((event, ...args) => {
  logger.info(`Socket event: ${event}`);
});

export default socket;
