/**
 * @fileoverview A simple stopwatch module for the 15-Puzzle game.
 */

let timerId = null;
let startTime = 0;
let elapsedTime = 0;

/**
 * Starts the stopwatch. If it was already running, it continues from where it was.
 */
export function start() {
    if (timerId) {
        return; // Timer is already running
    }
    startTime = Date.now() - elapsedTime;
    timerId = setInterval(() => {
        elapsedTime = Date.now() - startTime;
    }, 100); // Update every 100ms for reasonable accuracy
}

/**
 * Stops the stopwatch.
 */
export function stop() {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }
}

/**
 * Resets the stopwatch to zero.
 */
export function reset() {
    stop();
    elapsedTime = 0;
}

/**
 * Sets the current elapsed time. Used for loading a saved game.
 * @param {number} ms - The elapsed time in milliseconds.
 */
export function setTime(ms) {
    elapsedTime = ms;
}

/**
 * Gets the raw elapsed time in milliseconds.
 * @returns {number}
 */
export function getElapsedTime() {
    return elapsedTime;
}

/**
 * Gets the elapsed time, formatted as MM:SS.
 * @returns {string} The formatted time string.
 */
export function getFormattedTime() {
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}