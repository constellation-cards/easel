/**
 * Many objects have a unique ID, often a database key.
 */
export type ConstellationCardUid = string;

/**
 * An IMAGE is a reference to an icon or background image.
 * This can either be a hard-coded symbolic name, or a URL.
 */
export type ConstellationCardImage = string | null | undefined;

/**
 * A DECK is a collection of CARDS.
 */
export interface ConstellationCardDeck {
  /**
   * The unique ID of this deck
   */
  uid: ConstellationCardUid;

  /**
   * The human readable name of this deck, e.g. "CORE"
   */
  name: string;

  /**
   * An explanation of the deck's contents and purpose
   */
  description: string;

  /**
   * All the cards in this deck, by ID
   */
  cards: ConstellationCardUid[];
}

/**
 * A STACK is a collection of CARDS that closely share a purpose,
 * e.g. "Character Focus" or "Condition".
 * Multiple DECKS can contribute cards to a single stack.
 */
export interface ConstellationCardStack {
  /**
   * The unique ID of this stack
   */
  uid: ConstellationCardUid;

  /**
   * The human readable name of this stack, e.g. "Core Rules"
   */
  name: string;

  /**
   * An explanation of the stack's contents and purpose
   */
  description: string;

  /**
   * The list of icons associated with this stack
   */
  icons: ConstellationCardImage[];

  /**
   * All the cards in this stack, by ID
   */
  cards: ConstellationCardUid[];
}

export interface ConstellationCardFace {
  /**
   * Every face has a unique name; sometimes a card front and back faces share it
   */
  name: string;

  /**
   * Cards can have a semi-transparent image as a background
   */
  backgroundImage: ConstellationCardImage;

  /**
   * Cards can optionally have flavor text, shown in italics at the top
   */
  flavor: string | undefined;

  /**
   * Cards can have descriptions
   */
  description: string | undefined;

  /**
   * Cards can optionally have a list of prompts, shown as a bulleted list
   */
  prompts: string[] | undefined;

  /**
   * Cards can optionally have a rule at the bottom
   */
  rule: string | undefined;
}

export interface ConstellationCard {
  /**
   * The unique ID of this card
   */
  uid: ConstellationCardUid;

  /**
   * All cards belong in a deck, e.g. "CORE"
   */
  deck: ConstellationCardUid;

  /**
   * All cards belong in a stack, e.g. "Character (Focus)"
   */
  stack: ConstellationCardUid;

  /**
   * Cards have front and back faces
   */
  front: ConstellationCardFace;
  back: ConstellationCardFace;

  /**
   * The stack has a certain number of this card in it
   */
  quantity: number;
}

/**
 * When dealing a card into this preset, where should it be positioned?
 */
export enum ConstellationCardPresetFlipRule {
  FRONT = "front",
  BACK = "back",
  RANDOM = "random",
}

/**
 * When dealing a card into this preset, where does it come from?
 */
export interface ConstellationCardPresetSource {
  stack: ConstellationCardUid;
  quantity: number;
  flipRule: ConstellationCardPresetFlipRule;
}

export interface ConstellationCardPreset {
  name: string;
  description: string;
  sources: ConstellationCardPresetSource[];
}
