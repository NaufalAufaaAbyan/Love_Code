const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const density = 10; // Increase density for larger particles
let formingHeart = false;

// Draw small heart shape
function drawSmallHeart(ctx, x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y + size / 4);
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + size / 4);
    ctx.bezierCurveTo(x - size / 2, y + size / 2, x, y + size, x, y + size);
    ctx.bezierCurveTo(x, y + size, x + size / 2, y + size / 2, x + size / 2, y + size / 4);
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size / 4);
    ctx.closePath();
    ctx.fill();
}

// Draw large heart shape
function drawHeart() {
    ctx.beginPath();
    ctx.moveTo(75, 40);
    ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
    ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
    ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
    ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
    ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
    ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
    ctx.closePath();
    ctx.fill();
}

ctx.fillStyle = 'pink';
ctx.save();
ctx.translate(canvas.width / 2, canvas.height / 2);
ctx.scale(6, 6); // Scale the heart to make it larger
ctx.translate(-75, -60); // Adjust the position to center the heart
drawHeart();
ctx.restore();

const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Create particles for the heart shape
for (let y = 0; y < imageData.height; y += density) {
    for (let x = 0; x < imageData.width; x += density) {
        const index = (y * imageData.width + x) * 4;
        if (imageData.data[index + 3] > 128) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                targetX: x,
                targetY: y,
                size: Math.random() * 8 + 4, // Increase size for larger particles
                speedX: (Math.random() - 0.5) * 0.05, // Slower speed for floating effect
                speedY: (Math.random() - 0.5) * 0.05, // Slower speed for floating effect
                color: `rgba(255, 192, 203, ${imageData.data[index + 3] / 255})` // Pink color
            });
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        if (formingHeart) {
            const dx = particle.targetX - particle.x;
            const dy = particle.targetY - particle.y;
            particle.speedX = dx * 0.005; // Slower speed for a slower tempo
            particle.speedY = dy * 0.005; // Slower speed for a slower tempo
        } else {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        }
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        ctx.fillStyle = particle.color;
        drawSmallHeart(ctx, particle.x, particle.y, particle.size);
    });

    requestAnimationFrame(animate);
}

canvas.addEventListener('click', () => {
    formingHeart = true;
});

animate();