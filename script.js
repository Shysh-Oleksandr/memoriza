const containerEl = document.getElementById('container');
const cardsImages = ['camera', 'cameraTape', 'cameraVideo', 'cassete', 'minus', 'pcVideo', 'play', 'plus'];

class Table {
    constructor(numberOfCards) {
        this.numberOfCards = numberOfCards;
        this.openedCards = 0;
        this.clear();
    }

    clear() {
        this.firstCard = undefined;
        this.secondCard = undefined;
    }

    defineRowsCols(numberOfCells) {
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
            this.cols = (numberOfCells>20) ? 10 : 7;
            this.rows = numberOfCells / this.cols;
        }
    }

    createTable() {
        let cards = [];

        this.defineRowsCols(this.numberOfCards);

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

        return cards;
    }

    getImageUrl(image) {
        return `url(img/${image}.png)`
    }

    addImages() {
        let copyCards = cards;
        cardsImages.forEach(image => {
            for (let index = 0; index < 2; index++) {
                let randomCard = copyCards[Math.floor(Math.random() * copyCards.length)];
                copyCards = copyCards.filter(function(e) { return e !== randomCard })
                randomCard.querySelector('.card__back').style.backgroundImage = this.getImageUrl(image);
            }
        });

    }

    flipCard(card) {
        if(card.classList.contains('active')) return;
        card.classList.add('active');

        if(!this.firstCard) {
            this.firstCard = card;
        }
        else {
            this.secondCard = card;
            this.compareCards(this.firstCard, this.secondCard);
        }
        
    }

    compareCards(firstCard, secondCard) {
        let firstBg = firstCard.querySelector('.card__back').style.backgroundImage;
        let secondBg = secondCard.querySelector('.card__back').style.backgroundImage;

        if(firstBg == secondBg) {
            this.openedCards += 2;
            this.checkGameover();
        }
        else {
            setTimeout(() => {
                firstCard.classList.remove('active');
                secondCard.classList.remove('active');
            }, 1000);
        }

        this.clear();
    }

    checkGameover() {
        if(!(this.openedCards === this.numberOfCards)) {
            return false;
        }

        alert("You win!");
        return true;
    }
}

const table = new Table(16);

const cards = table.createTable();

table.addImages();

cards.forEach(card => {
    card.addEventListener('click', () => {
        table.flipCard(card);
    })
})
