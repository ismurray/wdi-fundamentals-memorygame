var cards = [
{
rank: "sun",
suit: "hearts",
cardImage: "images/sun.png"
},
{
rank: "moon",
suit: "diamonds",
cardImage: "images/moon.png"
},
{
rank: "jester",
suit: "hearts",
cardImage: "images/jester.png"
},
{
rank: "knight",
suit: "hearts",
cardImage: "images/knight.png"
},
{
rank: "vizier",
suit: "diamonds",
cardImage: "images/vizier.png"
}
];
var cardsInPlay = [];
var notify = document.getElementById("lblNotify").textContent;
var failCount = 0;



var checkForMatch = function () {
	if (cardsInPlay.length === 2) {
			if (cardsInPlay[0] === cardsInPlay[1]) {
				notify = "You found a match! Reshuffling...";
				document.getElementById("lblScore").textContent = parseInt(document.getElementById("lblScore").textContent) + 1; //raises score on match
				document.body.addEventListener('click', resetBoard); //delays reshuffle till after a 3rd click
			}
			else {
				failCount = failCount + 1
				if (failCount === 3) {
					notify = "Sorry, you're out of tries! Reshuffling...";
					document.body.addEventListener('click', resetBoard); //delays reshuffle till after a 3rd click
				}
				else {
					notify = "Sorry, try again.";
					document.body.addEventListener('click', cardsDown); //delays reset till after a 3rd click
				}
				
			};
			document.body.addEventListener('click', cardsDown); //delays reset till after a 3rd click
			document.getElementById("lblNotify").textContent = notify

		}
};

var flipCard = function () {
	var cardId = this.getAttribute("data-id");
	if (this.getAttribute("src") === "images/new-back.png") {	//prevents self matching on one card
		this.setAttribute("src", cards[cardId].cardImage);
		cardsInPlay.push(cards[cardId].rank);
		window.setTimeout(checkForMatch, 30);	//delays check till after img flip actually renders
	}
	
};

var createBoard = function () {
	for (var i = 0; i < 8; i++) {
		var cardId = Math.floor(Math.random() * 4); //randomizes card value on flip, can cause duplicates
		var cardElement = document.createElement("img");
		cardElement.setAttribute("src", "images/new-back.png");
		cardElement.setAttribute("data-id", cardId);
		cardElement.addEventListener("click", flipCard);
		document.getElementById("game-board").appendChild(cardElement);
	}
};

var cardsDown = function () {
	for (var i = 0; i < 8; i++) {
		var cardElement = document.getElementsByTagName("img")[i];
		cardElement.setAttribute("src", "images/new-back.png");	//flip cards back down
		document.getElementById("lblNotify").textContent = "Find two Queens or Kings to raise your score!"	//reset notification
		cardsInPlay = [];
		document.body.removeEventListener('click', cardsDown); //to remove reset delay 
	}
}

var resetBoard = function () {
	var parent = document.getElementById("game-board");
	var cardPic = document.getElementsByTagName("img")[0];
	cardsInPlay = [];
	failCount = 0;
	document.body.removeEventListener('click', resetBoard); //to remove reshuffle delay 
	for (var i = 0; i < 8; i++) {
		var cardPic = document.getElementsByTagName("img")[0];
		parent.removeChild(cardPic);
	};
	createBoard();
};

createBoard();

