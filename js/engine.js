/**
 * @fileoverview Core game logic for the 15-Puzzle.
 * This module handles the state of the board, shuffling, move validation,
 * and checking for the win condition. It does not interact with the DOM.
 */

/**
 * Creates a solved 4x4 puzzle board.
 * The empty space is represented by `null`.
 * @returns {Array<Array<number|null>>} A 2D array representing the solved board.
 */
export function initialize() {
    return [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, null],
    ];
}

/**
 * Checks if the given board state is the solved state.
 * @param {Array<Array<number|null>>} board - The current board state.
 * @returns {boolean} - True if the board is solved, false otherwise.
 */
export function isSolved(board) {
    const solvedBoard = initialize();
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] !== solvedBoard[i][j]) {
                return false;
            }
        }
    }
    return true;
}

/**
 * Finds the coordinates of the empty tile (null).
 * @param {Array<Array<number|null>>} board - The board to search.
 * @returns {{row: number, col: number}} - The coordinates of the empty tile.
 */
export function findEmptyTile(board) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === null) {
                return { row: i, col: j };
            }
        }
    }
    // This should never happen in a valid board
    throw new Error("Empty tile not found on the board.");
}

/**
 * Gets the valid moves from the empty tile's position.
 * @param {number} row - The row of the empty tile.
 * @param {number} col - The column of the empty tile.
 * @returns {Array<{row: number, col: number}>} - A list of valid neighbor coordinates.
 */
function getValidMoves(row, col) {
    const moves = [];
    if (row > 0) moves.push({ row: row - 1, col }); // Up
    if (row < 3) moves.push({ row: row + 1, col }); // Down
    if (col > 0) moves.push({ row, col: col - 1 }); // Left
    if (col < 3) moves.push({ row, col: col + 1 }); // Right
    return moves;
}

/**
 * Shuffles the board by making a large number of random valid moves.
 * This guarantees the resulting puzzle is solvable.
 * @param {Array<Array<number|null>>} board - The board to shuffle.
 * @returns {Array<Array<number|null>>} - The shuffled board.
 */
export function shuffle(board) {
    let { row: emptyRow, col: emptyCol } = findEmptyTile(board);
    const shuffleCount = 1000; // Number of random moves to make

    for (let i = 0; i < shuffleCount; i++) {
        const validMoves = getValidMoves(emptyRow, emptyCol);
        const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];

        // Swap the empty tile with the randomly chosen neighbor
        board[emptyRow][emptyCol] = board[randomMove.row][randomMove.col];
        board[randomMove.row][randomMove.col] = null;

        // Update the empty tile's position
        emptyRow = randomMove.row;
        emptyCol = randomMove.col;
    }
    return board;
}

/**
 * Determines if a tile at a given position can be moved.
 * A tile can move if it is adjacent to the empty space.
 * @param {Array<Array<number|null>>} board - The current board state.
 * @param {number} row - The row of the tile to check.
 * @param {number} col - The column of the tile to check.
 * @returns {boolean} - True if the tile can be moved, false otherwise.
 */
export function canMove(board, row, col) {
    const { row: emptyRow, col: emptyCol } = findEmptyTile(board);
    const rowDiff = Math.abs(row - emptyRow);
    const colDiff = Math.abs(col - emptyCol);

    // A tile can move if it's in the same row and adjacent column,
    // or in the same column and adjacent row. (Not diagonal)
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
}

/**
 * Moves a tile into the empty space, if the move is valid.
 * @param {Array<Array<number|null>>} board - The current board state.
 * @param {number} row - The row of the tile to move.
 *   @param {number} col - The column of the tile to move.
 * @returns {Array<Array<number|null>>} - The new board state after the move.
 */
export function moveTile(board, row, col) {
    if (!canMove(board, row, col)) {
        return board; // Return the board unmodified if the move is not valid
    }

    const { row: emptyRow, col: emptyCol } = findEmptyTile(board);

    // Swap the tile with the empty space
    const tileValue = board[row][col];
    board[emptyRow][emptyCol] = tileValue;
    board[row][col] = null;

    return board;
}
