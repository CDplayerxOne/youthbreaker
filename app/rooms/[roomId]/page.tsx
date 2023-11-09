import Content from "./Content";

import { Metadata } from "next";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: {
    roomId: string;
  };
  searchParams: any;
}): Promise<Metadata> {
  return {
    title: `Room ${params.roomId}`,
  };
}

export default function Page({ params }: { params: { roomId: string } }) {
  return (
    <>
      <Content params={params} />
    </>
  );
}
