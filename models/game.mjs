export default class Game {
    constructor({
        name = "",
        year = "",
        players = "",
        time = "",
        difficulty = "",
        designer = "",
        artist = "",
        publisher = "",
        bggLink = "",
        playCount = 0,
        rating = 0
    }) {
        this.name = name;
        this.year = year;
        this.players = players;
        this.time = time;
        this.difficulty = difficulty;
        this.designer = designer;
        this.artist = artist;
        this.publisher = publisher;
        this.bggLink = bggLink;
        this.playCount = playCount;
        this.rating = rating;
    }
}