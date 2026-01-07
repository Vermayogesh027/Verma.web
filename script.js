// Matrix background (canvas)
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}
window.addEventListener("resize", resize);
resize();

const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&@";
const fontSize = 16;
let columns = Math.floor(window.innerWidth / fontSize);
let drops = Array(columns).fill(0).map(() => Math.random() * 50);

function matrixTick() {
  ctx.fillStyle = "rgba(5,7,10,0.16)";
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  ctx.font = `${fontSize}px monospace`;
  ctx.fillStyle = "rgba(0, 255, 123, 0.85)";

  columns = Math.floor(window.innerWidth / fontSize);
  if (drops.length !== columns) drops = Array(columns).fill(0).map(() => Math.random() * 50);

  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    ctx.fillText(text, x, y);

    if (y > window.innerHeight && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
  requestAnimationFrame(matrixTick);
}
matrixTick();

// Tap/click popups (0.5s)
const popLayer = document.getElementById("popLayer");
const messages = ["ACCESS GRANTED","HACK MODE","TRACE: OFF","ENCRYPTING...","ROOT OK","01010101","FIREWALL BYPASSED"];

function spawnPopup(x, y) {
  const div = document.createElement("div");
  div.className = "popup";
  div.textContent = messages[Math.floor(Math.random() * messages.length)];
  div.style.left = x + "px";
  div.style.top = y + "px";
  popLayer.appendChild(div);
  setTimeout(() => div.remove(), 500);
}

window.addEventListener("pointerdown", (e) => {
  spawnPopup(e.clientX, e.clientY);
});