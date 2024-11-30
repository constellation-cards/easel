import {
  ConstellationCard,
  ConstellationCardFace,
  ConstellationCardUid,
} from "@constellation-cards/cards";
import { cardsMap, description, stacksMap } from "./helper";
import React from "react";
import Link from "next/link";

interface CardViewProps {
  uids: ConstellationCardUid<ConstellationCard>[];
}

function CardViewFace({
  card,
  face,
}: {
  card: ConstellationCard;
  face: ConstellationCardFace;
}) {
  const allStacks = React.useMemo(() => stacksMap(), []);
  return (
    <div className="card">
      <div className="card-content">
        <h2 className="title">
          <Link href={`/cards/${card.uid}`}>{face.name}</Link>
        </h2>
        <h4 className="subtitle">
          <Link href={`/stacks/${card.stack}`}>
            {allStacks[card.stack].name}
          </Link>
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
