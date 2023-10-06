import localStorageUtils from "./localStorage.js";

async function openShop() {
    const shopOverlay = document.getElementById('shopOverlay');
    await updateShop()
    shopOverlay.style.display = 'block';
}

function closeShop() {
    const shopOverlay = document.getElementById('shopOverlay');
    shopOverlay.style.display = 'none';
}

async function updateShop() {
    const upgradeList = document.getElementById('upgradeList');
    upgradeList.innerHTML = '';

    const upgradesData = await localStorageUtils.loadData('upgrades');

    for (const upgradeId in upgradesData) {
        const upgrade = upgradesData[upgradeId];
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${upgrade.name}</span>
            <span>${upgrade.description}</span>
            <span>Price: ${upgrade.price}</span>
            <span>Level: ${upgrade.level}</span>
            <span>Effect: ${upgrade.effect}</span>
            <button id="${upgradeId}-buy">Buy</button>
            <button id="${upgradeId}-upgrade" disabled>Upgrade</button>
        `;

        // Add click event listeners to buy and upgrade buttons
        const buyButton = listItem.querySelector(`#${upgradeId}-buy`);
        const upgradeButton = listItem.querySelector(`#${upgradeId}-upgrade`);

        buyButton.addEventListener('click', () => {
            // Check if the player has enough money to buy
            const gameData = localStorageUtils.loadData('game');
            if (gameData && gameData.inventory >= upgrade.price) {
                // Deduct the price from inventory
                gameData.inventory -= upgrade.price;

                // Increase the level and update the effect (you can adjust this logic)
                upgrade.level++;
                upgrade.effect += 1;

                // Update the game data and refresh the shop
                localStorageUtils.updateData('game', gameData);
                updateShop();
            } else {
                console.log("Not enough inventory to buy.");
            }
        });

        upgradeList.appendChild(listItem);
    }
}

export { openShop, closeShop, updateShop }