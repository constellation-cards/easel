import CardsView from "@/app/CardsView";
import { description } from "@/app/helper";
import { getStacks } from "@constellation-cards/cards";

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
  const stack = getStacks().find((stack) => stack.uid == uid[0]);
  if (!stack) {
    throw new Error(`Stack not found with UID ${uid[0]}`);
  }
  return (
    <>
      <section className="hero is-info">
        <div className="hero-body">
          <h1 className="title">{stack.name}</h1>
          {description(stack.description)}
        </div>
      </section>
      <CardsView uids={stack.cards} />
    </>
  );
}

export async function generateStaticParams() {
  return Promise.resolve(getStacks().map((stack) => ({ uid: [stack.uid] })));
}
