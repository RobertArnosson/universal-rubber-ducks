import click from "./services/game.js";
import localStorageUtils from "./services/localStorage.js";

localStorageUtils.initializeData()

const rubberChickenCount = document.getElementById('duckScore');
const clickButton = document.getElementById('duckButton');
const clearButton = document.getElementById('clearLS');

function handleButtonClick() {
    let count = click();
    rubberChickenCount.textContent = count;
}

function clearLocalStorage() {
    localStorageUtils.clearData();
    localStorageUtils.initializeData()
}

clickButton.addEventListener('click', handleButtonClick);
clearButton.addEventListener('click', clearLocalStorage);