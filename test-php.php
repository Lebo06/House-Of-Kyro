<?php
header('Content-Type: application/json');
echo json_encode([
    'php_working' => true,
    'php_version' => PHP_VERSION,
    'curl_enabled' => function_exists('curl_init'),
    'curl_version' => function_exists('curl_version') ? curl_version()['version'] : 'not available',
    'server' => $_SERVER['SERVER_SOFTWARE'] ?? 'unknown',
    'method' => $_SERVER['REQUEST_METHOD']
]);
?>
