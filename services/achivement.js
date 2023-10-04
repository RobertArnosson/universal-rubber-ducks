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
            queueAchievement(achievement.name, achievement.description)

            // Save the updated achievements data back to local storage
            localStorageUtils.updateData('achievements', { achievements });
        }
    }
}

const achievementContainer = document.getElementById('achievement-container');
const achievementsQueue = [];

function showAchievement(message) {
    const achievement = document.createElement('div');
    achievement.className = 'achievement';
    achievement.innerHTML = `<h2>${message[0]}</h2><p>${message[1]}</p>`;
    achievementContainer.appendChild(achievement);
    
    setTimeout(() => {
        achievement.style.transform = 'translateY(-20px)';
        achievement.style.opacity = '1';
        
        setTimeout(() => {
            achievement.style.transform = 'translateY(-100%)';
            achievement.style.opacity = '0';
            
            achievementContainer.removeChild(achievement);
            achievementsQueue.shift();
            
            if (achievementsQueue.length > 0) {
                showNextAchievement();
            }
        }, 3000); // Display for 3 seconds
    }, 100); // Delay before showing
}

function showNextAchievement() {
    if (achievementsQueue.length > 0) {
        showAchievement(achievementsQueue[0]);
    }
}

export function queueAchievement(title, message) {
    achievementsQueue.push([title, message]);
    showNextAchievement();
}


export default checkAchievements;
