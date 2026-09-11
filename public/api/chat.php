<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

http_response_code(200);
echo json_encode([
    'success' => true,
    'text' => "Welcome to 4 Seasons Right Services! 🌟\n\nI can help you schedule a free, no-obligation estimate right now!\n\nTo proceed, please call our supervisor directly at **(425) 466-5469** or fill out our online estimate form above!",
    'isBookingSuccessful' => false
]);
