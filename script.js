
let clicks = 0;
let timer = null;
const timeLimit = 5;

function handleClick() {
    if (!timer) return;
    clicks++;
    document.getElementById("cps").innerText = clicks;
}

function startGame() {
    clicks = 0;
    document.getElementById("results").classList.add("hidden");
    document.getElementById("click-area").style.pointerEvents = 'auto';
    document.getElementById("cps").innerText = 0;

    let timeLeft = timeLimit;
    timer = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) endGame();
    }, 1000);
}

function endGame() {
    clearInterval(timer);
    timer = null;

    let cps = (clicks / timeLimit).toFixed(1);
    document.getElementById('cps').innerHTML = cps + "<br>Click/s";
    document.getElementById('final-cps').innerText = cps;

    let rank = "Turtle";
    let msg = "Try to click faster!";
    if (cps >= 14) {
        rank = "Cheetah";
        msg = "Your fingers snap at blistering speed just like the speedie cat runs. Hail to the king of clicking.";
    } else if (cps >= 8) {
        rank = "Rabbit";
        msg = "Quick and nimble! You're doing great!";
    } else if (cps >= 4) {
        rank = "Cat";
        msg = "You're average, but keep going!";
    }

    document.getElementById('rank').innerText = rank;
    document.getElementById('rank-msg').innerText = msg;
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('click-area').style.pointerEvents = 'none';

    let name = prompt("Inserisci il tuo nome per salvare il punteggio:");
    if (name) {
        fetch("save_score.php", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ name, cps })
        }).then(() => loadScores());
    }
}

function loadScores() {
    fetch("get_scores.php")
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("leaderboard");
            if (!container) return;
            container.innerHTML = "<h3>🏆 Top 10</h3><ol>" +
                data.map(entry => `<li>${entry.name} — <strong>${entry.cps} CPS</strong></li>`).join("") +
                "</ol>";
        });
}
