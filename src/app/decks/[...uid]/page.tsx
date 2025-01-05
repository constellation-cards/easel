import CardsToc from "@/app/CardsToc";
import CardsView from "@/app/CardsView";
import Columns from "@/app/Columns";
import Sidebar from "@/app/Sidebar";
import { getDecks } from "@/cards";
import { Metadata } from "next";

interface DeckPageProps {
  params: Promise<{ uid: string[] }>;
}

export default async function Page({ params }: DeckPageProps) {
  const uid = (await params).uid;
  if (!uid || uid.length < 1) {
    throw new Error("Missing UID");
  }
  const deck = getDecks().find((deck) => deck.uid == uid[0]);
  if (!deck) {
    throw new Error(`Deck not found with UID ${uid[0]}`);
  }
  return (
    <Columns>
      <Sidebar deckUid={deck.uid} />
      <CardsView uids={deck.cards} />
      <CardsToc title={deck.name} desc={deck.description} uids={deck.cards} />
    </Columns>
  );
}

export async function generateMetadata({
  params,
}: DeckPageProps): Promise<Metadata> {
  const uid = (await params).uid[0];

  const deck = getDecks().find((deck) => deck.uid == uid);

  if (deck) {
    return {
      title: deck.name,
      description: deck.description,
    };
  } else {
    return {
      title: "Unknown Deck",
    };
  }
}

export async function generateStaticParams() {
  return Promise.resolve(getDecks().map((deck) => ({ uid: [deck.uid] })));
}
