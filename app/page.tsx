function Hello() {
  return <h1>hello</h1>;
}

export default function Home() {
  return (
    <div className="min-h-screen min-w-screen flex justify-center">
      <h1 className="text-5xl text-blue-600">hello</h1>
      <Hello />
    </div>
  );
}
