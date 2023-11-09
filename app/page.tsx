"use client";
import { useEffect, useState } from "react";
import { socket } from "../utils/socket";
import "./rooms.css";
import Link from "next/link";

type List = {
  [key: string]: {
    roomId: number;
    members: string[];
  };
};

type Turn = {
  [key: number]: {
    member: string;
    index: number;
  };
};

export default function Home() {
  const [list, setList] = useState<List | null>(null);
  const [open, setOpen] = useState(false);
  const [turn, setTurn] = useState<Turn | null>(null);

  useEffect(() => {
    socket.on("list", (members) => {
      setList(members);
    });
    socket.on("who", (who) => {
      setTurn(who);
    });

    return () => {
      socket.off("list", (members) => setList(members));
      socket.off("who", (who) => {
        setTurn(who);
      });
    };
  }, []);

  useEffect(() => {
    const item = localStorage.getItem("leah");
    if (!item || item !== "false") setOpen(true);
  }, []);

  return (
    <>
      <title>Youthbreaker</title>
      <div className="min-h-screen min-w-screen bg-black items-center overflow-y-scroll">
        <div className="p-4 w-full bg-black fixed z-10">
          <h1 className="text-center text-xl md:text-3xl lg:text-5xl font-bold text-white">
            <span className="text-3xl md:text-5xl lg:text-8xl text-blue-600">
              Youth
            </span>
            <span
              className="
          text-3xl md:text-5xl lg:text-8xl text-red-500"
            >
              Breaker
            </span>
            <br />
            Analysis Room
          </h1>
        </div>
        <div className="flex flex-wrap p-3 justify-center pt-24 md:pt-32 lg:pt-48">
          {list &&
            Object.keys(list).map((i: any) => {
              if (list[i].members.length >= 1)
                return (
                  <div
                    key={i}
                    className="w-full md:w-1/2 lg:w-1/4 text-white border-2 border-red-500 m-4 rounded-lg md:h-96"
                  >
                    <Link href={`/rooms/${i}`} target="_blank">
                      <h2 className="m-2 text-xl font-bold">Room {i}</h2>
                    </Link>
                    {list[i].members.map((client) => (
                      <div
                        className={`w-full hover:bg-gray-900 ${
                          turn
                            ? turn[i] && turn[i].member === client
                              ? "bg-red-500 hover:bg-red-600"
                              : "text-blue-200"
                            : "text-blue-200"
                        } p-2 mouse-pointer`}
                        key={client}
                      >
                        {client}
                      </div>
                    ))}
                  </div>
                );
            })}
        </div>
      </div>
      {open && (
        <div className="absolute top-1/2 left-1/2 bg-purple-400 text-white font-bold flex flex-col p-8 -translate-y-1/2 -translate-x-1/2 border-4 border-red-500">
          <h1>If your name is Leah Huang, Click the Button Below 👇</h1>
          <p className="text-9xl text-center">🐀😍</p>
          <a
            href="https://www.youtube.com/watch?v=-szT7pIz2N4"
            target="_blank"
            className="my-8 border-4 p-4 bg-red-600 text-center"
          >
            <button> Click here Leah! </button>
          </a>
          <button onClick={() => setOpen(false)}>
            {" "}
            <a
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              target="_blank"
            >
              Close
            </a>{" "}
          </button>
        </div>
      )}
    </>
  );
}
