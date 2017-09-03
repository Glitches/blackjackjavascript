$(document).ready(function(){
  $('#welcome_button').click(function() {
    $( "#intro" ).hide( "drop", { direction: "down" }, "slow" );

    /*The deck: an array contaning the cards' namefiles: the position corresponds to the right card value
    i.e 0-3 positions are aces 48-51 pos are kings */
    let cards = ["AC","AD","AH","AS","2C","2D","2H","2S","3C","3D","3H",
    "3S","4C", "4D", "4H", "4S", "5C", "5D", "5H", "5S", "6C", "6D", "6H", "6S", "7C", "7D",
    "7H", "7S", "8C", "8D", "8H", "8S", "9C", "9D", "9H", "9S", "10C", "10D", "10H", "10S",
    "JC", "JD", "JH", "JS", "QC", "QD", "QH", "QS", "KC", "KD", "KH", "KS"];

    let cardsDrawn = [];

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
      $( "#out" ).show("slow" );
      $('#out').css("display", "block");
      $('#out-message').css("display", "block");
      console.log("You lost!");
      $('#play-again').click(function() {
        location.href = "";
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

    // draws 4 cards, two for each player
    let startGame = function() {
      let playerName ="<h1>" + $('input').val().toUpperCase() + "</h1>";
      $('#player-name').prepend(playerName);
      humanCard();
      let x = drawCard();
      dealer.cards.push(x);
      let a = "<img id='back' src='deck/playing-card-back.jpg'>"
      $('#dealer').append(a);
      humanCard();
      dealerCard();
      console.log(human.cards);
    };

    // This function takes a random number 0-1 (0-51 num poosition) and checks if it's already been used
    //We use 52 because floor works in this interval [0,1) 1 excluded
    // 51.99 will be rounded down to 51 giving the same probability as the other numbers
    let drawCard = function() {
      let num = Math.floor(52 * Math.random());
      for(let i=0; i<cardsDrawn.length; i++){
        if (num === cardsDrawn[i]) {return drawCard()};
      }
      cardsDrawn.push(num);
      console.log(cardsDrawn);
      return num;
    };

    // Given the card numbers array, returns its value in blackjack points
    let checkHandValue = function(player) {
      let aceIsTen = 0;
      let points = 0;
      for (let i=0; i<player.cards.length; i++) {
        if (player.cards[i]<4 && aceIsTen == 0 && points<=11) { //
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
    }

    /*Checks if there is a blackjack with the 2 initial cards;
    Takes the player or pc object after the first round and return true or false;
    call the ending modal box and tells what's appening */
    let isBlackJack = function() {
      // The dealer wins no matter what
      if (checkHandValue(dealer) === 21 && checkHandValue(human) === 21) {
        /*if(dealer.cards[0]<4 && dealer.cards[1] > 35) {*/
        $('#back').effect("fold", 500);
        let d = dealer.cards[0];
        //let a = "<img id='back' src='deck/" + cards[d] + ".svg'>";
        $('#dealer').prepend("<img id='back' src='deck/" + cards[d] + ".svg'>");
        $('#out-m').prepend("<h1>BOTH BLACKJACK! NO GAIN NO  PAIN!</h1>");
        showExitModal();
      }
      else if (checkHandValue(dealer) === 21) {
        $('#back').effect("fold", 500);
        let d = dealer.cards[0];
        //let a = "<img id='back' src='deck/" + cards[d] + ".svg'>";
        $('#dealer').prepend("<img id='back' src='deck/" + cards[d] + ".svg'>");
        $('#out-m').prepend("<h1>DEALER'S BLACKJACK - YOU LOST!</h1>");
        showExitModal();
      }
      else if (checkHandValue(human)=== 21) {
        $('#back').effect("fold", 500);
        let d = dealer.cards[0];
        //let a = "<img id='back' src='deck/" + cards[d] + ".svg'>";
        $('#dealer').prepend("<img id='back' src='deck/" + cards[d] + ".svg'>");
        $('#out-m').prepend("<h1>YOUR BLACKJACK - YOU WIN!</h1>");
        showExitModal();
      }
    }

    /* From now on, the game starts:
    set the page;
    checks blackjack;
    counts points;
    waits for player to click hit or stand;
    finally compares dealer and player cards and declare the winner with the
    out modal box */
    startGame();

    isBlackJack();

    let humanPoint = checkHandValue(human);
    let paragraph = "<h1>My points: <span id='number'>"  + humanPoint + "</span></h1>";
    $('#myPoints').append(paragraph);

    /* add a card to players' one when clicked */
    $('#hit').click(function() {
      humanCard();
      humanPoint = checkHandValue(human);
      $('#number').empty();
      $('#number').append(humanPoint);
      if (humanPoint>21) {
        $('#out-m').prepend("<h1>You Lost!</h1>");
        showExitModal();
      }
    });

    /* When clicked dealer game starts */
    $('#stand').click(function() {
      $('#back').effect("fold", 500);
      let d = dealer.cards[0];
      let a = "<img id='back' src='deck/" + cards[d] + ".svg'>"
      $('#dealer').prepend(a);
      while (checkHandValue(dealer)<=16){
        dealerCard();
      }
      let dealerPoint = checkHandValue(dealer);
      if (dealerPoint > humanPoint && dealerPoint <= 21){
        $('#out-m').prepend("<h1>DEALER WINS! YOU LOST!</h1>");
        showExitModal();
      }
      else if (dealerPoint > 21) {
        $('#out-m').prepend("<h1>DEALER BUSTS!</h1>");
        showExitModal();
      }
      else if (dealerPoint === humanPoint){
        $('#out-m').prepend("<h1>EVEN!</h1>");
        showExitModal();
      }
      else {
        $('#out-m').prepend("<h1>YOU WON!</h1>");
        showExitModal();
      }
    });
  });

})/* Ready jquery function closing brackets */
