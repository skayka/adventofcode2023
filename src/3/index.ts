import { readFileSync } from "fs";

const engineLines = readFileSync("src/3/inputfile.txt")
  .toString()
  .split("\n");

const isn = (n: string) => {
  return isNaN(Number(n)) && typeof n !== "undefined";
};

const isReallyAPartNumber = (
  engine: string[],
  rowNum: number,
  start: number,
  length: number
) => {
  //adjacence inline

  if (start > 0 && engine[rowNum][start - 1] !== ".") {
    console.log("start");
    return true;
  }

  if (
    start + length < engine[rowNum].length &&
    engine[rowNum][start + length] !== "."
  ) {
    console.log(
      "end",
      start,
      length,
      engine[rowNum].length,
      engine[rowNum][start + length]
    );
    return true;
  }

  // higherlevel

  if (rowNum < engine.length - 1)
    for (
      let i = start > 0 ? start - 1 : start;
      i <= start + length;
      i++
    ) {
      if (
        engine[rowNum + 1][i] !== "." &&
        isn(engine[rowNum + 1][i])
      ) {
        console.log("nextrow");

        return true;
      }
    }

  //lowerlevel
  if (rowNum > 0) {
    for (
      let i = start > 0 ? start - 1 : start;
      i <= start + length;
      i++
    ) {
      if (
        engine[rowNum - 1][i] !== "." &&
        isn(engine[rowNum - 1][i])
      ) {
        console.log("prevrow");

        return true;
      }
    }
  }

  return false;
};

const checkForNumber = (eString: string, idx: number) => {
  if (isNaN(Number(eString[idx]))) {
    return "";
  }
  return eString[idx] + checkForNumber(eString, idx + 1);
};

// let partsNumbers = [];
// engineLines.forEach((el, row) => {
//   for (let i = 0; i <= el.length - 1; i++) {
//     const pNumber = Number(checkForNumber(el, i));
//     if (pNumber) {
//       if (
//         isReallyAPartNumber(
//           engineLines,
//           row,
//           i,
//           String(pNumber).length
//         )
//       ) {
//         partsNumbers.push(pNumber);
//       }
//       i = i + String(pNumber).length - 1;
//     }
//   }
// });

// console.log(partsNumbers);
// console.log(partsNumbers.reduce((acc, n) => acc + n));

//part 2

const getNumberFromCoordForward = (
  engineLines: string[],
  row: number,
  i: number,
  prev = ""
) => {
  const rowLen = engineLines[row].length;

  if (i < rowLen - 1 && !isn(engineLines[row][i])) {
    prev = prev + engineLines[row][i];
    return getNumberFromCoordForward(engineLines, row, i + 1, prev);
  }
  return prev;
};

const getNumberFromCoordBackward = (
  engineLines: string[],
  row: number,
  i: number,
  prev = ""
) => {
  if (i >= 0 && !isn(engineLines[row][i])) {
    prev = engineLines[row][i] + prev;
    return getNumberFromCoordBackward(engineLines, row, i - 1, prev);
  }
  return prev;
};

const getNumberFromCoord = (
  engineLines: string[],
  row: number,
  i: number
) => {
  return Number(
    getNumberFromCoordBackward(engineLines, row, i - 1) +
      engineLines[row][i] +
      getNumberFromCoordForward(engineLines, row, i + 1)
  );
};

const getGearMultOrUndefined = (
  engineLines: string[],
  row: number,
  i: number
) => {
  const rowLen = engineLines[row].length;
  const gearNumber: number[] = [];

  //check currentRow

  if (i < rowLen - 1 && !isn(engineLines[row][i + 1])) {
    const n = getNumberFromCoord(engineLines, row, i + 1);
    gearNumber.push(n);
  }

  if (i > 0 && !isn(engineLines[row][i - 1])) {
    const n = getNumberFromCoord(engineLines, row, i - 1);
    gearNumber.push(n);
  }

  // check row Higher

  if (row > 0) {
    if (!isn(engineLines[row - 1][i])) {
      const n = getNumberFromCoord(engineLines, row - 1, i);
      gearNumber.push(n);
    } else {
      if (i < rowLen - 1 && !isn(engineLines[row - 1][i + 1])) {
        const n = getNumberFromCoord(engineLines, row - 1, i + 1);
        gearNumber.push(n);
      }

      if (i > 0 && !isn(engineLines[row - 1][i - 1])) {
        const n = getNumberFromCoord(engineLines, row - 1, i - 1);
        gearNumber.push(n);
      }
    }
  }

  if (row < engineLines.length - 1) {
    if (!isn(engineLines[row + 1][i])) {
      const n = getNumberFromCoord(engineLines, row + 1, i);
      gearNumber.push(n);
    } else {
      if (i < rowLen - 1 && !isn(engineLines[row + 1][i + 1])) {
        const n = getNumberFromCoord(engineLines, row + 1, i + 1);
        gearNumber.push(n);
      }

      if (i > 0 && !isn(engineLines[row + 1][i - 1])) {
        const n = getNumberFromCoord(engineLines, row + 1, i - 1);
        gearNumber.push(n);
      }
    }
  }

  console.log(gearNumber);
  if (gearNumber.length > 1) {
    const a = gearNumber.reduce((acc, n) => acc * n);
    console.log(a);
    return a;
  }
  return;
};

let gearMultSum = 0;
engineLines.forEach((el, row) => {
  for (let i = 0; i <= el.length; i++) {
    if (el[i] === "*") {
      const gearMult = getGearMultOrUndefined(engineLines, row, i);
      if (gearMult) {
        gearMultSum += gearMult;
        console.log("s", gearMultSum);
      }
    }
  }
});
console.log(gearMultSum);
