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
  const card = getCards().find((card) => card.uid == uid[0]);
  if (!card) {
    throw new Error(`Card not found with UID ${uid[0]}`);
  }
  return (
    <div>
      My Post: <pre>{JSON.stringify(card, null, 2)}</pre>
    </div>
  );
}

export async function generateStaticParams() {
  return Promise.resolve(getCards().map((card) => ({ uid: [card.uid] })));
}
