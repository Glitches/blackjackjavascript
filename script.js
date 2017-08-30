$(document).ready(function(){
  $('#welcome_button').click(function() {
    $( "#welcome" ).hide( "drop", { direction: "down" }, "slow" );

    //The deck
    let cards = ["AC","AD","AH","AS","2C","2D","2H","2S","3C","3D","3H",
    "3S","4C", "4D", "4H", "4S", "5C", "5D", "5H", "5S", "6C", "6D", "6H", "6S", "7C", "7D",
    "7H", "7S", "8C", "8D", "8H", "8S", "9C", "9D", "9H", "9S", "10C", "10D", "10H", "10S",
    "JC", "JD", "JH", "JS", "QC", "QD", "QH", "QS", "KC", "KD", "KH", "KS"];

    let cardsDrawn = [];

    //Instantiate the two players
    let human = {
      name: name,
      cards: [],
      currentPoints: 0
    }

    let dealer = {
      name: "dealer",
      cards: [],
      currentPoints: 0
    }

    let humanCard = function() {
      let x = drawCard();
      human.cards.push(x);
      let newFileName = cards[x];
      let newTag = "<img id=\"" + newFileName + "\" src='deck/" + newFileName + ".svg'>";
      $('#player').append(newTag);
      $(newFileName).effect("slide", 500)
    }

    let dealerCard = function(){
      let x = drawCard();
      dealer.cards.push(x);
      let d = cards[x];
      let a = "<img src='deck/" + d + ".svg'>"
      $('#dealer').append(a);
    }

    // draws 4 cards, two for each player
    //devo attaccarci la parte grafica
    let startGame = function() {
      humanCard();
      let x = drawCard();
      dealer.cards.push(x);
      //let d = cards[x];
      let a = "<img id='back' src='deck/back.png'>"
      $('#dealer').append(a);
      humanCard();
      dealerCard();
      console.log(human.cards);
    }

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
    let checkHandValue = function(player) {
      let aceIsTen = 0;
      let points = 0;
      console.log(player.cards)
      for (let i=0; i<player.cards.length; i++) {
        // checks if there another ace valued 11 and evaluates if ace is 1 or 11 points
        if (player.cards[i]<4 && aceIsTen===0 && player.currentPoints<11) {
          points +=11;
          aceIsTen = 1;
        }
        else if (player.cards[i]<4 && player.currentPoints>= 11) {
          points +=1;
        }
        else if (player.currentPoints>=11 && aceIsTen === 1 ) {
          points -= 10;
          let value = Math.floor(player.cards[i]/4);
          points += value;
        }
        else if (player.cards[i]>35) {
          points += 10;
        }
        else {
            let value = Math.floor(player.cards[i]/4) + 1;
            points += value;
        }
      console.log(points);
      }
      return points;
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

    startGame();

    //isBlackJack deve fermare il gioco, far vedere chi ha vinto e chiedere per una nuova partita
    isBlackJack();
    let humanPoint = checkHandValue(human);
    let paragraph = "<h1>My points: "  + humanPoint + "</h1>";
    $('#myPoints').append(paragraph);

      $('#hit').click(function() {
          humanCard();
          humanPoint = checkHandValue(human);
          if (humanPoint>21) {
            console.log("You lost!");
            location.href = "";
          }
      })
      $('#stand').click(function() {
        $('#back').effect("fold", 500);
        let d = dealer.cards[0];
        let a = "<img id='back' src='deck/" + cards[d] + ".svg'>"
        $('#dealer').prepend(a);
        while (checkHandValue(dealer)<16){
          dealerCard()
        }
        let dealerPoint = checkHandValue(dealer);
        if (dealerPoint > humanPoint && dealerPoint <= 21){
          console.log("dealer wins")
        }
        else if (dealerPoint > 21) {
          console.log("Dealer busts!");
        }
      })
  })
})
