document.addEventListener("DOMContentLoaded", function () {
    const puzzleContainer = document.getElementById("puzzle-container");
    const shuffleButton = document.getElementById("shuffle-button");
    const gridSize = 3; // 3x3 grid
    let tiles = [];
    let emptyTile;

    // Replace this with the path to your image
    const imageSrc = "../Nuotraukos/DSC_1277.JPG";

    // Initialize the puzzle
    function initPuzzle() {
        puzzleContainer.innerHTML = "";
        tiles = [];
        for (let i = 0; i < gridSize * gridSize; i++) {
            const tile = document.createElement("div");
            tile.classList.add("puzzle-tile");

            if (i === gridSize * gridSize - 1) {
                tile.classList.add("empty");
                emptyTile = i;
            } else {
                tile.style.backgroundImage = `url('${imageSrc}')`;
                tile.style.backgroundPosition = getBackgroundPosition(i);
            }

            tile.dataset.index = i;
            tile.addEventListener("click", () => moveTile(i));
            puzzleContainer.appendChild(tile);
            tiles.push(tile);
        }
    }

    // Get background position for a specific tile
    function getBackgroundPosition(index) {
        const x = (index % gridSize) * -100;
        const y = Math.floor(index / gridSize) * -100;
        return `${x}px ${y}px`;
    }

    // Shuffle tiles randomly
    function shuffleTiles() {
        for (let i = 0; i < 100; i++) {
            const neighbors = getNeighbors(emptyTile);
            const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
            swapTiles(emptyTile, randomNeighbor);
            emptyTile = randomNeighbor;
        }
    }

    // Move tile if it's adjacent to the empty space
    function moveTile(index) {
        if (getNeighbors(emptyTile).includes(index)) {
            swapTiles(emptyTile, index);
            emptyTile = index;
            checkWin();
        }
    }

    // Swap two tiles
    function swapTiles(emptyIndex, tileIndex) {
        [tiles[emptyIndex].style.backgroundImage, tiles[tileIndex].style.backgroundImage] =
            [tiles[tileIndex].style.backgroundImage, tiles[emptyIndex].style.backgroundImage];

        [tiles[emptyIndex].className, tiles[tileIndex].className] =
            [tiles[tileIndex].className, tiles[emptyIndex].className];
    }

    // Get neighbors of the empty tile
    function getNeighbors(index) {
        const neighbors = [];
        if (index % gridSize !== 0) neighbors.push(index - 1); // Left
        if (index % gridSize !== gridSize - 1) neighbors.push(index + 1); // Right
        if (index >= gridSize) neighbors.push(index - gridSize); // Up
        if (index < gridSize * (gridSize - 1)) neighbors.push(index + gridSize); // Down
        return neighbors;
    }

    // Check if the puzzle is solved
    function checkWin() {
        for (let i = 0; i < tiles.length; i++) {
            if (!tiles[i].classList.contains("empty") && tiles[i].style.backgroundPosition !== getBackgroundPosition(i)) {
                return;
            }
        }
        setTimeout(() => alert("Congratulations! You solved the puzzle!"), 200);
    }

    // Event listeners
    shuffleButton.addEventListener("click", () => shuffleTiles());

    // Initialize the puzzle
    initPuzzle();
});