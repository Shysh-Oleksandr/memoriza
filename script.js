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

// #region Halloween bg drip effect
// https://gist.github.com/bendc/d7f3dbc83d0f65ca0433caf90378cd95
var supportsES6 = function () { try { return new Function("(a=0)=>a"), !0 } catch (n) { return !1 } };
//console.log("supportsES6: " + supportsES6());

// Safari only
var isSafari = (function () {
    var isIt = false;
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('safari') != -1) {
        if (!(ua.indexOf('chrome') > -1)) {

            // Safari only
            isIt = true;
            //      console.log("99 browsers and Safari's just one.");
            document.documentElement.className += " isSafari";
        }
    }
    return isIt;
}());

// Build the SVG elements from a data array
// Elements reduced drastically to improve performance.
var svgElements = [
    // First object MUST be an element
    // Sub-elements may follow (only animate currently catered for)
    {
        ellipse: { id: "drp13", fill: "#20923A", cx: "30.25%", cy: "-6%" },
        animate: { rx: { values: "1.35%; 0.15%; 1.35%", dur: "6s" }, ry: { values: "-6%; 55%; -6%", dur: "6s" } }
    },
    {
        ellipse: { id: "drp14", fill: "#8CBF40", cx: "30.7%", cy: "-6%" },
        animate: { rx: { values: "1.125%; 0.2%; 1.125%;", dur: "5.5s" }, ry: { values: "-5%; 53%; -5%", dur: "5.5s" } }
    },

    {
        ellipse: { id: "drp30", fill: "#084", cx: "45%", cy: "2%", rx: "13.25%" },
        animate: { ry: { values: "-6%; 5%; -6%", dur: "5s" } }
    },
    {
        ellipse: { id: "drp31", fill: "#294", cx: "34%", cy: "-6%" },
        animate: { rx: { values: "1%; 4%; 1%", dur: "5s" }, ry: { values: "40%; 24%; 40%", dur: "5s" } }
    },
    {
        ellipse: { id: "drp32", fill: "#3a3", cx: "39.15%", cy: "-6%" },
        animate: { rx: { values: "1.5%; 4%; 1.5%", dur: "6s" }, ry: { values: "42%; 20%; 42%", dur: "6s" } }
    },
    {
        ellipse: { id: "drp33", fill: "#084", cx: "42.8%", cy: "-6%" },
        animate: { rx: { values: "1%; 3%; 1%", dur: "7s" }, ry: { values: "40%; 10%; 40%", dur: "7s" } }
    },
    {
        ellipse: { id: "drp34", fill: "#294", cx: "48%", cy: "-6%" },
        animate: { rx: { values: "5%; 1%; 5%; ", dur: "5s" }, ry: { values: "0%; 19%; 0%", dur: "5s" } }
    },
    {
        ellipse: { id: "drp34a", fill: "#393", cx: "51%", cy: "0%" },
        animate: { rx: { values: "7%; 1.5%; 7%; ", dur: "6s" }, ry: { values: "0%; 14%; 0%", dur: "6s" } }
    },
    {
        ellipse: { id: "drp35", fill: "#494", cx: "56%", cy: "-6%" },
        animate: { rx: { values: "5%; 1%; 5%", dur: "4s" }, ry: { values: "5%; 32%; 5%;", dur: "4s" } }
    },
    {
        ellipse: { id: "drp36", fill: "#5a5", cx: "56.9%", cy: "-6%" },
        animate: { rx: { values: "1.5%; .6%; 1.5%", dur: "6s" }, ry: { values: "15%; 35%; 15%;", dur: "6s" } }
    },

    {
        ellipse: { id: "drp40", fill: "#084", cx: "63.4%", cy: "3%" },
        animate: { rx: { values: "3%; 2.6%; 3%", dur: "5s" }, ry: { values: "5%; 10%; 5%;", dur: "5s" } }
    },
    {
        ellipse: { id: "drp41", fill: "#494", cx: "62.5%", cy: "-6%" },
        animate: { rx: { values: "0.5%; 1%; 0.5%;", dur: "6s" }, ry: { values: "60%; 16%; 60%", dur: "6s" } }
    },
    {
        ellipse: { id: "drp42", fill: "#283", cx: "65.25%", cy: "0%" },
        animate: { rx: { values: "0.5%; 1%; 0.5%;", dur: "5s" }, ry: { values: "40%; 10%; 40%", dur: "5s" } }
    }
];

