// netlify/functions/verify-payment.js
const https = require('https');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const checkoutId = event.queryStringParameters.checkoutId;

    if (!checkoutId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing checkoutId parameter' })
      };
    }

    // Yoco API options
    const options = {
      hostname: 'payments.yoco.com',
      path: `/api/checkouts/${checkoutId}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.YOCO_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    };

    // Make request to Yoco API
    const response = await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
          if (res.statusCode === 200) {
            resolve(JSON.parse(body));
          } else {
            reject(new Error(`Yoco API error: ${res.statusCode} - ${body}`));
          }
        });
      });

      req.on('error', reject);
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
    console.error('Error verifying payment:', error);
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
