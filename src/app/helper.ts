import {
  ConstellationCard,
  ConstellationCardStack,
  ConstellationCardUid,
  getCards,
  getStacks,
} from "@constellation-cards/cards";

export function cardsMap(): Record<
  ConstellationCardUid<ConstellationCard>,
  ConstellationCard
> {
  return getCards().reduce((mapObject, card) => {
    mapObject[card.uid] = card;
    return mapObject;
  }, {} as Record<ConstellationCardUid<ConstellationCard>, ConstellationCard>);
}

export function stacksMap(): Record<
  ConstellationCardUid<ConstellationCardStack>,
  ConstellationCardStack
> {
  return getStacks().reduce((mapObject, stack) => {
    mapObject[stack.uid] = stack;
    return mapObject;
  }, {} as Record<ConstellationCardUid<ConstellationCardStack>, ConstellationCardStack>);
}
