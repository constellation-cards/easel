const ejs = require("ejs");
const fs = require("fs");
const ramda = require("ramda");

const { concat, isEmpty, isNil, isNotEmpty, isNotNil, pick, reduce, repeat } = ramda;

// Paths we care about

const CARDS_JSON = "node_modules/@constellation-cards/cards/cards.json"
const CARDS_TEX_EJS = "cards.tex.ejs"
const CARDS_TEX = "cards.tex"

// Turn an array of records into a map of UID => [Record, Record...]
function recordsToMap(records) {
  return reduce((a, v) => {
    a[v.uid] = v;
    return a;
  }, {}, records);
}

const cardDataRaw = fs.readFileSync(CARDS_JSON).toString();
const cardData = JSON.parse(cardDataRaw);

const decks = recordsToMap(cardData.decks);
const stacks = recordsToMap(cardData.stacks);

// Dereference decks and stacks and bake them into our structure
const allCards = reduce(
  (cards, card) => {
    // Uncomment to duplicate cards based on quantity
    // We want this if we're printing cards, but not for TTS
    const quantity = 1; // newCard.quantity
    const newCard = {
      ...card,
      deck: pick(["uid", "name"], decks[card.deck]),
      stack: pick(["uid", "name", "icons"], stacks[card.stack]),
    };
    return concat(cards, repeat(newCard, quantity));
  },
  [],
  cardData.cards
);

let cards
if (isNotNil(process.env.CRUX_CARDS_DECK) && isNotEmpty(process.env.CRUX_CARDS_DECK)) {
  cards = allCards.filter(card => card.deck.name == process.env.CRUX_CARDS_DECK);
} else {
  cards = allCards
}

const description = (inputString) => inputString.split("\n").join("\n\n");

const template = fs.readFileSync(CARDS_TEX_EJS).toString();
const output = ejs.render(template, {cards, description});

fs.writeFileSync(CARDS_TEX, output);
