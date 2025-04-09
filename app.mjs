import Game from "./models/game.mjs";

console.log("App initialized (Step 1).");

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