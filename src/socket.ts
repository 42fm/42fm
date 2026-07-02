import { Socket, io } from "socket.io-client";
import { Logger } from "./utils/log";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(process.env.SOCKET_ENDPOINT!, {
  autoConnect: false,
  transports: ["websocket"],
});

const logger = new Logger("Socket");

socket.onAny((event, ..._args) => {
  logger.debug(`Received event: ${event}`);
});

socket.onAnyOutgoing((event, ..._args) => {
  logger.debug(`Sent event: ${event}`);
});

export default socket;
