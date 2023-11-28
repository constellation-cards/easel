/**
 * If card.front.name == card.back.name, return card.front.name
 * Otherwise return the concatenated card names
 * @param card
 */
export function cardName(card: any) {
  if (card.front.name == card.back.name) {
    return card.front.name;
  } else {
    return `${card.front.name} -- ${card.back.name}`;
  }
}
