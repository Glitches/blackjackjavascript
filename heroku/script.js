$(document).ready(function(){
  $('#welcomeButton').click(function() {
    $( "#intro" ).hide( "drop", { direction: "down" }, "slow" );
    $('#dollarValue').append(bet);
    $('#myMoney').append(human.money);
    $('#hit').hide( "drop", { direction: "down" }, "slow" );
    $('#stand').hide( "drop", { direction: "down" }, "slow" );
    $('#doubleDown').hide( "drop", { direction: "down" }, "slow" );

    /* From now on, the game starts:
    append player's name to its div;
    set the page;
    checks blackjack;
    counts points;
    waits for player to click hit or stand;
    finally compares dealer and player cards and declare the winner with the
    out modal box */
    let playerName ="<h1>" + $('input').val().toUpperCase() + "</h1>";
    $('#playerName').prepend(playerName);
    let mon = "<h3>BALANCE: $<span id='myMoney'>" + human.money + "</span></h3>";
    $('#myPoint').append(mon);

    /* add a card to players' one when clicked */
    $('#hit').click(function() {
      humanCard();
      let humanPoint = checkHandValue(human);
      $('#number').empty();
      $('#number').append(humanPoint);
      $('#doubleDown').hide("drop", { direction: "down"}, "fast");
      if (humanPoint>21) {
        $('#outM').prepend("<h1>You Lost!</h1>");
        //console.log('sono qui')
        showExitModal();
      }
    });

    /* When clicked dealer game starts */
    $('#stand').click(function() {
      $('#doubleDown').hide("drop", { direction: "down"}, "fast");
      /*$('#back').effect("fold", 500);
      let firstCard = dealer.cards[0];
      let cardImage = "<img id='back' src='deck/" + cards[firstCard] + ".svg'>";*/
      //$('#dealer').prepend(cardImage);
      humanPoint = checkHandValue(human);
      while (checkHandValue(dealer)<=16){
        dealerCard();
      }
      let dealerPoint = checkHandValue(dealer);
      if (dealerPoint === humanPoint){
        $('#outM').prepend("<h1>EVEN!</h1>");
        human.money += bet;
        showExitModal();
      }
      else if (dealerPoint > 21) {
        $('#outM').prepend("<h1>DEALER BUSTS!</h1>");
        human.money += (2*bet);
        showExitModal();
      }
      else if (dealerPoint > humanPoint){
        $('#outM').prepend("<h1>DEALER WINS! YOU LOST!</h1>");
        showExitModal();
      }
      else {
        $('#outM').prepend("<h1>YOU WON!</h1>");
        human.money += (2*bet);
        showExitModal();
      }
    });

    $('#minus').click(function(){
      if(bet >= 10) {bet -= 5;}
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
      let firstCard = dealer.cards[0];
      let cardImage = "<img id='back' src='deck/" + cards[firstCard] + ".svg'>";
      $('#dealer').prepend(cardImage);
      let humanPoint = checkHandValue(human);
      $('#number').empty();
      $('#number').append(humanPoint);
      while (checkHandValue(dealer)<=16){
        dealerCard();
      }
      let dealerPoint = checkHandValue(dealer);
      if (dealerPoint === humanPoint){
        $('#outM').prepend("<h1>EVEN!</h1>");
        human.money -= bet;
        showExitModal();
      }
      else if (dealerPoint > 21) {
        $('#outM').prepend("<h1>DEALER BUSTS!</h1>");
        human.money += (4*bet);
        showExitModal();
      }
      else if (dealerPoint > humanPoint){
        $('#outM').prepend("<h1>DEALER WINS! YOU LOST!</h1>");
        human.money -= bet;
        showExitModal();
      }
      else {
        $('#outM').prepend("<h1>YOU WON!</h1>");
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

let cardsDrawn = [] , bet = 5;


// draws 4 cards, two for each player and calls isBlackJack
let startGame = function() {
  humanCard();
  let cardNumber = drawCard();
  dealer.cards.push(cardNumber);
  let cardImage = "<img id='back' src='deck/playing-card-back.jpg'>";
  $('#dealer').append(cardImage);
  humanCard();
  dealerCard();
  let humanPoint = checkHandValue(human);
  human.money -= bet;
  $('#number').append(humanPoint);
  $('#myMoney').empty();
  $('#myMoney').append(human.money);
  $('#dollarValue').empty();
  $('#dollarValue').append(bet);
  //console.log(human.cards);
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
  $('#back').effect("fold", 500);
  let dealerPoint = checkHandValue(dealer);
  $('#dealerName').append("<h3> DEALER POINTS: " + dealerPoint);
  let firstCard = dealer.cards[0];
  $('#dealer').prepend("<img id='back' src='deck/" + cards[firstCard] + ".svg'>");
  $('#outMessage').css("display", "block");
  $( "#out" ).show("slow" );
  $('#plusMinus, #start').show( "drop", { direction: "down" }, "fast" );
  //$('#start').show( "drop", { direction: "down" }, "fast" );
  //console.log("You lost!");
  $('#playAgain').click(function() {
    $('#dealerName h3').remove();
    $('#player, #dealer, #number').empty();
    $('#outM h1').remove();
    dealer.cards = [];
    human.cards = [];
    cardsDrawn = [];
    $('#hit').hide("drop", { direction: "down" }, "fast");
    $('#stand').hide("drop", { direction: "down" }, "fast");
    $( "#out" ).hide( "drop", { direction: "down" }, "fast" );
    $('#doubleDown').hide("drop", { direction: "down"}, "fast");
    $('#myMoney').empty();
    $('#myMoney').append(human.money);
  });
}

/* humanCard and dealerCard call drawcard function and display the card on video.
they push a new card number into the player's array and use jQuery to append to the right div */
let humanCard = function() {
  let cardNumber = drawCard();
  human.cards.push(cardNumber);
  let newFileName = cards[cardNumber];
  /* newTag contains a string that correnspond to html image element and its link to a card */
  let newTag = "<img id=\"" + newFileName + "\" src='deck/" + newFileName + ".svg'>";
  $('#player').append(newTag);
  $(newFileName).effect("slide", 500)
};

let dealerCard = function(){
  let cardNumber = drawCard();
  dealer.cards.push(cardNumber);
  let card = cards[cardNumber];
  let cardImage = "<img src='deck/" + card + ".svg'>";
  $('#dealer').append(cardImage);
};

/*Checks if there is a blackjack with the 2 initial cards;
Takes the player or pc object after the first round and return true or false;
call the ending modal box and tells what's appening */
let isBlackJack = function() {
  // The dealer wins no matter what
  if (checkHandValue(dealer) === 21 && checkHandValue(human) === 21) {
    human.money += bet;
    $('#outM').prepend("<h1>BOTH BLACKJACK! NO GAIN NO  PAIN!</h1>");
    showExitModal();
  }
  else if (checkHandValue(dealer) === 21) {
    $('#outM').prepend("<h1>DEALER'S BLACKJACK - YOU LOST!</h1>");
    showExitModal();
  }
  else if (checkHandValue(human)=== 21) {
    $('#outM').prepend("<h1>YOUR BLACKJACK - YOU WIN!</h1>");
    human.money += (2*bet);
    showExitModal();
  }
}

/* This function takes a random number 0-1 (0-51 num poosition) and checks if it's already been used
We use 52 because floor works in this interval [0,1) 1 excluded
51.99 will be rounded down to 51 giving the same probability as the other numbers */
let drawCard = function() {
  let num = Math.floor(52 * Math.random());
  if(cardsDrawn.indexOf(num) !== -1) {return drawCard()};
  cardsDrawn.push(num);
  //console.log(cardsDrawn);
  return num;
};

// Given the card numbers array, returns its value in blackjack points
let checkHandValue = function(player) {
  let aceIsTen = 0, points = 0;
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
