'use strict';

console.log('Hello World!');

/**
 * This class represents the game.
 * Now it has a basic structure, that is needed for testing.
 * Feel free to add more props and methods if needed.
 */
class Game {
  /**
   * Creates a new game instance.
   *
   * @param {number[][]} initialState
   * The initial state of the board.
   * @default
   * [[0, 0, 0, 0],
   *  [0, 0, 0, 0],
   *  [0, 0, 0, 0],
   *  [0, 0, 0, 0]]
   *
   * If passed, the board will be initialized with the provided
   * initial state.
   */
  constructor(initialState) {
    // eslint-disable-next-line no-console
    // console.log(initialState);

    // console.log('Hello World!');

    this.startField = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    this.field = initialState || this.startField;

    this.score = 0;
    this.status = 'idle';
  }

  // moveLeft() {}
  // moveRight() {}
  // moveUp() {}
  // moveDown() {}

  /**
   * @returns {number}
   */
  getScore() {
    return this.score;
  }

  /**
   * @returns {number[][]}
   */
  getState() {
    return this.field;
  }

  /**
   * Returns the current game status.
   *
   * @returns {string} One of: 'idle', 'playing', 'win', 'lose'
   *
   * `idle` - the game has not started yet (the initial state);
   * `playing` - the game is in progress;
   * `win` - the game is won;
   * `lose` - the game is lost
   */
  getStatus() {
    return this.status;
  }

  /**
   * Starts the game.
   */
  start() {
    this.status = 'playing';

    this.addRandomNumber();
  }

  /**
   * Resets the game.
   */
  restart() {
    this.status = 'idle';
    this.score = 0;
    this.field = this.startField;
  }

  // --- Add your own methods here ---

  addRandomNumber() {
    const arr = [];

    for (let y = 0; y < this.field.length; y++) {
      for (let x = 0; x < this.field[y].length; x++) {
        if (this.field[y][x] === 0) {
          arr.push({y, x});
        }
      }
    }

    const random = Math.floor(Math.random() * arr.length);
    const findCell = arr[random];

    this.field[findCell.y][findCell.x] = Math.random() < 0.1 ? 4 : 2;
  }

  // -1-
  // slideRow(row) {
  //   const numbers = row.filter((num) => num !== 0);
  //   const difLength = 4 - numbers.length;
  //   const newArr = Array(difLength).fill(0);
  //   const newRow = [...numbers, ...newArr];

  //   for (let i = 0; i < newRow.length; i++) {
  //     if (newRow[i] === newRow[i + 1]) {
  //       this.score += newRow[i] + newRow[i + 1];
  //       newRow[i] = newRow[i] + newRow[i + 1];
  //       newRow[i + 1] = 0;
  //     }
  //   }

  //   return newRow;
  // }

  // -2-
  slideRow(row) {
    const numbers = row.filter((num) => num !== 0);
    const difLength = 4 - numbers.length;
    const newArr = Array(difLength).fill(0);
    const newRow = [...numbers, ...newArr];

    for (let i = 0; i < newRow.length; i++) {
      if (newRow[i] === newRow[i + 1]) {
        this.score += newRow[i] + newRow[i + 1];
        newRow[i] = newRow[i] + newRow[i + 1];
        newRow[i + 1] = 0;
      }
    }

    const currentRow = newRow.filter((num) => num !== 0);
    const diffLength = 4 - currentRow.length;
    const finishArr = Array(diffLength).fill(0);
    const finishRow = [...currentRow, ...finishArr];

    return finishRow;
  }

  transpose(field) {
    const newField = [];

    for (let x = 0; x < field.length; x++) {
      const newRow = [];

      for (let y = 0; y < field.length; y++) {
        newRow.push(field[y][x]);
      }

      newField.push(newRow);
    }

    return newField;
  }

  // slideRowVertical(row) {
  //   const numbers = row.filter((num) => num !== 0);
  //   const difLength = 4 - numbers.length;
  //   const newArr = Array(difLength).fill(0);
  //   const newRow = [...numbers, ...newArr];

  //   for (let i = 0; i < newRow.length; i++) {
  //     if (newRow[i] === newRow[i + 5]) {
  //       this.score += newRow[i] + newRow[i + 5];
  //       newRow[i] = newRow[i] + newRow[i + 5];
  //       newRow[i + 5] = 0;
  //     }
  //   }

  //   const currentRow = newRow.filter((num) => num !== 0);
  //   const diffLength = 4 - currentRow.length;
  //   const finishArr = Array(diffLength).fill(0);
  //   const finishRow = [...currentRow, ...finishArr];

  //   return finishRow;
  // }

  // game.slideRow([2, 0, 2, 4])

  moveLeft() {
    // КОПІЮВАННЯ масиву
    this.copyPreviousField = JSON.parse(JSON.stringify(this.field));
    this.field = this.field.map((arr) => this.slideRow(arr));

    if (this.field !== this.copyPreviousField) {
      this.addRandomNumber();
      // this.checkWin();       //???
      // this.checkGameOver();  //???
    }
  }

  moveUp() {
    // КОПІЮВАННЯ масиву
    this.copyPreviousField = JSON.parse(JSON.stringify(this.field));
    this.transposeField = this.transpose(this.field);
    this.currentField = this.transposeField.map((arr) => this.slideRow(arr));
    this.field = this.transpose(this.currentField);

    if (this.field !== this.copyPreviousField) {
      this.addRandomNumber();
      // this.checkWin();       //???
      // this.checkGameOver();  //???
    }

    // this.field = this.field.map((arr) => this.slideRow(arr));
  }

  moveDown() {
    // КОПІЮВАННЯ масиву
    this.copyPreviousField = JSON.parse(JSON.stringify(this.field));
    this.transposeField = this.transpose(this.field);

    this.currentField = this.transposeField.map((arr) => {
      const reverseArr = arr.reverse();
      const slided = this.slideRow(reverseArr);

      return slided.reverse();
    });
    this.field = this.transpose(this.currentField);

    if (this.field !== this.copyPreviousField) {
      this.addRandomNumber();
      // this.checkWin();       //???
      // this.checkGameOver();  //???
    }

    // this.field = this.field.map((arr) => this.slideRow(arr));
  }

  moveRight() {
    // КОПІЮВАННЯ масиву
    this.copyPreviousField = JSON.parse(JSON.stringify(this.field));
    // console.log(this.copyPreviousField);

    this.field = this.field.map((arr) => {
      const reverseArr = arr.reverse();
      const slided = this.slideRow(reverseArr);

      return slided.reverse();
    });

    if (this.field !== this.copyPreviousField) {
      this.addRandomNumber();
    }
  }
}



module.exports = Game;
