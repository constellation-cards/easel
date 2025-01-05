import CardsView from "@/app/CardsView";
import Columns from "@/app/Columns";
import { cardsMap } from "@/app/helper";
import Sidebar from "@/app/Sidebar";
import { getCards } from "@/cards";
import { Metadata } from "next";
import React from "react";

interface CardPageProps {
  params: Promise<{ uid: string[] }>;
}

export default async function Page({ params }: CardPageProps) {
  const allCards = cardsMap();

  const uid = (await params).uid;
  if (!uid || uid.length < 1) {
    throw new Error("Missing UID");
  }

  const card = allCards[uid[0]];

  return (
    <Columns>
      <Sidebar deckUid={card.deck} stackUid={card.stack} />
      <CardsView uids={[uid[0]]} />
      <></>
    </Columns>
  );
}

export async function generateMetadata({
  params,
}: CardPageProps): Promise<Metadata> {
  const uid = (await params).uid[0];

  const card = getCards().find((card) => card.uid == uid);

  if (card) {
    const title =
      card?.front.name == card?.back.name
        ? card?.front.name
        : `${card?.front.name} / ${card?.back.name}`;
    return {
      title,
      description: card.front.description,
    };
  } else {
    return {
      title: "Unknown Card",
    };
  }
}

export async function generateStaticParams() {
  return Promise.resolve(getCards().map((card) => ({ uid: [card.uid] })));
}
