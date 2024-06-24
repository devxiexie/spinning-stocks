// https://github.com/olimorris/spin-the-wheel/blob/main/src/index.js
sectors = [
    { color: "red", text: "#333333", label: "one" },
    { color: "orange", text: "#333333", label: "two" },
    { color: "yellow", text: "#333333", label: "three" },
    { color: "green", text: "#333333", label: "four" },
    { color: "blue", text: "#333333", label: "five" },
    { color: "purple", text: "#333333", label: "six" },
    { color: "grey", text: "#333333", label: "seven" },
    { color: "pink", text: "#333333", label: "eight" },
];

var wheel = document.querySelector("#wheel").getContext("2d");
var radius = wheel.canvas.width / 2;
var spinEl = document.querySelector("#button");
var output = document.querySelector("#result");
var pi = Math.PI;
var arcRadians = (2 * pi) / 8;
var randButton = document.querySelector("#randomize");

const friction = 0.99;

var angularVelocity = 0;
var ang = 0;

var startedSpinning = false;

function drawSector(sector, i) {
    startingAnlge = arcRadians * i;
    wheel.save();

    wheel.beginPath();
    wheel.moveTo(radius, radius);
    wheel.arc(
        radius,
        radius,
        radius,
        startingAnlge,
        startingAnlge + arcRadians
    );
    wheel.lineTo(radius, radius);
    wheel.fillStyle = sector.color;
    wheel.fill();

    wheel.translate(radius, radius);
    wheel.rotate(startingAnlge + arcRadians / 2);
    wheel.textAlign = "right";
    wheel.fillStyle = sector.text;
    wheel.font = "bold 48px 'Tahoma', sans-serif";

    wheel.fillText(sector.label, radius * 0.9, 10);

    wheel.restore();
}

const getIndex = () => Math.floor(8 - (ang / (2 * pi)) * 8) % 8;

function rotate() {
    var sector = sectors[getIndex()];
    wheel.canvas.style.transform = `rotate(${ang - pi / 2}rad)`;

    spinEl.textContent = angularVelocity ? sector.label : "SPIN";
    output.textContent = angularVelocity ? "..." : sector.label;
}

function frame() {
    angularVelocity *= friction;
    if (angularVelocity < 0.001) {
        angularVelocity = 0;
    }
    ang += angularVelocity;
    ang %= 2 * pi;
    rotate();

    requestAnimationFrame(frame);
}

function shuffleLabels() {
    var labels = sectors.map((sector) => sector.label);
    for (let i = labels.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [labels[i], labels[j]] = [labels[j], labels[i]];
    }
    sectors.forEach((sector, index) => {
        sector.label = labels[index];
    });
    console.log(sectors);
}

function execute() {
    var i = 0;
    do {
        drawSector(sectors[i], i);
        i++;
    } while (i < 8);

    rotate();
    frame();
    randButton.addEventListener("click", () => {
        if (!angularVelocity) {
            shuffleLabels();
            var i = 0;
            do {
                drawSector(sectors[i], i);
                i++;
            } while (i < 8);
        }
    });

    spinEl.addEventListener("click", () => {
        if (!angularVelocity) {
            angularVelocity = Math.random() * (1 - 0.0) + 0.0;
        }

        startedSpinning = true;
    });
}

execute();
