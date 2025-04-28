// 全局引用
const rCanvas = document.getElementById("roseCanvas");
const rCtx    = rCanvas.getContext("2d");

// —— 绘制玫瑰 —— 
function drawRose() {
  rCtx.clearRect(0, 0, rCanvas.width, rCanvas.height);
  // 花枝
  rCtx.beginPath();
  rCtx.strokeStyle = "#3A5F0B";
  rCtx.lineWidth = 4;
  rCtx.moveTo(200, 480);
  rCtx.lineTo(200, 250);
  rCtx.stroke();
  // 左叶
  rCtx.fillStyle = "#4CAF50";
  rCtx.beginPath();
  rCtx.moveTo(200, 350);
  rCtx.quadraticCurveTo(170, 330, 160, 300);
  rCtx.quadraticCurveTo(175, 310, 200, 320);
  rCtx.closePath();
  rCtx.fill();
  // 右叶
  rCtx.beginPath();
  rCtx.moveTo(200, 300);
  rCtx.quadraticCurveTo(230, 280, 240, 250);
  rCtx.quadraticCurveTo(220, 260, 200, 270);
  rCtx.closePath();
  rCtx.fill();
  // 花瓣
  rCtx.fillStyle = "#E63950";
  for (let i = 0; i < 5; i++) {
    rCtx.beginPath();
    rCtx.ellipse(
      200, 200 - i * 8,
      50 - i * 5, 60 - i * 5,
      Math.PI / 4, 0, Math.PI * 2
    );
    rCtx.fill();
  }
  // 花心
  rCtx.fillStyle = "#C21835";
  rCtx.beginPath();
  rCtx.arc(200, 200, 20, 0, Math.PI * 2);
  rCtx.fill();
}

// —— 按钮交互 —— 
function setupButtons() {
  // 页面加载就画一次玫瑰
  drawRose();

  // 同意
  document.getElementById("agreeBtn").addEventListener("click", () => {
    document.getElementById("agreeBtn").style.display    = "none";
    document.getElementById("disagreeBtn").style.display = "none";
    document.getElementById("message").style.display     = "block";
    // 玫瑰保持显示
  });

  // 不同意
  document.getElementById("disagreeBtn").addEventListener("click", function() {
    const btn      = this;
    const duration = 800;
    const start    = performance.now();
    function shrink(now) {
      const t = Math.min((now - start) / duration, 1);
      const s = 1 - t;
      btn.style.transform = `scale(${s})`;
      btn.style.opacity   = s;
      if (t < 1) requestAnimationFrame(shrink);
      else {
        btn.style.display       = "none";
        btn.style.pointerEvents = "none";
      }
    }
    requestAnimationFrame(shrink);
  });
}

// —— 初始化 —— 
window.addEventListener("DOMContentLoaded", setupButtons);

