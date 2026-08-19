// State Variables
let count = 0;
let clickPower = 1;

let autoClickers = 0;
let autoClickPower = 1;

let clickCost = 10;
let autoCost = 15;
let autoPowerCost = 50;

// DOM Elements
const countElement = document.getElementById('count');
const cpsDisplay = document.getElementById('cps-display');
const cookieElement = document.getElementById('cookie');

const upgradeClick = document.getElementById('upgrade-click');
const upgradeAuto = document.getElementById('upgrade-auto');
const upgradeAutoPower = document.getElementById('upgrade-auto-power');

const clickCostDisplay = document.getElementById('click-cost');
const clickPowerDisplay = document.getElementById('click-power-display');

const autoCostDisplay = document.getElementById('auto-cost');
const autoCountDisplay = document.getElementById('auto-count-display');

const autoPowerCostDisplay = document.getElementById('auto-power-cost');
const autoPowerDisplay = document.getElementById('auto-power-display');

// Helper to spawn floating feedback numbers
function spawnFloatingNumber(x, y, text) {
    const floatingNum = document.createElement('div');
    floatingNum.classList.add('floating-number');
    floatingNum.textContent = text;
    floatingNum.style.left = `${x - 15}px`;
    floatingNum.style.top = `${y - 20}px`;

    document.body.appendChild(floatingNum);

    floatingNum.addEventListener('animationend', () => {
        floatingNum.remove();
    });
}

// Refresh UI text and button state styling
function updateUI() {
    countElement.textContent = count;
    cpsDisplay.textContent = `${autoClickers * autoClickPower} / sec`;

    clickCostDisplay.textContent = `Cost: ${clickCost}`;
    clickPowerDisplay.textContent = clickPower;
    upgradeClick.classList.toggle('disabled', count < clickCost);

    autoCostDisplay.textContent = `Cost: ${autoCost}`;
    autoCountDisplay.textContent = autoClickers;
    upgradeAuto.classList.toggle('disabled', count < autoCost);

    autoPowerCostDisplay.textContent = `Cost: ${autoPowerCost}`;
    autoPowerDisplay.textContent = autoClickPower;
    upgradeAutoPower.classList.toggle('disabled', count < autoPowerCost);
}

// Main Click Event
cookieElement.addEventListener('click', (e) => {
    count += clickPower;
    spawnFloatingNumber(e.pageX, e.pageY, `+${clickPower}`);
    updateUI();
});

// Upgrade Event Listeners
upgradeClick.addEventListener('click', () => {
    if (count >= clickCost) {
        count -= clickCost;
        clickPower += 1;
        clickCost = Math.floor(clickCost * 1.5);
        updateUI();
    }
});

upgradeAuto.addEventListener('click', () => {
    if (count >= autoCost) {
        count -= autoCost;
        autoClickers += 1;
        autoCost = Math.floor(autoCost * 1.3);
        updateUI();
    }
});

upgradeAutoPower.addEventListener('click', () => {
    if (count >= autoPowerCost) {
        count -= autoPowerCost;
        autoClickPower += 1;
        autoPowerCost = Math.floor(autoPowerCost * 1.8);
        updateUI();
    }
});

// Auto Clicker Generator Loop (runs every 1s)
setInterval(() => {
    if (autoClickers > 0) {
        const gained = autoClickers * autoClickPower;
        count += gained;

        // Visual feedback over the cookie image center
        const rect = cookieElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2 + window.scrollX;
        const centerY = rect.top + rect.height / 2 + window.scrollY;
        spawnFloatingNumber(centerX, centerY, `+${gained}`);

        updateUI();
    }
}, 1000);

// Initial Load
updateUI();