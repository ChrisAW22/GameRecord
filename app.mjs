import Game from "./models/game.mjs";
import {
    saveGameToLocalStorage,
    getAllGamesFromLocalStorage,
    exportAllGamesAsJSON,
    importAllGamesFromJSON
} from "./storage.mjs"

let games = [];
games = getAllGamesFromLocalStorage();
const fileInput = document.getElementById("importSource");
fileInput.addEventListener("change", handleFileImport);

function handleFileImport(event) {
    const file = event.target.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        const fileContent = event.target.result;
        importAllGamesFromJSON(fileContent);
        games = getAllGamesFromLocalStorage();
        console.log("Imported Games:", games);
    };
    reader.readAsText(file);
}

console.log("App initialized (Step 4)");
console.log("Current in-memory games:", games);

const testGame = new Game({
    name: "Ticket to Ride",
    year: 2004,
    players: "2-5",
    time: "30-40 mins",
    difficulty: "Light",
    designer: "Alan R. Moon",
    artist: "Julien Delval, Cyrille Daujean",
    publisher: "Days of Wonder",
    bggLink: "https://boardgamegeek.com/boardgame/9209/ticket-ride",
    playCount: 423,
    rating: 6
});
console.log("Test Game:", testGame);