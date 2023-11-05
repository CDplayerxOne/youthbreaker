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
    // <div className={styles.leah}>
    //   {/* ! Global CSS  - from rooms.css*/}
    //   <h1>{turn?.member}</h1>
    //   <h1 className="cool">Room: {params.roomId}</h1>
    //   <h1>{question?.question}</h1>
    //   {/* Or you can always use tailwind!!!! */}
    //   <p className="text-5xl">WWWW</p>
    //   <div>
    //   </div>
    // </div>
    <div className="min-h-screen min-w-screen h-screen w-full bg-black flex justify-center items-center font-sans">
      <div className="w-5/6 h-3/4 sm:w-3/4 min-w-96 relative max-w-screen">
        <div className="bg-white max-w-screen h-full w-full min-w-96 rounded-3xl absolute z-20 flex flex-col justify-center">
          <div className="mx-2">
            <h1 className=" text-xl md:text-5xl italic font-semibold text-center">
              {question?.category}
            </h1>
            <h1 className="text-3xl md:text-8xl font-black text-center">
              {question?.question}
            </h1>
          </div>
        </div>
        <div className="bg-red-500 max-w-screen  right-4 bottom-4 sm:right-6 sm:bottom-6 h-full w-full min-w-96 rounded-3xl absolute z-0"></div>
        <div className="bg-blue-600 max-w-screen left-4 top-4 sm:left-6 sm:top-6 h-full w-full min-w-96 rounded-3xl absolute z-10"></div>
      </div>
      <Buttons
        turn={turn?.member}
        id={socket.id}
        changeTurn={() => {
          console.log("switch");
          socket.emit("turn", params.roomId);
        }}
      />
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
      <div className="fixed bottom-0 left-0 w-full mb-4 sm:mb-8 flex justify-center">
        <div className="w-5/6 sm:w-3/4 flex px-16">
          <button
            className="text-white bg-blue-600 px-4 py-2 text-xl rounded-lg"
            onClick={changeTurn}
          >
            Skip
          </button>
          <div className="flex-grow" />
          <button
            className="text-white bg-red-500 px-4 py-2 text-xl rounded-lg"
            onClick={changeTurn}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
  return null;
};
