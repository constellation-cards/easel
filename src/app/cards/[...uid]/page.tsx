import CardsView from "@/app/CardsView";
import { getCards } from "@constellation-cards/cards";

export default async function Page({
  params,
}: {
  params: Promise<{
    uid: string[];
  }>;
}) {
  const uid = (await params).uid;
  if (!uid || uid.length < 1) {
    throw new Error("Missing UID");
  }
  return (
    <>
      <CardsView uids={[uid[0]]} />
    </>
  );
}

export async function generateStaticParams() {
  return Promise.resolve(getCards().map((card) => ({ uid: [card.uid] })));
}
