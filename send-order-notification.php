<?php
/**
 * House of Kryo - Order Notification Email
 * Sends order confirmation emails via SendGrid
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

// Check if SendGrid API key is configured
if (SENDGRID_API_KEY === 'YOUR_SENDGRID_API_KEY_HERE') {
    error_log('SENDGRID_API_KEY is not configured');
    // Don't fail the order if email is not configured, just log it
    sendJsonResponse([
        'success' => true,
        'warning' => 'Email notification not configured',
        'message' => 'Order processed but email notification was not sent'
    ]);
}

try {
    // Get POST data
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        sendErrorResponse('Invalid JSON data received', 400);
    }
    
    // Extract order details
    $orderNumber = $input['orderNumber'] ?? '';
    $orderDate = $input['orderDate'] ?? date('Y-m-d H:i:s');
    $orderTotal = $input['orderTotal'] ?? '0.00';
    $customerName = $input['customerName'] ?? '';
    $customerEmail = $input['customerEmail'] ?? '';
    $customerPhone = $input['customerPhone'] ?? '';
    $customerAddress = $input['customerAddress'] ?? '';
    $orderItems = $input['orderItems'] ?? '';
    $checkoutId = $input['checkoutId'] ?? '';
    
    // Validate required fields
    if (empty($orderNumber)) {
        sendErrorResponse('Order number is required', 400);
    }
    
    error_log("Sending order notification for order: {$orderNumber}");
    
    // Format order items for email (convert newlines to HTML breaks)
    $formattedOrderItems = nl2br(htmlspecialchars($orderItems));
    
    // Build email content
    $emailHtml = buildOrderEmail([
        'orderNumber' => $orderNumber,
        'orderDate' => $orderDate,
        'orderTotal' => $orderTotal,
        'customerName' => $customerName,
        'customerEmail' => $customerEmail,
        'customerPhone' => $customerPhone,
        'customerAddress' => nl2br(htmlspecialchars($customerAddress)),
        'orderItems' => $formattedOrderItems,
        'checkoutId' => $checkoutId
    ]);
    
    // Prepare SendGrid email payload
    $emailData = [
        'personalizations' => [
            [
                'to' => [
                    [
                        'email' => STORE_EMAIL,
                        'name' => STORE_NAME
                    ]
                ],
                'subject' => "New Order #{$orderNumber} - R{$orderTotal}"
            ]
        ],
        'from' => [
            'email' => STORE_EMAIL,
            'name' => STORE_NAME . ' Orders'
        ],
        'reply_to' => [
            'email' => $customerEmail,
            'name' => $customerName
        ],
        'content' => [
            [
                'type' => 'text/html',
                'value' => $emailHtml
            ]
        ]
    ];
    
    // Send email via SendGrid
    $ch = curl_init('https://api.sendgrid.com/v3/mail/send');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($emailData),
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . SENDGRID_API_KEY,
            'Content-Type: application/json'
        ],
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYPEER => true
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);
    
    error_log("SendGrid Response - HTTP Code: {$httpCode}");
    
    if ($curlError) {
        error_log("SendGrid cURL Error: {$curlError}");
        sendErrorResponse('Failed to send email notification', 500);
    }
    
    if ($httpCode === 202 || $httpCode === 200) {
        error_log('Order notification sent successfully!');
        sendJsonResponse([
            'success' => true,
            'message' => 'Email notification sent successfully'
        ]);
    } else {
        $responseData = json_decode($response, true);
        $errorMessage = isset($responseData['errors']) 
            ? json_encode($responseData['errors']) 
            : 'Unknown error';
        error_log("SendGrid Error ({$httpCode}): {$errorMessage}");
        sendErrorResponse('Failed to send email notification: ' . $errorMessage, 500);
    }
    
} catch (Exception $e) {
    error_log("Exception in send-order-notification.php: " . $e->getMessage());
    sendErrorResponse('An unexpected error occurred', 500);
}

/**
 * Build the HTML email template for order notifications
 * @param array $data Order data
 * @return string HTML email content
 */
function buildOrderEmail($data) {
    return "
<!DOCTYPE html>
<html>
<head>
    <meta charset=\"UTF-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
    <title>New Order #{$data['orderNumber']}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
        .header { background: #1a1a1a; color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { padding: 30px; }
        .section { background: #f5f5f5; padding: 20px; margin-bottom: 20px; border-radius: 8px; }
        .section h2 { margin-top: 0; color: #1a1a1a; font-size: 18px; border-bottom: 2px solid #1a1a1a; padding-bottom: 10px; }
        .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e0e0e0; }
        .detail-row:last-child { border-bottom: none; }
        .label { color: #666; font-weight: 500; }
        .value { font-weight: 600; color: #1a1a1a; }
        .total { font-size: 1.2em; color: #22c55e; }
        .items-box { background: #ffffff; padding: 15px; border-radius: 4px; border: 1px solid #e0e0e0; }
        .footer { background: #1a1a1a; color: white; padding: 20px; text-align: center; font-size: 12px; }
        .footer a { color: #fff; text-decoration: underline; }
    </style>
</head>
<body>
    <div class=\"container\">
        <div class=\"header\">
            <h1>🎉 New Order Received!</h1>
            <p style=\"margin: 10px 0 0 0; opacity: 0.9;\">" . STORE_NAME . "</p>
        </div>
        
        <div class=\"content\">
            <div class=\"section\">
                <h2>Order Details</h2>
                <div class=\"detail-row\">
                    <span class=\"label\">Order Number:</span>
                    <span class=\"value\">#{$data['orderNumber']}</span>
                </div>
                <div class=\"detail-row\">
                    <span class=\"label\">Order Date:</span>
                    <span class=\"value\">{$data['orderDate']}</span>
                </div>
                <div class=\"detail-row\">
                    <span class=\"label\">Total Amount:</span>
                    <span class=\"value total\">R{$data['orderTotal']}</span>
                </div>
            </div>
            
            <div class=\"section\">
                <h2>Customer Information</h2>
                <div class=\"detail-row\">
                    <span class=\"label\">Name:</span>
                    <span class=\"value\">{$data['customerName']}</span>
                </div>
                <div class=\"detail-row\">
                    <span class=\"label\">Email:</span>
                    <span class=\"value\"><a href=\"mailto:{$data['customerEmail']}\">{$data['customerEmail']}</a></span>
                </div>
                <div class=\"detail-row\">
                    <span class=\"label\">Phone:</span>
                    <span class=\"value\"><a href=\"tel:{$data['customerPhone']}\">{$data['customerPhone']}</a></span>
                </div>
                <div class=\"detail-row\">
                    <span class=\"label\">Shipping Address:</span>
                    <span class=\"value\">{$data['customerAddress']}</span>
                </div>
            </div>
            
            <div class=\"section\">
                <h2>Order Items</h2>
                <div class=\"items-box\">
                    {$data['orderItems']}
                </div>
            </div>
            
            <div class=\"section\" style=\"background: #e8f5e9;\">
                <p style=\"margin: 0; text-align: center;\">
                    <strong>Payment ID:</strong> {$data['checkoutId']}<br>
                    <small style=\"color: #666;\">Please process this order as soon as possible.</small>
                </p>
            </div>
        </div>
        
        <div class=\"footer\">
            <p style=\"margin: 0;\">&copy; " . date('Y') . " " . STORE_NAME . ". All rights reserved.</p>
            <p style=\"margin: 5px 0 0 0;\">This is an automated order notification.</p>
        </div>
    </div>
</body>
</html>
    ";
}
