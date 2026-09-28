# Problem Statement: 15-Puzzle Game

## 1. Project Goal

The primary objective is to create a fully functional, client-side 15-Puzzle game. The game should present the user with a 4x4 grid containing 15 numbered tiles and one empty space. The user must slide the tiles into the correct numerical order (1-15) to solve the puzzle.

## 2. Core Features

-   **Game Board:** A 4x4 grid that displays the 15 tiles and one empty space.
-   **Shuffling:** Upon starting a new game, the tiles must be randomly shuffled. The shuffling mechanism must guarantee that the resulting puzzle is always solvable.
-   **Tile Movement:** The user must be able to click on a tile adjacent to the empty space to move it. The movement should be visually intuitive.
-   **Visual Feedback:** Tiles that are in their correct solved position will visually change color.
-   **Win Condition:** The game must be able to detect when the puzzle is solved (i.e., when all tiles are in ascending order, with the empty space at the end).
-   **Game Timer:** A stopwatch should start as soon as the first move is made and stop when the puzzle is solved. The elapsed time should be displayed to the user.
-   **Move Counter:** The game will track and display the total number of moves the user has made.
-   **Win Notification:** Upon solving the puzzle, the user should be presented with a clear "You Win!" message, showing their final time and move count.
-   **Resume Game:** The game state (current board, moves, time) should be saved automatically, allowing the user to close the browser and resume their game from where they left off.
-   **Player Statistics:** Basic statistics, such as total games played and the best (lowest) completion time, will be tracked and displayed using `localStorage`.

## 3. Technical Constraints

-   **Environment:** The entire application must run in the browser. No server-side logic or backend is required.
-   **Technology Stack:** The project must be built using only HTML, CSS, and vanilla JavaScript.
-   **No External Libraries:** No third-party JavaScript or CSS frameworks/libraries (like jQuery, React, Bootstrap, etc.) are permitted.
-   **Modularity:** The JavaScript code must be organized into ES6 modules, with a strict separation of concerns:
    -   **`engine.js`:** Pure game logic, with no direct manipulation of the DOM.
    -   **`ui-feedback.js`:** Responsible for all DOM manipulation and rendering.
    -   **`timer.js`:** Handles all timing-related logic.
    -   **`storage.js`:** Manages reading from and writing game state and player statistics to `localStorage`.
    -   **`main.js`:** Acts as the central controller, orchestrating the interactions between the other modules.
-   **User Interface:** The UI should be clean, responsive, and provide smooth animations for tile movements.
