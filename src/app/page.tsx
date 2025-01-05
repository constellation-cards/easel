import { Metadata } from "next";
import Columns from "./Columns";
import Sidebar from "./Sidebar";

export const metadata: Metadata = {
  title: "Constellation Cards",
};

export default function Home() {
  return (
    <Columns>
      <Sidebar />
      <div className="content">
        <h1 className="title">Constellation Cards</h1>
        <p>
          When we look at the night sky, we can see constellations. Cygnus the
          swan, Orion the hunter, Canis Major, the Big Dipper. Our eyes see the
          stars, but our imagination supplies the pattern.
        </p>
        <p>
          This is a role-playing game (RPG) that uses cards, such as
          3&quot;x5&quot; index cards. You will need a printed set of the cards
          that come with the game. You will also want a supply of blank cards,
          and something to write with. The game is ideally played by 3-6 people,
          but it can support any number of players, even solo play.
        </p>
        <p>
          The cards supply rules for handling characters, challenges, combat,
          and so on. But like the stars that form a constellation, the cards can
          only suggest an outline. You must bring your imagination and your
          passion, and fill in the shape of the story yourself.
        </p>
        <p>
          Although many of the cards and examples have a high fantasy flavor,
          you can use this game to depict any setting you want. You may need to
          create, rewrite, or remove some cards to achieve the specific genre
          you want.
        </p>
        <hr />
        <p>
          You can play online via Tabletop Simulator on Steam. The Community
          Workshop link is at the bottom of this page. You can click on the
          <strong>Quickstart PDF</strong> link at the bottom for the rules.
        </p>
        <p>
          At this time, you can&apos;t order physical copies of the cards. You
          will be able to once the cards are finalized.
        </p>
        <p>
          To see the cards in the game, start browsing by clicking on the
          <strong>Decks</strong> and <strong>Stacks</strong> lists.
        </p>
      </div>
      <></>
    </Columns>
  );
}
