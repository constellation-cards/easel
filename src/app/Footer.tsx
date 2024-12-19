export default function Page() {
  return (
    <footer className="footer">
      <div className="columns">
        <div className="column">
          <ul>
            <li>
              <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3080002958" target="_blank">
                Play online: Tabletop Simulator
              </a>
            </li>
          </ul>
        </div>
        <div className="column">
          <ul>
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
      </div>
    </footer>
  );
}
