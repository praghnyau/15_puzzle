/**
 * @fileoverview Manages all DOM interactions for the 15-Puzzle game.
 * This includes rendering the board, updating UI elements, and showing feedback.
 */

import * as engine from './engine.js'; // Import engine to get solved state

const SOLVED_BOARD = engine.initialize(); // Get the solved board state once

/**
 * Renders the initial game board based on the board state.
 * @param {Array<Array<number|null>>} board - The 2D array representing the board.
 */
export function renderBoard(board) {
    const gameBoard = document.getElementById('game-board');
    if (!gameBoard) return;

    gameBoard.innerHTML = ''; // Clear previous board
    board.forEach((row, rowIndex) => {
        row.forEach((tileValue, colIndex) => {
            if (tileValue !== null) {
                const tile = document.createElement('div');
                tile.className = 'tile';
                tile.id = `tile-${tileValue}`;
                tile.textContent = tileValue;
                tile.style.left = `${colIndex * 25}%`;
                tile.style.top = `${rowIndex * 25}%`;

                // Check if tile is in correct position initially
                if (SOLVED_BOARD[rowIndex][colIndex] === tileValue) {
                    tile.classList.add('tile-correct');
                }
                gameBoard.appendChild(tile);
            }
        });
    });
}

/**
 * Updates the visual position of a single tile on the board.
 * @param {number} tileValue - The number of the tile to move.
 * @param {{row: number, col: number}} newPosition - The new position of the tile.
 */
export function updateTilePosition(tileValue, newPosition) {
    const tile = document.getElementById(`tile-${tileValue}`);
    if (tile) {
        tile.style.left = `${newPosition.col * 25}%`;
        tile.style.top = `${newPosition.row * 25}%`;
    }
}

/**
 * Iterates through the current board and updates the 'tile-correct' class
 * for each tile based on its current position.
 * @param {Array<Array<number|null>>} currentBoard - The current state of the game board.
 */
export function updateTileCorrectness(currentBoard) {
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            const tileValue = currentBoard[r][c];
            if (tileValue !== null) {
                const tileElement = document.getElementById(`tile-${tileValue}`);
                if (tileElement) {
                    if (SOLVED_BOARD[r][c] === tileValue) {
                        tileElement.classList.add('tile-correct');
                    } else {
                        tileElement.classList.remove('tile-correct');
                    }
                }
            }
        }
    }
}

/**
 * Updates the timer display on the screen.
 * @param {string} formattedTime - The time string (e.g., "01:23").
 */
export function updateTimer(formattedTime) {
    const timerDisplay = document.getElementById('timer');
    if(timerDisplay) timerDisplay.textContent = formattedTime;
}

/**
 * Updates the move count display on the screen.
 * @param {number} moveCount - The total number of moves.
 */
export function updateMoveCount(moveCount) {
    const moveCounterDisplay = document.getElementById('move-counter');
    if(moveCounterDisplay) moveCounterDisplay.textContent = moveCount;
}

/**
 * Shows the win screen with the final stats.
 * @param {string} finalTime - The final time string.
 * @param {number} finalMoves - The final move count.
 */
export function showWinScreen(finalTime, finalMoves) {
    const winScreen = document.getElementById('win-screen');
    const finalTimeDisplay = document.getElementById('final-time');
    const finalMovesDisplay = document.getElementById('final-moves');

    if (winScreen && finalTimeDisplay && finalMovesDisplay) {
        finalTimeDisplay.textContent = finalTime;
        finalMovesDisplay.textContent = finalMoves;
        winScreen.style.display = 'flex';
    }
}

/**
 * Hides the win screen.
 */
export function hideWinScreen() {
    const winScreen = document.getElementById('win-screen');
    if(winScreen) winScreen.style.display = 'none';
}