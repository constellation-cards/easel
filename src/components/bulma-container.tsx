import React from "react";

//import "../../node_modules/bulma/bulma.sass";
import "./application.sass";

export default function BulmaContainer({ children }: { children: any }) {
  return <div className="container">{children}</div>;
}
