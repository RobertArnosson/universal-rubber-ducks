import localStorageUtils from "./localStorage.js";
import checkAchievements from "./achivement.js";

function click() {
    let count = localStorageUtils.loadData('player').score;
    const global_multi = localStorageUtils.loadData('game').global_multi
    count += (1 * global_multi);
    localStorageUtils.updateData('player', {"score": count})
    checkAchievements()
    return count;
}

export default click;