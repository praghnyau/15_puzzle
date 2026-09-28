# Directory Structure and File Responsibilities

This document details the intended purpose and responsibilities of each file and directory within the project, reinforcing the modular architecture.

```
/15_puzzle/
├───index.html
├───style.css
├───js/
│   ├───main.js
│   ├───engine.js
│   ├───timer.js
│   ├───ui-feedback.js
│   └───storage.js
└───@docs/
    ├───work_division.md
    ├───problem_statement.md
    └───directory_structure.md (this file)
```

## Root Directory (`/15_puzzle/`)

-   **`index.html`**:
    -   **Purpose:** The main entry point of the application. This is the only HTML file in the project.
    -   **Responsibilities:**
        -   Includes the necessary `<link>` tag to `style.css`.
        -   Contains the main structure of the 15-puzzle game, including the board container, timer display, move counter, player stats display, and any win/feedback overlays.
        -   Imports `js/main.js` as a module (`<script type="module" src="js/main.js"></script>`) to bootstrap the JavaScript application.
        -   **Constraints:** Should contain minimal inline scripting. All JavaScript logic should be handled by the imported modules.

-   **`style.css`**:
    -   **Purpose:** Contains all styling rules and animations for the entire application.
    -   **Responsibilities:**
        -   Define the layout, colors, fonts, and dimensions of the game board and tiles.
        -   Implement responsive design principles.
        -   Crucially, manage CSS transitions for smooth tile sliding animations and correct tile visual feedback.
        -   Style the timer, move counter, win notification, and player stats display.
        -   **Constraints:** No external CSS frameworks or libraries. Pure vanilla CSS.

## `js/` Directory

-   **Purpose:** This directory houses all the JavaScript modules that implement the game's logic, UI interactions, timing, and data persistence.
-   **Responsibilities:** To provide a clear separation of JavaScript concerns into modular units, each responsible for a specific aspect of the game.

-   **`js/main.js`**:
    -   **Purpose:** The application's orchestrator or "glue" file. It brings together all other modules and manages the overall game state and flow.
    -   **Responsibilities:**
        -   Import functions and variables from `engine.js`, `timer.js`, `ui-feedback.js`, and `storage.js`.
        -   Initialize the game (e.g., set up the board, start event listeners, load saved state or start new game).
        -   Handle user input (e.g., tile clicks), validating moves through `engine.js`.
        -   Coordinate updates to the UI via `ui-feedback.js` and timer via `timer.js`.
        -   Detect win conditions and trigger appropriate actions (stop timer, show win screen, update player stats, save game state).
        -   Manage game reset functionality.
        -   Save current game state to `localStorage` after each valid move.
        -   **Constraints:** Does not directly manipulate the DOM (delegates to `ui-feedback.js`). Does not contain core game logic (delegates to `engine.js`).

-   **`js/engine.js`**:
    -   **Purpose:** Encapsulates all the core mathematical and logical rules of the 15-puzzle game.
    -   **Responsibilities:**
        -   Manage the internal representation of the game board state (e.g., a 2D array).
        -   Implement the algorithm for shuffling tiles, ensuring solvability.
        -   Provide functions to check for valid moves (`canMove`).
        -   Execute tile movements and update the internal board state.
        -   Determine if the current board state represents a solved puzzle (`isSolved`).
        -   **Constraints:** Absolutely no direct interaction with the HTML DOM. Pure JavaScript logic, operating on data structures.

-   **`js/timer.js`**:
    -   **Purpose:** Provides stopwatch functionality for tracking game duration.
    -   **Responsibilities:**
        -   Start, stop, and reset the timer.
        -   Accurately track elapsed time (e.g., in seconds, milliseconds).
        -   Provide a method to retrieve the current elapsed time (raw and formatted).
        -   Provide a method to set the elapsed time for resuming games.
        -   **Constraints:** Should be a self-contained module for timekeeping.

-   **`js/ui-feedback.js`**:
    -   **Purpose:** Manages all interactions with the Document Object Model (DOM), rendering the game state, and providing user feedback.
    -   **Responsibilities:**
        -   Initial rendering of the puzzle board based on the game state.
        -   Updating the visual position of tiles after a move (including animations).
        -   Updating display elements like the timer, move counter, and player stats.
        -   Displaying win notifications and other game messages.
        -   Applying visual feedback (e.g., color change) to tiles that are in their correct solved position.
        -   **Constraints:** Does not contain game logic; it only *reflects* the state provided by `main.js` and `engine.js`.

-   **`js/storage.js`**:
    -   **Purpose:** Handles persistence of game data and player statistics using `localStorage`.
    -   **Responsibilities:**
        -   Save and load the current game state (board, moves, time) to enable game resuming.
        -   Clear saved game state after a game is won or explicitly reset.
        -   Save and load player statistics (games played, best time).
        -   **Constraints:** Interacts only with `localStorage` and provides data to `main.js`.

## `@docs/` Directory

-   **Purpose:** To store all project documentation, including architectural decisions, team responsibilities, and problem statements.
-   **Responsibilities:** To provide a single, organized location for project knowledge that can be easily accessed and understood by all team members.

    -   **`work_division.md`**: Details each team member's specific roles and responsibilities.
    -   **`problem_statement.md`**: Outlines the overall project goal, core features, and technical constraints.
    -   **`directory_structure.md`**: (This file) Explains the purpose of each file and directory in the project.
    -   **`how_to_access_game.md`**: Provides instructions on how to run the game locally using a web server.
