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

  try {
    const data = JSON.parse(event.body);
    const { amount, currency, successUrl, cancelUrl, customerDetails, lineItems } = data;

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
    console.error('Error creating checkout:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: error.message })
    };
  }
};