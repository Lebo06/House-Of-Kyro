<?php
/**
 * House of Kryo - Yoco Checkout Creation
 * Creates a Yoco checkout session for payment processing
 */

require_once 'config.php';

// Set CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendErrorResponse('Method not allowed. Use POST.', 405);
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
    // Get POST data
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        sendErrorResponse('Invalid JSON data received', 400);
    }
    
    // Validate required fields
    $amount = isset($input['amount']) ? floatval($input['amount']) : 0;
    $currency = $input['currency'] ?? STORE_CURRENCY;
    $successUrl = $input['successUrl'] ?? '';
    $cancelUrl = $input['cancelUrl'] ?? '';
    $customerDetails = $input['customerDetails'] ?? [];
    $lineItems = $input['lineItems'] ?? [];
    
    // Validate amount
    if ($amount <= 0) {
        sendErrorResponse('Invalid amount. Amount must be greater than 0.', 400);
    }
    
    // Validate URLs
    if (empty($successUrl) || empty($cancelUrl)) {
        sendErrorResponse('Success and cancel URLs are required', 400);
    }
    
    // Convert amount to cents (Yoco expects amount in cents)
    $amountInCents = (int)round($amount * 100);
    
    error_log("Creating Yoco checkout - Amount: R{$amount} ({$amountInCents} cents), Currency: {$currency}");
    
    // Build metadata
    $metadata = [
        'customerName' => $customerDetails['name'] ?? '',
        'customerEmail' => $customerDetails['email'] ?? '',
        'customerPhone' => $customerDetails['phone'] ?? '',
        'customerAddress' => $customerDetails['address'] ?? '',
        'storeName' => STORE_NAME,
        'orderDate' => date('Y-m-d H:i:s')
    ];
    
    // Prepare Yoco checkout payload
    $checkoutData = [
        'amount' => $amountInCents,
        'currency' => $currency,
        'successUrl' => $successUrl,
        'cancelUrl' => $cancelUrl,
        'metadata' => $metadata
    ];
    
    // Add line items if provided (recommended by Yoco)
    if (!empty($lineItems)) {
        $checkoutData['lineItems'] = array_map(function($item) {
            return [
                'displayName' => $item['name'] ?? 'Product',
                'quantity' => (int)($item['quantity'] ?? 1),
                'pricingDetails' => [
                    'price' => (int)round(($item['price'] ?? 0) * 100) // Price in cents
                ]
            ];
        }, $lineItems);
    }
    
    // Make request to Yoco API
    $ch = curl_init('https://payments.yoco.com/api/checkouts');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($checkoutData),
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
    error_log("Yoco API Response - HTTP Code: {$httpCode}");
    error_log("Yoco API Response Body: " . substr($response, 0, 500));
    
    if ($curlError) {
        error_log("cURL Error: {$curlError}");
        sendErrorResponse('Failed to connect to payment gateway. Please try again.', 500);
    }
    
    // Parse response
    $responseData = json_decode($response, true);
    
    if ($httpCode === 200 || $httpCode === 201) {
        if (isset($responseData['redirectUrl']) && isset($responseData['id'])) {
            // Return successful response
            sendJsonResponse([
                'success' => true,
                'id' => $responseData['id'],
                'redirectUrl' => $responseData['redirectUrl'],
                'amount' => $amountInCents,
                'currency' => $currency
            ]);
        } else {
            error_log('Invalid Yoco response structure: ' . $response);
            sendErrorResponse('Invalid response from payment gateway', 500);
        }
    } else {
        // Handle Yoco API errors
        $errorMessage = 'Payment gateway error';
        if (isset($responseData['message'])) {
            $errorMessage = $responseData['message'];
        } elseif (isset($responseData['error'])) {
            $errorMessage = is_string($responseData['error']) ? $responseData['error'] : json_encode($responseData['error']);
        }
        
        error_log("Yoco API Error ({$httpCode}): {$errorMessage}");
        sendErrorResponse("Payment error: {$errorMessage}", $httpCode);
    }
    
} catch (Exception $e) {
    error_log("Exception in create-checkout.php: " . $e->getMessage());
    sendErrorResponse('An unexpected error occurred. Please try again.', 500);
}
