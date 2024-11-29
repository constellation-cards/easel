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
  const stack = getDecks().find((deck) => deck.uid == uid[0]);
  if (!stack) {
    throw new Error(`Deck not found with UID ${uid[0]}`);
  }
  return (
    <div>
      My Post: <pre>{JSON.stringify(stack, null, 2)}</pre>
    </div>
  );
}

export async function generateStaticParams() {
  return Promise.resolve(getDecks().map((deck) => ({ uid: [deck.uid] })));
}
