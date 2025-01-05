import { getCards } from "@/cards";
import { Metadata } from "next";
import { reduce, times } from "ramda";
import Columns from "../Columns";
import Sidebar from "../Sidebar";

interface CustomDeckSpecProps {
  page: number;
  cardCount: number;
}

export const metadata: Metadata = {
  title: "Tabletop Simulator",
};

function CustomDeckSpec(props: CustomDeckSpecProps) {
  const { page, cardCount } = props;

  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">Custom Deck</p>
      </header>
      <div className="card-content">
        <ul>
          <li>
            <strong>Type:</strong> Rectangle (Rounded)
          </li>
          <li>
            <strong>Face:</strong>{" "}
            <a href={`/montage-back-${page + 1}.png`} target="_blank">
              {`montage-back-${page + 1}.png`}
            </a>
          </li>
          <li>
            <strong>Unique Backs:</strong> checked
          </li>
          <li>
            <strong>Back:</strong>{" "}
            <a href={`/montage-front-${page + 1}.png`} target="_blank">
              {`montage-front-${page + 1}.png`}
            </a>
          </li>
          <li>
            <strong>Width:</strong> 10
          </li>
          <li>
            <strong>Height:</strong> {Math.ceil(cardCount / 10)}
          </li>
          <li>
            <strong>Number:</strong> {cardCount}
          </li>
          <li>
            <strong>Sideways:</strong> unchecked
          </li>
          <li>
            <strong>Back is Hidden:</strong> unchecked
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function TabletopSimulatorPage() {
  const cardCount = reduce(
    (cardCount, card) => cardCount + card.quantity,
    0,
    getCards()
  );
  const fullPageCount = Math.floor(cardCount / 50);
  const excessCount = cardCount % 50;

  return (
    <Columns>
      <Sidebar />
      <>
        <h1 className="title">Tabletop Simulator</h1>

        <div className="content">
          <p>
            If you want to use the cards in your own Tabletop Simulator games,
            here is how to add them.
          </p>

          <ol>
            <li>
              With your game open, click{" "}
              <strong>Objects &gt; Components &gt; Custom &gt; Deck</strong>
            </li>
            <li>Place a deck on the table</li>
            <li>Enter the properties as given below</li>
            <li>Repeat for each deck in the list below</li>
            <li>When done, stack all the decks on top of each other</li>
            <li>Split the combined deck into stacks of cards</li>
            <li>
              Optionally, select the stacks and right-click click &quot;Save
              Object&quot; so you can easily add the cards to other games
            </li>
          </ol>

          <p>
            You will want to create the following decks with these properties.
            <br />
            <strong>NOTE:</strong> to avoid having changes to the cards
            invalidate your deck, save the images at each URL, and upload the
            image files yourself.
          </p>
        </div>

        {times(
          (n) => (
            <CustomDeckSpec page={n} cardCount={50} key={`CustomDeck-${n}`} />
          ),
          fullPageCount
        )}
        {excessCount > 0 ? (
          <CustomDeckSpec page={fullPageCount} cardCount={excessCount} />
        ) : (
          <></>
        )}
      </>
      <></>
    </Columns>
  );
}
