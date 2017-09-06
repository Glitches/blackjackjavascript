$(document).ready(function(){
  $('#welcome_button').click(function() {
    $( "#intro" ).hide( "drop", { direction: "down" }, "slow" );
    $('#dollarValue').append(bet);
    $('#myMoney').append(human.money);
    $('#hit').hide( "drop", { direction: "down" }, "slow" );
    $('#stand').hide( "drop", { direction: "down" }, "slow" );
    $('#doubleDown').hide( "drop", { direction: "down" }, "slow" );
    //$('#number').append(humanPoint);
    /* From now on, the game starts:
    append player's name to its div;
    set the page;
    checks blackjack;
    counts points;
    waits for player to click hit or stand;
    finally compares dealer and player cards and declare the winner with the
    out modal box */
    let playerName ="<h1>" + $('input').val().toUpperCase() + "</h1>";
    $('#player-name').prepend(playerName);
    let mon = "<h3>BALANCE: $<span id='myMoney'>" + human.money + "</span></h3>";
    $('#myPoint').append(mon);
    //startGame();
      /*let humanPoint =  checkHandValue(human);
      let paragraph = "<h3>POINTS: <span id='number'>"  + humanPoint + "</span></h3>";
      $('#myPoints').append(paragraph);*/

      /* add a card to players' one when clicked */
      $('#hit').click(function() {
        humanCard();
        let humanPoint = checkHandValue(human);
        $('#number').empty();
        $('#number').append(humanPoint);
        $('#doubleDown').hide("drop", { direction: "down"}, "fast");
        if (humanPoint>21) {
          $('#out-m').prepend("<h1>You Lost!</h1>");
          human.money -= bet;
          console.log('sono qui')
          showExitModal();
        }
      });

      /* When clicked dealer game starts */
      $('#stand').click(function() {
        $('#back').effect("fold", 500);
        $('#doubleDown').hide("drop", { direction: "down"}, "fast");
        let d = dealer.cards[0];
        let a = "<img id='back' src='deck/" + cards[d] + ".svg'>"
        $('#dealer').prepend(a);
        humanPoint = checkHandValue(human);
        while (checkHandValue(dealer)<=16){
          dealerCard();
        }
        let dealerPoint = checkHandValue(dealer);
        if (dealerPoint === humanPoint){
         $('#out-m').prepend("<h1>EVEN!</h1>");
         human.money += bet;
         showExitModal();
       }
        else if (dealerPoint > 21) {
          $('#out-m').prepend("<h1>DEALER BUSTS!</h1>");
          human.money += (2*bet);
          showExitModal();
        }
        else if (dealerPoint > humanPoint){
          $('#out-m').prepend("<h1>DEALER WINS! YOU LOST!</h1>");

          showExitModal();
        }
        else {
          $('#out-m').prepend("<h1>YOU WON!</h1>");
          human.money += (2*bet);
          showExitModal();
        }
      });

      $('#minus').click(function(){
        if(bet) {bet -= 5;}
        $('#dollarValue').empty();
        $('#dollarValue').append(bet);
      });

      $('#plus').click(function(){
        if(bet <=20 && bet < human.money) {bet += 5;}
        $('#dollarValue').empty();
        $('#dollarValue').append(bet);
      });

      $('#start').click(function() {
        $('#plusMinus').hide( "drop", { direction: "down" }, "slow" );
        $('#start').hide("drop", {direction: "down"}, "slow");
        $('#hit').show( "drop", { direction: "down" }, "fast" );
        $('#stand').show( "drop", { direction: "down" }, "fast" );
        startGame();
      });

      $('#doubleDown').click(function(){
        humanCard();
        $('#back').effect("fold", 500);
        let d = dealer.cards[0];
        let a = "<img id='back' src='deck/" + cards[d] + ".svg'>"
        $('#dealer').prepend(a);
        humanPoint = checkHandValue(human);
        while (checkHandValue(dealer)<=16){
          dealerCard();
        }
        let dealerPoint = checkHandValue(dealer);
        if (dealerPoint === humanPoint){
         $('#out-m').prepend("<h1>EVEN!</h1>");
         human.money -= bet;
         showExitModal();
       }
        else if (dealerPoint > 21) {
          $('#out-m').prepend("<h1>DEALER BUSTS!</h1>");
          human.money += (4*bet);
          showExitModal();
        }
        else if (dealerPoint > humanPoint){
          $('#out-m').prepend("<h1>DEALER WINS! YOU LOST!</h1>");
          human.money -= bet;
          showExitModal();
        }
        else {
          $('#out-m').prepend("<h1>YOU WON!</h1>");
          human.money += (4*bet);
          showExitModal();
        }
      });
  });
})/* Ready jquery function closing brackets */


/*The deck: an array contaning the cards' namefiles: the position corresponds to the right card value
i.e 0-3 positions are aces 48-51 pos are kings */
let cards = ["AC","AD","AH","AS","2C","2D","2H","2S","3C","3D","3H",
"3S","4C", "4D", "4H", "4S", "5C", "5D", "5H", "5S", "6C", "6D", "6H", "6S", "7C", "7D",
"7H", "7S", "8C", "8D", "8H", "8S", "9C", "9D", "9H", "9S", "10C", "10D", "10H", "10S",
"JC", "JD", "JH", "JS", "QC", "QD", "QH", "QS", "KC", "KD", "KH", "KS"];

let cardsDrawn = [];
var bet = 5;

