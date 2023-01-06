const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), {
  encoding: "utf-8",
});

const dataStream = input.trim().replaceAll("\n", "");

const isPacketMarker = (sequence) => {
  for (let i = 0; i < sequence.length; i++) {
    for (let j = 0; j < sequence.length; j++) {
      if (i !== j && sequence[i] === sequence[j]) {
        return false;
      }
    }
  }
  return true;
};

const numberOfCharactersToBeProcessed = (stream) => {
  for (let i = 0; i < stream.length; i++) {
    const slice = stream.slice(i, i + 4);
    if (slice.length < 4) return -1;
    const isMarker = isPacketMarker(slice);
    if (isMarker) return i + 4;
  }
};

console.log(
  "Number of characters to be processed:",
  numberOfCharactersToBeProcessed(dataStream)
);
