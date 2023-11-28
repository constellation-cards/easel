import React from "react";
import { graphql } from "gatsby";

import type { PageProps } from "gatsby";
import BulmaContainer from "../../components/bulma-container";

import ConstellationCard from "../../components/constellation-card";

const CardPage: React.FC<PageProps> = (props: any) => {
  const card: any = props.data.constellationCard;

  return (
    <BulmaContainer>
      <ConstellationCard card={card} />
    </BulmaContainer>
  );
};

export default CardPage;

export const query = graphql`
  query ($id: String!) {
    constellationCard(id: { eq: $id }) {
      cardPath: gatsbyPath(filePath: "/cards/{ConstellationCard.uid}")
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
