/* frontend storage of games */
let listOfGames = [];


/* FETCHING CODE */
const gameContainer = document.getElementById('gameContainer');

// fetches games from API
async function fetchGames(){
    const gameResponse = await fetch('http://localhost:3000/games');
    const gameList = await gameResponse.json();
    // pushes all games to the array for FE storage
    listOfGames.push(gameList);

    // maps out all games in backend storage
    gameContainer.innerHTML = gameList.map(
        game => `
        <div class="row bg-light text-center py-3 border border-black border-3">
            <h2 class="fst-italic">${game.title}</h2>
            <p>Genre: ${game.genreName}</p>
            <button onclick="deleteEntry(${game.id})" class="btn btn-danger col-2 mx-auto">Delete Entry</button>
        </div>
        `
    ).join("");
};

// Deletes selected entry
async function deleteEntry(gameId){
    // decided to be cheeky and add user confirmation
    if (confirm("Are you sure you wish to delete this entry? This cannot be undone.") == true){
        await fetch("http://localhost:3000/games/" + gameId, {
            method: "DELETE", //delete
        });
        const toDelete = listOfGames.indexOf(gameId)
        listOfGames.splice(toDelete, 1)
        fetchGames();
    } else {
        alert("Delete Cancelled.")
    };
}

// Adds entry based on user input
async function addEntry() {
    // converts user input to variables, adds them to an Entry
    let title = document.getElementById('gameTitleInput')
    let genre = document.getElementById('gameGenreInput')
    const entry = { title: title.value, genreName: genre.value}

    // Adds said entry to backend memory, stringifies it
    const response = await fetch("http://localhost:3000/games", {
        method: "POST", //create
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(entry)
    });

    // pushes new item to FE storage
    const newItem = await response.json()
    listOfGames.push(newItem);
    // clears text boxes
    title.value = ""
    genre.value = ""
    fetchGames();
}

fetchGames();
console.log(listOfGames);

