import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Constellation Cards",
};

export default function Home() {
  return (
    <>
      <h1 className="title">Constellation Cards</h1>

      <p>
        Play Online:{" "}
        <a
          href="https://steamcommunity.com/sharedfiles/filedetails/?id=3080002958"
          target="_blank"
        >
          Tabletop Simulator: Constellation Cards
        </a>
      </p>
    </>
  );
}
