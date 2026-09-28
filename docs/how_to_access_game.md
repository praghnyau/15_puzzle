# How to Access the 15-Puzzle Game

Because the 15-Puzzle game is built using ES6 Modules (`import`/`export`), modern web browsers have security restrictions that prevent it from running directly when you open the `index.html` file from your local filesystem (i.e., using a `file:///` address).

To properly run and view the game, you need to serve it using a local web server. This provides the browser with a proper origin (`http://...`) and allows all JavaScript modules to load correctly.

## Steps to Run the Game Locally:

1.  **Open your Terminal or Command Prompt:**
    Navigate to the root directory of your project:
    ```bash
    cd /home/gnanika/Downloads/15_puzzle
    ```

2.  **Start a Local Web Server:**
    The simplest way to do this is using Python's built-in HTTP server module. If you have Python installed, use the following command:
    ```bash
    python3 -m http.server
    ```
    (If `python3` doesn't work, try `python -m http.server` or `py -m http.server` on Windows).

    This command will start a server, usually on port `8000`. You should see output similar to:
    ```
    Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
    ```

3.  **Access the Game in Your Browser:**
    Open your preferred web browser and navigate to the following address:
    ```
    http://localhost:8000
    ```
    You should now see the 15-Puzzle game displayed and fully functional.

## Important Notes:

-   Keep the terminal window where you started the `python3 -m http.server` command open. Closing it will stop the server, and the game will no longer be accessible.
-   If port `8000` is already in use, Python will usually try to find the next available port. Check the terminal output for the exact address.
-   This method is suitable for local development and testing. For deployment to a live website, you would typically use a more robust web server (like Nginx, Apache, or a cloud hosting solution).
