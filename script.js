// JavaScript code for the stopwatch
let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;

const display = document.getElementById("stopwatch-display");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const resetBtn = document.getElementById("reset-btn");

const formatTime = ms => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = Math.floor((ms % 1000) / 10);

  const pad = value => (value < 10 ? `0${value}` : value);

  return `${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
};

const updateDisplay = () => {
  const currentTime = isRunning ? elapsedTime + performance.now() - startTime : elapsedTime;
  const formattedTime = formatTime(currentTime);

  display.value = formattedTime;
};

const startStopwatch = () => {
  if (!isRunning) {
    startTime = performance.now();
    intervalId = setInterval(updateDisplay, 10); // Update every 10 milliseconds
    isRunning = true;
    startBtn.textContent = "Pause";
  } else {
    clearInterval(intervalId);
    isRunning = false;
    elapsedTime += performance.now() - startTime; // Store elapsed time
    startBtn.textContent = "Resume";
  }
};

const stopStopwatch = () => {
  if (isRunning) {
    clearInterval(intervalId);
    isRunning = false;
    elapsedTime += performance.now() - startTime; // Store elapsed time
    startBtn.textContent = "Resume";
  }
};

const resetStopwatch = () => {
  clearInterval(intervalId);
  isRunning = false;
  startTime = 0;
  elapsedTime = 0;
  display.value = "00:00.00";
  startBtn.textContent = "Start";
};

startBtn.addEventListener("click", startStopwatch);
stopBtn.addEventListener("click", stopStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
