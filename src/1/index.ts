import { readFileSync } from "fs";

const strings = readFileSync("src/1/inputfile.txt")
  .toString()
  .split("\n");

const textDigitsMap = {
  one: "1e",
  two: "2o",
  three: "3e",
  four: "4r",
  five: "5e",
  six: "6x",
  seven: "7n",
  eight: "8t",
  nine: "9e",
} as const;

const prepareStringForSnowballs = (s: string): string => {
  let ns = s;
  for (let i = 0; i <= s.length - 1; i++) {
    Object.keys(textDigitsMap).forEach((key) => {
      if (ns.substring(i, key.length + i) === key) {
        ns = ns.replace(
          key,
          textDigitsMap[key as keyof typeof textDigitsMap]
        );
      }
    });
  }

  return ns;
};

const getSnowballsFromString = (s: string) => {
  let firstNumber: string | undefined;
  let lastNumber: string | undefined;
  for (let i = 0; i <= s.length - 1; i++) {
    if (parseInt(s[i])) {
      if (!firstNumber) {
        firstNumber = s[i];
      }

      lastNumber = s[i];
    }
  }
  if (firstNumber && lastNumber) {
    return Number(firstNumber + lastNumber);
  }
  return 0;
};

const getAllSnowballs = (strings: string[]): number => {
  return strings.reduce((acc, s) => {
    const newString = prepareStringForSnowballs(s);
    return acc + getSnowballsFromString(newString);
  }, 0);
};

console.log(getAllSnowballs(strings));
