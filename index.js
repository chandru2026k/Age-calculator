const btnEl = document.getElementById("btn");
const birthdayEl = document.getElementById("birthday");
const resultEl = document.getElementById("result");
const fireworksContainer = document.getElementById("fireworks-container");

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
    `🎉 You have lived:\n\n` +
    `${lived.years} years\n` +
    `${lived.months} months\n` +
    `${lived.weeks} weeks\n` +
    `${lived.days} days\n` +
    `${lived.hours} hours 🎉`;

  resultEl.classList.add("show");

  // Fireworks
  startFireworks();
  setTimeout(stopFireworks, 4000);
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

/* Fireworks Animation */
let canvas, ctx, particles = [], animationFrame;

function createCanvas() {
  canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  fireworksContainer.appendChild(canvas);
  ctx = canvas.getContext("2d");
}

function startFireworks() {
  if (!canvas) createCanvas();
  particles = [];
  animate();
  for (let i = 0; i < 10; i++) {
    createFirework();
  }
}

function stopFireworks() {
  cancelAnimationFrame(animationFrame);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fireworksContainer.innerHTML = "";
  canvas = null;
}

function createFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height / 2;
  const count = 100;
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * 2 * Math.PI;
    const speed = Math.random() * 5 + 2;
    particles.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`
    });
  }
}

function animate() {
  animationFrame = requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 0.01;
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.alpha;
    ctx.fillRect(p.x, p.y, 3, 3);
  });

  particles = particles.filter(p => p.alpha > 0);
}
