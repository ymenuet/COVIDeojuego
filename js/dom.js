$body = document.querySelector("body");
$domCanvas = document.querySelector(".canvas-dom");

// Landing page:
const $initiateDiv = document.createElement("div");
$initiateDiv.classList.add("landing-div");
$domCanvas.appendChild($initiateDiv);

const $startPhrase = document.createElement("h2");
$startPhrase.classList.add("landing-subtitle");
$startPhrase.innerText = "Press the button below to start the game.";
$initiateDiv.appendChild($startPhrase);

const $initiateButton = document.createElement("button");
$initiateButton.classList.add("landing-button");
$initiateButton.innerText = "Start";
$initiateButton.style.marginBottom = '30px'
$initiateDiv.appendChild($initiateButton);

const $creditsButton = document.createElement("button");
$creditsButton.classList.add("landing-button");
$creditsButton.innerText = "Credits";
$initiateDiv.appendChild($creditsButton);

// Credits page
const $creditsDiv = document.createElement('div')
$creditsDiv.classList.add('credits');
$creditsDiv.innerHTML = `
<h2>Credits</h2>
<h3>Game developed by:</h3>
<p>Edgar VILLAVICENCIO CASTILLO<br>
&<br>
Yvan MENUET</p>
<h3>Special thanks to:</h3>
<p>Joss CORREA & Jorge MARTÍNEZ</p>
<img src='../img/icons/ironhack-logo.png'>
`

$creditsButton.addEventListener('click', () => {
    $startPhrase.style.display = 'none';
    $creditsButton.style.display = 'none';
    $initiateButton.style.order = '2'
    $initiateButton.style.margin = '20px 0 0 0'
    $initiateDiv.appendChild($creditsDiv)
})

//2nd landing page: instructions
$initiateButton.addEventListener("click", () => {
    startMusic.play();

    $initiateDiv.style.display = "none";
    loadInstructionPage();
});

const $instructionsDiv = document.createElement("div");
$instructionsDiv.classList.add("landing-div");

function loadInstructionPage() {
    $domCanvas.appendChild($instructionsDiv);
}

const $instructions = document.createElement("h2");
$instructions.classList.add("landing-subtitle");
$instructions.innerText = "Game instructions:";
$instructionsDiv.appendChild($instructions);
$instructions.style.fontSize = "2.4rem";
$instructions.style.margin = "0px";

$instructionsList = document.createElement("ul");
$instructionsList.style.marginTop = "0px";
$instructionsList.classList.add("instruction-list");
$instructionsList.innerHTML = `
<li>Stay home: Dodge the virus <img src='../img/objects/covid.png'></li>
<li>Social distance: Avoid people WITHOUT face masks <img src='../img/characters/pedestrian.png'></li>
<li>Protect yourself and those around you: Grab the falling face masks for protection <img src='../img/objects/cubrebocas.png'></li>
<li>Develop the vaccine: Grab the spawning syringes in order to win <img src='../img/objects/seringeDef.png'><br>points and complete the level</li>
<li>Tips: Use the platforms to reach your goal <img src='../img/bg/brick-platform.png'><br>and the arrow keys of your keyboard to move and jump <img src='../img/objects/arrow-keys.png'></li>
`;
$instructionsDiv.appendChild($instructionsList);

const $nextPageButton = document.createElement("button");
$nextPageButton.classList.add("landing-button");
$nextPageButton.style.display = "inline";
$nextPageButton.style.fontSize = "1.4rem";
$nextPageButton.style.width = "260px";
$nextPageButton.style.marginTop = "0px";
$nextPageButton.innerText = "Choose your character";
$instructionsDiv.appendChild($nextPageButton);

// 3rd landing page: choose your character
$nextPageButton.addEventListener("click", () => {
    $instructionsDiv.style.display = "none";
    loadCharacterPage();
});

const $charactersDiv = document.createElement("div");
$charactersDiv.classList.add("landing-div");

function loadCharacterPage() {
    $domCanvas.appendChild($charactersDiv);
}

const $charactersDivTitle = document.createElement("h2");
$charactersDivTitle.classList.add("landing-subtitle");
$charactersDivTitle.innerText = "Choose your character:";
$charactersDivTitle.style.marginBottom = "0px";
$charactersDiv.appendChild($charactersDivTitle);

