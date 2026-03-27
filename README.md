# House of Kryo - Fixed Yoco Payment Integration

This package contains the fixed Yoco payment integration for your House of Kryo sneaker store.

## What Was Fixed

### Main Issues Resolved:
1. **API Key Configuration** - Centralized in `config.php` for easier management
2. **URL Path Handling** - Fixed PHP endpoint URL construction to work on all hosting setups
3. **Line Items Support** - Added proper line items to Yoco checkout (required by Yoco)
4. **Error Handling** - Better error messages to help debug issues
5. **Payment Verification** - Fixed success page to properly verify payments
6. **Order Notifications** - Added automatic email notifications after successful payment
7. **Security** - Added `.htaccess` with security rules and CORS headers

## Quick Start

### 1. Configure Your API Keys

Edit `config.php` and add your Yoco secret key:

```php
define('YOCO_SECRET_KEY', 'sk_test_xxxxxxxxxxxxxxxxxxxx'); // Test mode
// OR
define('YOCO_SECRET_KEY', 'sk_live_xxxxxxxxxxxxxxxxxxxx'); // Live mode
```

Get your key from: https://developer.yoco.com/

### 2. Upload Files

Upload ALL files to your web server root directory (usually `public_html/`):

```
public_html/
├── index.html
├── products.html
├── cart.html
├── checkout.html
├── success.html
├── cancel.html
├── styles-enhanced.css
├── script-enhanced.js (FIXED)
├── config.php (NEW)
├── create-checkout.php (FIXED)
├── verify-payment.php (FIXED)
├── send-order-notification.php (FIXED)
├── .htaccess (NEW)
└── images/ (your product images)
```

### 3. Test the Payment

1. Visit your website
2. Add a product to cart
3. Complete checkout
4. Use test card: `4242 4242 4242 4242`
5. Any future expiry date, any CVC

## Documentation

- **SETUP_GUIDE.md** - Detailed setup instructions and troubleshooting
- **FOLDER_STRUCTURE.md** - Recommended folder structure and hosting info

## File Changes Summary

### New Files:
- `config.php` - Centralized API configuration
- `.htaccess` - Server security and configuration
- `README.md` - This file
- `SETUP_GUIDE.md` - Setup instructions
- `FOLDER_STRUCTURE.md` - Folder structure guide

### Fixed Files:
- `create-checkout.php` - Fixed Yoco API integration with line items
- `verify-payment.php` - Improved payment verification
- `send-order-notification.php` - Better email formatting
- `script-enhanced.js` - Fixed checkout flow, URL handling, added line items

### Unchanged Files:
- `index.html` - Homepage
- `products.html` - Products page
- `cart.html` - Shopping cart
- `checkout.html` - Checkout form
- `success.html` - Payment success
- `cancel.html` - Payment cancelled
- `styles-enhanced.css` - Stylesheet

## Test Cards

Use these for testing (test mode only):

| Card Number | Result |
|-------------|--------|
| 4242 4242 4242 4242 | Payment succeeds |
| 4000 0000 0000 0002 | Card declined |

## Support

### Yoco Support
- Documentation: https://developer.yoco.com/
- Email: support@yoco.com

### Common Issues
See **SETUP_GUIDE.md** for detailed troubleshooting.

## Security Notes

1. **Never share your API keys** - Keep them secret
2. **Use HTTPS in production** - Required for secure payments
3. **Set environment variables** - More secure than editing config.php
4. **Regular backups** - Keep backups of your files

---

**Last Updated**: March 2025
