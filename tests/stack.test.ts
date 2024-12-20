import { ConstellationCardStack, getStacks } from "../src/cards";

function failjson(stack: ConstellationCardStack) {
  throw new Error(JSON.stringify(stack, null, 2));
}

describe("Stacks", () => {
  let stacks: ConstellationCardStack[];

  beforeAll(() => {
    stacks = getStacks();
  });

  test("Every stack has a name", () => {
    stacks.forEach((stack) => {
      if (!stack.name) {
        failjson(stack);
      }
    });
  });

  test("Every stack has a description", () => {
    stacks.forEach((stack) => {
      if (!stack.description) {
        failjson(stack);
      }
    });
  });
});