const $characterButtons = [];
const $charactersFacesDiv = document.createElement("div");
$charactersFacesDiv.classList.add("faces");
const characters = [trump, macron, putin, merkel, johnson, jinping, amlo];
characters.forEach((character, index) => {
    $charactersFacesDiv.innerHTML += `
    <div class="character-card card-${index}">
    <img src='${character.img}'>
    <h3>${character.name}</h3>
    </div>
    `;
});
$charactersDiv.appendChild($charactersFacesDiv);

// Select character
$charactersFacesDiv.addEventListener("click", (event) => {
    switch (event.path[0].nextElementSibling.innerText) {
        case "Donald Trump":
            chosenCharacter = trump;
            setCharacter(trump);
            break;
        case "Emmanuel Macron":
            chosenCharacter = macron;
            setCharacter(macron);
            break;
        case "Vladimir Putin":
            chosenCharacter = putin;
            setCharacter(putin);
            break;
        case "Angela Merkel":
            chosenCharacter = merkel;
            setCharacter(merkel);
            break;
        case "Boris Johnson":
            chosenCharacter = johnson;
            setCharacter(johnson);
            break;
        case "Xi Jinping":
            chosenCharacter = jinping;
            setCharacter(jinping);
            break;
        case "Andrés Manuel López Obrador":
            chosenCharacter = amlo;
            setCharacter(amlo);
            break;
    }
    $charactersDiv.style.display = "none";
    loadStartingPage();
});

// 4th landing page: Start button
const $startingPage = document.createElement("div");
$startingPage.classList.add("landing-div");

function loadStartingPage() {
    $domCanvas.appendChild($startingPage);

    const $chosenCharacterDiv = document.createElement("div");
    $chosenCharacterDiv.classList.add("ready-to-play");
    $chosenCharacterDiv.style.color = "white";
    $chosenCharacterDiv.style.fontSize = "1.3rem";
    $chosenCharacterDiv.innerHTML = `
    <h2>You chose to play with: ${chosenCharacter.name}</h2>
    <img src="${chosenCharacter.img}">
    `;
    $startingPage.appendChild($chosenCharacterDiv);
}

const $startButton = document.createElement("button");
$startButton.classList.add("landing-button");
$startButton.innerText = "Start Game";
$startButton.style.marginTop = "20px";
$startButton.style.order = '2'
$startButton.style.position = 'relative'
$startButton.style.left = '5px'
$startingPage.appendChild($startButton);

// Event listener: Start game

const $pauseButton = document.createElement("button");
$pauseButton.classList.add("pause-btn");
$pauseButton.style.display = "none";
$pauseButton.innerHTML = `
<img src='../img/icons/pause.png'>
<span>PAUSE GAME</span>
`;
$body.appendChild($pauseButton);

$startButton.addEventListener("click", () => {
    startMusic.pause();
    generalMusic.play();
    backgroundSound.play();
    $domCanvas.style.display = "none";
    $canvas.style.display = "block";
    startGame();
});

// Pause event
$pauseButton.addEventListener("click", () => {
    const $pauseOrResume = $pauseButton.querySelector("span");
    const $pauseOrResumeImg = $pauseButton.querySelector("img");
    let pauseOrResumeText = $pauseOrResume.innerText;

    if (pauseOrResumeText === "PAUSE GAME") {
        $pauseOrResume.innerText = "RESUME GAME";
        $pauseOrResumeImg.src = "../img/icons/play.png";
        backgroundSound.pause();
        pauseGame();
    } else if (pauseOrResumeText === "RESUME GAME") {
        $pauseOrResume.innerText = "PAUSE GAME";
        $pauseOrResumeImg.src = "../img/icons/pause.png";
        backgroundSound.play();
        startGame();
    }
});

// Next level button
const $nextButton = document.createElement("button");
$nextButton.classList.add("pause-btn");
$nextButton.style.display = "none";
$nextButton.innerHTML = `
<img src='../img/icons/play.png'>
<span>NEXT LEVEL</span>
`;
$body.appendChild($nextButton);

$nextButton.addEventListener("click", () => {
    addLevel();
});

// Restart game when gameOver
const $restartButton = document.createElement("button");
$restartButton.classList.add("pause-btn");
$restartButton.style.display = "none";
$restartButton.innerHTML = `
<img src='../img/icons/play.png'>
<span>RESTART GAME</span>
`;
$body.appendChild($restartButton);

$restartButton.addEventListener("click", () => {
    window.location.reload();
});