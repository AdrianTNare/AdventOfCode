const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), {
  encoding: "utf-8",
});

const ruckSacks = input.trim().split("\n");

const getSharedItemTypes = (bags) =>
  bags.map((bag) => {
    const midIndex = Math.ceil(bag.length / 2);
    const compartment1 = bag.slice(0, midIndex);
    const compartment2 = bag.slice(midIndex);

    let sharedItemType = "";

    for (i = 0; i < compartment1.length; i++) {
      for (j = 0; j < compartment2.length; j++) {
        if (compartment1[i] === compartment2[j])
          if (!sharedItemType.includes(compartment2[j]))
            sharedItemType += compartment2[j];
      }
    }

    return sharedItemType;
  });

const getSumOfPriorities = (bags) => {
  const sharedItemTypes = getSharedItemTypes(bags);
  const priorityValues = sharedItemTypes.map((item) => {
    return item.charCodeAt(0) < 91
      ? item.charCodeAt(0) + 26 - 64
      : item.charCodeAt(0) - 96;
  });
  return priorityValues.reduce((prev, item) => prev + item, 0);
};

console.log("Sum of Priorities: ", getSumOfPriorities(ruckSacks));
