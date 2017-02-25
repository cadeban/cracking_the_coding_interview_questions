/*
  7.1 Deck of Cards
  Design the data structures for a generic deck of cards. Explain how you would
  subclass the data structures to implement blackjack.
 */

class Card {
  constructor(value, suit) {
    this.value = value;
    this.suit = suit;
  }
 }

class Deck {
  constructor() {
    this.suits = ['U+2660', 'U+2663', 'U+2661', 'U+2662'];
    this.faces = ['A', 'K', 'Q', 'J'];
    this.collection = [];
    this.numbers = [];

    for (let i = 2; i <= 10; i += 1) {
      this.numbers.push(i);
    }

    this.instantiate();
  }

  instantiate() {
    for (let suit = 0; suit < this.suits.length; suit += 1) {
      this.collection = this.cardMaker(this.faces, suit)
                            .concat(this.cardMaker(this.numbers, suit));
    }
  }

  cardMaker(array, suit) {
    return this.array.reduce((accum, value) => {
      accum.push(new Card(value, suit));
      return accum;
    }, []);
  }

  shuffle() {
    this.collection.shuffle();
  }

  deal(n) {
    return this.collection.slice(this.collection.length - n);
  }

  drawOne() {
    return this.collection.pop();
  }

 }

class Hand {
  constructor() {
    this.hand = [];
  }

  addCardToHand(card) {
    this.hand.push(card);
  }
}

class BlackJackCard extends Card {
  isFace() {
    if (!Number.isInteger(this.value) && this.value !== 'A') {
      this.setValue(10);
    }
  }

  setValue(val) {
    this.value = val;
  }

  getValue() {
    return this.value;
  }
}

class BlackJackAce extends BlackJackCard {
  determineValue(score) {
    if (score < 10) {
      this.setValue(11);
    } else {
      this.setValue(1);
    }
  }

}

class BlackJackHand extends Hand {
  super() {
    this.score = 0;
  }

  addCardToHand(card) {
    if (card.getValue === 'A') {
      card.determineValue(this.score);
    }
    this.hand.push(card);
    this.score += card.value;
  }

  is21() {
    return this.score === 21;
  }

  bust() {
    return this.score > 21;
  }
}

/*
  7.2 Call Center: Imagine you have a call center with three levels of
  employees: respondent, manager, and director. An incoming telephone call must
  be first allocated to a respondent who is free. If the respondent can't handle
  the call, he or she must escalate the call to a manager. If the manager is not
  free or not able to ahndle it, then the call should be escalated to a director.
  Design the classes and data structures for this problem. Implement a method
  dispatchCall() which assigns a call to the first available employee.
 */


/*
  7.3 Jukebox
  Design a musical jukebox using object-oriented principles.
 */


/*
  7.4 Parking Lot
  Design a parking lot using object-oriented principles.
 */


/*
  7.5 Online Book Reader
  Design the data structures for an online book reader system.
 */


/*
  7.6 Jigsaw
  Implement an NxN jigsaw puzzle. Design the data structures and explain an
  algorithm to solve the puzzle. You can assume that you will have a fitsWith
  method which, when passed two puzzle edges, returns true if the two edges
  belong together.
 */


/*
  7.7 Chat Server
  Explain how you would design a chat server. In particular, provide details
  about the various backend components, classes, and methods. What would be the
  hardest problems to solve?
 */


/*
  7.8 Othello
  Othello is played as follows:
    Each Othello piece is white on one side and black on the other. When a piece
    is surrounded by its opponents on both the left and right sides, or both the
    top and bottom, it is said to be captured and its color is flipped. On your
    turn, you must capture at least one of your opponent's pieces. The game ends
    when either user has no more valid moves. The win is assigned to the person
    with the most pieces. Implement the object-oriented design for Othello.
 */


/*
  7.9 Circular Array
  Implement a CircularArray class that supports an array-like data structure
  which can be efficiently rotated. If possible, the class should use a generic
  type (also called a template) and should support iteration via the standard
  for (Obj o: circularArray) notation.
 */


/*
  7.10 Minesweeper
  Design and implement a text-based Minesweeper game. Minesweeper is the classic
  single-player computer game where an NxN grid has mines (or bombs) hidden
  across the grid. The remaining cells are either blank or have a number behind
  them. The numbers reflect the number of bombs in teh surrounding eight cells.
  The user then uncovers a cell. If it is a bomb, the player loses. If it is a
  number, the number is exposed. If it is a blank cell, the cell and all adjacent
  blank cells (up to and including the surrounding numeric cells) are exposed.
  The player wins when all non-bomb cells are exposed. The player can also flag
  certain places as potential bomb threats. This doesn't affect game play, other
  than to block the user from accidentally clicking a cell that is thought to
  have a bomb.
  (Tip for the reader: if you're not familiar with this game, please play a few
  rounds online first.)
 */


/*
  7.11 File system
  Explain the data structures and algorithsm that you would use to design an
  in-memory file system. Illustrate with an example in code where possible.
 */


/*
  7.12 Hash Table
  Design and implement a hash table which uses chaining (linked lists) to handle
  collisions.
 */
