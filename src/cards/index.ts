import fs from "fs";
import yaml from "js-yaml";
import path from "path";
const slugify = require("slugify");

import {
  append,
  assoc,
  filter,
  flatten,
  map,
  mergeRight,
  pluck,
  reduce,
} from "ramda";

import type {
  ConstellationCardDeck,
  ConstellationCardStack,
  ConstellationCardPreset,
  ConstellationCard,
  ConstellationCardFace,
  ConstellationCardUid,
} from "./types";

interface YamlData {
  decks: ConstellationCardDeck[];
  stacks: ConstellationCardStack[];
  presets: ConstellationCardPreset[];
  cards: ConstellationCard[];
}

const deckTemplate: ConstellationCardDeck = {
  uid: "",
  name: "",
  description: "",
  cards: [],
};

const stackTemplate: ConstellationCardStack = {
  uid: "",
  name: "",
  description: "",
  icons: [],
  cards: [],
};

const faceTemplate: ConstellationCardFace = {
  name: "",
  backgroundImage: null,
  flavor: "",
  description: "",
  prompts: [],
  rule: "",
};

const cardTemplate: ConstellationCard = {
  uid: "",
  deck: "",
  stack: "",
  front: { ...faceTemplate },
  back: { ...faceTemplate },
  quantity: 1,
};

function toid(input: string): string {
  return slugify(input, {
    remove: /[\(\)\?]*/,
    lower: true,
  });
}

function idForDeck(obj: ConstellationCardDeck): string {
  return toid(obj.name);
}

function idForStack(obj: ConstellationCardStack): string {
  return toid(obj.name);
}

function idForCard(obj: ConstellationCard): string {
  return obj.front.name === obj.back.name
    ? toid(obj.front.name)
    : `${toid(obj.front.name)}-${toid(obj.back.name)}`;
}

function extractDecks(data: ConstellationCardDeck[]): ConstellationCardDeck[] {
  return map((record) => mergeRight(deckTemplate, record), data);
}

function extractStacks(
  data: ConstellationCardStack[]
): ConstellationCardStack[] {
  return map((record) => mergeRight(stackTemplate, record), data);
}

function extractFace(data: ConstellationCardFace): ConstellationCardFace {
  return mergeRight(faceTemplate, data);
}

function extractCards(data: ConstellationCard[]): ConstellationCard[] {
  return map(
    (record) =>
      mergeRight(cardTemplate, {
        deck: record.deck,
        stack: record.stack,
        front: extractFace(record.front),
        back: extractFace(record.back),
        quantity: record.quantity || cardTemplate.quantity,
      }),
    data
  );
}

function readOneFile(filePath: string) {
  const content = fs.readFileSync(filePath, "utf8");
  const data = yaml.load(content) as YamlData;
  return {
    decks: extractDecks(data.decks || []),
    stacks: extractStacks(data.stacks || []),
    presets: data.presets || [],
    cards: extractCards(data.cards || []),
  };
}

function readAllFiles(filePaths: string[]) {
  const records = map(readOneFile, filePaths);
  return {
    decks: flatten(pluck("decks", records)),
    stacks: flatten(pluck("stacks", records)),
    presets: flatten(pluck("presets", records)),
    cards: flatten(pluck("cards", records)),
  };
}

/**
 * Retrieve the data files holding card data
 * @returns a list of paths pointing to YAML files that contain card data
 */
function cardFiles(): string[] {
  const CARD_DATA = path.join(
    process.env.NEXTJS_ROOT || ".",
    "src",
    "cards",
    "card-data"
  );
  const files = fs.readdirSync(CARD_DATA).sort();
  const yamlFiles = filter(
    (fileName) => path.extname(fileName) === ".yaml",
    files
  );
  const yamlPaths = map(
    (fileName) => path.join(CARD_DATA, fileName),
    yamlFiles
  );
  return yamlPaths;
}

function addIdsToEverything(data: YamlData) {
  return {
    decks: map((obj) => assoc("uid", idForDeck(obj), obj), data.decks),
    stacks: map((obj) => assoc("uid", idForStack(obj), obj), data.stacks),
    presets: data.presets,
    cards: map((obj) => assoc("uid", idForCard(obj), obj), data.cards),
  };
}

function generateObjectIndex<T>(objects: T[]): Record<string, T> {
  // @ts-expect-error("Fucking type nonsense")
  return reduce((newIndex, obj) => assoc(obj.name, obj, newIndex), {}, objects);
}

let dataWithIds: YamlData = {
  decks: [],
  stacks: [],
  presets: [],
  cards: [],
};

try {
  const filePaths = cardFiles();
  const data = readAllFiles(filePaths);
  dataWithIds = addIdsToEverything(data);

  const deckIndex = generateObjectIndex(dataWithIds.decks);
  const stackIndex = generateObjectIndex(dataWithIds.stacks);

  for (const card of dataWithIds.cards) {
    if (card.deck) {
      const foundDeck = deckIndex[card.deck];
      if (foundDeck) {
        foundDeck.cards = append(card.uid, foundDeck.cards);
        card.deck = foundDeck.uid;
      }
    }
    if (card.stack) {
      const foundStack = stackIndex[card.stack];
      if (foundStack) {
        foundStack.cards = append(card.uid, foundStack.cards);
        card.stack = foundStack.uid;
      }
    }
  }

  for (const preset of dataWithIds.presets) {
    preset.sources = map(
      (source) => assoc("stack", stackIndex[source.stack]?.uid, source),
      preset.sources || []
    );
  }
} catch (e) {
  console.error(e);
  throw e;
}

export function getDecks(): ConstellationCardDeck[] {
  return dataWithIds.decks;
}

export function getStacks(): ConstellationCardStack[] {
  return dataWithIds.stacks;
}

export function getPresets(): ConstellationCardPreset[] {
  return dataWithIds.presets as ConstellationCardPreset[];
}

export function getCards(): ConstellationCard[] {
  return dataWithIds.cards;
}

export {
  ConstellationCardDeck,
  ConstellationCardStack,
  ConstellationCardPreset,
  ConstellationCard,
  ConstellationCardFace,
  ConstellationCardUid,
};

export default dataWithIds;
