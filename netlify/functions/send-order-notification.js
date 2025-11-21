// netlify/functions/send-order-notification.js
const https = require('https');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { orderNumber, orderDate, orderTotal, customerName, customerEmail, customerPhone, customerAddress, orderItems, checkoutId } = data;

    // Prepare EmailJS payload
    const emailData = JSON.stringify({
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      template_params: {
        order_number: orderNumber,
        order_date: orderDate,
        order_total: orderTotal,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        customer_address: customerAddress,
        order_items: orderItems,
        checkout_id: checkoutId,
        to_email: 'houseofkyro794@gmail.com' // Your store email
      }
    });

    // EmailJS API options
    const options = {
      hostname: 'api.emailjs.com',
      path: '/api/v1.0/email/send',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(emailData)
      }
    };

    // Send email via EmailJS
    const response = await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
          console.log('EmailJS Response Status:', res.statusCode);
          console.log('EmailJS Response Body:', body);
          
          if (res.statusCode === 200) {
            resolve({ success: true, message: 'Email sent successfully' });
          } else {
            reject(new Error(`EmailJS error: ${res.statusCode} - ${body}`));
          }
        });
      });

      req.on('error', reject);
      req.write(emailData);
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
    console.error('Error sending order notification:', error);
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