const colors = ["red", "green", "blue", "yellow"];

let deck = [];
let player = [];
let computer = [];
let topCard = null;

const playerCards = document.getElementById("playerCards");
const computerCards = document.getElementById("computerCards");
const topCardDiv = document.getElementById("topCard");
const message = document.getElementById("message");

function createDeck() {
    deck = [];

    colors.forEach(color => {
        for (let i = 0; i <= 9; i++) {
            deck.push({
                color: color,
                value: i
            });
        }
    });
}

function shuffle() {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function dealCards() {

    player = [];
    computer = [];

    for (let i = 0; i < 7; i++) {
        player.push(deck.pop());
        computer.push(deck.pop());
    }

    topCard = deck.pop();
}

function renderTopCard() {

    topCardDiv.className = "card " + topCard.color;
    topCardDiv.innerHTML = topCard.value;
}

function renderPlayer() {

    playerCards.innerHTML = "";

    player.forEach((card, index) => {

        const div = document.createElement("div");

        div.className = "card " + card.color;

        div.innerHTML = card.value;

        div.onclick = () => playCard(index);

        playerCards.appendChild(div);

    });

}

function renderComputer() {

    computerCards.innerHTML = "";

    computer.forEach(() => {

        const div = document.createElement("div");

        div.className = "card back";

        div.innerHTML = "?";

        computerCards.appendChild(div);

    });

}

function playCard(index) {

    let card = player[index];

    if (
        card.color === topCard.color ||
        card.value === topCard.value
    ) {

        topCard = card;

        player.splice(index, 1);

        render();

        if (player.length === 0) {

            message.innerHTML = "🎉 You Win!";

            return;
        }

        setTimeout(computerTurn, 700);

    } else {

        alert("Invalid Card!");

    }

}
