const scoreEl = document.getElementById('score');
const clickBtn = document.getElementById('clickBtn');
const power5Btn = document.getElementById('power5Btn');
const resetBtn = document.getElementById('resetBtn');
const milestoneEl = document.getElementById('milestone');

const SCORE_KEY = 'ec:score';
const STEP_KEY = 'ec:step';

let score = parseInt(localStorage.getItem(SCORE_KEY) ?? '0', 10);
let step = parseInt(localStorage.getItem(STEP_KEY) ?? '1', 10);

function save() {
    localStorage.setItem(SCORE_KEY, String(score));
    localStorage.setItem(STEP_KEY, String(step));
}

function render() {
    milestoneEl.textContent = '';
    scoreEl.textContent = score;
    power5Btn.disabled = step === 5 || score < 50;
    clickBtn.textContent = step === 5 ? '+5 ⚡' : '+1 🎉';
}

function celebrate(msg) {
    milestoneEl.textContent = msg;
    milestoneEl.classList.add('pulse');
    setTimeout(() => milestoneEl.classList.remove('pulse'), 600);
}

function confettiBurst() {
    if (typeof confetti !== 'function') return;
    confetti({ particleCount: 90, spread: 70, origin: { y: 0.7 } });
}

function checkMilestones() {
    if ([50, 100, 200].includes(score)) {
        celebrate(`Milestone ${score}! 🎉`);
        confettiBurst();
    }
}

power5Btn.addEventListener('click', () => {
    if (score >= 50 && step === 1) {
        score -= 50;
        step = 5;
        celebrate('Power +5 unlocked!');
        confettiBurst();
        save();
        render();
    }
});

clickBtn.addEventListener('click', () => {
    score += step;
    checkMilestones();
    save();
    render();
});

resetBtn.addEventListener('click', () => {
    score = 0;
    step = 1;
    localStorage.removeItem(SCORE_KEY);
    localStorage.removeItem(STEP_KEY);
    render();
});

// Keyboard: Space triggers click
window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        clickBtn.click();
    }
});

render();