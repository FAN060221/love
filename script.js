document.getElementById("agreeBtn").addEventListener("click", function() {
    // 隐藏按钮
    this.style.display = "none";
    document.getElementById("disagreeBtn").style.display = "none";

    // 显示并绘制玫瑰花
    let canvas = document.getElementById("roseCanvas");
    canvas.width = 400;
    canvas.height = 400;
    canvas.style.display = "block";
    let ctx = canvas.getContext("2d");

    function drawRose() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;

        let cx = canvas.width / 2, cy = canvas.height / 2;
        let k = 4; // 花瓣数量
        let scale = 100; // 大小

        ctx.beginPath();
        for (let theta = 0; theta < Math.PI * 2; theta += 0.01) {
            let r = scale * Math.cos(k * theta);
            let x = cx + r * Math.cos(theta);
            let y = cy + r * Math.sin(theta);
            ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
    }

    drawRose();
});

document.getElementById("disagreeBtn").addEventListener("click", function() {
    // 获取当前缩放比例
    let currentScale = this.style.transform.match(/scale([^)]+)/);
    currentScale = currentScale ? parseFloat(currentScale[1]) : 1;

    // 计算新的缩放比例
    let newScale = currentScale / 10;

    // 设置新的缩放比例
    this.style.transform = `scale(${newScale})`;

    // 按钮缩小到一定程度并隐藏
    if (newScale < 0.01) {
        this.style.opacity = 0;
        this.style.pointerEvents = "none"; // 禁用按钮的交互
    }
});