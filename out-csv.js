const { stringify } = require("csv-stringify/sync");
const ejs = require("ejs");
const fs = require("fs");
const ramda = require("ramda");

const { concat, isEmpty, isNil, isNotEmpty, isNotNil, pick, reduce, repeat } = ramda;

// Turn an array of records into a map of UID => [Record, Record...]
function recordsToMap(records) {
  return reduce((a, v) => {
    a[v.uid] = v;
    return a;
  }, {}, records);
}

const [infile, outfile] = process.argv.slice(2);

const cardDataRaw = fs.readFileSync(infile).toString();
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

const cardAttributes = (card) => ({
    "UID": card.uid,
    "Deck": card.deck.name,
    "Stack": card.stack.name,
    "Quantity": card.quantity
});

const faceAttributes = (face) => ({
    "Name": face.name,
    "Flavor": face.flavor,
    "Description": (face.description || "").replaceAll("\n", "\\n"),
    "Prompts": (face.prompts || []).map(prompt => `•${prompt}`).join(""),
    "Rule": face.rule
});

csvCards = cards.map(card => {
  return [{
    ...cardAttributes(card),
    "Face": "Back",
    ...faceAttributes(card.back)
  }, {
    ...cardAttributes(card),
    "Face": "Front",
    ...faceAttributes(card.front)
  }]
}).flat();

fs.writeFileSync(outfile, stringify(csvCards, { header: true }));
