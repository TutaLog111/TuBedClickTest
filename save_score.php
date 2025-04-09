
<?php
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['name']) || !isset($data['cps'])) {
    http_response_code(400);
    echo json_encode(["error" => "Dati mancanti."]);
    exit;
}

$name = htmlspecialchars($data['name']);
$cps = floatval($data['cps']);

if ($cps < 0 || $cps > 50) {
    http_response_code(400);
    echo json_encode(["error" => "CPS non valido."]);
    exit;
}

$filename = "scores.json";
$scores = [];

if (file_exists($filename)) {
    $scores = json_decode(file_get_contents($filename), true);
}

$scores[] = ["name" => $name, "cps" => $cps];

usort($scores, fn($a, $b) => $b['cps'] <=> $a['cps']);
$scores = array_slice($scores, 0, 10);

file_put_contents($filename, json_encode($scores, JSON_PRETTY_PRINT));

echo json_encode(["success" => true]);
?>
