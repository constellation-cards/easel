import {
  ConstellationCard,
  ConstellationCardDeck,
  ConstellationCardStack,
  ConstellationCardUid,
  getCards,
  getDecks,
  getStacks,
} from "@/cards";
import fs from "fs";
import path from "path";
import { remark } from "remark";
import html from "remark-html";

export function description(text: string | undefined) {
  return (text || "").split("\n").map((line) => <p key={line}>{line}</p>);
}

export function cardsMap(): Record<ConstellationCardUid, ConstellationCard> {
  return getCards().reduce((mapObject, card) => {
    mapObject[card.uid] = card;
    return mapObject;
  }, {} as Record<ConstellationCardUid, ConstellationCard>);
}

export function decksMap(): Record<
  ConstellationCardUid,
  ConstellationCardDeck
> {
  return getDecks().reduce((mapObject, deck) => {
    mapObject[deck.uid] = deck;
    return mapObject;
  }, {} as Record<ConstellationCardUid, ConstellationCardDeck>);
}

export function stacksMap(): Record<
  ConstellationCardUid,
  ConstellationCardStack
> {
  return getStacks().reduce((mapObject, stack) => {
    mapObject[stack.uid] = stack;
    return mapObject;
  }, {} as Record<ConstellationCardUid, ConstellationCardStack>);
}

export async function getMarkdownData(filePath: string): Promise<string> {
  const fullPath = path.join(process.cwd(), filePath);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const processedContent = await remark().use(html).process(fileContents);

  return processedContent.toString();
}
