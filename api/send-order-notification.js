// api/send-order-notification.js
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

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check if SendGrid API key is set
  if (!process.env.SENDGRID_API_KEY) {
    console.error('SENDGRID_API_KEY environment variable is not set');
    return res.status(500).json({ 
      error: 'Server configuration error: SendGrid API key not set' 
    });
  }

  try {
    const { orderNumber, orderDate, orderTotal, customerName, customerEmail, customerPhone, customerAddress, orderItems, checkoutId } = req.body;

    console.log('Sending order notification for order:', orderNumber);

    // Prepare SendGrid email payload
    const emailPayload = JSON.stringify({
      personalizations: [
        {
          to: [
            {
              email: 'houseofkyro794@gmail.com',
              name: 'House of Kryo'
            }
          ],
          subject: `New Order #${orderNumber} - R${orderTotal}`
        }
      ],
      from: {
        email: 'houseofkyro794@gmail.com',
        name: 'House of Kryo Orders'
      },
      content: [
        {
          type: 'text/html',
          value: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1a1a1a; border-bottom: 3px solid #1a1a1a; padding-bottom: 10px;">
                🎉 New Order Received!
              </h2>
              
              <div style="background: #f5f5f5; padding: 20px; margin: 20px 0; border-left: 4px solid #1a1a1a;">
                <h3 style="margin-top: 0; color: #1a1a1a;">Order Details</h3>
                <p><strong>Order Number:</strong> ${orderNumber}</p>
                <p><strong>Order Date:</strong> ${orderDate}</p>
                <p><strong>Total Amount:</strong> <span style="font-size: 1.2em; color: #1a1a1a;">R${orderTotal}</span></p>
              </div>

              <div style="background: #ffffff; padding: 20px; margin: 20px 0; border: 1px solid #e0e0e0;">
                <h3 style="color: #1a1a1a; margin-top: 0;">👤 Customer Information</h3>
                <p><strong>Name:</strong> ${customerName}</p>
                <p><strong>Email:</strong> <a href="mailto:${customerEmail}">${customerEmail}</a></p>
                <p><strong>Phone:</strong> <a href="tel:${customerPhone}">${customerPhone}</a></p>
                <p><strong>Shipping Address:</strong><br>${customerAddress}</p>
              </div>

              <div style="background: #ffffff; padding: 20px; margin: 20px 0; border: 1px solid #e0e0e0;">
                <h3 style="color: #1a1a1a; margin-top: 0;">🛍️ Order Items</h3>
                <div style="white-space: pre-line; font-family: monospace; background: #f9f9f9; padding: 15px; border-radius: 4px;">
${orderItems}
                </div>
              </div>

              <div style="background: #1a1a1a; color: white; padding: 15px; margin-top: 30px; text-align: center;">
                <p style="margin: 0; font-size: 0.9em;">Order ID: ${checkoutId}</p>
                <p style="margin: 5px 0 0 0; font-size: 0.8em; opacity: 0.8;">House of Kryo - Premium Sneakers</p>
              </div>
            </div>
          `
        }
      ]
    });

    // SendGrid API options
    const options = {
      hostname: 'api.sendgrid.com',
      path: '/v3/mail/send',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(emailPayload)
      }
    };

    // Send email via SendGrid
    const response = await new Promise((resolve, reject) => {
      const apiReq = https.request(options, (apiRes) => {
        let body = '';
        apiRes.on('data', (chunk) => body += chunk);
        apiRes.on('end', () => {
          console.log('SendGrid Response Status:', apiRes.statusCode);
          console.log('SendGrid Response Body:', body);
          
          if (apiRes.statusCode === 202 || apiRes.statusCode === 200) {
            resolve({ success: true, message: 'Email sent successfully' });
          } else {
            reject(new Error(`SendGrid error: ${apiRes.statusCode} - ${body}`));
          }
        });
      });

      apiReq.on('error', (error) => {
        console.error('Request error:', error);
        reject(error);
      });
      
      apiReq.write(emailPayload);
      apiReq.end();
    });

    console.log('Order notification sent successfully!');

    return res.status(200).json(response);

  } catch (error) {
    console.error('Error sending order notification:', error);
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);
    
    return res.status(500).json({ 
      error: error.message || 'Failed to send notification'
    });
  }
}