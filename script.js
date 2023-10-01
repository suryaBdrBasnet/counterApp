const timeElement = document.getElementById('time');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

let startTime = 0;
let intervalId = null;
let pausedTime = 0;

function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor(ms % 1000);

    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`;
    // padStart(length, valueIfNotEqualTolength) -> here if hour/min/sec is <10, then it'll be 0(0-9).
    return formattedTime;
}

function updateTime() {
    const currentTime = Date.now() - startTime + pausedTime;
    // Date.now provides currentTimestamp in term of millisecond
    timeElement.textContent = formatTime(currentTime);
}

startButton.addEventListener('click', () => {
    if (!intervalId) {
        startTime = pausedTime > 0? (Date.now() - pausedTime) : Date.now();
        pausedTime = 0;
        intervalId = setInterval(updateTime, 1);
    }
});

stopButton.addEventListener('click', () => {
    pausedTime = Date.now() - startTime;
    clearInterval(intervalId);
    intervalId = null;
});

resetButton.addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = null;
    pausedTime= 0;
    startTime = 0;
    timeElement.textContent = '00:00:00:000';
})