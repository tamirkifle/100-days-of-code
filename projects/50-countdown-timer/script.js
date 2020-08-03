

const timeBtns = document.querySelectorAll("[data-time]");
const timeLeftDiv = document.querySelector(".display__time-left");
const endTimeDiv = document.querySelector(".display__end-time");
timeBtns.forEach(timeBtn => timeBtn.addEventListener("click", (e) => startTimer(e.currentTarget.dataset.time)));
let timerID;

const form = document.querySelector("#custom");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    startTimer(Number(form.querySelector("input").value) * 60);
});


function startTimer(inputSeconds) {
    if (timerID) {
        window.clearTimeout(timerID);
    }
    timeLeftDiv.style.color = "white";
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let endTime = addTime(Number(inputSeconds), { hours, minutes, seconds });
    let suffix = "am";

    function hoursTo12(hours) {
        if (hours >= 12) {
            suffix = "pm";
            if (hours != 12) {
                hours = hours % 12;
            }
        }
        return hours;
    }

    function addTime(secToAdd, { hours, minutes, seconds } = { hours: 0, minutes: 0, seconds: 0 }) {
        seconds = seconds + secToAdd;
        if (seconds >= 60) {
            minutes = minutes + Math.floor(seconds / 60);
            seconds = seconds % 60;
        }
        if (minutes >= 60) {
            hours = hours + Math.floor(minutes / 60);
            minutes = minutes % 60;
        }

        return { hours, minutes, seconds };
    }


    function makeTwoDigits(field) {
        if (String(field).length === 1) {
            field = "0" + field;
        }
        return field;
    }

    endTimeDiv.innerText = `${makeTwoDigits(hoursTo12(endTime.hours))}:${makeTwoDigits(endTime.minutes)}:${makeTwoDigits(endTime.seconds)} ${suffix}`;

    const countdownStart = addTime(Number(inputSeconds));
    timeLeftDiv.innerText = `${makeTwoDigits(hoursTo12(countdownStart.hours))}:${makeTwoDigits(countdownStart.minutes)}:${makeTwoDigits(countdownStart.seconds)}`;
    timerID = setTimeout(updateCountdown, 1000);

    function updateCountdown() {
        //Display timeNow - endTime
        const now = new Date();
        hoursLeft = endTime.hours - now.getHours();
        minutesLeft = endTime.minutes - now.getMinutes();
        secondsLeft = endTime.seconds - now.getSeconds();
        console.log(endTime, { hoursLeft, minutesLeft, secondsLeft });
        if (secondsLeft < 0) {
            secondsLeft = 60 + secondsLeft;
            minutesLeft--;
        }
        if (minutesLeft < 0) {
            minutesLeft = 60 + minutesLeft;
            hoursLeft--;
        }
        if (hoursLeft < 0) {
            hoursLeft = 24 + hoursLeft;
        }
        timeLeftDiv.innerText = `${makeTwoDigits(hoursTo12(hoursLeft))}:${makeTwoDigits(minutesLeft)}:${makeTwoDigits(secondsLeft)}`;

        if (hoursLeft == 0 && minutesLeft == 0 && secondsLeft == 0) {
            timeLeftDiv.style.color = "red";
            timerID = null;
        }
        else {
            timerID = setTimeout(updateCountdown, 1000);
        }

    }

}

