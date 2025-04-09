# GameRecord

This is a web application to track board games: their ratings, play counts, and other metadata.

## Steps 
Step 1: Initial commit with basic files
- Files Added:
 - readme.md
 - app.mjs
 - style.cs
 - index.html
- Functionality:
index.html contains a basic HTML5 scaffold with references to app.mjs and style.css

Step 2: Create Game class
Objective: Define a Game class that reflects the data structure provided in example.json

- Changes:
 - Created a models folder
 - Added game.mjs which exports game class as default
 - imported the game class into app.mjs

Step 3: Implementing LocalStorage Operations
Objective: Create functions for saving, retrieving, exporting, and importing fames using localStorage.

- Changes:
 Storage Functions:
 - saveGameToLocalStorage(gameObj): Generates a unique key for each game and saves it
 - getAllGamesFromLocalStorage(): Retrieves all saved games by checking for keys that start with "Game-"
 - exportAllGamesAsJSON(): Exports all games as a JSON string
 - importAllGamesFromJSON(jsonString): Imports and saves games from a JSON string
- These functions were eventually moved to a new file (storage.js) for clarity and avoid circular dependencies 