const btnEl = document.getElementById("btn");
const birthdayEl = document.getElementById("birthday");
const resultEl = document.getElementById("result");

function calculateAge() {
  const birthdayValue = birthdayEl.value;
  if (birthdayValue === "") {
    alert("Please enter your birthday");
  } else {
    const birthdayDate = new Date(birthdayValue);
    const now = new Date();

    // Get age in years
    const age = getAge(birthdayDate, now);

    // Get time lived breakdown
    const lived = getTimeLived(birthdayDate, now);

    resultEl.innerText =
      `You are ${age} ${age > 1 ? "years" : "year"} old.\n` +
      `You have lived:\n` +
      `${lived.days} days\n` +
      `${lived.hours} hours\n` +
      `${lived.minutes} minutes\n` +
      `${lived.seconds} seconds`;
  }
}

// Calculate age in years
function getAge(birthdayDate, currentDate) {
  let age = currentDate.getFullYear() - birthdayDate.getFullYear();
  const month = currentDate.getMonth() - birthdayDate.getMonth();

  if (
    month < 0 ||
    (month === 0 && currentDate.getDate() < birthdayDate.getDate())
  ) {
    age--;
  }

  return age;
}

// Calculate days, hours, minutes, seconds lived
function getTimeLived(birthdayDate, currentDate) {
  const diffMs = currentDate - birthdayDate; // milliseconds difference

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

btnEl.addEventListener("click", calculateAge);
