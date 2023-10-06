import localStorageUtils from "./localStorage.js";

// Function to check and grant achievements
async function checkAchievements() {
    const achievementsData = await localStorageUtils.loadData('achievements');
    const playerData = await localStorageUtils.loadData('player');

    if (!achievementsData || !playerData) {
        console.error("Achievements or player data not found in local storage.");
        return;
    }

    const achievements = achievementsData.achievements;

    for (const achievementKey in achievements) {
        const achievement = achievements[achievementKey];
        if (!achievement.achieved && playerData.total_ducks >= achievement.target) {
            achievement.achieved = true;
            console.log(`Achievement unlocked: ${achievement.name}`);
            queueAchievement(achievement.name, achievement.description)

            // Save the updated achievements data back to local storage
            await localStorageUtils.updateData('achievements', { achievements });
        }
    }
}

// Separate the DOM elements and event handling logic from the functions.
const achievementContainer = document.getElementById('achievement-container');
const achievementsQueue = [];

// Create a class for achievements to encapsulate their behavior.
class Achievement {
  constructor(title, message, imageUrl) {
    this.title = title;
    this.message = message;
    this.imageUrl = imageUrl; // New property for the image URL
    this.element = this.createAchievementElement();
  }

  createAchievementElement() {
    const achievement = document.createElement('div');
    achievement.className = 'achievement';
    achievement.innerHTML = `
      <div class="achievement-content">
        <img src="${this.imageUrl}" draggable="false" (dragstart)="false;" alt="Achievement Image" class="achievement-image unselectable">
        <div class="achievement-text">
          <p id="achievement-title">${this.title}</p>
          <p id="achievement-message">${this.message}</p>
        </div>
      </div>`;
    return achievement;
  }

  show() {
    achievementContainer.appendChild(this.element);
    setTimeout(() => this.animateIn(), 100);
  }

  animateIn() {
    this.element.style.transform = 'translateX(0)'; // Move in from the right
    this.element.style.opacity = '1';
    setTimeout(() => this.animateOut(), 3000);
  }

  animateOut() {
    this.element.style.transform = 'translateX(100%)'; // Move back out to the right
    this.element.style.opacity = '0';
    setTimeout(() => this.remove(), 300);
  }

  remove() {
    achievementContainer.removeChild(this.element);
    achievementsQueue.shift();
    showNextAchievement();
  }
  }

  function showNextAchievement() {
    if (achievementsQueue.length > 0) {
      achievementsQueue[0].show();
    }
  }

  export function queueAchievement(title, message) {
    const achievement = new Achievement(title, message, './assets/images/ducks/rubberduck2.png');
    achievementsQueue.push(achievement);
    showNextAchievement();
  }


export default checkAchievements;
