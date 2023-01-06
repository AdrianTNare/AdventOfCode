const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), {
  encoding: "utf-8",
});

const terminalLines = input
  .trim()
  .split("\n")
  .filter((line) => line !== " ");

const getFolders = (processedInput) => {
  const nodes = [{ name: "/", children: [] }];
  let currentFolderStack = [0];
  for (let i = 0; i < processedInput.length; i++) {
    if (processedInput[i].includes("$ ls") || processedInput[i].includes("/"))
      continue;
    if (
      processedInput[i].includes("$ cd") &&
      !processedInput[i].includes("..")
    ) {
      const dirName = processedInput[i].split(" ")[2];
      const currentFolderIndex =
        currentFolderStack[currentFolderStack.length - 1];
      const currentFolder = nodes[currentFolderIndex].children.find(
        (child) => child.name === dirName
      ).index;

      currentFolderStack.push(currentFolder);
    } else if (processedInput[i].includes("$ cd")) {
      currentFolderStack.pop();
    } else {
      const currentFolderIndex =
        currentFolderStack[currentFolderStack.length - 1];
      if (processedInput[i].includes("dir")) {
        const dirName = processedInput[i].split(" ")[1];
        nodes.push({ name: dirName, children: [] });
        nodes[currentFolderIndex].children.push({
          name: dirName,
          index: nodes.length - 1,
        });
      } else {
        nodes[currentFolderIndex].children.push({
          name: processedInput[i],
          index: null,
        });
      }
    }
  }
  return nodes;
};

const getItemSize = (item, folders) => {
  if (!item.index) {
    return parseInt(item.name.split(" ")[0]);
  }
  const dir = folders.find((_, index) => index === item.index);
  let sum = 0;
  for (let i = 0; i < dir.children.length; i++) {
    sum += getItemSize(dir.children[i], folders);
  }
  return sum;
};

const getDirectoriesTotals = (directories) => {
  const dirSizeNodes = [];
  for (let i = 0; i < directories.length; i++) {
    const totalSize = directories[i].children.reduce((prev, current) => {
      return prev + getItemSize(current, directories);
    }, 0);
    dirSizeNodes.push({ name: directories[i].name, size: totalSize });
  }
  return dirSizeNodes;
};

const getSumOfTotalSizes = (terminalInput) => {
  const organisedFolders = getFolders(terminalInput);
  const folderTotals = getDirectoriesTotals(organisedFolders);
  const totalslessOrEqualToLimit = folderTotals.filter(
    (node) => node.size <= 100000
  );

  let total = 0;
  for (let i = 0; i < totalslessOrEqualToLimit.length; i++) {
    total += totalslessOrEqualToLimit[i].size;
  }
  return total;
};

console.log(
  "Sum of directories with size of  at most  100000 : ",
  getSumOfTotalSizes(terminalLines)
);
