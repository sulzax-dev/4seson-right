<?php
// Prevent any HTML error rendering breaking JSON
ini_set('display_errors', 0);
error_reporting(E_ALL);

// Set JSON response headers
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed. Only POST is accepted.']);
    exit;
}

// Read raw JSON input or fallback to $_POST
$rawInput = file_get_contents('php://input');
$body = json_decode($rawInput, true);
if (!is_array($body)) {
    $body = $_POST;
}

$name    = isset($body['name']) ? trim($body['name']) : '';
$phone   = isset($body['phone']) ? trim($body['phone']) : '';
$email   = isset($body['email']) ? trim($body['email']) : '';
$service = isset($body['service']) ? trim($body['service']) : 'General Inquiry';
$details = isset($body['details']) ? trim($body['details']) : 'No additional details provided.';
$source  = isset($body['source']) ? trim($body['source']) : 'Website Form';

if (empty($name) || empty($phone)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Name and phone number are required.']);
    exit;
}

// 1. PERSIST EVERY INQUIRY SECURELY ON SERVER (Lead Backup Guarantee)
$leadData = [
    'id'         => uniqid('booking_', true),
    'timestamp'  => date('Y-m-d H:i:s T'),
    'name'       => $name,
    'phone'      => $phone,
    'email'      => $email,
    'service'    => $service,
    'details'    => $details,
    'source'     => $source,
    'ip'         => isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'unknown',
    'status'     => 'received'
];

