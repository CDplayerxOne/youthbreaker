export default function Birthday() {
  return (
    <div className="bg-black min-h-screen min-w-screen">
      <h1 className="text-white text-9xl font-black">
        HAPPY BIRTHDAY TO
        <br />
        <input type="text" className="bg-black text-orange-400" />
        <pre>
          From: <input type="text" className="bg-black" />
        </pre>
        <br />
        Date: <input className="bg-black text-teal-300" />
      </h1>
      <h1 className="text-white text-3xl">
        Also Happy Birthday to <input type="text" className="bg-black" />
      </h1>
    </div>
  );
}
