"use client";

import styles from "./styles.module.css";
import "./rooms.css";
import { socket } from "../../../utils/socket";
import { useEffect, useState } from "react";

type Questions = {
  type: "normal" | "charades";
  category?:
    | "discovery"
    | "innovation"
    | "impact"
    | "inclusion"
    | "teamwork"
    | "fun"
    | "wellness";
  question: string;
};

export default function Page({ params }: { params: { roomId: string } }) {
  const [id, setId] = useState(socket.id);
  const [turn, setTurn] = useState<{ member: string; index: number } | null>(
    null
  );
  const [question, setQuestion] = useState<Questions | null>();

  useEffect(() => {
    function onConnect() {
      console.log("joined");
      socket.emit("joined", params.roomId);
      console.log(socket.id, "id");
    }

    function onDisconnect() {}

    function onSwitch(message: {
      turn: { member: string; index: number };
      question: Questions;
    }) {
      console.log(message, "ok");
      setTurn(message.turn);
      setQuestion(message.question);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("join", (socket) => console.log(socket));
    socket.on("admin", (message) => {
      console.log(message);
      setTurn(message.turn);
      setQuestion(message.question);
    });
    socket.on("switch", onSwitch);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("join", (socket) => console.log(socket));
      socket.off("admin", (message) => {
        setTurn(message.turn);
      });
      socket.off("switch", onSwitch);
    };
  }, [params.roomId]);

  return (
    // * Which CSS do you like better?
    // ! Module CSS - from styles.module.css
    <div className={styles.leah}>
      {/* ! Global CSS  - from rooms.css*/}
      <h1>{turn?.member}</h1>
      <h1 className="cool">Room: {params.roomId}</h1>
      <h1>{question?.question}</h1>
      {/* Or you can always use tailwind!!!! */}
      <p className="text-5xl">WWWW</p>
      <div>
        <Buttons
          turn={turn?.member}
          id={socket.id}
          changeTurn={() => {
            console.log("switch");
            socket.emit("turn", params.roomId);
          }}
        />
      </div>
    </div>
  );
}

const Buttons = ({
  turn,
  id,
  changeTurn,
}: {
  turn: string | undefined | null;
  id: string | undefined | null;
  changeTurn: () => void;
}) => {
  console.log(turn, id);
  if (!turn || !id) return null;
  if (turn === id) {
    return (
      <>
        <button
          className="border-blue-300 p-3 m-4 border-2"
          onClick={changeTurn}
        >
          Skip
        </button>
        <button
          className="border-blue-300 p-3 border-2 m-4"
          onClick={changeTurn}
        >
          Next
        </button>
      </>
    );
  }
  return null;
};
