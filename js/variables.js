const $canvas = document.querySelector("canvas");
const ctx = $canvas.getContext("2d");

let frames = 0;
const gravity = 0.98;
const friction = 0.8;
let intervalId;
let keys = [];
let enemies = [];
let faceMasks = [];
let seringes = [];

const amlo = {
  name: "Andrés Manuel López Obrador",
  gender: "he",
  img: "../img/characters/amlo.png",
  offsetX: 19,
  offsetY: -35,
  ratioWidth: 1 / 1.6,
  ratioHeight: 1 / 1.6,
  offsetMaskX: 22,
  offsetMaskY: 7,
  ratioMaskWidth: 1 / 1.6,
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
