import {
  ConstellationCard,
  ConstellationCardDeck,
  ConstellationCardStack,
  getCards,
  getDecks,
  getStacks,
} from "../src/cards";

function failjson(
  card: ConstellationCard | ConstellationCardDeck | ConstellationCardStack
) {
  throw new Error(JSON.stringify(card, null, 2));
}

describe("IDs", () => {
  const ids = new Set();

  test("Every ID is unique", () => {
    for (const deck of getDecks()) {
      if (ids.has(deck.uid)) {
        failjson(deck);
      }
      ids.add(deck.uid);
    }

    for (const stack of getStacks()) {
      if (ids.has(stack.uid)) {
        failjson(stack);
      }
      ids.add(stack.uid);
    }

    for (const card of getCards()) {
      if (ids.has(card.uid)) {
        failjson(card);
      }
      ids.add(card.uid);
    }
  });
});
