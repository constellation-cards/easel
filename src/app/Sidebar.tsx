import { getDecks, getStacks } from "@/cards";
import Link from "next/link";

import styles from "./sticky.module.css";

interface SidebarProps {
  deckUid?: string;
  stackUid?: string;
}

export default function Sidebar(props: SidebarProps) {
  const { deckUid, stackUid } = props;

  return (
    <div className={styles.toctop}>
      <aside className={`menu ${styles.toclist}`}>
        <p className="menu-label">Decks</p>
        <ul className="menu-list">
          {getDecks().map((deck) => (
            <li key={deck.uid}>
              <Link
                className={deckUid === deck.uid ? "is-active" : ""}
                href={`/decks/${deck.uid}`}
              >
                {deck.name}
              </Link>
            </li>
          ))}
        </ul>
        <p className="menu-label">Stacks</p>
        <ul className="menu-list">
          {getStacks().map((stack) => (
            <li key={stack.uid}>
              <Link
                className={stackUid === stack.uid ? "is-active" : ""}
                href={`/stacks/${stack.uid}`}
              >
                {stack.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
