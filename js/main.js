var cards = [
{
rank: "queen",
suit: "hearts",
cardImage: "images/queen-of-hearts.png"
},
{
rank: "queen",
suit: "diamonds",
cardImage: "images/queen-of-diamonds.png"
},
{
rank: "king",
suit: "hearts",
cardImage: "images/king-of-hearts.png"
},
{
rank: "king",
suit: "diamonds",
cardImage: "images/king-of-diamonds.png"
}
];
var cardsInPlay = [];



var checkForMatch = function () {
	if (cardsInPlay.length === 2) {
			if (cardsInPlay[0] === cardsInPlay[1]) {
				document.getElementById("notify").textContent = "You found a match!";
			}
			else {
				document.getElementById("notify").textContent = "Sorry, try again.";
			};
			document.body.addEventListener('click', resetBoard); //delays reset till after a 3rd click

		}
};

var flipCard = function () {
	var cardId = this.getAttribute("data-id");
	this.setAttribute("src", cards[cardId].cardImage);
	cardsInPlay.push(cards[cardId].rank);
	window.setTimeout(checkForMatch, 30);	//delays check till after img flip actually renders
};

var createBoard = function () {
	for (var i = 0; i < cards.length; i++) {
		var cardId = Math.floor(Math.random() * 4); //randomizes card value on flip, can cause duplicates
		var cardElement = document.createElement("img");
		cardElement.setAttribute("src", "images/back.png");
		cardElement.setAttribute("data-id", cardId);
		cardElement.addEventListener("click", flipCard);
		document.getElementById("game-board").appendChild(cardElement);
	}
};

var resetBoard = function () {
	for (var i = 0; i < cards.length; i++) {
		var cardElement = document.getElementsByTagName("img")[i];
		cardElement.setAttribute("src", "images/back.png");	//flip cards back down
		document.getElementById("notify").textContent = "Find two Queens or Kings to raise your score!"	//reset notification
		cardsInPlay = [];
		document.body.removeEventListener('click', resetBoard); //to remove reset delay 
	}
}

createBoard();

