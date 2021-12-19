const containerEl = document.getElementById('container');
const difficultyEl = document.getElementById('difficulty');
const movesEl = document.getElementById('moves');
const minutesLabel = document.getElementById("minutes");
const secondsLabel = document.getElementById("seconds");
const gameInfoEl = document.getElementById("game-info");
const levelsEl = document.getElementById("levels");
const tabsEl = document.getElementById("tabs");

const tabsBtn = tabsEl.querySelectorAll('li');
const tabsBtnArray = [...tabsBtn];
const tabsItems = document.querySelectorAll('.levels');

const levelBtns = document.querySelectorAll('.level-btn');

const christmasImages = ['candle', 'candy-cane', 'packard-bell', 'chimney', 'christmas-ball', 'christmas-lights', 'christmas-tree', 'christmas-card', 'christmas-present', 'christmas-wreath', 'church', 'cocoa', 'cookie', 'elf', 'fireworks', 'fruit-cake', 'gingerbread-man', 'hat', 'holly', 'knitting', 'mulled-wine', 'nutcracker', 'reindeer', 'roast-chicken', 'santa-claus', 'sleigh', 'snowflake', 'snow-globe', 'snowman', 'star', 'stocking', 'christmas-ornament'];
const halloweenImages = ['bag', 'bat', 'bible', 'bones', 'broom', 'calendar', 'candles', 'candy', 'cat', 'coffin', 'devil', 'dracula', 'eye-ball', 'frankenstein', 'furnace', 'ghost', 'grave', 'grim-reaper', 'haunted-house', 'letter', 'mummy', 'pumkin', 'scythe', 'shirt', 'skull', 'spider', 'spider-web', 'tombstone', 'trick-or-treat_1', 'witch', 'witch-hat_1', 'zombie'];
const musicImages = ['accordion', 'acoustic-guitar', 'bagpipes', 'bass-drum', 'bass-guitar', 'bongo', 'cello', 'chimes', 'clave', 'cowbell', 'cymbal', 'drum-set', 'flute', 'french-horn', 'gong', 'harmonica', 'harp', 'keyboard', 'maracas', 'marimba', 'melodica', 'music', 'musical-note', 'oboe', 'piano', 'saxophone', 'tambourine', 'triangle', 'trombone', 'trumpet', 'violin', 'xylophone'];

var totalSeconds = 0;

var table, cards, tbl, currentLevel, currentThemeIndex = 1;

const themes = [
    {
        'imagesTheme': halloweenImages,
        'imagesFolder': 'halloween'
    },
    {
        'imagesTheme': christmasImages,
        'imagesFolder': 'christmas'
    },
    {
        'imagesTheme': musicImages,
        'imagesFolder': 'music'
    }
];

// Container for buttons.
let btnsContainer = document.createElement('div');
btnsContainer.classList.add("btns-container");

var cardsForLevels = [
    {
        "level": 1,
        "numberOfCards": 4
    },
    {
        "level": 2,
        "numberOfCards": 6
    },
    {
        "level": 3,
        "numberOfCards": 8
    },
    {
        "level": 4,
        "numberOfCards": 24
    },
    {
        "level": 5,
        "numberOfCards": 36
    },
    {
        "level": 6,
        "numberOfCards": 54
    },
    {
        "level": 7,
        "numberOfCards": 64
    }
];

// Tabs
tabsBtn.forEach(tab => {
    tab.addEventListener('click', (e) => {
        e.preventDefault();
        let currentBtn = tab;
        let tabId = currentBtn.querySelector('a').getAttribute("href");
        let currentTab = document.querySelector(tabId);

        currentTheme = tabId;

        if (!currentBtn.classList.contains('active')) {
            currentThemeIndex = tabsBtnArray.indexOf(tab);

            tabsBtn.forEach(item => {
                item.classList.remove('active');
            });

            tabsItems.forEach(item => {
                item.classList.remove('active');
            });

            currentBtn.classList.add('active');
            currentTab.classList.add('active');
        }
    })
});

