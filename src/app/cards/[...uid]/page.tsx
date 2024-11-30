import CardsView from "@/app/CardsView";
import { getCards } from "@constellation-cards/cards";
import { Metadata } from "next";

interface CardPageProps {
  params: Promise<{ uid: string[] }>;
}

export default async function Page({ params }: CardPageProps) {
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