// draws 4 cards, two for each player and calls isBlackJack
let startGame = function() {
  humanCard();
  let x = drawCard();
  dealer.cards.push(x);
  let a = "<img id='back' src='deck/playing-card-back.jpg'>"
  $('#dealer').append(a);
  humanCard();
  dealerCard();
  let humanPoint = checkHandValue(human);
  //let paragraph = "<h3>POINTS: <span id='number'>"  + humanPoint + "</span> </h3>";
  human.money -= bet;

  $('#number').append(humanPoint);
  $('#myMoney').empty();
  $('#myMoney').append(human.money);
  //console.log(human.cards);
  $('#dollarValue').empty();
  $('#dollarValue').append(bet);

  isBlackJack();
  if ( 9<= humanPoint && humanPoint <= 15) {
    $('#doubleDown').show( "drop", { direction: "down" }, "fast" );
  }
};

//Create two players: cards is an array that stores the position of the cards on the cards array
let human = {
  name: name,
  cards: [],
  money: 100
};

let dealer = {
  name: "dealer",
  cards: [],
  currentPoints: 0
};

let showExitModal = function() {
  $('#out-message').css("display", "block");
  $( "#out" ).show("slow" );
  $('#plusMinus').show( "drop", { direction: "down" }, "fast" );
  $('#start').show( "drop", { direction: "down" }, "fast" );
  //$('#dollarValue').append(bet);
  //console.log("You lost!");
  $('#play-again').click(function() {
    $('#player').empty();
    $('#dealer').empty();
    $('#number').empty();
    //$('#player-name').empty();
    //$('#myPoints').empty();
    $('#out-m h1').remove();
    dealer.cards = [];
    human.cards = [];
    cardsDrawn = [];
    $('#hit').hide("drop", { direction: "down" }, "fast");
    $('#stand').hide("drop", { direction: "down" }, "fast");
    $( "#out" ).hide( "drop", { direction: "down" }, "fast" );
    $('#doubleDown').hide("drop", { direction: "down"}, "fast");
    $('#myMoney').empty();
    $('#myMoney').append(human.money);
    //let mon = "<h3>BALANCE: $<span id='myMoney'>" + human.money + "</span></h3>";
    //$('#myPoint').append(mon);
  });
}

/* humanCard and dealerCard call drawcard function and display the card on video.
they push a new card number into the player's array and use jQuery to append to the right div */
let humanCard = function() {
  let x = drawCard();
  human.cards.push(x);
  let newFileName = cards[x];
  /* newTag contains a string that correnspond to html image element and its link to a card */
  let newTag = "<img id=\"" + newFileName + "\" src='deck/" + newFileName + ".svg'>";
  $('#player').append(newTag);
  $(newFileName).effect("slide", 500)
};

let dealerCard = function(){
  let x = drawCard();
  dealer.cards.push(x);
  let d = cards[x];
  let a = "<img src='deck/" + d + ".svg'>"
  $('#dealer').append(a);
};

/*Checks if there is a blackjack with the 2 initial cards;
Takes the player or pc object after the first round and return true or false;
call the ending modal box and tells what's appening */
let isBlackJack = function() {
  // The dealer wins no matter what
  if (checkHandValue(dealer) === 21 && checkHandValue(human) === 21) {
    $('#back').effect("fold", 500);
    let d = dealer.cards[0];
    //let a = "<img id='back' src='deck/" + cards[d] + ".svg'>";
    $('#dealer').prepend("<img id='back' src='deck/" + cards[d] + ".svg'>");
    human.money += bet;
    $('#out-m').prepend("<h1>BOTH BLACKJACK! NO GAIN NO  PAIN!</h1>");
    showExitModal();
  }
  else if (checkHandValue(dealer) === 21) {
    $('#back').effect("fold", 500);
    let d = dealer.cards[0];
    //let a = "<img id='back' src='deck/" + cards[d] + ".svg'>";
    $('#dealer').prepend("<img id='back' src='deck/" + cards[d] + ".svg'>");
    $('#out-m').prepend("<h1>DEALER'S BLACKJACK - YOU LOST!</h1>");
    //
    showExitModal();
  }
  else if (checkHandValue(human)=== 21) {
    $('#back').effect("fold", 500);
    let d = dealer.cards[0];
    //let a = "<img id='back' src='deck/" + cards[d] + ".svg'>";
    $('#dealer').prepend("<img id='back' src='deck/" + cards[d] + ".svg'>");
    $('#out-m').prepend("<h1>YOUR BLACKJACK - YOU WIN!</h1>");
    human.money += (2*bet);
    showExitModal();
  }
}

/* This function takes a random number 0-1 (0-51 num poosition) and checks if it's already been used
We use 52 because floor works in this interval [0,1) 1 excluded
51.99 will be rounded down to 51 giving the same probability as the other numbers */
let drawCard = function() {
  let num = Math.floor(52 * Math.random());
  for(let i=0; i<cardsDrawn.length; i++){
    if (num === cardsDrawn[i]) {return drawCard()};
  }
  cardsDrawn.push(num);
  //console.log(cardsDrawn);
  return num;
};

// Given the card numbers array, returns its value in blackjack points
let checkHandValue = function(player) {
  let aceIsTen = 0;
  let points = 0;
  for (let i=0; i<player.cards.length; i++) {
    if (player.cards[i]<4 && aceIsTen === 0 && points<=11) { //
      points +=11;
      aceIsTen = 1;
    }
    else if (player.cards[i]<4) {points +=1;}
    else if (player.cards[i]>35) {points += 10;}
    else {points += (Math.floor(player.cards[i]/4) + 1);}
    if (points>21 && aceIsTen == 1) {
      points -= 10;
      aceIsTen = 0;
    }
  };
  return points;
};
