import { getStacks } from "@/cards";
import { Metadata } from "next";
import { description } from "../helper";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stacks",
};

export default function DecksPage() {
  return (
    <>
      <h1 className="title">Decks</h1>

      {getStacks().map((stack) => (
        <section className="hero is-info mb-2" key={stack.uid}>
          <div className="hero-body">
            <h1 className="title">
              <Link href={`/stacks/${stack.uid}`}>{stack.name}</Link>
            </h1>
            {description(stack.description)}
          </div>
        </section>
      ))}
    </>
  );
}
