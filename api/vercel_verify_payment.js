// api/verify-payment.js
import https from 'https';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { checkoutId } = req.query;

    if (!checkoutId) {
      return res.status(400).json({ error: 'Missing checkoutId parameter' });
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
      const apiReq = https.request(options, (apiRes) => {
        let body = '';
        apiRes.on('data', (chunk) => body += chunk);
        apiRes.on('end', () => {
          console.log('Yoco API Status Code:', apiRes.statusCode);
          console.log('Yoco API Response:', body);
          
          if (apiRes.statusCode === 200) {
            resolve(JSON.parse(body));
          } else {
            reject(new Error(`Yoco API error: ${apiRes.statusCode} - ${body}`));
          }
        });
      });

      apiReq.on('error', reject);
      apiReq.end();
    });

    return res.status(200).json(response);

  } catch (error) {
    console.error('Error verifying payment:', error);
    return res.status(500).json({ error: error.message });
  }
}