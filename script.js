import click from "./services/game.js";
import localStorageUtils from "./services/localStorage.js";

localStorageUtils.initializeData()

const rubberChickenCount = document.getElementById('clicks');
const clickButton = document.getElementById('clickButton');

function handleButtonClick() {
    let count = click();
    rubberChickenCount.textContent = count;
}

clickButton.addEventListener('click', handleButtonClick);