import CardsView from "@/app/CardsView";
import { getDecks } from "@constellation-cards/cards";

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
  const deck = getDecks().find((deck) => deck.uid == uid[0]);
  if (!deck) {
    throw new Error(`Deck not found with UID ${uid[0]}`);
  }
  return (
    <>
      <h1 className="title">{deck.name}</h1>
      <CardsView uids={deck.cards} />
    </>
  );
}

export async function generateStaticParams() {
  return Promise.resolve(getDecks().map((deck) => ({ uid: [deck.uid] })));
}
