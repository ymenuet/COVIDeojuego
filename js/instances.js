const board = new Board(2000, 900, "../img/bg/backgroundCity.png");
let character;
let winSeringe = new WinSeringe();
let platforms = [
    new Platform(100, 320),
    new Platform(400, 200, true),
    new Platform(700, 280),
];
let pedestrians = [];

let objects = [];