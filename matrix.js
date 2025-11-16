const matrixCanvas = document.getElementById("matrix");

// ถ้ามี canvas ใน HTML ให้ใช้มัน ถ้าไม่มีให้สร้างใหม่
let canvas;
if (matrixCanvas) {
  canvas = matrixCanvas;
} else {
  canvas = document.createElement("canvas");
  canvas.id = "matrix";
  canvas.classList.add("matrix-canvas");
  document.body.insertAdjacentHTML("afterbegin", '<div class="matrix-bg"></div>');
  document.querySelector(".matrix-bg").appendChild(canvas);
}

const ctx = canvas.getContext("2d");

// ตั้งค่า canvas ให้เต็มจอ
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&@";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // ทำให้รหัสค่อย ๆ จาง
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff99"; // สี Cyber green
  ctx.font = `${fontSize}px monospace`;

  drops.forEach((y, i) => {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    const x = i * fontSize;
    ctx.fillText(text, x, y * fontSize);

    if (y * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0; // รีเซ็ต
    }
    drops[i]++;
  });
}

setInterval(draw, 33);

// อัปเดตขนาดถ้า resize หน้าจอ
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});