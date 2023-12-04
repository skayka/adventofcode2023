import { readFileSync } from "fs";

const games = readFileSync("src/2/inputfile.txt")
  .toString()
  .split("\n");

type GameVariant = {
  blue: number;
  red: number;
  green: number;
};

type Game = {
  id?: number;
  variants?: GameVariant[];
};

const checkGameVariant: GameVariant = {
  blue: 14,
  red: 12,
  green: 13,
};

const prepareGames = (games: string[]): Game[] => {
  let grownUpGames: Game[] = [];
  games.forEach((game) => {
    const realGame: Game = {};
    let [name, variantsString] = game.split(":");
    realGame.id = Number(name.replace("Game ", ""));
    const variants = variantsString.split(";");
    const realVariants: GameVariant[] = [];
    variants.forEach((v) => {
      const colouredVariants = v.split(",");
      const realVariant: GameVariant = { blue: 0, green: 0, red: 0 };
      colouredVariants.forEach((cv) => {
        if (cv.includes("red")) {
          realVariant.red = Number(cv.split(" ")[1]);
        }
        if (cv.includes("green")) {
          realVariant.green = Number(cv.split(" ")[1]);
        }
        if (cv.includes("blue")) {
          realVariant.blue = Number(cv.split(" ")[1]);
        }
      });
      realVariants.push(realVariant);
    });
    realGame.variants = realVariants;
    grownUpGames.push(realGame);
  });
  return grownUpGames;
};

console.log(games);
const preparedGames = prepareGames(games);

let gameids: number[] = [];
preparedGames.forEach((pgame) => {
  let gameWorks = true;
  pgame.variants.forEach((pvariant) => {
    if (
      pvariant.blue > checkGameVariant.blue ||
      pvariant.green > checkGameVariant.green ||
      pvariant.red > checkGameVariant.red
    ) {
      gameWorks = false;
    }
  });
  if (gameWorks) {
    gameids.push(pgame.id);
  }
});

console.log(
  gameids.reduce((acc, v) => {
    return acc + v;
  })
);

let magnitudeSum = 0;

preparedGames.forEach((pg) => {
  let maxg = 0;
  let maxr = 0;
  let maxb = 0;
  pg.variants.forEach((pv) => {
    if (pv.blue > maxb) {
      maxb = pv.blue;
    }
    if (pv.green > maxg) {
      maxg = pv.green;
    }
    if (pv.red > maxr) {
      maxr = pv.red;
    }
  });
  magnitudeSum += maxg * maxb * maxr;
});

console.log(magnitudeSum);
