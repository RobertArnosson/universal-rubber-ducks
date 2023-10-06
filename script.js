
import { click, sell, update } from "./services/game.js";
import { startDuckCalc, startSelling } from "./services/gameLoops.js";
import localStorageUtils from "./services/localStorage.js";
import { closeShop, openShop } from "./services/shop.js";

localStorageUtils.initializeData();
localStorageUtils.loadData('game').then((gameData) => startSelling(gameData.sellInterval));
startDuckCalc();
update();


const clickButton = document.getElementById('duckButton');
const clearButton = document.getElementById('clearLS');
const shopButton = document.getElementById('shopButton');
const closeShopButton = document.getElementById('closeShopButton');

async function handleButtonClick() {
    await click();
    await update();
}

async function handleShopOpen() {
    await openShop();
}

async function clearLocalStorage() {
    await localStorageUtils.clearData();
    await localStorageUtils.initializeData();
    await update();
}

clickButton.addEventListener('click', handleButtonClick);
clearButton.addEventListener('click', clearLocalStorage);
shopButton.addEventListener('click', handleShopOpen);
closeShopButton.addEventListener('click', closeShop);