// netlify/functions/send-order-notification.js
const https = require('https');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Check if SendGrid API key is set
  if (!process.env.SENDGRID_API_KEY) {
    console.error('SENDGRID_API_KEY environment variable is not set');
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: 'Server configuration error: SendGrid API key not set' 
      })
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { orderNumber, orderDate, orderTotal, customerName, customerEmail, customerPhone, customerAddress, orderItems, checkoutId } = data;

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
      const req = https.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
          console.log('SendGrid Response Status:', res.statusCode);
          console.log('SendGrid Response Body:', body);
          
          if (res.statusCode === 202 || res.statusCode === 200) {
            resolve({ success: true, message: 'Email sent successfully' });
          } else {
            reject(new Error(`SendGrid error: ${res.statusCode} - ${body}`));
          }
        });
      });

      req.on('error', (error) => {
        console.error('Request error:', error);
        reject(error);
      });
      
      req.write(emailPayload);
      req.end();
    });

    console.log('Order notification sent successfully!');

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(response)
    };

  } catch (error) {
    console.error('Error sending order notification:', error);
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: error.message || 'Failed to send notification'
      })
    };
  }
};