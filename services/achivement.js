import localStorageUtils from "./localStorage.js";

// Function to check and grant achievements
function checkAchievements() {
    const achievementsData = localStorageUtils.loadData('achievements');
    const playerData = localStorageUtils.loadData('player');

    if (!achievementsData || !playerData) {
        console.error("Achievements or player data not found in local storage.");
        return;
    }

    const achievements = achievementsData.achievements;

    for (const achievementKey in achievements) {
        const achievement = achievements[achievementKey];
        if (!achievement.achieved && playerData.score >= achievement.target) {
            achievement.achieved = true;
            console.log(`Achievement unlocked: ${achievement.name}`);

            // Save the updated achievements data back to local storage
            localStorageUtils.updateData('achievements', { achievements });
        }
    }
}

export default checkAchievements;
