    // Cog Icon and Menu Toggle
    const settingsIcon = document.getElementById("settings-icon");
    const settingsMenu = document.getElementById("settings-menu");

    // Initial state for settings menu visibility
    let settingsOpen = false;

    // Toggle Settings Menu
    settingsIcon.addEventListener("click", () => {
        settingsOpen = !settingsOpen; // Toggle the state

        if (settingsOpen) {
            settingsMenu.style.right = "0"; // Open menu
        } else {
            settingsMenu.style.right = "-300px"; // Close menu
        }
    });

    // Theme Customization
    const themeSelect = document.getElementById("theme");
    const headerColorPicker = document.getElementById("header-color");
    const headerSizeSlider = document.getElementById("header-size");
    const header = document.querySelector("header h1");
    const body = document.body;

    // Change Background Theme
    themeSelect.addEventListener("change", (e) => {
        if (e.target.value === "night") {
            body.style.backgroundColor = "#121212";
            body.style.color = "#ffffff";
        } else {
            body.style.backgroundColor = "";
            body.style.color = "";
        }
    });

    // Change Header Color
    headerColorPicker.addEventListener("input", (e) => {
        header.style.color = e.target.value;
    });

    // Change Header Font Size
    headerSizeSlider.addEventListener("input", (e) => {
        header.style.fontSize = e.target.value + "px";
    });