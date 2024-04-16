function getCurrentTime() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  return { hour, minute, second };
}

function updateCurrentTime() {
  const { hour, minute, second } = getCurrentTime();

  const millisecondsToNextMinute = (60 - second) * 1000;

  setTimeout(updateCurrentTime, millisecondsToNextMinute);

  updateWordClockHour(hour);
  updateWordClockMinute(minute);
}

function updateWordClockHour(hour) {
  const hourElements = document.querySelectorAll(".hour");

  for (const hourElement of hourElements) {
    if (hourElement.classList.contains("opaque")) {
      hourElement.classList.remove("opaque");
    }
  }

  hourElements[hour - 1].classList.add("opaque");
}

function updateWordClockMinute(minute) {
  const minuteElements = document.querySelectorAll(".minute");
  if (minute === 0) {
    const oclock = document.querySelector(".oclock");
    oclock.classList.add("opaque");
    return;
  }

  if (minute > 0 && minute <= 9) {
    const o = document.querySelector(".o");
    o.classList.add("opaque");
  }

  if (minute >= 10 && minute <= 19) {
    minuteElements[minute - 10].classList.add("opaque");
  }

  const minuteRemainder = minute % 10;
  const quotient = Math.floor(minute / 10);

  if (minuteRemainder > 0 && minuteRemainder <= 9) {
    minuteElements[minuteRemainder + 13].classList.add("opaque");
  }

  if (minute >= 20 && minute < 60) {
    minuteElements[quotient + 8].classList.add("opaque");
  }
}

updateCurrentTime();
