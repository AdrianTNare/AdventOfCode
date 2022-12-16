const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), {
  encoding: "utf-8",
});

const getHighestCalories = (arg) => {
  const elfStringValues = arg.split("\n\n");

  const elfValues = elfStringValues.map((item) =>
    item.split("\n").filter((value) => value !== "")
  );

  return elfValues.reduce((prev, elf) => {
    const total = elf.reduce((_prev, calorie) => _prev + parseInt(calorie), 0);
    return total > prev ? total : prev;
  }, 0);
};

console.log("Most calories carried by an elf :", getHighestCalories(input));