// Make active second tab.
if (tabsBtn[1]) {
    tabsBtn[1].click();
}
else {
    tabsBtn[0].click();
}

// Level buttons
var levelsNumber = cardsForLevels.length;

levelBtns.forEach(levelBtn => {
    levelBtn.addEventListener('click', () => {
        let levelNumber = levelBtn.querySelector('.level-number').innerText;
        const numberOfCards = getNumberOfCards(levelNumber);
        loadGame(numberOfCards, levelNumber);
    })
});

function getNumberOfCards(level) {
    let numberOfCards;
    cardsForLevels.forEach(element => {
        if (element.level == level) {
            numberOfCards = element.numberOfCards;
        }
    });
    return numberOfCards;
}

function getNextLevel() {
    if (currentLevel > levelsNumber) {
        return currentLevel;
    }
    else {
        let nextLevel = parseInt(currentLevel) + 1;
        return nextLevel;
    }
}

// Set card's height equel to width.
function setCardsSize() {
    cards.forEach(card => {
        let cardsStyle = getComputedStyle(card);
        card.style.height = `${parseInt(cardsStyle.width)}px`;
    });
    let tableElStyle = getComputedStyle(tbl);
    gameInfoEl.style.width = `${parseInt(tableElStyle.width)}px`;
}

// Timer functions
function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}
// /Timer functions

function clearTable() {
    if (tbl) {
        tbl.remove();
    }
    table = null;
    cards = [];
}

// Image functions.
function getImageUrl(image) {
    return `url(img/${themes[currentThemeIndex].imagesFolder}/${image}.webp)`;
}

function shuffle(arr) {
    return arr.map(i => [Math.random(), i]).sort().map(i => i[1]);
}

// Table class
class Table {
    constructor(numberOfCards) {
        if (numberOfCards % 2 != 0) numberOfCards++;
        this.numberOfCards = numberOfCards;
        this.openedCards = 0;
        this.canFlip = true;
        this.moves = 0;
        this.timerInterval = null;
        this.clear();
    }

    clear() {
        this.firstCard = undefined;
        this.secondCard = undefined;
    }

    // Table creation.
    defineRowsCols(numberOfCells) {
        let rootNumber = Math.sqrt(numberOfCells);
        if (rootNumber % 1 === 0) {
            this.cols = rootNumber;
            this.rows = rootNumber;
            return;
        }

        if (numberOfCells % 6 === 0) {
            this.cols = 6;
            this.rows = numberOfCells / this.cols;
        }
        else if (numberOfCells % 5 === 0) {
            this.cols = 5;
            this.rows = numberOfCells / this.cols;
        }
        else if (numberOfCells % 4 === 0) {
            this.cols = 4;
            this.rows = numberOfCells / this.cols;
        }
        else if (numberOfCells % 3 === 0) {
            this.cols = 3;
            this.rows = numberOfCells / this.cols;
        }
        else {
            this.cols = (numberOfCells > 20) ? 10 : 7;
            this.rows = Math.floor(numberOfCells / this.cols);
        }
    }

    createTable(numberOfCards) {
        let cards = [];

        this.defineRowsCols(numberOfCards);

        tbl = document.createElement("table");
        var tblBody = document.createElement("tbody");

        for (var i = 0; i < this.rows; i++) {
            var row = document.createElement("tr");

            for (var j = 0; j < this.cols; j++) {
                var cell = document.createElement("td");
                cell.innerHTML = `<div class="card__inner">
                    <div class="card__front"></div>
                    <div class="card__back"></div>
                </div>`;
                cell.classList.add('table__col');
                cell.classList.add('card');

                row.appendChild(cell);
                cards.push(cell);
            }

            tblBody.appendChild(row);
        }

        tbl.appendChild(tblBody);

        containerEl.innerHTML = '';
        containerEl.appendChild(tbl);

        // Create buttons.
        btnsContainer.innerHTML = '';
        // Back to menu button.
        let menuBtn = document.createElement('button');
        menuBtn.classList.add('menu-btn');
        menuBtn.innerText = 'Back to menu';
        menuBtn.addEventListener('click', () => {
            containerEl.innerHTML = '';
            clearInterval(this.timerInterval);
            toggleMenuGame();
        });
        btnsContainer.appendChild(menuBtn);

        // Replay button
        let replayBtn = document.createElement('button');
        replayBtn.classList.add('replay-btn');
        replayBtn.innerText = 'Replay';
        replayBtn.addEventListener('click', () => {
            clearInterval(this.timerInterval);
            loadGame(getNumberOfCards(currentLevel), currentLevel);
        });
        btnsContainer.appendChild(replayBtn);

        containerEl.appendChild(btnsContainer);

        // Start timer.
        totalSeconds = 0;
        secondsLabel.innerHTML = pad(totalSeconds % 60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));

