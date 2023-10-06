import { sell, calculateDucks } from "./game.js";

let sellInterval = null;
let duckCalcInterval = null;

function startSelling(interval) {
    if (!sellInterval) {
        sellInterval = setInterval(sell, interval);
    }
}

function stopSelling() {
    if (sellInterval) {
        clearInterval(sellInterval);
        sellInterval = null;
    }
}

function startDuckCalc() {
    if (!duckCalcInterval) {
        duckCalcInterval = setInterval(calculateDucks, 1000);
    }
}

function stopDuckCalc() {
    if (duckCalcInterval) {
        clearInterval(duckCalcInterval);
        duckCalcInterval = null;
    }
}

export { startSelling, stopSelling, startDuckCalc, stopDuckCalc };