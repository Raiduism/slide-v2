let timer;
let timeLeft = 1500; // 25 minutes in seconds
let isStudying = true;

const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const backgroundMusic = document.getElementById('background-music');
const volumeControl = document.getElementById('volume');

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft < 0) {
            clearInterval(timer);
            backgroundMusic.currentTime = 0; 
            backgroundMusic.play(); 
            if (isStudying) {
                timeLeft = 300; 
                isStudying = false;
            } else {
                timeLeft = 1500;
                isStudying = true;
            }
            startTimer();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 1500;
    updateTimerDisplay();
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    isStudying = true;
}

startButton.addEventListener('click', () => {
    backgroundMusic.play();
    startTimer();
});

resetButton.addEventListener('click', resetTimer);

volumeControl.addEventListener('input', () => {
    backgroundMusic.volume = volumeControl.value;
});

updateTimerDisplay();