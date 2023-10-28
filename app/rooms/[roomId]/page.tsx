"use client";

import styles from "./styles.module.css";
import "./rooms.css";
import { socket } from "../../../utils/socket";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { roomId: string } }) {
  const [id, setId] = useState(socket.id);
  const [turn, setTurn] = useState<{ member: string; index: number } | null>(
    null
  );

  useEffect(() => {
    function onConnect() {
      console.log("joined");
      socket.emit("joined", params.roomId);
      console.log(socket.id, "id");
    }

    function onDisconnect() {}

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("join", (socket) => console.log(socket));
    socket.on("admin", (message) => {
      console.log(message);
      setTurn(message.turn);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("join", (socket) => console.log(socket));
      socket.off("admin", (message) => {
        setTurn(message.turn);
      });
    };
  }, [params.roomId]);

  return (
    // * Which CSS do you like better?
    // ! Module CSS - from styles.module.css
    <div className={styles.leah}>
      {/* ! Global CSS  - from rooms.css*/}
      <h1>{turn?.member}</h1>
      <h1 className="cool">Room: {params.roomId}</h1>
      {/* Or you can always use tailwind!!!! */}
      <p className="text-5xl">WWWW</p>
    </div>
  );
}
