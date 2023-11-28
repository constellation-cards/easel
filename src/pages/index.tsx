import * as React from "react";
import { Link, graphql } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";

import Loadable from "@loadable/component";

import BulmaContainer from "../components/bulma-container";
const DynamicCards = Loadable(() => import(`../components/dynamic-cards`));

import { groupBy, map, prop, uniq } from "ramda";

const IndexPage: React.FC<PageProps> = (props: any) => {
  const {
    pageResources: {
      json: {
        data: {
          allConstellationCard: { edges },
        },
      },
    },
  } = props;
  const cards = map(prop("node"), edges) as any[];
  const stacks = uniq(map((card: any) => card.stack, cards));
  const byStack = groupBy((card: any) => card.stack.uid, cards);

  return (
    <BulmaContainer>
      <main>
        <h1 className="title">Home page</h1>
        <h3 className="subtitle">A subtitle</h3>
        <DynamicCards stacks={stacks} byStack={byStack} cards={cards} />
      </main>
    </BulmaContainer>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;

export const query = graphql`
  query {
    allConstellationCard {
      edges {
        node {
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
    }
  }
`;
