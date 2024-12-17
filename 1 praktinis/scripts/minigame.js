document.addEventListener("DOMContentLoaded", function () {
    const puzzleContainer = document.getElementById("puzzle-container");
    const shuffleButton = document.getElementById("shuffle-button");
    const timerDisplay = document.getElementById("timer");

    const gridSize = 3; // 3x3 grid
    let tiles = [];
    let emptyTileIndex;
    let timer;
    let time = 0;

    // Replace this with the path to your image
    const imageSrc = "../Nuotraukos/DSC_1277.JPG";

    // Initialize the puzzle
    function initPuzzle() {
        puzzleContainer.innerHTML = "";
        tiles = [];
        time = 0;
        clearInterval(timer);
        timerDisplay.textContent = "Time: 0s";

        // Create tiles
        for (let i = 0; i < gridSize * gridSize; i++) {
            const tile = document.createElement("div");
            tile.classList.add("puzzle-tile");

            if (i === gridSize * gridSize - 1) {
                tile.classList.add("empty");
                emptyTileIndex = i;
            } else {
                tile.style.backgroundImage = `url('${imageSrc}')`;
                tile.style.backgroundPosition = getBackgroundPosition(i);
                tile.textContent = i + 1; // Optional numbering
            }

            tile.dataset.index = i;
            tile.addEventListener("click", () => moveTile(i));
            puzzleContainer.appendChild(tile);
            tiles.push(tile);
        }
    }

    // Calculate background position for each tile
    function getBackgroundPosition(index) {
        const x = (index % gridSize) * -100;
        const y = Math.floor(index / gridSize) * -100;
        return `${x}px ${y}px`;
    }

    // Function to start the timer
    function startTimer() {
        clearInterval(timer); // Clear any existing timer
        seconds = 0; // Reset seconds
        timer = setInterval(() => {
            seconds++;
            document.getElementById("timer").textContent = `Time: ${seconds}s`;
        }, 1000);
    }

    // Stop the timer
    function stopTimer() {
        clearInterval(timer); // Stops the timer
    }

    // Check if the puzzle is solved
    function checkWin() {
        for (let i = 0; i < tiles.length; i++) {
            if (!tiles[i].classList.contains("empty") && tiles[i].style.backgroundPosition !== getBackgroundPosition(i)) {
                return; // Exit if tiles are not in the correct order
            }
        }
        stopTimer(); // Stop the timer upon success
        setTimeout(() => alert(`Congratulations! You solved the puzzle in ${seconds} seconds!`), 200);
    }

    // Move a tile if it's adjacent to the empty space
    function moveTile(tileIndex) {
        const neighbors = getNeighbors(emptyTileIndex);

        if (neighbors.includes(tileIndex)) {
            swapTiles(emptyTileIndex, tileIndex);
            emptyTileIndex = tileIndex; // Update empty tile index
            checkWin();
        }
    }

    // Get valid neighbor indices for the empty tile
    function getNeighbors(index) {
        const neighbors = [];

        if (index % gridSize !== 0) neighbors.push(index - 1); // Left
        if (index % gridSize !== gridSize - 1) neighbors.push(index + 1); // Right
        if (index >= gridSize) neighbors.push(index - gridSize); // Up
        if (index < gridSize * (gridSize - 1)) neighbors.push(index + gridSize); // Down

        return neighbors;
    }

    // Swap two tiles
    function swapTiles(emptyIndex, tileIndex) {
        [tiles[emptyIndex].style.backgroundImage, tiles[tileIndex].style.backgroundImage] =
            [tiles[tileIndex].style.backgroundImage, tiles[emptyIndex].style.backgroundImage];

        [tiles[emptyIndex].className, tiles[tileIndex].className] =
            [tiles[tileIndex].className, tiles[emptyIndex].className];
    }

    // Shuffle tiles
    function shuffleTiles() {
        for (let i = 0; i < 200; i++) {
            const neighbors = getNeighbors(emptyTileIndex);
            const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
            swapTiles(emptyTileIndex, randomNeighbor);
            emptyTileIndex = randomNeighbor;
        }
        startTimer();
    }

    // Check if the puzzle is solved
    function checkWin() {
        for (let i = 0; i < tiles.length; i++) {
            // Check if each tile is in its correct position
            if (!tiles[i].classList.contains("empty") && tiles[i].style.backgroundPosition !== getBackgroundPosition(i)) {
                return; // Puzzle not solved yet
            }
        }

        // Stop the timer and display the success message
        clearInterval(timer); // Stop the timer
        setTimeout(() => alert(`Congratulations! You solved the puzzle in ${time} seconds!`), 200);
    }

    // Event listeners
    shuffleButton.addEventListener("click", shuffleTiles);

    // Initialize the puzzle
    initPuzzle();
});
