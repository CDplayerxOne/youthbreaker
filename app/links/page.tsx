import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen min-w-screen bg-black flex flex-wrap justify-center">
      <div className="w-full flex justify-center mt-4">
        <h1 className="text-xl md:text-5xl text-white font-extrabold">
          Join Room
        </h1>
      </div>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item) => {
        return (
          <div
            key={item}
            className="w-96 h-48 underline flex justify-center items-center"
          >
            <button className="rounded-lg bg-red-500 h-16 w-32 font-bold">
              <Link
                href={`/rooms/${item}`}
                target="_blank"
                className="text-white"
              >
                Join Room {item}
              </Link>
            </button>
          </div>
        );
      })}
    </div>
  );
}
