const playGame = (players: number = 2): object => {
  let suits = ["♦", "♥", "♣", "♠"];
  let stack = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"];
  let cardDeck: string[] = [];

  let visitedCards: string[] = [];

  const randNum = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const generateCards = (stage: string = "hand"): string[] => {
    let cardCount = 1;
    let cards: string[] = [];
    switch (stage) {
      case "flop":
        cardCount = 3;
        break;
      default:
        cardCount = 1;
    }
    for (let i = 0; i < cardCount; i++) {
      let card: string;
      let validCard = false;
      while (!validCard) {
        card = cardDeck[randNum(0, cardDeck.length - 1)];
        if (visitedCards.indexOf(card) === -1) {
          visitedCards.push(card);
          cards.push(card);
          validCard = true;
        }
      }
    }
    return cards;
  };

  const shuffleArray = (array: string[]): void => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  const setUpDeck = () => {
    shuffleArray(suits);
    shuffleArray(stack);
    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < stack.length; j++) {
        cardDeck.push(stack[j] + suits[i]);
      }
    }
  };

  const shuffler = (rounds: number = 1): void => {
    for (let i = 0; i < rounds; i++) {
      shuffleArray(cardDeck);
    }
  };

  const analyzeHand = (hand: string[], board: string[]) => {
    // royal flush
    // straight flush
    // four of a kind
    // full house
    // flush
    // straight
    // three of a kind
    // two pair
    // pair
    // high card
  };

  let result = {
    msg: "",
  };
  if (typeof players !== "number") {
    result.msg = "Nice Try!";
    return result;
  } else if (players <= 1) {
    result.msg = "We need at least 2 players to play Poker!";
    return result;
  } else if (players > 9) {
    result.msg = "We can't have more than 9 players for Poker!";
    return result;
  } else {
    setUpDeck();
    shuffler();
    // first card
    for (let i = 1; i <= players; i++) {
      result[`player${i}`] = [];
      result[`player${i}`] = result[`player${i}`].concat(generateCards("hand"));
    }
    // second card
    for (let i = 1; i <= players; i++) {
      result[`player${i}`] = result[`player${i}`].concat(generateCards("hand"));
    }
    result["burn1"] = generateCards("burn");
    result["flop"] = generateCards("flop");
    result["burn2"] = generateCards("burn");
    result["turn"] = generateCards("turn");
    result["burn3"] = generateCards("burn");
    result["river"] = generateCards("river");
    result["board"] = result["flop"].concat(
      result["turn"].concat(result["river"])
    );
    result.msg = "OK";
    return result;
  }
};

console.log(playGame(6));
