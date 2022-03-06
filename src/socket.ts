import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "@typings/index";
import { log } from "./utils/log";
import { getSetting } from "./utils/settings";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  process.env.SOCKET_ENDPOINT!,
  {
    withCredentials: true,
    autoConnect: false,
    transports: ["websocket"],
  }
);

getSetting("autoconnect") && socket.connect();

socket.onAny((event, ...args) => {
  log("info", `Socket event: ${event}`);
});

export default socket;
