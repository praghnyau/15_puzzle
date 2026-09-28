/**
 * @fileoverview Manages all interactions with browser localStorage.
 * This includes saving/loading the game state for resuming and player stats.
 */

const GAME_STATE_KEY = '15puzzle_gameState';
const PLAYER_STATS_KEY = '15puzzle_playerStats';

// --- Game State ---

/**
 * Saves the current state of the game to localStorage.
 * @param {object} state - The game state to save (board, moves, time).
 */
export function saveGameState(state) {
    try {
        localStorage.setItem(GAME_STATE_KEY, JSON.stringify(state));
    } catch (e) {
        console.error("Could not save game state to localStorage:", e);
    }
}

/**
 * Loads the game state from localStorage.
 * @returns {object|null} The saved game state, or null if none exists.
 */
export function loadGameState() {
    try {
        const savedState = localStorage.getItem(GAME_STATE_KEY);
        return savedState ? JSON.parse(savedState) : null;
    } catch (e) {
        console.error("Could not load game state from localStorage:", e);
        return null;
    }
}

/**
 * Clears the saved game state from localStorage.
 */
export function clearGameState() {
    localStorage.removeItem(GAME_STATE_KEY);
}


// --- Player Stats ---

/**
 * Loads player stats from localStorage.
 * @returns {object} The player stats, or default stats if none exist.
 */
export function loadStats() {
    try {
        const savedStats = localStorage.getItem(PLAYER_STATS_KEY);
        if (savedStats) {
            return JSON.parse(savedStats);
        }
    } catch (e) {
        console.error("Could not load player stats from localStorage:", e);
    }
    // Return default stats if nothing is saved or an error occurs
    return {
        gamesPlayed: 0,
        bestTime: null, // time in milliseconds
    };
}

/**
 * Saves player stats to localStorage.
 * @param {object} stats - The stats object to save.
 */
export function saveStats(stats) {
    try {
        localStorage.setItem(PLAYER_STATS_KEY, JSON.stringify(stats));
    } catch (e) {
        console.error("Could not save player stats to localStorage:", e);
    }
}