window.addEventListener("load", function () {

    var drippy_goo = (function (elementData) {

        "use strict";

        if (!supportsES6()) { return; }
        if (document.documentElement.classList.contains("mobile")) { return; }

        const svgClass = "svg-drips";
        const siblingClass = "hero_bg";
        const groupId = "gooeyDrips";

        const _getNode = (node, values) => {
            if (!values || values === "") { return false; }
            node = document.createElementNS("http://www.w3.org/2000/svg", node);
            for (const property in values) {
                if (values[property] && values[property] !== "") {
                    node.setAttributeNS(null, property, values[property]);
                }
            }
            return node;
        };

        // Possibly update to allow any child element rather than specifically animate
        const _addAnimates = (element, el) => {
            if (el.animate) {
                const animateNames = Object.keys(el.animate);
                for (const name of animateNames) {
                    el.animate[name].attributeName = name;
                    el.animate[name].repeatCount = "indefinite";
                    const animate = _getNode("animate", el.animate[name]);
                    element.appendChild(animate);
                }
            }
            return element;
        };

        // Add elements
        const _addElements = (svg, elementData) => {

            // Add group for reference on other assets
            let g = _getNode("g", { id: groupId });

            for (const el of elementData) {

                // First object MUST be the element
                const elName = Object.keys(el)[0];
                if (!elName) { continue; }
                if (isSafari) {
                    el[elName].fill = ""; // As Safari makes it's own colors up around the edges
                }
                let element = _getNode(elName, el[elName]);

                // Animate is the only child-element catered for
                element = _addAnimates(element, el);
                g.appendChild(element);
            }
            svg.appendChild(g);
            return svg;
        };

        const _embedSVG = (svg, clss) => {
            const referenceNode = document.querySelector(clss);
            if (referenceNode && svg) {
                referenceNode.parentNode.insertBefore(svg, referenceNode.nextSibling);
            }
        };

        const init = (() => {
            let svg = _getNode("svg", { class: svgClass, focusable: "false", role: "presentational" });
            svg = _addElements(svg, elementData);
            _embedSVG(svg, "." + siblingClass);
        })();
    })(svgElements);

}, false);
//#endregion

const themes = [
    {
        'imagesTheme': halloweenImages,
        'imagesFolder': 'halloween',
        'themeClass': 'halloween-theme'
    },
    {
        'imagesTheme': christmasImages,
        'imagesFolder': 'christmas',
        'themeClass': 'christmas-theme'
    },
    {
        'imagesTheme': musicImages,
        'imagesFolder': 'music',
        'themeClass': 'music-theme'
    }
];

// Container for buttons.
let btnsContainer = document.createElement('div');
btnsContainer.classList.add("btns-container");

var cardsForLevels = [
    {
        "level": 1,
        "numberOfCards": 8
    },
    {
        "level": 2,
        "numberOfCards": 12
    },
    {
        "level": 3,
        "numberOfCards": 16
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

        if (!currentBtn.classList.contains('active')) {
            currentThemeIndex = tabsBtnArray.indexOf(tab);

            document.body.className = '';
            document.body.classList.add(themes[currentThemeIndex].themeClass);

            tabsBtn.forEach(item => {
                item.classList.remove('active');
            });

            tabsItems.forEach(item => {
                item.classList.remove('active');
            });

            currentBtn.classList.add('active');
            currentTab.classList.add('active');

            let halloweenDripEl = document.querySelector('.hero');
            halloweenDripEl.classList.remove('active');
            // Style for Halloween theme.
            if (currentThemeIndex == 0) {
                halloweenDripEl.classList.add('active');
            }
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

        if (numberOfCells == 12) {
            this.cols = 4;
            this.rows = numberOfCells / this.cols;
        }
        else if (numberOfCells == 24) {
            this.cols = 6;
            this.rows = numberOfCells / this.cols;
        }
        else if (numberOfCells == 8) {
            this.cols = 4;
            this.rows = numberOfCells / this.cols;
        }
        else if (numberOfCells == 54) {
            this.cols = 9;
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
            movesEl.innerText = `Moves: ${this.moves} `;
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

    difficultyEl.innerText = `Level ${levelNumber} `;
    gameInfoEl.classList.add('active');
    levelsEl.classList.remove('active');
    tabsEl.classList.remove('active');

    table = new Table(numberOfCards);

    movesEl.innerText = `Moves: ${table.moves} `;

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