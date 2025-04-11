import {
    saveGameToLocalStorage,
    getAllGamesFromLocalStorage,
    exportAllGamesAsJSON,
    importAllGamesFromJSON,
    removeGameFromLocalStorage
} from "./storage.mjs"
import Game from "./models/game.mjs";

let games = getAllGamesFromLocalStorage();

function renderGames() {
    const gameListEl = document.getElementById("gameList");
    gameListEl.innerHTML = "";

    games.forEach((game) => {
        const gameContainer = document.createElement("div");
        gameContainer.classList.add("game-container");

        const titleEl = document.createElement("h3");
        titleEl.textContent = `${game.name} (Year: ${game.year})`;
        gameContainer.appendChild(titleEl);

        const metaEl = document.createElement("p");
        playMetaEl.textContent = `Players: ${game.players} | Time: ${game.time} | Difficulty: ${game.difficulty}`;
        gameContainer.appendChild(metaEl);

        const detailsEl = document.createElement("p");
        playDetailEl.textContent = `Designer: ${game.designer} | Artist: ${game.artist} | Publisher: ${game.publisher}`
        gameContainer.appendChild(detailsEl);

        const linkEl = document.createElement("a");
        linkEl.href = game.bggLink;
        linkEl.target = "_blank";
        linkEl.textContent = "BGG Listing";
        gameContainer.appendChild(linkEl);

        const playCountEl = document.createElement("p");
        playCountEl.textContent = `Playcount: ${game.playCount}`;
        gameContainer.appendChild(playCountEl);

        const incrementBtn = document.createElement("button");
        incrementBtn.textContent = "+";
        incrementBtn.addEventListener("click", () => {
            game.playCount++;
            playCountEl.textContent = `Playcount: ${game.playCount}`;
            saveGameToLocalStorage(game);
        });
        gameContainer.appendChild(incrementBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
            removeGameFromLocalStorage(game);
            games.splice(index, 1);
            renderGames();
        });
        gameContainer.appendChild(deleteBtn);

        gameListEl.appendChild(gameContainer);

        const ratingWrapper = document.createElement("div");
        ratingWrapper.textContent = `Rating: `;
        const ratingInput = document.createElement("input");
        ratingInput.type = "range";
        ratingInput.min = "0";
        ratingInput.max = "10";
        ratingInput.value = game.rating;
        ratingInput.addEventListener("input", () => {
            game.rating = parseInt(ratingInput.value);
            saveGameToLocalStorage(game);
        });
        ratingWrapper.appendChild(ratingInput);

        const ratingValueDisplay = document.createElement("span");
        ratingValueDisplay.textContent = ` ${game.rating}`;
        ratingInput.addEventListener("input", () => {
            ratingValueDisplay.textContent = ` ${ratingInput.value}`;
        });
        ratingWrapper.appendChild(ratingValueDisplay);

        gameContainer.appendChild(ratingWrapper);

        gameListEl.appendChild(gameContainer);
    });
}

const sortSelect = document.getElementById("sortSelect");
if (sortSelect) {
    sortSelect.addEventListener("change", () => {
        const sortBy = sortSelect.value;
        sortGames(sortBy);
        renderGames();
    });
}

function sortGames(criteria) {
    switch (criteria) {
        case "players":
            games.sort((a, b) => {
                const aMin = parseInt(a.players) || 0;
                const bMin = parseInt(b.players) || 0;
                return aMin - bMin;
            });
            break;
        case "rating":
            games.sort((a, b) => a.rating - b.rating);
            break;
        case "difficulty":
            games.sort((a, b) => a.difficulty.localeCompare(b.difficulty));
            break;
        case "playCount":
            games.sort((a, b) => a.playCount - b.playCount);
            break;
        default:
            break;    
    }
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

const addGameBtn = document.getElementById("addGameBtn");
addGameBtn.addEventListener("click", () => {
    const name = document.getElementById("nameInput").value;
    const year = parseInt(document.getElementById("yearInput").value) || 0;
    const players = document.getElementById("playersInput").value;
    const time = document.getElementById("timeInput").value;
    const difficulty = document.getElementById("difficultyInput").value;
    const designer = document.getElementById("designerInput").value;
    const artist = document.getElementById("artistInput").value;
    const publisher = document.getElementById("publisherInput").value;
    const bggLink = document.getElementById("bggLinkInput").value;
    const playCount = parseInt(document.getElementById("playCountInput").value) || 0;
    const rating = parseInt(document.getElementById("ratingInput").value) || 0;

    const newGame = new Game({
        name, year, players, time, difficulty,
        designer, artist, publisher, bggLink,
        playCount, rating
    });

    saveGameToLocalStorage(newGame);

    games.push(newGame);

    document.getElementById("nameInput").value = "";
    document.getElementById("yearInput").value = "";
    document.getElementById("playersInput").value = "";
    document.getElementById("timeInput").value = "";
    document.getElementById("difficultyInput").value = "";
    document.getElementById("designerInput").value = "";
    document.getElementById("artistInput").value = "";
    document.getElementById("publisherInput").value = "";
    document.getElementById("bggLinkInput").value = "";
    document.getElementById("playCountInput").value = "";
    document.getElementById("ratingInput").value = "";

    renderGames();
});

renderGames();
console.log("App initialized");
