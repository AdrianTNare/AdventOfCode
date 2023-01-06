const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), {
  encoding: "utf-8",
});

const dataStream = input.trim().replaceAll("\n", "");

const isMarker = (sequence) => {
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
    const isPacketMarker = isMarker(slice);
    if (isPacketMarker) {
      const msgSlice = stream.slice(i, i + 14);
      if (msgSlice.length < 14) return -1;

      const isMessageMarker = isMarker(msgSlice);
      if (isMessageMarker) return i + 14;
    }
  }
};

console.log(
  "Number of characters to be processed:",
  numberOfCharactersToBeProcessed(dataStream)
);
