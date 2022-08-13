import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "@typings/index";
import { log } from "./utils/log";
import { getSetting } from "./utils/settings";

// must be string or else it wont work in firefox
const URI = process.env.NODE_ENV === "production" ? "https://twitch-chat-music.herokuapp.com" : "http://localhost:5000";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URI, {
  withCredentials: true,
  autoConnect: false,
  transports: ["websocket"],
});

getSetting("autoConnect") && socket.connect();

socket.onAny((event, ...args) => {
  log("info", `Socket event: ${event}`);
});

export default socket;
