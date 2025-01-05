import CardsToc from "@/app/CardsToc";
import CardsView from "@/app/CardsView";
import Columns from "@/app/Columns";
import Sidebar from "@/app/Sidebar";
import { getStacks } from "@/cards";
import { Metadata } from "next";

interface StackPageProps {
  params: Promise<{
    uid: string[];
  }>;
}

export default async function Page({ params }: StackPageProps) {
  const uid = (await params).uid;
  if (!uid || uid.length < 1) {
    throw new Error("Missing UID");
  }
  const stack = getStacks().find((stack) => stack.uid == uid[0]);
  if (!stack) {
    throw new Error(`Stack not found with UID ${uid[0]}`);
  }
  return (
    <Columns>
      <Sidebar stackUid={stack.uid} />
      <CardsView uids={stack.cards} />
      <CardsToc
        title={stack.name}
        desc={stack.description}
        uids={stack.cards}
      />
    </Columns>
  );
}

export async function generateMetadata({
  params,
}: StackPageProps): Promise<Metadata> {
  const uid = (await params).uid[0];

  const stack = getStacks().find((stack) => stack.uid == uid);

  if (stack) {
    return {
      title: stack.name,
      description: stack.description,
    };
  } else {
    return {
      title: "Unknown Stack",
    };
  }
}

export async function generateStaticParams() {
  return Promise.resolve(getStacks().map((stack) => ({ uid: [stack.uid] })));
}
