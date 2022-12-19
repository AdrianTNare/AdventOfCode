const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), {
  encoding: "utf-8",
});

const stacksAndProcedure = input.split("\n").filter((item) => item !== "");

const getStacks = (combinedList) => {
  const stacks = [];
  const stackNumberRowIndex =
    combinedList.findIndex((item) => item[0] === "m") - 1;
  const stackNumberRow = combinedList[stackNumberRowIndex];
  let numberOfStacks = 0;

  for (i = 0; i < stackNumberRow.length; i++) {
    if (stackNumberRow[i] !== " ") numberOfStacks += 1;
  }

  for (i = 1, k = 1; i < numberOfStacks + 1; i++, k += 4) {
    const stack = [];
    for (j = stackNumberRowIndex - 1; j >= 0; j--) {
      if (combinedList[j][k] !== " ") stack.push(combinedList[j][k]);
    }
    stacks.push(stack);
  }
  return stacks;
};

const moveCrates = (stacks, instruction) => {
  const fragments = instruction.split(" ");
  const numberOfItemsToMove = parseInt(fragments[1]);
  const temp = [];
  for (let i = 1; i <= numberOfItemsToMove; i++) {
    temp.push(stacks[parseInt(fragments[3]) - 1].pop());
  }
  if (numberOfItemsToMove === 1) {
    stacks[parseInt(fragments[5]) - 1].push(temp);
  } else {
    for (let i = 1; i <= numberOfItemsToMove; i++) {
      stacks[parseInt(fragments[5]) - 1].push(temp.pop());
    }
  }
  return stacks;
};

const getTopCrates = (inputList) => {
  let stacks = getStacks(inputList);
  let topCrates = "";

  const procedureIndex = inputList.findIndex((item) => item[0] === "m");
  for (let i = procedureIndex; i < inputList.length; i++) {
    stacks = moveCrates(stacks, inputList[i]);
  }
  stacks.map((item) => (topCrates += item.pop()));
  return topCrates;
};

console.log("CrateMover 9001 topcrates:", getTopCrates(stacksAndProcedure));
