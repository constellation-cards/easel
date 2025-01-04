export default function Page() {
  return (
    <footer className="footer">
      <div className="columns is-centered">
        <div className="column is-one-quarter">
          <ul>
            <li>
              <strong>Playing the Game</strong>
            </li>
            <li>
              <a
                href="https://steamcommunity.com/sharedfiles/filedetails/?id=3080002958"
                target="_blank"
              >
                Play online: Tabletop Simulator
              </a>
            </li>
            <li>
              <a href="/ConstellationCardsQuickstart.pdf">Quickstart PDF</a>
            </li>
          </ul>
        </div>
        <div className="column is-one-quarter">
          <ul>
            <li>
              <strong>Data Files for Developers</strong>
            </li>
            <li>
              <a href="/cards.pdf">cards.pdf</a> (printable cards)
            </li>
            <li>
              <a href="/cards.csv">cards.csv</a> (data merge)
            </li>
            <li>
              <a href="/cards.json">cards.json</a> (raw data)
            </li>
          </ul>
        </div>
        <div className="column is-one-quarter">
          <p>
            Cards use the{" "}
            <a href="https://fonts.google.com/specimen/Neuton" target="_blank">
              Neuton
            </a>{" "}
            font under the OFL license:{" "}
            <a href="/OFL.txt" target="_blank">
              OFL.txt
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
