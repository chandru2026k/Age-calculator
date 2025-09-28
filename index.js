const btn = document.getElementById("calculateBtn");
const resultDiv = document.getElementById("result");

btn.addEventListener("click", function(e) {
  // Ripple effect
  const ripple = document.createElement("span");
  ripple.classList.add("ripple");
  ripple.style.left = e.clientX - btn.offsetLeft + "px";
  ripple.style.top = e.clientY - btn.offsetTop + "px";
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);

  // Age calculation
  const birthdate = document.getElementById("birthdate").value;
  if (!birthdate) {
    alert("Please select your birthdate!");
    return;
  }

  const birth = new Date(birthdate);
  const now = new Date();

  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const ageInDays = Math.floor((now - birth) / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(ageInDays / 7);
  const hours = Math.floor((now - birth) / (1000 * 60 * 60));

  resultDiv.innerHTML = `
    🎉 You are <br>
    <span>${years}</span> Years, 
    <span>${months}</span> Months, 
    <span>${weeks}</span> Weeks, 
    <span>${days}</span> Days, 
    <span>${hours}</span> Hours old!
  `;
});
