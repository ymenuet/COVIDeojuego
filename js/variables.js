const $canvas = document.querySelector("canvas");
const ctx = $canvas.getContext("2d");

//sounds;
const startMusic = new Audio("../sounds/intro-music-1.mp3");
startMusic.loop = true;
startMusic.volume = 0.5;
const generalMusic = new Audio("../sounds/general-level-music.mp3");
generalMusic.loop = true;
generalMusic.volume = 0.4;
const lastLevelMusic = new Audio("../sounds/level-5-music-1.mp3");
lastLevelMusic.loop = true;
lastLevelMusic.volume = 0.5;
const backgroundSound = new Audio("../sounds/general-background.mp3");
backgroundSound.volume = 0.2;
backgroundSound.loop = true;
const smallWin = new Audio("../sounds/small-win.mp3");
const bigWin = new Audio("../sounds/big-win.mp3");
const lose = new Audio("../sounds/lose.mp3");
const collectSyringe = new Audio("../sounds/collect-syringe.mp3");
const collectMask = new Audio("../sounds/collect-mask.mp3");
const virusHit = new Audio("../sounds/virus-hit.mp3");
const fierroViejo = new Audio("../sounds/fierro-viejo.mp3");
fierroViejo.volume = 0.1;

let frames = 0;
const gravity = 0.98;
const friction = 0.8;
let intervalId;
let keys = [];
let enemies = [];
let faceMasks = [];
let seringes = [];
let seringeApparition = 500;
let currentLevel = 1;

const amlo = {
  name: "Andrés Manuel López Obrador",
  gender: "he",
  img: "../img/characters/amlo.png",
  offsetX: 11,
  offsetY: -35,
  ratioWidth: 1 / 1.3,
  ratioHeight: 1 / 1.7,
  offsetMaskX: 19,
  offsetMaskY: 7,
  ratioMaskWidth: 1 / 1.4,
  ratioMaskHeight: 1 / 3,
};
const trump = {
  name: "Donald Trump",
  gender: "he",
  img: "../img/characters/trump.png",
  offsetX: 19,
  offsetY: -30,
  ratioWidth: 1 / 1.5,
  ratioHeight: 1 / 1.8,
  offsetMaskX: 20,
  offsetMaskY: 10,
  ratioMaskWidth: 1 / 1.5,
  ratioMaskHeight: 1 / 3.2,
};
const macron = {
  name: "Emmanuel Macron",
  gender: "he",
  img: "../img/characters/macron.png",
  offsetX: 19,
  offsetY: -30,
  ratioWidth: 1 / 1.5,
  ratioHeight: 1 / 1.8,
  offsetMaskX: 16,
  offsetMaskY: 12,
  ratioMaskWidth: 1 / 1.4,
  ratioMaskHeight: 1 / 3.2,
};
const putin = {
  name: "Vladimir Putin",
  gender: "he",
  img: "../img/characters/putin.png",
  offsetX: 11,
  offsetY: -30,
  ratioWidth: 1 / 1.4,
  ratioHeight: 1 / 1.8,
  offsetMaskX: 16,
  offsetMaskY: 8,
  ratioMaskWidth: 1 / 1.4,
  ratioMaskHeight: 1 / 3.2,
};
const merkel = {
  name: "Angela Merkel",
  gender: "she",
  img: "../img/characters/merkel.png",
  offsetX: 15,
  offsetY: -32,
  ratioWidth: 1 / 1.4,
  ratioHeight: 1 / 1.8,
  offsetMaskX: 16,
  offsetMaskY: 8,
  ratioMaskWidth: 1 / 1.4,
  ratioMaskHeight: 1 / 3.2,
};
const johnson = {
  name: "Boris Johnson",
  gender: "he",
  img: "../img/characters/johnson.png",
  offsetX: 16,
  offsetY: -34,
  ratioWidth: 1 / 1.3,
  ratioHeight: 1 / 1.8,
  offsetMaskX: 19,
  offsetMaskY: 12,
  ratioMaskWidth: 1 / 1.5,
  ratioMaskHeight: 1 / 3.3,
};
const jinping = {
  name: "Xi Jinping",
  gender: "he",
  img: "../img/characters/jinping.png",
  offsetX: 20,
  offsetY: -32,
  ratioWidth: 1 / 1.7,
  ratioHeight: 1 / 1.9,
  offsetMaskX: 8,
  offsetMaskY: 5,
  ratioMaskWidth: 1 / 1.2,
  ratioMaskHeight: 1 / 3.2,
};

let chosenCharacter = amlo;
