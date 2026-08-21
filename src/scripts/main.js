'use strict';

// Uncomment the next lines to use your game instance in the browser
const Game = require('../modules/Game.class');
const game = new Game();

// ====================================================================
// window.game = game;    // GPT  /  test slideRow / enter into console
// ====================================================================
// game.addRandomNumber();   // Claude  /  test randomNumber

// ====================================================================

const button = document.querySelector('button');
const startInfo = document.querySelector('.message-start');
const score = document.querySelector('.info');
const loseInfo = document.querySelector('.message-lose');
const winInfo = document.querySelector('.message-win');

button.addEventListener('click', (eventi) => {
  if (game.status === 'idle') {
    game.start();
  } else {
    game.restart();
    game.start();
  }

  if (game.status !== 'idle') {
    button.classList.remove('start');
    button.textContent = 'Restart';
    button.classList.add('restart');
  }

  startInfo.classList.add('hidden');
  loseInfo.classList.add('hidden');
  winInfo.classList.add('hidden');

  showBoard();
});

function showBoard() {
  const board = game.getState();

  const allTails = document.querySelectorAll('.field-cell');

  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      const value = board[y][x];
      const index = y * 4 + x;
      const cell = allTails[index];

      // -1-
      if (value !== 0) {
        cell.textContent = value;
        cell.className = `field-cell field-cell--${value}`;
      } else {
        cell.textContent = '';
        cell.className = 'field-cell';
      }

      // -2-
      // cell.textContent = value !== 0 ? value : '';
    }
  }

  score.textContent = game.getScore();
}
showBoard();

function checkGameStatus() {
  if (game.status === 'lose') {
    loseInfo.classList.remove('hidden');
  }

  if (game.status === 'win') {
    winInfo.classList.remove('hidden');
  }
}

// --ПІДКЛЮЧАЮ стрілки!!!
document.addEventListener('keydown', (eventi) => {
  if (eventi.key === 'ArrowLeft') {
    game.moveLeft();
    checkGameStatus();
    showBoard();
  }

  if (eventi.key === 'ArrowRight') {
    game.moveRight();
    checkGameStatus();
    showBoard();
  }

  if (eventi.key === 'ArrowUp') {
    game.moveUp();
    checkGameStatus();
    showBoard();
  }

  if (eventi.key === 'ArrowDown') {
    game.moveDown();
    checkGameStatus();
    showBoard();
  }
});

// ====================================================================

// const currentState = game.getState();
// console.log('Hi game', currentState);

// ------------------------------------------

// import Game from '../modules/Game.class.js';

// Створюємо гру з тестовим масивом
// const game = new Game([
//   [2, 2, 0, 0],
//   [0, 0, 0, 0],
//   [2, 2, 0, 0],
//   [0, 0, 0, 0],
// ]);

// function draw() {
//   const board = game.getState();

//   // Знаходимо всі наші 16 клітинок на сторінці
//   const cells = document.querySelectorAll('.field-cell');

//   // Проходимо по масиву та заповнюємо клітинки
//   for (let y = 0; y < board.length; y++) {
//     for (let x = 0; x < board[y].length; x++) {
//       const value = board[y][x];

//       // Рахуємо порядковий індекс комірки в плоскому списку (від 0 до 15)
//       const cellIndex = y * 4 + x;
//       const cell = cells[cellIndex];

//       if (cell) {
//         if (value > 0) {
//           cell.textContent = value; // Записуємо число (наприклад, 2)
//           // Додаємо клас для CSS стилів плитки
//           cell.className = `field-cell cell-${value}`;
//         } else {
//           cell.textContent = ''; // Якщо нуль — очищуємо клітинку

//           // Повертаємо стандартний клас порожньої клітинки
//           cell.className = 'field-cell';
//         }
//       }
//     }
//   }
// }

// // Викликаємо відображення
// draw();

//            !!!натисни стрілку в консолі!!!
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
