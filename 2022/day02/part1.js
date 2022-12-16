const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), {
  encoding: "utf-8",
});

const shapeScores = {
  X: 1,
  Y: 2,
  Z: 3,
};

const outcomeScores = {
  AX: 3,
  AY: 6,
  AZ: 0,
  BZ: 6,
  BY: 3,
  BX: 0,
  CX: 6,
  CY: 0,
  CZ: 3,
};

const roundPairs = input.trim().split("\n");

const getTotalScore = (pairs) => {
  const roundScores = pairs.map((pair) => {
    const pairItems = pair.split(" ");
    const outcomeScore = outcomeScores[pair.replace(/\s/g, "")];
    return outcomeScore + shapeScores[pairItems[1]];
  });
  return roundScores.reduce((prev, item) => prev + item, 0);
};

console.log("MyTotalScore:", getTotalScore(roundPairs));
