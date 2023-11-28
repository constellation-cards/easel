import { Link } from "gatsby";
import React from "react";

const Face = (props: any) => {
  const { card, face } = props;

  return (
    <div className="box" style={{ height: "100%" }}>
      <div className="has-text-centered">
        <h1 className="title">
          <Link to={card.cardPath}>
            <u>{face.name}</u>
          </Link>
        </h1>
        <h4 className="subtitle">{card.stack.name}</h4>
      </div>
      <div className="content">
        {face.description.split("\n").map((line: string) => (
          <p>{line}</p>
        ))}
        <ul>
          {face.prompts.map((prompt: any) => (
            <li>{prompt}</li>
          ))}
        </ul>
        <div className="has-text-centered">
          <i>{face.rule}</i>
        </div>
      </div>
    </div>
  );
};

const ConstellationCard = (props: any) => {
  const { card } = props;
  return (
    <div className="columns">
      <div className="column">
        <Face card={card} face={card.front} />
      </div>
      <div className="column">
        <Face card={card} face={card.back} />
      </div>
    </div>
  );
};

export default ConstellationCard;
