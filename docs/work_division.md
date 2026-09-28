# Work Division and Responsibilities

This document outlines the role and specific tasks for each team member.

## Member 1 (Expert) - Core Logic

**File:** `js/engine.js`

**Responsibilities:**
-   **Game State Logic:** Implement the core data structure for the 15-puzzle board (e.g., a 2D array).
-   **Initialization:** Create a function to generate a solved puzzle state.
-   **Shuffling:** Develop a robust shuffling algorithm. This function must ensure that every puzzle generated is solvable. This is a critical mathematical component of the task.
-   **Move Validation:** Implement functions to check if a move is valid (e.g., `canMove(tile)`).
-   **Move Execution:** Write a function that updates the game state when a valid move is made.
-   **Win Condition:** Create a function to check if the current board state matches the solved state.
-   **API:** Export all necessary functions (`initialize`, `shuffle`, `canMove`, `moveTile`, `isSolved`) for use in `main.js`. Ensure no DOM manipulation occurs in this file.

## Member 2 (Expert) - State Management & Timing

**Files:** `js/main.js`, `js/timer.js`

**Responsibilities:**
-   **`main.js` (State Orchestrator):**
    -   Import functions from all other modules (`engine`, `timer`, `ui-feedback`, `storage`).
    -   Manage the overall application state (e.g., `isGameRunning`, `moveCount`, `startTime`, player `stats`).
    -   Handle loading saved game state or starting a new game on initialization.
    -   Create the main game loop/event handling logic. Attach event listeners to the board and delegate actions.
    -   When a tile is clicked, call `engine.js` functions to validate the move and update the state.
    -   If a move is successful, call `ui-feedback.js` to render the changes and `storage.js` to save the game state.
    -   Manage the start, stop, and reset flow of the game.
    -   When a win is detected (via `engine.isSolved()`), stop the timer, update player `stats` (games played, best time), save `stats` via `storage.js`, clear saved game state, and call `ui-feedback.js` to show the win message.
    -   **`timer.js` (Stopwatch):**
        -   Implement `start()`, `stop()`, and `reset()` functions for a stopwatch.
        -   Implement `setTime(ms)` to set elapsed time and `getElapsedTime()` to retrieve it.
        -   The timer should accurately track elapsed time in seconds and milliseconds.
        -   Provide a function to get the current formatted time, which `main.js` can poll to update the UI.

## Member 3 (Beginner) - Styling and Animation

**File:** `style.css`

**Responsibilities:**
-   **Board and Tile Styling:** Define the visual appearance of the puzzle grid and the individual tiles. This includes colors, fonts, sizes, and spacing.
-   **Layout:** Ensure the game is well-centered and responsive.
-   **Tile Transitions:** Implement smooth CSS transitions for the tile sliding effect and for background color changes (e.g., when a tile is in its correct position).
-   **Feedback Styles:** Style the "win" message, the timer display, and player statistics display.
-   **Hover/Active States:** Add visual feedback for when a user hovers over a movable tile.

## Member 4 (Beginner) - UI Rendering and Feedback

**File:** `js/ui-feedback.js`

**Responsibilities:**
-   **Board Rendering:** Create a function `renderBoard(boardState)` that takes the game state array from `engine.js` and generates the corresponding HTML in the DOM. This should only be called once at the start of the game or on resuming.
-   **Tile Movement:** Implement a function `updateTilePosition(tileValue, newPosition)` that updates the position of a specific tile in the DOM. This will be called by `main.js` after a move is validated.
-   **Visual Feedback for Correct Tiles:** Implement `updateTileCorrectness(currentBoard)` to add/remove a special CSS class (e.g., `.tile-correct`) to tiles that are in their correct solved position.
-   **UI Updates:**
    -   Write a function to update the move count display.
    -   Write a function to update the timer display on the screen, using the value from `timer.js`.
    -   Write a function to update player statistics display.
-   **Win Notification:** Create a function `showWinScreen(time, moves)` that displays a clear and celebratory message to the user upon winning.

## Member 5 (Beginner) - Persistence & Quality Assurance

**Files:** `js/storage.js`, QA

**Responsibilities:**
-   **`js/storage.js` (LocalStorage):**
    -   Implement `saveGameState(board, moves, time)` to save the current game state.
    -   Implement `loadGameState()` to retrieve the saved game state.
    -   Implement `clearGameState()` to remove the saved game state.
    -   Implement `loadStats()` and `saveStats(stats)` to manage player statistics (games played, best time).
-   **Quality Assurance (QA):**
    -   Thoroughly test the application across different browsers (Chrome, Firefox).
    -   Verify the shuffling algorithm always produces a solvable puzzle.
    -   Check for and report any bugs, visual glitches, or logical errors.
    -   Ensure the final product meets all project goals.
    -   Prepare the project for deployment (e.g., ensuring all files are correctly linked and the `README.md` is clear).