        this.timerInterval = setInterval(setTime, 1000);

        return cards;
    }

    addImages(cards) {
        let shuffledCardsImages = shuffle(themes[currentThemeIndex].imagesTheme);
        let copyCards = cards;
        for (let image = 0; image < this.numberOfCards / 2; image++) {
            const cardImage = shuffledCardsImages[image];
            for (let index = 0; index < 2; index++) {
                let randomCard = copyCards[Math.floor(Math.random() * copyCards.length)];
                copyCards = copyCards.filter(function (e) { return e !== randomCard })
                randomCard.querySelector('.card__back').style.backgroundImage = getImageUrl(cardImage);
            }
        }
    }
    // /Table creation.

    // Mechanics
    flipCard(card) {
        if (card.classList.contains('active')) return;
        card.classList.add('active');

        if (!this.firstCard) {
            this.firstCard = card;
        }
        else {
            this.secondCard = card;
            this.moves++;
            movesEl.innerText = `Moves: ${this.moves}`;
            this.compareCards(this.firstCard, this.secondCard);
        }

    }

    compareCards(firstCard, secondCard) {
        let firstBg = firstCard.querySelector('.card__back').style.backgroundImage;
        let secondBg = secondCard.querySelector('.card__back').style.backgroundImage;

        if (firstBg == secondBg) {
            this.openedCards += 2;
            this.checkGameover();
        }
        else {
            this.canFlip = false;
            setTimeout(() => {
                firstCard.classList.remove('active');
                secondCard.classList.remove('active');

                this.canFlip = true;
            }, 1000);
        }

        this.clear();
    }

    checkGameover() {
        if (this.openedCards != this.numberOfCards) {
            return false;
        }

        clearInterval(this.timerInterval);

        setTimeout(() => {
            // Next level button.
            if (currentLevel != levelsNumber) {
                let nextLevelBtn = document.createElement('button');
                nextLevelBtn.classList.add('next-btn');
                nextLevelBtn.innerText = 'Next';
                nextLevelBtn.addEventListener('click', () => {
                    loadGame(getNumberOfCards(getNextLevel()), getNextLevel());
                });

                btnsContainer.appendChild(nextLevelBtn);
            }
        }, 500);

        return true;
    }

    // /Mechanics
}

function toggleMenuGame() {
    gameInfoEl.classList.toggle('active');
    levelsEl.classList.toggle('active');
    tabsEl.classList.toggle('active');
}

function loadGame(numberOfCards, levelNumber) {
    clearTable();

    currentLevel = levelNumber;

    difficultyEl.innerText = `Level ${levelNumber}`;
    gameInfoEl.classList.add('active');
    levelsEl.classList.remove('active');
    tabsEl.classList.remove('active');

    table = new Table(numberOfCards);

    movesEl.innerText = `Moves: ${table.moves}`;

    cards = table.createTable(table.numberOfCards);

    // Adding images to cards.
    table.addImages(cards);

    setCardsSize();

    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (table.canFlip) {
                table.flipCard(card);
            }
        })
    });

    window.addEventListener('resize', setCardsSize);
}