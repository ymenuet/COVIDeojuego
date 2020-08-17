const $canvas = document.querySelector("canvas");
const ctx = $canvas.getContext("2d");

let frames = 0;
const gravity = 0.98;
const friction = 0.8;
let intervalId;
let keys = [];