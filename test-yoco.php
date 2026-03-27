<?php
header('Content-Type: application/json');

$yocoSecretKey = 'sk_live_8545589aV42qyymdcbd45d4b85fe';

// Test 1: Can we reach Yoco at all?
$ch = curl_init('https://payments.yoco.com/api/checkouts');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 15);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'amount'     => 100,
    'currency'   => 'ZAR',
    'successUrl' => 'https://example.com/success',
    'cancelUrl'  => 'https://example.com/cancel'
]));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $yocoSecretKey,
    'Content-Type: application/json'
]);

$response  = curl_exec($ch);
$httpCode  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

echo json_encode([
    'curl_error'    => $curlError ?: null,
    'http_code'     => $httpCode,
    'yoco_response' => json_decode($response, true) ?? $response,
]);
?>
