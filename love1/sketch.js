let t = 0;
let colors = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    strokeWeight(2);
    noFill();
    generateColors();
}

function draw() {
    translate(width / 2, height / 2);
    
    const { x, y } = calculateHeartCoordinates(t);
    stroke(colors[int((t * 10) % colors.length)]);
    point(x * 20, y * 20);

    t += 0.05;
    if (t > TWO_PI) {
        t = 0;
        background(0);
    }
}

function generateColors() {
    for (let i = 0; i < 360; i += 5) {
        colors.push(color(`hsl(${i}, 100%, 50%)`));
    }
}

function calculateHeartCoordinates(t) {
    const x = 16 * pow(sin(t), 3);
    const y = -(
        13 * cos(t) -
        5 * cos(2 * t) -
        2 * cos(3 * t) -
        cos(4 * t)
    );
    return { x, y };
}