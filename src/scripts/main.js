'use strict';

// Uncomment the next lines to use your game instance in the browser
const Game = require('../modules/Game.class');
const game = new Game();

// ====================================================================
window.game = game;    // GPT  /  test slideRow
// ====================================================================
game.addRandomNumber();   // Claude

// ====================================================================
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
}
showBoard();

// --ПІДКЛЮЧАЮ стрілки!!!
document.addEventListener('keydown', ((eventi) => {
  if (eventi.key === 'ArrowLeft') {
    game.moveLeft();
    showBoard();
  }

  if (eventi.key === 'ArrowRight') {
    game.moveRight();
    showBoard();
  }

  if (eventi.key === 'ArrowUp') {
    game.moveUp();
    showBoard();
  }

  if (eventi.key === 'ArrowDown') {
    game.moveDown();
    showBoard();
  }
}));

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
