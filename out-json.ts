import fs from "node:fs";
import cardData from "./src/cards";

const [outpath, ...args] = process.argv.slice(2);

const serializedData = JSON.stringify(cardData, null, 2);
if (outpath) {
  fs.writeFileSync(outpath, serializedData);
} else {
  console.log(serializedData);
}
