import Game from "./models/game.mjs";

function generateGameKey(gameObj) {
    const safeName = gameObj.name.replace(/\s+/g, "_");
    return `Game-${safeName}-${Date.now()}`;
}

export function saveGameToLocalStorage(gameObj) {
    const uniqueKey = generateGameKey(gameObj);
    localStorage.setItem(uniqueKey, JSON.stringify(gameObj));
}

export function getAllGamesFromLocalStorage() {
    const games = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("Game-")) {
            const gameData = JSON.parse(localStorage.getItem(key));
            games.push(new Game(gameData));
        }
    }
    return games;
}

export function exportAllGamesAsJSON() {
    const allGames = getAllGamesFromLocalStorage();
    return JSON.stringify(allGames, null, 2);
}

export function importAllGamesFromJSON(jsonString) {
    try {
        const parsedArr = JSON.parse(jsonString);
        parsedArr.forEach(gameObj => {
            saveGameToLocalStorage(new Game(gameObj));
        });
    } catch (err) {
        console.error("Error importing JSON:", err);
    }
}

console.log("App initialized"); 