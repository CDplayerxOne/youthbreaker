"use client";

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
    | "charades"
    | "wellness";
  question: string;
};

export default function Content({ params }: { params: { roomId: string } }) {
  const [id, setId] = useState(socket.id);
  const [turn, setTurn] = useState<{ member: string; index: number } | null>(
    null
  );
  const [question, setQuestion] = useState<Questions | null>();

  useEffect(() => {
    function onConnect() {
      console.log("joined");
      socket.emit("joined", params.roomId);
    }

    function onDisconnect() {}

    function onSwitch(message: {
      turn: { member: string; index: number };
      question: Questions;
    }) {
      setTurn(message.turn);
      setQuestion(message.question);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("admin", (message) => {
      setTurn(message.turn);
      setQuestion(message.question);
    });
    socket.on("switch", onSwitch);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("admin", (message) => {
        setTurn(message.turn);
      });
      socket.off("switch", onSwitch);
    };
  }, [params.roomId]);

  return (
    <>
      <p className="text-white absolute top-1 text-lg">
        Room {params.roomId} {socket.id}
      </p>
      <div className="min-h-screen min-w-screen h-screen w-full bg-black flex justify-center items-center font-sans">
        <div className="w-5/6 h-3/4 sm:w-3/4 min-w-96 relative max-w-screen">
          <div className="bg-white max-w-screen h-full w-full min-w-96 rounded-3xl absolute z-20 flex flex-col justify-center">
            <div className="mx-2">
              <h1 className=" text-xl md:text-5xl italic font-semibold text-center">
                {question?.category}
              </h1>
              <h1 className="text-3xl sm:text-5xl lg:text-8xl font-black text-center">
                {question?.category === "charades"
                  ? socket.id === turn?.member
                    ? question.question
                    : null
                  : question?.question}
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
            socket.emit("turn", params.roomId);
          }}
        />
      </div>
    </>
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