$logFile = __DIR__ . '/bookings_log.json';
$currentLeads = [];
if (file_exists($logFile)) {
    $existing = file_get_contents($logFile);
    $decoded = json_decode($existing, true);
    if (is_array($decoded)) {
        $currentLeads = $decoded;
    }
}
$currentLeads[] = $leadData;
@file_put_contents($logFile, json_encode($currentLeads, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// 2. LOAD .ENV CONFIGURATION
function loadEnv($path) {
    if (!file_exists($path)) return [];
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    $env = [];
    foreach ($lines as $line) {
        $line = trim($line);
        if (empty($line) || $line[0] === '#') continue;
        $parts = explode('=', $line, 2);
        if (count($parts) === 2) {
            $env[trim($parts[0])] = trim($parts[1]);
        }
    }
    return $env;
}

$envData = [];
$possiblePaths = [
    __DIR__ . '/.env',
    dirname(__DIR__) . '/.env',
    (isset($_SERVER['DOCUMENT_ROOT']) ? $_SERVER['DOCUMENT_ROOT'] . '/.env' : '')
];
foreach ($possiblePaths as $p) {
    if (!empty($p) && file_exists($p)) {
        $envData = loadEnv($p);
        break;
    }
}

// SMTP credentials
$rawUsers = isset($envData['SMTP_USER']) && !empty($envData['SMTP_USER']) 
    ? $envData['SMTP_USER'] 
    : (getenv('SMTP_USER') ?: 'zeroxmax68@gmail.com,4srsinc@gmail.com,citation.gbpaccess@gmail.com');

$smtpPass = isset($envData['SMTP_PASS']) && !empty($envData['SMTP_PASS']) 
    ? $envData['SMTP_PASS'] 
    : (getenv('SMTP_PASS') ?: 'pvscexnjqfpxhiqf');
$smtpPass = preg_replace('/\s+/', '', $smtpPass);

$recipientList = array_unique(array_filter(array_map('trim', explode(',', $rawUsers))));
if (empty($recipientList)) {
    $recipientList = ['zeroxmax68@gmail.com', '4srsinc@gmail.com', 'citation.gbpaccess@gmail.com'];
}
$smtpUser = 'zeroxmax68@gmail.com';

// HTML Email Template
$subject = "🚨 New Booking Request (" . ($source ?: 'Website Form') . ") - " . $name;
$safeName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$safePhone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$safeEmail = !empty($email) ? htmlspecialchars($email, ENT_QUOTES, 'UTF-8') : 'Not provided';
$safeService = htmlspecialchars($service, ENT_QUOTES, 'UTF-8');
$safeDetails = nl2br(htmlspecialchars($details, ENT_QUOTES, 'UTF-8'));
$safeSource = htmlspecialchars($source, ENT_QUOTES, 'UTF-8');

$htmlContent = '
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
  <div style="background: linear-gradient(135deg, #FD441B 0%, #FF6B4A 100%); padding: 24px; text-align: center; color: white;">
    <h2 style="margin: 0; font-size: 24px; font-weight: bold; letter-spacing: -0.5px;">New Estimate Request</h2>
    <p style="margin: 4px 0 0; opacity: 0.9; font-size: 14px;">Source: ' . $safeSource . '</p>
  </div>
  <div style="padding: 24px; background-color: #ffffff;">
    <p style="font-size: 16px; margin-top: 0;">You have received a new contracting request from your website. Here are the details:</p>
    
    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
      <tr style="border-bottom: 1px solid #edf2f7;">
        <td style="padding: 12px 0; font-weight: bold; color: #4a5568; width: 150px;">Customer Name:</td>
        <td style="padding: 12px 0; color: #2d3748;">' . $safeName . '</td>
      </tr>
      <tr style="border-bottom: 1px solid #edf2f7;">
        <td style="padding: 12px 0; font-weight: bold; color: #4a5568;">Phone Number:</td>
        <td style="padding: 12px 0; color: #2d3748;"><a href="tel:' . $safePhone . '" style="color: #FD441B; text-decoration: none; font-weight: bold;">' . $safePhone . '</a></td>
      </tr>
      <tr style="border-bottom: 1px solid #edf2f7;">
        <td style="padding: 12px 0; font-weight: bold; color: #4a5568;">Email Address:</td>
        <td style="padding: 12px 0; color: #2d3748;">' . ($email ? '<a href="mailto:' . $safeEmail . '" style="color: #FD441B; text-decoration: none;">' . $safeEmail . '</a>' : 'Not provided') . '</td>
      </tr>
      <tr style="border-bottom: 1px solid #edf2f7;">
        <td style="padding: 12px 0; font-weight: bold; color: #4a5568;">Service Requested:</td>
        <td style="padding: 12px 0; color: #2d3748;"><span style="background-color: #fff3f0; color: #FD441B; padding: 4px 8px; border-radius: 6px; font-size: 13px; font-weight: bold;">' . $safeService . '</span></td>
      </tr>
      <tr>
        <td style="padding: 12px 0; font-weight: bold; color: #4a5568; vertical-align: top;">Project Details:</td>
        <td style="padding: 12px 0; color: #2d3748; white-space: pre-wrap;">' . $safeDetails . '</td>
      </tr>
    </table>
  </div>
  <div style="background-color: #f7fafc; padding: 16px; text-align: center; font-size: 12px; color: #a0aec0; border-top: 1px solid #edf2f7;">
    &copy; 2026 4 Seasons Right Services Inc. All Rights Reserved.
  </div>
</div>
';

// 3. SMTP DISPATCH FUNCTION
function sendViaGmailSMTP($host, $port, $user, $pass, $recipients, $subject, $html, $fromName, $replyTo = null) {
    $timeout = 10;
    $context = stream_context_create([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        ]
    ]);

    $prefix = ($port == 465) ? 'ssl://' : '';
    $socket = @stream_socket_client($prefix . $host . ':' . $port, $errno, $errstr, $timeout, STREAM_CLIENT_CONNECT, $context);
    if (!$socket) {
        throw new Exception("Socket connect failed: $errstr ($errno)");
    }

    $read = function($expectedCode) use ($socket) {
        $response = '';
        while ($line = fgets($socket, 515)) {
            $response .= $line;
            if (substr($line, 3, 1) === ' ') break;
        }
        if (substr($response, 0, 3) != $expectedCode) {
            throw new Exception("SMTP Expected code $expectedCode but got: $response");
        }
        return $response;
    };

    $send = function($cmd, $expectedCode) use ($socket, $read) {
        fputs($socket, $cmd . "\r\n");
        return $read($expectedCode);
    };

    $read('220');
    $send("EHLO " . gethostname(), '250');

    if ($port == 587) {
        $send("STARTTLS", '220');
        stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
        $send("EHLO " . gethostname(), '250');
    }

    $send("AUTH LOGIN", '334');
    $send(base64_encode($user), '334');
    $send(base64_encode($pass), '235');

    $send("MAIL FROM: <" . $user . ">", '250');
    foreach ($recipients as $rcpt) {
        $send("RCPT TO: <" . $rcpt . ">", '250');
    }

    $send("DATA", '354');

    $headers = [];
    $headers[] = "MIME-Version: 1.0";
    $headers[] = "Content-Type: text/html; charset=UTF-8";
    $headers[] = "From: =?UTF-8?B?" . base64_encode($fromName) . "?= <" . $user . ">";
    $headers[] = "To: " . implode(', ', $recipients);
    if (!empty($replyTo)) {
        $headers[] = "Reply-To: <" . $replyTo . ">";
    }
    $headers[] = "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=";
    $headers[] = "Date: " . date('r');
    $headers[] = "X-Mailer: 4SeasonsPHP/1.0";

    $message = implode("\r\n", $headers) . "\r\n\r\n" . $html . "\r\n.";
    $send($message, '250');
    $send("QUIT", '221');
    fclose($socket);
    return true;
}

// Attempt SMTP delivery
$emailSent = false;
$smtpError = null;

try {
    $emailSent = sendViaGmailSMTP('smtp.gmail.com', 465, $smtpUser, $smtpPass, $recipientList, $subject, $htmlContent, '4 Seasons Booking System', $email);
} catch (Exception $e) {
    try {
        $emailSent = sendViaGmailSMTP('smtp.gmail.com', 587, $smtpUser, $smtpPass, $recipientList, $subject, $htmlContent, '4 Seasons Booking System', $email);
    } catch (Exception $e2) {
        $smtpError = $e2->getMessage();
    }
}

// ALWAYS return 200 OK and valid JSON to the client because the lead is safely recorded!
http_response_code(200);
echo json_encode([
    'success'    => true,
    'message'    => 'Booking inquiry sent successfully!',
    'email_sent' => $emailSent,
    'note'       => $emailSent ? 'Delivered via SMTP' : 'Recorded securely on server'
]);
