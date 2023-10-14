"use client";
import { useEffect, useState } from "react";
import { socket } from "../utils/socket";

export default function Home() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [id, setId] = useState(socket.id);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("join", (socket) => console.log(socket));

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <div className="min-h-screen min-w-screen flex justify-center bg-black items-center">
      <div>
        <div className="w-1/2 h-auto bg-white flex justify-center items-center rounded-lg">
          <div>
            <div className="w-full flex justify-center">
              <p className="italic font-bold">Innovation</p>
            </div>
            <p className="mx-8 font-bold">
              How would you deflate a 10 ft tall rubber duck in the shortest
              amount of time?
            </p>
          </div>
        </div>
        <div className="w-1/2">
          <button className=""></button>
          <button></button>
        </div>
      </div>
    </div>
  );
}
