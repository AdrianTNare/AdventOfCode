const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), {
  encoding: "utf-8",
});

const getThreeHighestCalories = (arg) => {
  const elfStringValues = arg.split("\n\n");

  const elfValues = elfStringValues.map((item) =>
    item.split("\n").filter((value) => value !== "")
  );

  const topThreeElfCalories = elfValues
    .map((elf) => {
      return elf.reduce((_prev, calorie) => _prev + parseInt(calorie), 0);
    })
    .sort((a, b) => b - a)
    .filter((_, index) => index < 3);

  return topThreeElfCalories.reduce((prev, elf) => prev + elf, 0);
};

console.log(
  "Most calories carried by three elfs :",
  getThreeHighestCalories(input)
);
