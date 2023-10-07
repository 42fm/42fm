import socket from "@/socket";
import { useState } from "react";
import useEffectOnce from "./useEffectOnce";

function useIsConnected(): boolean {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffectOnce(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  });

  return isConnected;
}

export default useIsConnected;
