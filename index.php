
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Click Test - CPS</title>
    <link rel="stylesheet" href="style.css" />
</head>
<body>
    <div class="container">
        <h1>Click Test</h1>
        <p>Clicca il più velocemente possibile in 5 secondi!</p>
        <div id="click-area" class="click-area" onclick="handleClick()">
            <span id="cps">CPS</span>
        </div>
        <div id="results" class="hidden">
            <p>Hai fatto: <span id="final-cps"></span> CPS</p>
            <p>Rank: <span id="rank"></span></p>
            <p id="rank-msg"></p>
        </div>
        <div id="leaderboard" class="leaderboard"></div>
        <button onclick="startGame()">Inizia</button>
    </div>
    <script src="script.js"></script>
    <script>loadScores();</script>
</body>
</html>
