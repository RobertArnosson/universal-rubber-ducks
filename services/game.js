import localStorageUtils from "./localStorage.js";
import checkAchievements from "./achivement.js";

let currentCps = 0;

async function click() {
    try {
        const gameData = await localStorageUtils.loadData('game')
        const playerData = await localStorageUtils.loadData('player')
        let totalDucks = playerData.totalDucks;
        let inventory = gameData.inventory;
        const globalMulti = gameData.globalMulti;
        let addAmount = calcClick(1, globalMulti);
        inventory += addAmount
        currentCps += 1;
        totalDucks += addAmount;
        await localStorageUtils.updateData('game', { "inventory": inventory });
        await localStorageUtils.updateData('player', { "totalDucks": totalDucks });
        await checkAchievements();
        return inventory;
    } catch (error) {
        console.error(error);
    }
}

function calcClick(amount, globalMulti) {
    const addAmount = amount * globalMulti
    return addAmount;
}

async function update() {
    try {
        const gameData = await localStorageUtils.loadData('game');
        if (gameData) {
            const inventory = gameData.inventory;
            const inventoryDisplay = document.getElementById('inventoryCount');
            inventoryDisplay.textContent = inventory;

            // Update the price display
            const price = gameData.price;
            const duckPrice = document.getElementById('priceCount');
            duckPrice.textContent = price;

            // Update the ducks produced per second display
            ducksProduced = gameData.ducksProduced
            const ducksPerSecond = document.getElementById('ducksPerSecond');
            ducksPerSecond.textContent = ducksProduced;

            // Display the player's money
            const moneyCount = gameData.money;
            const moneyDisplay = document.getElementById('moneyCount');
            moneyDisplay.textContent = moneyCount;
        }
    } catch (error) {
        console.error(error);
    }
}

async function sell() {
    try {
        const gameData = await localStorageUtils.loadData('game');
        let inventory = gameData.inventory;
        const price = gameData.price;

        const amountToSell = Math.floor(inventory);
        const moneyEarned = amountToSell * price;
        gameData.money += moneyEarned;

        inventory -= amountToSell;

        await localStorageUtils.updateData('game', {
            "inventory": inventory,
            "money": gameData.money
        });

        await localStorageUtils.updateData('player', { "totalMoney": gameData.money });

        update();
    } catch (error) {
        console.error(error);
    }
}

async function calculateDucks() {
    try {
        const gameData = await localStorageUtils.loadData('game');
        const dpc = calcClick(1, gameData.globalMulti);
        const cps = (gameData.sellInterval / 1000) * currentCps;
        const pg = 0;
        const ducksPerSecond = (dpc * cps) + pg
        await localStorageUtils.updateData('game', {'ducksProduced': ducksPerSecond})
        update();
        currentCps = 0;
    } catch (error) {
        console.error(error);
    }
}

export { click, update, sell, calculateDucks };
