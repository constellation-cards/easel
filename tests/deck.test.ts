import { ConstellationCardDeck, getDecks } from "../src/cards";

function failjson(deck: ConstellationCardDeck) {
  throw new Error(JSON.stringify(deck, null, 2));
}

describe("Decks", () => {
  let decks: ConstellationCardDeck[];

  beforeAll(() => {
    decks = getDecks();
  });

  test("Every deck has a name", () => {
    decks.forEach((deck) => {
      if (!deck.name) {
        failjson(deck);
      }
    });
  });

  test("Every deck has a description", () => {
    decks.forEach((deck) => {
      if (!deck.description) {
        failjson(deck);
      }
    });
  });
});
