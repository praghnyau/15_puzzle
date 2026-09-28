/**
 * @fileoverview The main orchestrator for the 15-Puzzle game.
 * This module imports all other modules and ties them together to create the game flow,
 * including game state persistence and player statistics.
 */

import * as engine from './engine.js';
import * as timer from './timer.js';
import * as ui from './ui-feedback.js';
import * as storage from './storage.js';

// --- State ---
let board = null;
let moveCount = 0;
let isGameRunning = false;
let timerUpdateInterval = null;
let stats = null;

// --- Functions ---

/**
 * Updates the stats display on the page.
 */
function updateStatsDisplay() {
    const gamesPlayedEl = document.getElementById('stats-games-played');
    const bestTimeEl = document.getElementById('stats-best-time');

    if (gamesPlayedEl) gamesPlayedEl.textContent = stats.gamesPlayed;
    if (bestTimeEl) {
        if (stats.bestTime) {
            const totalSeconds = Math.floor(stats.bestTime / 1000);
            const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
            const seconds = (totalSeconds % 60).toString().padStart(2, '0');
            bestTimeEl.textContent = `${minutes}:${seconds}`;
        } else {
            bestTimeEl.textContent = '--:--';
        }
    }
}

/**
 * Starts a fresh game. Can be triggered by the user or on first load.
 * @param {boolean} isUserReset - True if the user clicked a "New Game" button.
 */
function startNewGame(isUserReset = false) {
    if (isUserReset) {
        storage.clearGameState();
    }

    moveCount = 0;
    isGameRunning = false;
    ui.updateMoveCount(moveCount);

    if (timerUpdateInterval) clearInterval(timerUpdateInterval);
    timer.reset();
    ui.updateTimer(timer.getFormattedTime());

    ui.hideWinScreen();

    board = engine.initialize();
    engine.shuffle(board);
    ui.renderBoard(board);
    ui.updateTileCorrectness(board); // Apply correctness after rendering
}

/**
 * Resumes a game from a saved state.
 * @param {object} savedState - The state object from localStorage.
 */
function resumeGame(savedState) {
    board = savedState.board;
    moveCount = savedState.moves;
    isGameRunning = savedState.time > 0; // Game is running if time has passed

    timer.setTime(savedState.time);
    ui.updateMoveCount(moveCount);
    ui.updateTimer(timer.getFormattedTime());
    ui.renderBoard(board);
    ui.updateTileCorrectness(board); // Apply correctness after rendering

    // If the game was running, restart the timer interval
    if (isGameRunning) {
        timer.start();
        timerUpdateInterval = setInterval(() => {
            ui.updateTimer(timer.getFormattedTime());
        }, 500);
    }
}


/**
 * Handles the logic when a tile is clicked.
 */
function handleTileClick(event) {
    const tile = event.target.closest('.tile');
    if (!tile || !board) return;

    const tileValue = parseInt(tile.id.split('-')[1]);
    let tileRow, tileCol;

    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (board[r][c] === tileValue) {
                tileRow = r;
                tileCol = c;
                break;
            }
        }
        if (tileRow !== undefined) break;
    }

    if (engine.canMove(board, tileRow, tileCol)) {
        if (!isGameRunning) {
            isGameRunning = true;
            timer.start();
            timerUpdateInterval = setInterval(() => {
                ui.updateTimer(timer.getFormattedTime());
            }, 500);
        }

        const { row: emptyRow, col: emptyCol } = engine.findEmptyTile(board);
        moveCount++;
        board = engine.moveTile(board, tileRow, tileCol);

        ui.updateTilePosition(tileValue, { row: emptyRow, col: emptyCol });
        ui.updateMoveCount(moveCount);
        ui.updateTileCorrectness(board); // Update correctness after each move

        if (engine.isSolved(board)) {
            // --- WIN ---
            isGameRunning = false;
            timer.stop();
            clearInterval(timerUpdateInterval);
            storage.clearGameState();

            stats.gamesPlayed++;
            const finalTime = timer.getElapsedTime();
            if (stats.bestTime === null || finalTime < stats.bestTime) {
                stats.bestTime = finalTime;
            }
            storage.saveStats(stats);
            updateStatsDisplay();

            ui.showWinScreen(timer.getFormattedTime(), moveCount);
        } else {
            // --- SAVE PROGRESS ---
            storage.saveGameState({
                board: board,
                moves: moveCount,
                time: timer.getElapsedTime()
            });
        }
    }
}

/**
 * Initializes the application.
 */
function init() {
    const resetButton = document.getElementById('reset-button');
    const playAgainButton = document.getElementById('play-again-button');
    const gameBoardElement = document.getElementById('game-board');

    if (gameBoardElement) gameBoardElement.addEventListener('click', handleTileClick);
    if (resetButton) resetButton.addEventListener('click', () => startNewGame(true));
    if (playAgainButton) playAgainButton.addEventListener('click', () => startNewGame(true));

    stats = storage.loadStats();
    updateStatsDisplay();

    const savedGame = storage.loadGameState();
    if (savedGame) {
        resumeGame(savedGame);
    } else {
        startNewGame(false);
    }
}

// --- App Entry Point ---
document.addEventListener('DOMContentLoaded', init);