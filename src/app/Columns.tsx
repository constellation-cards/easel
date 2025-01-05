import { Children } from "react";

interface ThreeColumnProps {
  widths?: string[];
  children?: React.ReactNode;
}

// Wrap all child elements in
export default function Columns(props: ThreeColumnProps) {
  const { children, widths = ["is-3", "is-6", "is-3 is-hidden-mobile"] } =
    props;
  return (
    <div className="columns">
      {Children.map(children, (child) => (
        <div className={`column ${widths.shift() || ""}`}>{child}</div>
      ))}
    </div>
  );
}
