import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const input = document.querySelector("#datetime-picker");
const btn = document.querySelector("[data-start]");
const days = document.querySelector("[data-days]");
const hours = document.querySelector("[data-hours]");
const minutes = document.querySelector("[data-minutes]");
const seconds = document.querySelector("[data-seconds]");


let userSelectedDate;
let timer;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        userSelectedDate = selectedDates[0];

            if (userSelectedDate < Date.now()) {
                iziToast.error({
                    message: "Please choose a date in the future",
                    position: "topRight"
                });
                btn.disabled = true; 
            }
            else {
                btn.disabled = false;
            }
        
    }
};

btn.disabled = true; 

function addLeadingZero(value) {
    return value.padStart(2, "0");
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

btn.addEventListener("click", startTimer);

function startTimer() {
    timer = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = userSelectedDate.getTime() - currentTime;
        const convertTime = convertMs(deltaTime);

        if (deltaTime < 0) {
        
            clearInterval(timer);
            input.disabled = false;
            btn.disabled = false;
            return;
    
        }
    
        days.textContent = addLeadingZero(String(convertTime.days));
        hours.textContent = addLeadingZero(String(convertTime.hours));
        minutes.textContent = addLeadingZero(String(convertTime.minutes));
        seconds.textContent = addLeadingZero(String(convertTime.seconds));
    }, 1000);
    
    btn.disabled = true;
    input.disabled = true;
};

flatpickr(input, options);