import { ConstellationCard, getCards } from "../src/cards";

function failjson(card: ConstellationCard) {
  throw new Error(JSON.stringify(card, null, 2));
}

describe("Cards", () => {
  let cards: ConstellationCard[];

  beforeAll(() => {
    cards = getCards();
  });

  test("Every card has a valid deck", () => {
    cards.forEach((card) => {
      if (!card.deck) {
        failjson(card);
      }
    });
  });

  test("Every card has a valid stack", () => {
    cards.forEach((card) => {
      if (!card.stack) {
        failjson(card);
      }
    });
  });

  test("Every card has a name on front and back", () => {
    cards.forEach((card) => {
      if (!card.front || !card.front.name) {
        failjson(card);
      }
      if (!card.back || !card.back.name) {
        failjson(card);
      }
    });
  });
});
