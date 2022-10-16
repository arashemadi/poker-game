const analyzeHand = (cards = []) => {
  const winnerHands = {
    ROYAL_FLUSH: 'Royal flush',
    STRAIGHT_FLUSH: 'Straight flush',
    FOUR_OF_A_KIND: 'Four of a kind',
    FULL_HOUSE: 'Full house',
    FLUSH: 'Flush',
    STRAIGHT: 'Straight',
    THREE_OF_A_KIND: 'Three of a kind',
    TWO_PAIR: 'Two pair',
    PAIR: 'Pair',
    HIGH_CARD: 'High Card',
  };
  const suitCount = {
    S: 0,
    H: 0,
    D: 0,
    C: 0,
  };

  const valueCount = {
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    '6': 0,
    '7': 0,
    '8': 0,
    '9': 0,
    T: 0,
    J: 0,
    Q: 0,
    K: 0,
    A: 0,
  };

  const valueMap = {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    T: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
  };

  const straightMatches = {
    A: '5',
    '2': '6',
    '3': '7',
    '4': '8',
    '5': '9',
    '6': 'T',
    '7': 'J',
    '8': 'Q',
    '9': 'K',
    T: 'A',
  };

  const handValues = [];

  const sortHand = (hand) => {
    const result = [];
    //for
    return result.sort((a, b) => a - b);
  };

  for (let card of cards) {
    const value = card[0];
    const suit = card[1];
    suitCount[suit]++;
    valueCount[value]++;
    handValues.push(value);
  }

  // flush check
  for (let suit of Object.keys(suitCount)) {
    if (suitCount[suit] === 5) {
      // check for royal flush
      // check for straight flush
      // otherwise, normal flush
      return winnerHands.FLUSH;
    }
  }
  // four of a kind check
  for (let value of Object.keys(valueCount)) {
    if (valueCount[value] === 4) {
      return winnerHands.FOUR_OF_A_KIND;
    }
  }
  return winnerHands.HIGH_CARD;
};

// analyzeHand(['TS', '5H', '4H', 'KC', '2C', '3D', 'QH', 'AH']);
