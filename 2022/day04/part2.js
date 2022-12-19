const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), {
  encoding: "utf-8",
});

const assignmentPairs = input.trim().split("\n");

const getRangeBoundary = (assignmentPair) => {
  const ranges = assignmentPair.split(",");
  const range1 = ranges[0].split("-").map((item) => parseInt(item));
  const range2 = ranges[1].split("-").map((item) => parseInt(item));

  return {
    range1,
    range2,
  };
};

const getRange = (start, end) => {
  if (start === end) return [start];
  return [start, ...getRange(start + 1, end)];
};

const getOverlappingPairs = (pairs) => {
  let totalOverlappingRanges = 0;

  pairs.forEach((pair) => {
    const rangeBoundaries = getRangeBoundary(pair);
    const firstRange = getRange(
      rangeBoundaries.range1[0],
      rangeBoundaries.range1[1]
    );
    const secondRange = getRange(
      rangeBoundaries.range2[0],
      rangeBoundaries.range2[1]
    );

    if (
      firstRange.includes(rangeBoundaries.range2[0]) ||
      firstRange.includes(rangeBoundaries.range2[1])
    )
      totalOverlappingRanges += 1;
    else if (
      secondRange.includes(rangeBoundaries.range1[0]) ||
      secondRange.includes(rangeBoundaries.range1[1])
    )
      totalOverlappingRanges += 1;
  });

  return totalOverlappingRanges;
};

console.log("overlappingPairs:", getOverlappingPairs(assignmentPairs));
