import {
    saveGameToLocalStorage,
    getAllGamesFromLocalStorage,
    exportAllGamesAsJSON,
    importAllGamesFromJSON
} from "./storage.mjs"
import Game from "./models/game.mjs";

let games = [];
games = getAllGamesFromLocalStorage();

function renderGames() {
    const gameListEl = document.getElementById("gameList");
    gameListEl.innerHTML = "";

    games.forEach((game) => {
        const gameContainer = document.createElement("div");
        gameContainer.classList.add("game-container");

        const titleEl = document.createElement("h3");
        titleEl.textContent = `${game.name} (Year: ${game.year})`;
        gameContainer.appendChild(titleEl);

        const metaEl = document.createElement("paragraph");
        playCountEl.textContent = `Playcount: ${game.playCount}`;
        gameContainer.appendChild(playCountEl);

        const ratingWrapper = document.createElement("div");
        ratingWrapper.textContent = `Rating: `;
        const ratingInput = document.createElement("input");
        ratingInput.type = "range";
        ratingInput.min = "0";
        ratingInput.max = "10";
        ratingInput.value = game.rating;
        ratingWrapper.appendChild(ratingInput);
        gameContainer.appendChild(ratingWrapper);

        gameListEl.appendChild(gameContainer);
    });
}

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

renderGames();
console.log("App initialized (Step 5)");
