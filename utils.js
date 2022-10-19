const analyzeHand = (cards = []) => {
  const winnerHands = {
    ROYAL_FLUSH: 'ROYAL_FLUSH',
    STRAIGHT_FLUSH: 'STRAIGHT_FLUSH',
    FOUR_OF_A_KIND: 'FOUR_OF_A_KIND',
    FULL_HOUSE: 'FULL_HOUSE',
    FLUSH: 'FLUSH',
    STRAIGHT: 'STRAIGHT',
    THREE_OF_A_KIND: 'THREE_OF_A_KIND',
    TWO_PAIR: 'TWO_PAIR',
    PAIR: 'PAIR',
    HIGH_CARD: 'HIGH_CARD',
  };

  let result = winnerHands.HIGH_CARD;
  let threes = false;
  let pair = false;
  let pairCount = 0;
  let flush = false;
  let flushSuit = '';
  let sortedCards = {
    C: [],
    D: [],
    H: [],
    S: [],
    A: [],
  };
  let straightMatches = 0;
  let straightValues = 0;

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

  const handValues = [];

  const sortHand = () => {
    for (let card of cards) {
      const value = card[0];
      const suit = card[1];
      if (suit === 'C') {
        sortedCards.C.push(valueMap[value]);
      }
      if (suit === 'D') {
        sortedCards.D.push(valueMap[value]);
      }
      if (suit === 'H') {
        sortedCards.H.push(valueMap[value]);
      }
      if (suit === 'S') {
        sortedCards.S.push(valueMap[value]);
      }
      sortedCards.A.push(valueMap[value]);
    }
    sortedCards.C = [...sortedCards.C.sort((a, b) => a - b)];
    sortedCards.D = [...sortedCards.D.sort((a, b) => a - b)];
    sortedCards.H = [...sortedCards.H.sort((a, b) => a - b)];
    sortedCards.S = [...sortedCards.S.sort((a, b) => a - b)];
    sortedCards.A = [...sortedCards.A.sort((a, b) => a - b)];
  };

  sortHand();

  for (let card of cards) {
    const value = card[0];
    const suit = card[1];
    suitCount[suit]++;
    valueCount[value]++;
    handValues.push(value);
  }
  // flush check
  for (let suit of Object.keys(suitCount)) {
    if (suitCount[suit] >= 5) {
      flush = true;
      flushSuit = suit;
      result = winnerHands.FLUSH;
    }
  }

  if (flush) {
    // royal flush check
    let royalFlushCount = 0;
    for (let card of cards) {
      const value = card[0];
      const suit = card[1];
      if (['A', 'K', 'Q', 'J', 'T'].includes(value) && suit == flushSuit) {
        royalFlushCount++;
      }
    }
    if (royalFlushCount === 5) {
      result = winnerHands.ROYAL_FLUSH;
    } else {
      // check for straight flush
      straightMatches = 0;
      straightValues = 0;
      for (let key of Object.keys(sortedCards)) {
        if (key === flushSuit) {
          for (let i = 0; i < 4; i++) {
            if (sortedCards[key][i] === sortedCards[key][i + 1] - 1) {
              straightMatches++;
              straightValues += sortedCards[key][i];
            }
          }
        }
      }
      if (straightMatches === 4 || straightValues + 1 === 10) {
        result = winnerHands.STRAIGHT_FLUSH;
      }
    }
  } else {
    // count hands check
    for (let value of Object.keys(valueCount)) {
      if (valueCount[value] === 4) {
        result = winnerHands.FOUR_OF_A_KIND;
      }
      if (valueCount[value] === 3) {
        threes = true;
      }
      if (valueCount[value] === 2) {
        pair = true;
        pairCount++;
      }
    }
    if (threes && pair) {
      result = winnerHands.FULL_HOUSE;
    }
    straightMatches = 0;
    straightValues = 0;
    for (let i = 0; i < sortedCards['A'].length - 1; i++) {
      if (sortedCards['A'][i] === sortedCards['A'][i + 1] - 1) {
        straightMatches++;
        straightValues += sortedCards['A'][i];
      }
    }
    if (straightMatches > 4 || straightValues + 1 === 10) {
      result = winnerHands.STRAIGHT;
    }
    if (threes && !pair) {
      result = winnerHands.THREE_OF_A_KIND;
    }
    if (pair && !threes) {
      if (pairCount > 1) {
        result = winnerHands.TWO_PAIR;
      } else {
        result = winnerHands.PAIR;
      }
    }
  }
  return result;
};
