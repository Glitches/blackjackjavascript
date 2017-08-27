$(document).ready(function(){
        $('.button').click(function() {
        $( "#welcome" ).hide( "drop", { direction: "down" }, "slow" );
        //Instantiate the two players
        //let player1 = new player(name);
        let dealer = new player("dealer");
        startGame();
        //isBlackJack deve fermare il gioco, far vedere chi ha vinto e chiedere per una nuova partita
        isBlackJack();


    })

})

//The deck
let cards = ["AC","AD","AH","AS","2C","2D","2H","2S","3C","3D","3H",
"3S","4C", "4D", "4H", "4S", "5C", "5D", "5H", "5S", "6C", "6D", "6H", "6S", "7C", "7D",
"7H", "7S", "8C", "8D", "8H", "8S", "9C", "9D", "9H", "9S", "10C", "10D", "10H", "10S",
"JC", "JD", "JH", "JS", "QC", "QD", "QH", "QS", "KC", "KD", "KH", "KS"];
let cardsDrawn = [];

// This function takes a random number 0-1 (0-51 num poosition) and checks if it's already been used
//We use 52 because floor works in this interval [0,1) 1 excluded
// 51.99 will be rounded down to 51 giving the same probability as the other numbers
let drawCard = function() {
  //It's
  let num = Math.floor(52 * Math.random());
  for(let i=0; i<cardsDrawn.lenght; i++){
    if (num === cardsDrawn[i]) {return drawCard()};
  }
  cardsDrawn.push(num);
  //console.log(cardsDrawn);
  return num;
}

// Given a number, returns its value in points
let checkCardValue = function(num) {

}

// This function styles up human and pc players objects
function player(name) {
  this.name = name;
  this.cards = [];
  this.currentPoints = 0;
}

//devo implementare la richiesta del nome a video
let human = new player("andrea");
let dealer = new player("dealer");

// draws 4 cards, two for each player
//devo attaccarci la parte grafica
var startGame = function() {
  humanCard();
  dealerCard();
  humanCard();
  dealerCard();
  console.log(human.cards);
}
let humanCard = function() {
  let x = drawCard();
  human.cards.push(x);
  let d = cards[x];
  let a = "<img src='deck/" + d + ".svg'>"
  /*$('#welcome').show("fade", 2000);*/
  $('#player').append(a);
}

let dealerCard = function(){
  let x = drawCard();
  dealer.cards.push(x);
  let d = cards[x];
  let a = "<img src='deck/" + d + ".svg'>"
  $('#dealer').append(a);
}

// Checks if there is a blackjack with the 2 initial cards
// Takes the player or pc object after the first round and return true or false
let isBlackJack = function() {
// The dealer wins no matter what
  if(dealer.cards[0]<4 && dealer.cards[1] > 35) {
    let a = dealer.cards;
    console.log(a);
    console.log("dealer wins");
  }
  else if (dealer.cards[1]<4 && dealer.cards[0] > 35) {
    console.log("dealer wins");
  }
  else if (human.cards[0]<4 && human.cards[1] > 35) {
    console.log("You win!");
  }
  else if (human.cards[1]<4 && human.cards[0] > 35) {
    console.log("You win!");
  }
}
