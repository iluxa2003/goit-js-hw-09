import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const dataInput = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('button[data-start]');
const daysLabel = document.querySelector('span[data-days]');
const hoursLabel = document.querySelector('span[data-hours]');
const minutesLabel = document.querySelector('span[data-minutes]');
const secondsLabel = document.querySelector('span[data-seconds]');
const cssSpecial = document.querySelectorAll('.field');
const timerCss = document.querySelector('.timer');
let userDate = new Date(dataInput.value);
for (const element of cssSpecial) {
  element.style.display = 'flex';
  element.style.flexDirection = 'column';
  element.style.fontSize = '40px';
  element.style.alignItems = 'center';
  element.style.marginLeft = '20px';
}
timerCss.style.display = 'flex';
timerCss.style.justifyContent = 'flex-start';
buttonStart.disabled = true;
function userCheck() {
  const thisDate = new Date();
  userDate = new Date(dataInput.value);
  if (userDate.getTime() < thisDate.getTime()) {
    // alert('Please choose a date in the future');
    Notiflix.Notify.failure('Please choose a date in the future');
    buttonStart.disabled = true;
  } else {
    buttonStart.disabled = false;
  }
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    userCheck();
  },
};
flatpickr(dataInput, options);
function timer() {
  const thisDate = new Date();

  const timeLeft = convertMs(userDate.getTime() - thisDate.getTime());
  if (
    timeLeft.seconds + timeLeft.minutes + timeLeft.days + timeLeft.hours >=
    0
  ) {
    daysLabel.textContent = addLeadingZero(timeLeft.days.toString());
    hoursLabel.textContent = addLeadingZero(timeLeft.hours.toString());
    minutesLabel.textContent = addLeadingZero(timeLeft.minutes.toString());
    secondsLabel.textContent = addLeadingZero(timeLeft.seconds.toString());
  }
}
const startButton = event => {
  setInterval(timer, 1000);
};
function addLeadingZero(value) {
  return value.padStart(2, '0');
}
buttonStart.addEventListener('click', startButton);
