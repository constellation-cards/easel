import * as React from "react";
import { Link } from "gatsby";

import { cardName } from "../utility";
import { useState } from "react";

import ConstellationCard from "./constellation-card";

const CardList = (props: any) => {
  const { stacks, byStack, cards } = props;
  const [currentStackUid, setCurrentStackUid] = useState(stacks[0].uid);

  // TODO: menu-list a should have a fallback href to the stacks URL
  return (
    <div className="columns">
      <div className="column is-one-quarter table-of-contents">
        <aside className="menu">
          <ul className="menu-list">
            {stacks.map((stack: any) => (
              <li>
                <a
                  className={stack.uid == currentStackUid ? "is-active" : ""}
                  onClick={() => {
                    setCurrentStackUid(stack.uid);
                    window.scrollTo({ top: 0, left: 0 });
                  }}
                >
                  {stack.name}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
      <div className="column">
        <ul>
          {byStack[currentStackUid].map((card: any) => (
            <ConstellationCard card={card} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CardList;
