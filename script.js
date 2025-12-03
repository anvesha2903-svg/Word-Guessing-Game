/* ---------------- GOLD DUST PARTICLES ---------------- */
function createParticle() {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    const size = Math.random() * 4 + 2;
    particle.style.width = size + "px";
    particle.style.height = size + "px";

    particle.style.left = Math.random() * window.innerWidth + "px";
    particle.style.animationDuration = (Math.random() * 5 + 5) + "s";
    particle.style.opacity = Math.random() * 0.9;

    document.querySelector(".particles").appendChild(particle);
    setTimeout(() => particle.remove(), 9000);
}
setInterval(createParticle, 150);

/* ---------------- GAME LOGIC ---------------- */
const words = [
    { word: "ROYAL", hint: "Fit for a king or queen" },
    { word: "CROWN", hint: "A symbol of power" },
    { word: "EMPIRE", hint: "A vast kingdom" },
    { word: "GOLD", hint: "Precious luxury metal" },
    { word: "PALACE", hint: "Where royalty lives" }
];

let selected = words[Math.floor(Math.random() * words.length)];
let guessed = Array(selected.word.length).fill("_");

document.getElementById("wordDisplay").textContent = guessed.join(" ");
document.getElementById("hint").textContent = "Hint: " + selected.hint;

function guessLetter() {
    let input = document.getElementById("letterInput");
    let letter = input.value.toUpperCase();
    input.value = "";

    if (!letter.match(/[A-Z]/)) return;

    let found = false;

    for (let i = 0; i < selected.word.length; i++) {
        if (selected.word[i] === letter) {
            guessed[i] = letter;
            found = true;
        }
    }

    document.getElementById("wordDisplay").textContent = guessed.join(" ");

    if (!found) {
        input.style.borderColor = "#9b6b3d";
        setTimeout(() => input.style.borderColor = "#c6a559", 300);
    }

    if (guessed.join("") === selected.word) {
    triggerGoldConfetti();

    setTimeout(() => {
        alert("👑 Congratulations! You completed the royal word!");
        location.reload();
    }, 1200);
}

    }

/* ---------------- GOLD CONFETTI ---------------- */
const confettiCanvas = document.getElementById("confettiCanvas");
const ctx = confettiCanvas.getContext("2d");

function resizeCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}
resizeCanvas();
window.onresize = resizeCanvas;

let confettiPieces = [];

function createConfetti() {
    const colors = ["#FFD978", "#F5D28E", "#E5B95C", "#C89A3B"];
    
    for (let i = 0; i < 120; i++) {
        confettiPieces.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * -50,
            size: Math.random() * 6 + 4,
            speed: Math.random() * 2 + 1,
            angle: Math.random() * 360,
            spin: Math.random() * 10 - 5,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }
}

function drawConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    confettiPieces.forEach((p, i) => {
        p.y += p.speed;
        p.angle += p.spin;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.angle * Math.PI) / 180);

        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);

        ctx.restore();

        if (p.y > confettiCanvas.height + 20) {
            confettiPieces.splice(i, 1);
        }
    });

    requestAnimationFrame(drawConfetti);
}

function triggerGoldConfetti() {
    createConfetti();
    drawConfetti();

    // Clean up after animation
    setTimeout(() => (confettiPieces = []), 6000);
}

