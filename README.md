# GameRecord

This is a web application to track board games: their ratings, play counts, and other metadata

## Steps 
Step 1: Initial commit with basic files
- Files Added:
 - `readme.md`
 - `app.mjs`
 - `style.cs`
 - `index.html`
- Functionality:
`index.html` contains a basic HTML5 scaffold with references to `app.mjs` and `style.css`

Step 2: Create Game class
Objective: Define a Game class that reflects the data structure provided in example.json

- Changes:
 - Created a models folder
 - Added `game.mjs` which exports game class as default
 - imported the game class into `app.mjs`

Step 3: Implementing LocalStorage Operations
Objective: Create functions for saving, retrieving, exporting, and importing fames using localStorage

- Changes:
 Storage Functions:
 - `saveGameToLocalStorage(gameObj)`: Generates a unique key for each game and saves it
 - `getAllGamesFromLocalStorage()`: Retrieves all saved games by checking for keys that start with "Game-"
 - `exportAllGamesAsJSON()`: Exports all games as a JSON string
 - `importAllGamesFromJSON(jsonString)`: Imports and saves games from a JSON string
- These functions were eventually moved to a new file (storage.js) for clarity and avoid circular dependencies 

Step 4: Adding File Import & In-Memory Game Array
Objective: 
  Allow users to import a JSON file (e.g., `example.json`) into localStorage
- Changes: 
  - Updated `index.html` to include an `<input type="file" id="importSource">`
  - Added FileReader functionality in `app.mjs` to import JSON data
  - Created an in-memory array `games` that is populated from localStorage whenever the app loads

Step 5: Rendering Game Records in the UI
Objective: 
  Dynamically create a visual representation of each game in the UI
- Changes:  
  - Updated `index.html` to include a container (`<section id="gameList">`) for displaying games
  - Wrote the `renderGames()` function in `app.mjs` to loop through the `games` array and create HTML elements for each game
  - Displayed key details like game title, metadata, playCount, and a range input for rating