const containerEl = document.getElementById('container');
const difficultyEl = document.getElementById('difficulty');
const movesEl = document.getElementById('moves');
const minutesLabel = document.getElementById("minutes");
const secondsLabel = document.getElementById("seconds");
const gameInfoEl = document.getElementById("game-info");

const cardsImages = ['candle', 'candy-cane', 'packard-bell', 'chimney', 'christmas-ball', 'christmas-lights', 'christmas-tree', 'christmas-card'];

var totalSeconds = 0;

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


// Todo: add new image arrays for each theme.
// Todo: make theme selecting tabs.
// Todo: make difficulty level selection window, after selection load createTable(numberOfCards).
class Table {
    constructor(numberOfCards) {
        if (numberOfCards % 2 != 0) numberOfCards++;
        this.numberOfCards = numberOfCards;
        this.openedCards = 0;
        this.canFlip = true;
        this.moves = 0;
        this.clear();
    }

    clear() {
        this.firstCard = undefined;
        this.secondCard = undefined;
    }

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
        // Todo: delete previous table.
        let cards = [];

        this.defineRowsCols(numberOfCards);

        var tbl = document.createElement("table");
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
        containerEl.appendChild(tbl);

        // Start timer.
        totalSeconds = 0;
        this.timerInterval = setInterval(setTime, 1000);

        return cards;
    }

    getImageUrl(image) {
        return `url(img/${image}.webp)`
    }

    shuffle(arr) {
        return arr.map(i => [Math.random(), i]).sort().map(i => i[1]);
    }

    addImages(cards) {
        let shuffledCardsImages = this.shuffle(cardsImages);
        let copyCards = cards;
        for (let image = 0; image < this.numberOfCards / 2; image++) {
            const cardImage = shuffledCardsImages[image];
            for (let index = 0; index < 2; index++) {
                let randomCard = copyCards[Math.floor(Math.random() * copyCards.length)];
                copyCards = copyCards.filter(function (e) { return e !== randomCard })
                randomCard.querySelector('.card__back').style.backgroundImage = this.getImageUrl(cardImage);
            }

        }
    }

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
        if (!(this.openedCards === this.numberOfCards)) {
            return false;
        }

        clearInterval(this.timerInterval);

        setTimeout(() => {
            let replayBtn = document.createElement('div');
            replayBtn.innerHTML = `<button class="replay-btn" onclick="location.reload()">Replay</button>`;
            containerEl.appendChild(replayBtn);

            // Todo: create next button. 
        }, 500);

        return true;
    }
}

function startGame() {
    gameInfoEl.classList.add('active');

    const table = new Table(8);

    const cards = table.createTable(table.numberOfCards);

    // Adding images to cards.
    table.addImages(cards);

    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (table.canFlip) {
                table.flipCard(card);
            }
        })
    })
}


// startGame();