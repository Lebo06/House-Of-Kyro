// api/create-checkout.js
import https from 'https';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check if API key is present
  if (!process.env.YOCO_SECRET_KEY) {
    console.error('YOCO_SECRET_KEY environment variable is not set');
    return res.status(500).json({ 
      error: 'Server configuration error: API key not set. Please contact support.' 
    });
  }

  try {
    const { amount, currency, successUrl, cancelUrl, customerDetails, lineItems } = req.body;
    
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
      const apiReq = https.request(options, (apiRes) => {
        let body = '';
        apiRes.on('data', (chunk) => body += chunk);
        apiRes.on('end', () => {
          // Accept both 200 and 201 as success
          if (apiRes.statusCode === 200 || apiRes.statusCode === 201) {
            resolve(JSON.parse(body));
          } else {
            reject(new Error(`Yoco API error: ${apiRes.statusCode} - ${body}`));
          }
        });
      });

      apiReq.on('error', reject);
      apiReq.write(checkoutData);
      apiReq.end();
    });

    return res.status(200).json(response);

  } catch (error) {
    console.error('Detailed error creating checkout:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    return res.status(500).json({ 
      error: error.message || 'Failed to create checkout session',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}