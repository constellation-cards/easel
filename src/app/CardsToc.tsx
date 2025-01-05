import { ConstellationCardUid } from "@/cards";
import { cardsMap, description } from "./helper";
import React from "react";

import styles from "./sticky.module.css";

interface CardViewProps {
  title?: string;
  desc?: string;
  uids: ConstellationCardUid[];
}

export default function CardsToc(props: CardViewProps) {
  const { title, desc, uids } = props;
  const allCards = React.useMemo(() => cardsMap(), []);
  const cards = uids.map((uid) => allCards[uid]);

  return (
    <div className={styles.toctop}>
      {title ? <h1 className="title">{title}</h1> : <></>}
      {desc ? description(desc) : <></>}
      {title || desc ? <hr /> : <></>}
      <ul className={styles.toclist}>
        {cards.map((card) => (
          <li key={card.uid}>
            <a href={`#${card.uid}`}>
              {card.front.name === card.back.name
                ? card.front.name
                : `${card.front.name} / ${card.back.name}`}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
