import { getDecks, getStacks } from "@constellation-cards/cards";
import Link from "next/link";

export default function Sidebar() {
  const allDecks = getDecks();
  const allStacks = getStacks();

  return (
    <aside className="menu">
      <p className="menu-label">Decks</p>
      <ul className="menu-list">
        {allDecks.map((deck) => (
          <li key={deck.uid}>
            <Link href={`/decks/${deck.uid}`}>{deck.name}</Link>
          </li>
        ))}
      </ul>

      <p className="menu-label">Stacks</p>
      <ul className="menu-list">
        {allStacks.map((stack) => (
          <li key={stack.uid}>
            <Link href={`/stacks/${stack.uid}`}>{stack.name}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
