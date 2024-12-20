import {
  ConstellationCard,
  ConstellationCardFace,
  ConstellationCardUid,
} from "@/cards";
import { cardsMap, decksMap, description, stacksMap } from "./helper";
import React from "react";
import Link from "next/link";

interface CardViewProps {
  uids: ConstellationCardUid[];
}

function CardViewFace({
  card,
  face,
}: {
  card: ConstellationCard;
  face: ConstellationCardFace;
}) {
  const allDecks = React.useMemo(() => decksMap(), []);
  const allStacks = React.useMemo(() => stacksMap(), []);
  return (
    <div className="card">
      <div className="card-content">
        <h2 className="title">
          <Link href={`/cards/${card.uid}`}>{face.name}</Link>
        </h2>
        <h4 className="subtitle">
          <Link href={`/decks/${card.deck}`}>{allDecks[card.deck].name}</Link>
          &nbsp;|&nbsp;
          <Link href={`/stacks/${card.stack}`}>
            {allStacks[card.stack].name}
          </Link>
          {card.quantity > 1 ? ` | x${card.quantity}` : <></>}
        </h4>
        <div className="content">
          <p>{face.flavor}</p>
          {description(face.description || "")}
          <ul>
            {(face.prompts || []).map((prompt) => (
              <li key={prompt}>{prompt}</li>
            ))}
          </ul>
          <em>{face.rule}</em>
        </div>
      </div>
    </div>
  );
}

export default function CardView(props: CardViewProps) {
  const allCards = React.useMemo(() => cardsMap(), []);

  const cards = props.uids.map((uid) => allCards[uid]);

  return cards.map((card) => (
    <div className="columns" key={card.uid}>
      <div className="column">
        <CardViewFace card={card} face={card.front} />
      </div>
      <div className="column">
        <CardViewFace card={card} face={card.back} />
      </div>
    </div>
  ));
}
