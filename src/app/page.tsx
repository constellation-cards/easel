import { getDecks } from "@constellation-cards/cards";
import { Metadata } from "next";
import { description } from "./helper";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Constellation Cards",
};

export default function Home() {
  return (
    <>
      <h1 className="title">Constellation Cards</h1>

      {getDecks().map((deck) => (
        <section className="hero is-info mb-2" key={deck.uid}>
          <div className="hero-body">
            <h1 className="title">
              <Link href={`/decks/${deck.uid}`}>{deck.name}</Link>
            </h1>
            {description(deck.description)}
          </div>
        </section>
      ))}
    </>
  );
}
