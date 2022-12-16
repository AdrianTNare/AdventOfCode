const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), {
  encoding: "utf-8",
});

const outcomeScores = {
  AX: 0,
  AY: 3,
  AZ: 6,
  BZ: 6,
  BY: 3,
  BX: 0,
  CX: 0,
  CY: 3,
  CZ: 6,
};

const shapeScores = {
  AX: 3,
  AY: 1,
  AZ: 2,
  BZ: 3,
  BY: 2,
  BX: 1,
  CX: 2,
  CY: 3,
  CZ: 1,
};

const roundPairs = input.trim().split("\n");

const getTotalScore = (pairs) => {
  const roundScores = pairs.map((pair) => {
    const outcomeScore = outcomeScores[pair.replace(/\s/g, "")];
    return outcomeScore + shapeScores[pair.replace(/\s/g, "")];
  });
  return roundScores.reduce((prev, item) => prev + item, 0);
};

console.log("MyTotalScore:", getTotalScore(roundPairs));
