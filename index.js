const btnEl = document.getElementById("btn");
const birthdayEl = document.getElementById("birthday");
const resultEl = document.getElementById("result");
const fireworksEl = document.querySelector(".fireworks");

btnEl.addEventListener("click", calculateAge);

function calculateAge() {
  const birthdayValue = birthdayEl.value;
  if (birthdayValue === "") {
    alert("Please enter your birthday");
    return;
  }

  const birthdayDate = new Date(birthdayValue);
  const now = new Date();

  const lived = getDetailedTimeLived(birthdayDate, now);

  resultEl.innerText =
    `You have lived:\n\n` +
    `${lived.years} years\n` +
    `${lived.months} months\n` +
    `${lived.weeks} weeks\n` +
    `${lived.days} days\n` +
    `${lived.hours} hours`;

  // Show fireworks
  fireworksEl.classList.add("active");
  setTimeout(() => {
    fireworksEl.classList.remove("active");
  }, 4000);
}

function getDetailedTimeLived(birthdayDate, currentDate) {
  const diffMs = currentDate - birthdayDate;

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30.4375);
  const years = Math.floor(days / 365.25);

  return { years, months, weeks, days, hours };
}

