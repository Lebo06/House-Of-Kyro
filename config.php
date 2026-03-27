<?php
/**
 * House of Kryo - Configuration File
 * 
 * Yoco Test Keys Configured:
 * - Secret Key: sk_test_ad0bc26fV42qyym80334b1ea33f8
 * - Public Key: pk_test_4d2dd31egVPBzzkb8d34 (for frontend if needed)
 */

// Yoco API Configuration - TEST MODE
// Replace with live key (sk_live_...) for production
define('YOCO_SECRET_KEY', 'sk_test_ad0bc26fV42qyym80334b1ea33f8');

// SendGrid API Configuration (optional - for order emails)
define('SENDGRID_API_KEY', getenv('SENDGRID_API_KEY') ?: 'YOUR_SENDGRID_API_KEY_HERE');

// Store Configuration
define('STORE_NAME', 'House of Kryo');
define('STORE_EMAIL', 'houseofkyro794@gmail.com');
define('STORE_CURRENCY', 'ZAR');

// Environment Configuration
define('IS_PRODUCTION', false); // Set to true when going live

/**
 * Check if API keys are configured
 * @return array Status of each API key
 */
function checkApiKeys() {
    $yocoConfigured = YOCO_SECRET_KEY !== 'YOUR_YOCO_SECRET_KEY_HERE' 
        && strpos(YOCO_SECRET_KEY, 'sk_') === 0;
    
    $status = [
        'yoco' => [
            'configured' => $yocoConfigured,
            'mode' => strpos(YOCO_SECRET_KEY, 'sk_test_') === 0 ? 'TEST' : 'LIVE',
            'message' => $yocoConfigured 
                ? 'Yoco API key configured (' . (strpos(YOCO_SECRET_KEY, 'sk_test_') === 0 ? 'TEST' : 'LIVE') . ' mode)'
                : 'YOCO_SECRET_KEY not properly configured'
        ],
        'sendgrid' => [
            'configured' => SENDGRID_API_KEY !== 'YOUR_SENDGRID_API_KEY_HERE',
            'message' => SENDGRID_API_KEY === 'YOUR_SENDGRID_API_KEY_HERE' 
                ? 'SENDGRID_API_KEY not set' 
                : 'SendGrid API key is configured'
        ]
    ];
    return $status;
}

/**
 * Get the base URL of the application
 * @return string Base URL
 */
function getBaseUrl() {
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
    $scriptName = $_SERVER['SCRIPT_NAME'] ?? '';
    $dir = dirname($scriptName);
    $basePath = $dir === '/' || $dir === '\\' ? '' : $dir;
    return $protocol . '://' . $host . $basePath;
}

/**
 * Send JSON response
 * @param mixed $data Data to send
 * @param int $statusCode HTTP status code
 */
function sendJsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

/**
 * Send error response
 * @param string $message Error message
 * @param int $statusCode HTTP status code
 */
function sendErrorResponse($message, $statusCode = 500) {
    sendJsonResponse(['error' => $message, 'success' => false], $statusCode);
}