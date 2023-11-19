import type { GatsbyNode } from "gatsby";

import {
  getCards,
  getDecks,
  getStacks,
  ConstellationCardUid,
  ConstellationCardDeck,
  ConstellationCardStack,
} from "@constellation-cards/cards";

function tomap(records: any) {
  return records.reduce((a: any, v: any) => {
    a[v.uid] = v;
    return a;
  }, {});
}

export const sourceNodes: GatsbyNode["sourceNodes"] = async ({
  actions: { createNode },
  createNodeId,
  createContentDigest,
}) => {
  const cards = getCards();
  const decks = getDecks();
  const stacks = getStacks();

  const decksMap: Record<
    ConstellationCardUid<ConstellationCardDeck>,
    ConstellationCardDeck[]
  > = tomap(decks);
  const stacksMap: Record<
    ConstellationCardUid<ConstellationCardStack>,
    ConstellationCardStack[]
  > = tomap(stacks);

  // TODO: presets

  decks.forEach((deck) => {
    createNode({
      ...deck,
      parent: null,
      children: [],
      id: createNodeId(`constellationcarddeck__${deck.uid}`),
      internal: {
        type: "ConstellationCardDeck",
        content: JSON.stringify(deck),
        contentDigest: createContentDigest(deck),
      },
    });
  });

  stacks.forEach((stack) => {
    createNode({
      ...stack,
      parent: null,
      children: [],
      id: createNodeId(`constellationcarddeck__${stack.uid}`),
      internal: {
        type: "ConstellationCardStack",
        content: JSON.stringify(stack),
        contentDigest: createContentDigest(stack),
      },
    });
  });

  cards.forEach((card) => {
    const nodeData = {
      ...card,
      deck: decksMap[card.deck],
      stack: stacksMap[card.stack],
    };

    createNode({
      ...nodeData,
      parent: null,
      children: [],
      id: createNodeId(`constellationcard__${card.uid}`),
      internal: {
        type: "ConstellationCard",
        content: JSON.stringify(nodeData),
        contentDigest: createContentDigest(nodeData),
      },
    });
  });

  // TODO: createParentChildLink to create relationships between decks, stacks, and cards
};
