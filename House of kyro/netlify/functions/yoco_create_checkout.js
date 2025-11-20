// netlify/functions/create-checkout.js
const https = require('https');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Check if API key is present
  if (!process.env.YOCO_SECRET_KEY) {
    console.error('YOCO_SECRET_KEY environment variable is not set');
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: 'Server configuration error: API key not set. Please contact support.' 
      })
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { amount, currency, successUrl, cancelUrl, customerDetails, lineItems } = data;
    
    console.log('Creating checkout with amount:', amount, 'currency:', currency);

    // Prepare Yoco checkout payload
    const checkoutData = JSON.stringify({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency,
      successUrl: successUrl,
      cancelUrl: cancelUrl,
      metadata: {
        customerName: customerDetails.name,
        customerEmail: customerDetails.email,
        customerPhone: customerDetails.phone,
        customerAddress: customerDetails.address
      },
      lineItems: lineItems
    });

    // Yoco API options
    const options = {
      hostname: 'payments.yoco.com',
      path: '/api/checkouts',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.YOCO_SECRET_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(checkoutData)
      }
    };

    // Make request to Yoco API
    const response = await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
          if (res.statusCode === 201) {
            resolve(JSON.parse(body));
          } else {
            reject(new Error(`Yoco API error: ${res.statusCode} - ${body}`));
          }
        });
      });

      req.on('error', reject);
      req.write(checkoutData);
      req.end();
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(response)
    };

  } catch (error) {
    console.error('Detailed error creating checkout:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: error.message || 'Failed to create checkout session',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      })
    };
  }
};