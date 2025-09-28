const btnEl = document.getElementById("btn");
const birthdayEl = document.getElementById("birthday");
const resultEl = document.getElementById("result");
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function calculateAge() {
  const birthdayValue = birthdayEl.value;
  if (!birthdayValue) {
    alert("Please enter your birthday");
    return;
  }

  const birthdayDate = new Date(birthdayValue);
  const now = new Date();
  const diff = now - birthdayDate;

  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  const months = years * 12 + (now.getMonth() - birthdayDate.getMonth());
  const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60));

  resultEl.innerHTML = `
    🎉 You are <br>
    <span style="color:#ff007f; font-size:1.5em;">${years}</span> years, 
    <span style="color:#ffcc00;">${months}</span> months, 
    <span style="color:#00ffcc;">${weeks}</span> weeks, 
    <span style="color:#ff6600;">${days}</span> days, 
    <span style="color:#6600ff;">${hours}</span> hours old 🎂
  `;

  launchFireworks();
}

// Ripple effect
btnEl.addEventListener("click", function (e) {
  const circle = document.createElement("span");
  circle.classList.add("ripple-effect");
  circle.style.left = e.clientX - e.target.offsetLeft + "px";
  circle.style.top = e.clientY - e.target.offsetTop + "px";
  this.appendChild(circle);

  setTimeout(() => circle.remove(), 600);

  calculateAge();
});

// Fireworks particles
let particles = [];
function launchFireworks() {
  particles = [];
  for (let i = 0; i < 80; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      angle: Math.random() * 2 * Math.PI,
      speed: Math.random() * 5 + 2,
      radius: Math.random() * 2 + 1,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      life: 100
    });
  }
}

function animateFireworks() {
  requestAnimationFrame(animateFireworks);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, index) => {
    p.x += Math.cos(p.angle) * p.speed;
    p.y += Math.sin(p.angle) * p.speed;
    p.life -= 1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
    if (p.life <= 0) particles.splice(index, 1);
  });
}
animateFireworks();

