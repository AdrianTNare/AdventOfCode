const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), {
  encoding: "utf-8",
});

const ruckSacks = input.trim().split("\n");

const getCommonType = (item1, item2) => {
  let commonType = "";

  for (j = 0; j < item1.length; j++) {
    for (k = 0; k < item2.length; k++) {
      if (item1[j] === item2[k])
        if (!commonType.includes(item2[k])) commonType += item2[k];
    }
  }
  return commonType;
};

const getGroupBadges = (bags) => {
  const sharedItemTypes = [];
  for (i = 0; i < bags.length; i += 3) {
    const elf1 = bags[i];
    const elf2 = bags[i + 1];
    const elf3 = bags[i + 2];

    const twoElvesItemTypes = getCommonType(elf1, elf2);
    const sharedItemType = getCommonType(twoElvesItemTypes, elf3);

    sharedItemTypes.push(sharedItemType);
  }
  return sharedItemTypes;
};

const getSumOfPriorities = (bags) => {
  const groupBadges = getGroupBadges(bags);
  const priorityValues = groupBadges.map((item) => {
    return item.charCodeAt(0) < 91
      ? item.charCodeAt(0) + 26 - 64
      : item.charCodeAt(0) - 96;
  });
  return priorityValues.reduce((prev, item) => prev + item, 0);
};

console.log("Sum of Priorities: ", getSumOfPriorities(ruckSacks));
