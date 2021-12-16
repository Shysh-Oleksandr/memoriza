const containerEl = document.getElementById('container');
const cardsImages = [];

class Table {
    constructor(numberOfCards) {
        this.numberOfCards = numberOfCards;
        this.clear();
    }

    clear() {
        this.currentCard = '';
        this.previousCard = '';
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

    flipCard(card) {
        card.classList.toggle('active');
    }

    compareCards(firstCard, secondCard) {

    }

    checkGameover() {

    }
}

const table = new Table(9);

const cards = table.createTable();

cards.forEach(card => {
    card.addEventListener('click', () => {
        table.flipCard(card);
    })
})