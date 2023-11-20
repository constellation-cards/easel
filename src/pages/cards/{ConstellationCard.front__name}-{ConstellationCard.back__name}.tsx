import React from "react";
import { graphql } from "gatsby";

import type { PageProps } from "gatsby";
import BulmaContainer from "../../components/bulma-container";

const Face = (props: any) => {
  const { card, face } = props;

  return (
    <>
      <div className="has-text-centered">
        <h1 className="title">
          <u>{face.name}</u>
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
    </>
  );
};

const CardPage: React.FC<PageProps> = (props: any) => {
  const card: any = props.data.constellationCard;

  return (
    <BulmaContainer>
      <div className="columns">
        <div className="column">
          <Face card={card} face={card.front} />
        </div>
        <div className="column">
          <Face card={card} face={card.back} />
        </div>
      </div>
    </BulmaContainer>
  );
};

export default CardPage;

export const query = graphql`
  query ($id: String!) {
    constellationCard(id: { eq: $id }) {
      uid
      deck {
        uid
        name
      }
      stack {
        uid
        name
      }
      front {
        name
        description
        prompts
        rule
      }
      back {
        name
        description
        prompts
        rule
      }
    }
  }
`;
