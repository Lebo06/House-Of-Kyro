<?php
/**
 * House of Kryo - Yoco Payment Verification
 * Verifies the status of a Yoco checkout/payment
 */

require_once 'config.php';

// Set CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendErrorResponse('Method not allowed. Use GET.', 405);
}

// Check if Yoco API key is configured
if (YOCO_SECRET_KEY === 'YOUR_YOCO_SECRET_KEY_HERE') {
    error_log('YOCO_SECRET_KEY is not configured');
    sendErrorResponse(
        'Payment gateway not configured. Please contact the store administrator.', 
        500
    );
}

try {
    $checkoutId = $_GET['checkoutId'] ?? '';
    
    if (empty($checkoutId)) {
        sendErrorResponse('Missing checkoutId parameter', 400);
    }
    
    // Validate checkout ID format (Yoco IDs typically start with 'ch_')
    if (!preg_match('/^ch_[a-zA-Z0-9]+$/', $checkoutId)) {
        sendErrorResponse('Invalid checkout ID format', 400);
    }
    
    error_log("Verifying payment for checkout ID: {$checkoutId}");
    
    // Make request to Yoco API
    $ch = curl_init("https://payments.yoco.com/api/checkouts/{$checkoutId}");
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . YOCO_SECRET_KEY,
            'Content-Type: application/json',
            'Accept: application/json'
        ],
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_FOLLOWLOCATION => true
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);
    
    // Log response for debugging
    error_log("Yoco Verify Response - HTTP Code: {$httpCode}");
    
    if ($curlError) {
        error_log("cURL Error: {$curlError}");
        sendErrorResponse('Failed to verify payment. Please try again.', 500);
    }
    
    // Parse response
    $responseData = json_decode($response, true);
    
    if ($httpCode === 200) {
        // Determine payment status
        $status = $responseData['status'] ?? 'unknown';
        $isSuccessful = in_array($status, ['successful', 'complete', 'completed', 'paid']);
        
        // Return verification result
        sendJsonResponse([
            'success' => true,
            'id' => $responseData['id'] ?? $checkoutId,
            'status' => $status,
            'isSuccessful' => $isSuccessful,
            'totalAmount' => $responseData['totalAmount'] ?? null,
            'currency' => $responseData['currency'] ?? STORE_CURRENCY,
            'createdAt' => $responseData['createdAt'] ?? null,
            'paidAt' => $responseData['paidAt'] ?? null,
            'metadata' => $responseData['metadata'] ?? null,
            'customer' => $responseData['customer'] ?? null
        ]);
    } else {
        // Handle Yoco API errors
        $errorMessage = 'Failed to verify payment';
        if (isset($responseData['message'])) {
            $errorMessage = $responseData['message'];
        } elseif (isset($responseData['error'])) {
            $errorMessage = is_string($responseData['error']) ? $responseData['error'] : json_encode($responseData['error']);
        }
        
        error_log("Yoco Verify Error ({$httpCode}): {$errorMessage}");
        sendErrorResponse($errorMessage, $httpCode);
    }
    
} catch (Exception $e) {
    error_log("Exception in verify-payment.php: " . $e->getMessage());
    sendErrorResponse('An unexpected error occurred during verification', 500);
}
