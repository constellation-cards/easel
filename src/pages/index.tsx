import * as React from "react";
import { Link, graphql } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";

import BulmaContainer from "../components/bulma-container";

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
  return (
    <BulmaContainer>
      <main>
        <h1 className="title">Home page</h1>
        <h3 className="subtitle">A subtitle</h3>
        <p>Hello World</p>
        <ul>
          {edges.map((edge: any) => (
            <li>
              <Link href={`${edge.node.cardPath}`}>
                {edge.node.front.name} - {edge.node.back.name}
              </Link>
            </li>
          ))}
        </ul>
        <pre>{JSON.stringify(edges, null, 2)}</pre>
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
          cardPath: gatsbyPath(
            filePath: "/cards/{ConstellationCard.front__name}-{ConstellationCard.back__name}"
          )
          front {
            name
          }
          back {
            name
          }
        }
      }
    }
  }
`;
