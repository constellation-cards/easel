import { getDecks, getStacks } from "@constellation-cards/cards";
import Link from "next/link";

interface DropdownLink {
  title: string;
  url: string;
}

interface DropdownProps {
  title: string;
  links: DropdownLink[];
}

function Dropdown(props: DropdownProps) {
  const { title, links } = props;
  return (
    <div className="navbar-item has-dropdown is-hoverable">
      <a className="navbar-link">{title}</a>
      <div className="navbar-dropdown">
        {links.map((link) => (
          <Link className="navbar-item" href={link.url} key={link.url}>
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Navbar() {
  const allDecks: DropdownLink[] = getDecks().map((deck) => ({
    title: deck.name,
    url: `/decks/${deck.uid}`,
  }));
  const allStacks: DropdownLink[] = getStacks().map((stack) => ({
    title: stack.name,
    url: `/stacks/${stack.uid}`,
  }));

  return (
    <nav
      className="navbar is-link is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" href="/">
          C.C.
        </Link>

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarMenu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarMenu" className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item" href={"/rules"}>
            Rules
          </Link>
          <Dropdown title="Decks" links={allDecks} />
          <Dropdown title="Stacks" links={allStacks} />
        </div>
      </div>
    </nav>
  );
}
