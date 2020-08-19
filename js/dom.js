$body = document.querySelector('body');
$domCanvas = document.querySelector('.canvas-dom');

// Landing page:
const $initiateDiv = document.createElement('div');
$initiateDiv.classList.add('landing-div')
$domCanvas.appendChild($initiateDiv);

const $startPhrase = document.createElement('h2');
$startPhrase.classList.add('landing-subtitle')
$startPhrase.innerText = 'Press the button below to start the game.';
$initiateDiv.appendChild($startPhrase);

const $initiateButton = document.createElement('button');
$initiateButton.classList.add('landing-button')
$initiateButton.innerText = 'Start';
$initiateDiv.appendChild($initiateButton)

//2nd landing page: instructions
$initiateButton.addEventListener('click', () => {
    $initiateDiv.style.display = 'none'
    loadInstructionPage();
})

const $instructionsDiv = document.createElement('div');
$instructionsDiv.classList.add('landing-div')

function loadInstructionPage() {
    $domCanvas.appendChild($instructionsDiv);
}

const $instructions = document.createElement('h2');
$instructions.classList.add('landing-subtitle')
$instructions.innerText = 'Game instructions:';
$instructionsDiv.appendChild($instructions);
$instructions.style.fontSize = '2.4rem'
$instructions.style.margin = '0px'

$instructionsList = document.createElement('ul')
$instructionsList.style.marginTop = '0px'
$instructionsList.classList.add('instruction-list')
$instructionsList.innerHTML = `
<li>Physical distancing: Dodge the virus <img src='../img/objects/covid.png'></li>
<li>Use face masks: Grab the falling face masks for protection <img src='../img/objects/cubrebocas.png'></li>
<li>Find the cure: Grab the spawning syringes in order to win <img src='../img/objects/seringeDef.png'><br>points and complete the level</li>
<li>Tips: Use the platforms to reach your goal <img src='../img/bg/brick-platform.png'><br>and use the arrow keys of your keyboard to move <img src='../img/objects/arrow-keys.png'></li>
`
$instructionsDiv.appendChild($instructionsList)

const $nextPageButton = document.createElement('button');
$nextPageButton.classList.add('landing-button')
$nextPageButton.style.display = 'inline'
$nextPageButton.style.fontSize = '1.4rem'
$nextPageButton.style.width = '260px'
$nextPageButton.style.marginTop = '0px'
$nextPageButton.innerText = 'Choose your character'
$instructionsDiv.appendChild($nextPageButton)

// 3rd landing page: choose your character
$nextPageButton.addEventListener('click', () => {
    $instructionsDiv.style.display = 'none'
    loadCharacterPage();
})

const $charactersDiv = document.createElement('div');
$charactersDiv.classList.add('landing-div')

function loadCharacterPage() {
    $domCanvas.appendChild($charactersDiv);
}

const $charactersDivTitle = document.createElement('h2')
$charactersDivTitle.classList.add('landing-subtitle')
$charactersDivTitle.innerText = 'Choose your character:'
$charactersDivTitle.style.marginBottom = '0px'
$charactersDiv.appendChild($charactersDivTitle)

const $characterButtons = []
const $charactersFacesDiv = document.createElement('div');
$charactersFacesDiv.classList.add('faces')
const characters = [trump, macron, putin, merkel, johnson, jinping, amlo]
characters.forEach((character, index) => {
    $charactersFacesDiv.innerHTML += `
    <div class="character-card card-${index}">
    <img src='${character.img}'>
    <h3>${character.name}</h3>
    </div>
    `
})
$charactersDiv.appendChild($charactersFacesDiv)

// const $characterCards = document.querySelectorAll('.character-card')
// $characterCards.forEach(character => {
//     $characterButtons.push(character)
// })

// Select character
$charactersFacesDiv.addEventListener('click', event => {
    switch (event.path[0].nextElementSibling.innerText) {
        case 'Donald Trump':
            chosenCharacter = trump;
            setCharacter(trump);
            break;
        case 'Emmanuel Macron':
            chosenCharacter = macron;
            setCharacter(macron);
            break;
        case 'Vladimir Putin':
            chosenCharacter = putin;
            setCharacter(putin);
            break;
        case 'Angela Merkel':
            chosenCharacter = merkel;
            setCharacter(merkel);
            break;
        case 'Boris Johnson':
            chosenCharacter = johnson;
            setCharacter(johnson);
            break;
        case 'Xi Jinping':
            chosenCharacter = jinping;
            setCharacter(jinping);
            break;
        case 'Andrés Manuel López Obrador':
            chosenCharacter = amlo;
            setCharacter(amlo);
            break;
    }
    $charactersDiv.style.display = 'none'
    loadStartingPage();
})

// 4th landing page: Start button
const $startingPage = document.createElement('div');
$startingPage.classList.add('landing-div')

function loadStartingPage() {
    $domCanvas.appendChild($startingPage);

    const $chosenCharacterDiv = document.createElement('div')
    $chosenCharacterDiv.classList.add('ready-to-play')
    $chosenCharacterDiv.style.color = 'white'
    $chosenCharacterDiv.style.fontSize = '1.3rem'
    $chosenCharacterDiv.innerHTML = `
    <h2>You chose to play with: ${chosenCharacter.name}</h2>
    <img src="${chosenCharacter.img}">
    `
    $startingPage.appendChild($chosenCharacterDiv);
}

const $startButton = document.createElement('button')
$startButton.classList.add('landing-button')
$startButton.innerText = 'Start Game'
$startButton.style.marginTop = '40px'
$startingPage.appendChild($startButton)

// Event listener: Start game
const $pauseButton = document.createElement('button')
$pauseButton.classList.add('pause-btn')
$pauseButton.style.display = 'none';
$pauseButton.innerHTML = `
<img src='../img/icons/pause.png'>
<span>PAUSE GAME</span>
`
$body.appendChild($pauseButton)

$startButton.addEventListener('click', () => {
    $domCanvas.style.display = 'none'
    $canvas.style.display = 'block'
    startGame();
})

// Pause event
$pauseButton.addEventListener('click', () => {
    const $pauseOrResume = $pauseButton.querySelector('span');
    const $pauseOrResumeImg = $pauseButton.querySelector('img')
    let pauseOrResumeText = $pauseOrResume.innerText;

    if (pauseOrResumeText === 'PAUSE GAME') {
        $pauseOrResume.innerText = 'RESUME GAME'
        $pauseOrResumeImg.src = '../img/icons/play.png'
        pauseGame()
    } else if (pauseOrResumeText === 'RESUME GAME') {
        $pauseOrResume.innerText = 'PAUSE GAME'
        $pauseOrResumeImg.src = '../img/icons/pause.png'
        startGame()
    }
})


// Restart game when gameOver
const $restartButton = document.createElement('button');
$restartButton.classList.add('pause-btn');
$restartButton.style.display = 'none';
$restartButton.innerHTML = `
<img src='../img/icons/play.png'>
<span>RESTART GAME</span>
`
$body.appendChild($restartButton)

$restartButton.addEventListener('click', () => {
    window.location.reload()
})