const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.exploded = false;
        this.particles = [];
        this.vy = -7 + Math.random() * -3;
        this.vx = (Math.random() - 0.5) * 2;
        this.gravity = 0.05;
        this.trail = [];
    }

    update() {
        if (!this.exploded) {
            this.trail.push({ x: this.x, y: this.y });
            if (this.trail.length > 20) this.trail.shift();

            this.x += this.vx;
            this.y += this.vy;
            this.vy += this.gravity;

            if (this.vy >= 0) {
                this.explode();
            }
        } else {
            this.particles.forEach((p) => p.update());
        }
    }

    explode() {
        this.exploded = true;
        for (let i = 0; i < 150; i++) { // Lebih banyak partikel untuk love
            let angle = (i / 150) * Math.PI * 2;
            let speed = Math.random() * 2 + 1;
            let { vx, vy } = getHeartVelocity(angle, speed);
            this.particles.push(new Particle(this.x, this.y, vx, vy, getRandomColor()));
        }
    }

    draw() {
        if (!this.exploded) {
            ctx.fillStyle = "white";
            this.trail.forEach((point, index) => {
                ctx.globalAlpha = index / this.trail.length;
                ctx.beginPath();
                ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
                ctx.fill();
            });

            ctx.globalAlpha = 1;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
            ctx.fill();
        } else {
            this.particles.forEach((p) => p.draw());
        }
    }
}

class Particle {
    constructor(x, y, vx, vy, color) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.alpha = 1;
        this.color = color;
        this.fade = Math.random() * 0.015 + 0.005;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.02;
        this.alpha -= this.fade;
    }

    draw() {
        if (this.alpha <= 0) return;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

function getRandomColor() {
    const colors = ["#ff0000", "#ff69b4", "#ff1493", "#ff4500", "#ffff00"];
    return colors[Math.floor(Math.random() * colors.length)];
}

function getHeartVelocity(angle, speed) {
    let t = angle * 2;
    let x = 16 * Math.pow(Math.sin(t), 3);
    let y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

    return { vx: x * speed * 0.08, vy: y * speed * 0.08 };
}

let fireworks = [];

function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.02) {
        fireworks.push(new Firework(Math.random() * canvas.width, canvas.height));
    }

    fireworks.forEach((fw, index) => {
        fw.update();
        fw.draw();
        if (fw.exploded && fw.particles.every(p => p.alpha <= 0)) {
            fireworks.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}

window.onload = () => {
    animate();
};