window.addEventListener('load', () => {
  // —— 粒子系统 —— 
  const pCanvas = document.getElementById('particleCanvas');
  const pCtx    = pCanvas.getContext('2d');
  let particles = [];

  function resizeParticleCanvas() {
    pCanvas.width  = window.innerWidth;
    pCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeParticleCanvas);
  resizeParticleCanvas();

  class Particle {
    constructor(x, y, vx, vy, size, life, img) {
      this.x = x; this.y = y;
      this.vx = vx; this.vy = vy;
      this.size = size; this.life = life; this.img = img;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.02;  // 重力
      this.life--;
    }
    draw(ctx) {
      if (this.img.complete) {
        ctx.drawImage(
          this.img,
          this.x - this.size/2, this.y - this.size/2,
          this.size, this.size
        );
      } else {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size/2, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(230,57,80,0.8)';
        ctx.fill();
      }
    }
  }

  const petalImg = new Image();
  petalImg.src = 'path/to/rose-petal.png'; // 换成你的素材路径

  function spawnParticle() {
    const x    = Math.random() * pCanvas.width;
    const y    = -20;
    const vx   = (Math.random() - 0.5) * 1;
    const vy   = Math.random() * 1 + 0.5;
    const size = Math.random() * 20 + 10;
    const life = 200 + Math.random() * 100;
    particles.push(new Particle(x, y, vx, vy, size, life, petalImg));
  }

  function particleLoop() {
    pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
    if (particles.length < 100) spawnParticle();
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw(pCtx);
      if (p.life <= 0 || p.y > pCanvas.height + 50) {
        particles.splice(i, 1);
      }
    }
    requestAnimationFrame(particleLoop);
  }
  particleLoop();


  // —— 玫瑰绘制函数 —— 
  const rCanvas = document.getElementById("roseCanvas");
  const rCtx    = rCanvas.getContext("2d");
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

  // 页面加载时先绘制一次玫瑰
  drawRose();


  // —— 同意 / 不同意 逻辑 —— 
  document.getElementById("agreeBtn").addEventListener("click", () => {
    // 隐藏按钮
    document.getElementById("agreeBtn").style.display    = "none";
    document.getElementById("disagreeBtn").style.display = "none";
    // 显示文字提示
    document.getElementById("message").style.display     = "block";
    // 再次重绘玫瑰（可选）
    drawRose();
  });

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

});
