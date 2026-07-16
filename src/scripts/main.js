'use strict';

// Uncomment the next lines to use your game instance in the browser
const Game = require('../modules/Game.class');
// const game = new Game();

// ====================================================================

// const currentState = game.getState();
// console.log('Hi game', currentState);

// ------------------------------------------

// import Game from '../modules/Game.class.js';

// Створюємо гру з тестовим масивом
const game = new Game([
  [2, 2, 0, 0],
  [0, 0, 0, 0],
  [2, 2, 0, 0],
  [0, 0, 0, 0],
]);

function draw() {
  const board = game.getState();

  // Знаходимо всі наші 16 клітинок на сторінці
  const cells = document.querySelectorAll('.field-cell');

  // Проходимо по масиву та заповнюємо клітинки
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      const value = board[y][x];

      // Рахуємо порядковий індекс комірки в плоскому списку (від 0 до 15)
      const cellIndex = y * 4 + x;
      const cell = cells[cellIndex];

      if (cell) {
        if (value > 0) {
          cell.textContent = value; // Записуємо число (наприклад, 2)
          // Додаємо клас для CSS стилів плитки
          cell.className = `field-cell tile-${value}`;
        } else {
          cell.textContent = ''; // Якщо нуль — очищуємо клітинку

          // Повертаємо стандартний клас порожньої клітинки
          cell.className = 'field-cell';
        }
      }
    }
  }
}

// Викликаємо відображення
draw();
