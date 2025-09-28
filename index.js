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

    const lived = getDetailedTimeLived(birthdayDate, now);

    resultEl.innerText =
      `You have lived:\n\n` +
      `${lived.years} years\n` +
      `${lived.months} months\n` +
      `${lived.weeks} weeks\n` +
      `${lived.days} days\n` +
      `${lived.hours} hours\n` +
      `${lived.minutes} minutes\n` +
      `${lived.seconds} seconds 😮`;
  }
}

// Detailed breakdown
function getDetailedTimeLived(birthdayDate, currentDate) {
  const diffMs = currentDate - birthdayDate; // difference in ms

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30.4375); // avg month length
  const years = Math.floor(days / 365.25);   // avg year length

  return {
    years,
    months,
    weeks,
    days,
    hours,
    minutes,
    seconds,
  };
}

btnEl.addEventListener("click", calculateAge);
