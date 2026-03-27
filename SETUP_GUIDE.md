# House of Kryo - Yoco Payment Setup Guide

This guide will help you fix your Yoco payment integration and get your online store working properly.

## Quick Fix Checklist

- [ ] Step 1: Get your Yoco Secret Key
- [ ] Step 2: Configure API keys in `config.php`
- [ ] Step 3: Upload all files to your web server
- [ ] Step 4: Test the payment flow

---

## Step 1: Get Your Yoco Secret Key

### 1.1 Create/Login to Yoco Account
1. Go to [https://www.yoco.com/](https://www.yoco.com/)
2. Sign up or log in to your account
3. Complete the business verification process

### 1.2 Get Your API Keys
1. Go to [https://developer.yoco.com/](https://developer.yoco.com/)
2. Navigate to **API Keys** section
3. Copy your **Secret Key** (starts with `sk_test_` for testing or `sk_live_` for production)

### 1.3 Test vs Live Mode
- **Test Mode**: Use keys starting with `sk_test_` - no real money is charged
- **Live Mode**: Use keys starting with `sk_live_` - real transactions

**Important**: Always test with test keys first!

---

## Step 2: Configure API Keys

### Option A: Edit config.php (Recommended for beginners)

1. Open `config.php` in a text editor
2. Find this line:
```php
define('YOCO_SECRET_KEY', getenv('YOCO_SECRET_KEY') ?: 'YOUR_YOCO_SECRET_KEY_HERE');
```

3. Replace with your actual key:
```php
define('YOCO_SECRET_KEY', 'sk_test_xxxxxxxxxxxxxxxxxxxx'); // Test mode
// OR
define('YOCO_SECRET_KEY', 'sk_live_xxxxxxxxxxxxxxxxxxxx'); // Live mode
```

### Option B: Use Environment Variables (More Secure)

If your hosting supports it, set environment variables instead:

**cPanel Method:**
1. Log in to cPanel
2. Go to **Software** → **Select PHP Version**
3. Click **Options** or **Switch to PHP Options**
4. Add environment variables:
   - `YOCO_SECRET_KEY` = `sk_test_xxxxxxxx`
   - `SENDGRID_API_KEY` = `SG.xxxxxxxx` (optional)

**Alternative - .htaccess method:**
Add to your `.htaccess` file:
```apache
SetEnv YOCO_SECRET_KEY sk_test_xxxxxxxxxxxxxxxxxxxx
SetEnv SENDGRID_API_KEY SG.xxxxxxxxxxxxxxxxxxxx
```

---

## Step 3: Upload Files

### 3.1 File Structure
Upload all files to your web server root directory (usually `public_html/`):

```
public_html/
├── index.html
├── products.html
├── cart.html
├── checkout.html
├── success.html
├── cancel.html
├── styles-enhanced.css
├── script-enhanced.js (FIXED VERSION)
├── config.php (NEW)
├── create-checkout.php (FIXED)
├── verify-payment.php (FIXED)
├── send-order-notification.php (FIXED)
├── .htaccess (NEW)
└── images/
    └── ... (your product images)
```

### 3.2 Upload Methods

**Using FTP (FileZilla):**
1. Connect to your server with FTP credentials
2. Navigate to `public_html/` folder
3. Upload all files

**Using cPanel File Manager:**
1. Log in to cPanel
2. Go to **Files** → **File Manager**
3. Navigate to `public_html/`
4. Click **Upload** and select files

### 3.3 Set File Permissions
After uploading, set permissions:
- PHP files: `644`
- HTML/CSS/JS files: `644`
- Images folder: `755`
- `.htaccess`: `644`

---

## Step 4: Test the Payment Flow

### 4.1 Test Payment Cards
Use these test card numbers when in test mode:

| Card Number | Result |
|-------------|--------|
| `4242 4242 4242 4242` | Payment succeeds |
| `4000 0000 0000 0002` | Card declined |
| `4000 0000 0000 9995` | Insufficient funds |

Use any future expiry date and any 3-digit CVC.

### 4.2 Test the Full Flow
1. Visit your website
2. Add a product to cart
3. Go to checkout
4. Fill in customer details
5. Click "Complete Order"
6. You should be redirected to Yoco payment page
7. Enter test card details
8. Complete payment
9. You should see the success page

### 4.3 Check Yoco Dashboard
1. Log in to [Yoco Dashboard](https://login.yoco.com/)
2. Go to **Transactions**
3. Verify your test payment appears

---

## Common Errors & Solutions

### Error: "Payment gateway not configured"
**Cause**: YOCO_SECRET_KEY is not set

**Solution**:
```php
// In config.php, replace:
define('YOCO_SECRET_KEY', 'YOUR_YOCO_SECRET_KEY_HERE');

// With your actual key:
define('YOCO_SECRET_KEY', 'sk_test_xxxxxxxxxxxxxxxxxxxx');
```

### Error: "Cannot reach server" or "Failed to fetch"
**Causes**:
- PHP is not enabled on your hosting
- PHP files are in the wrong location
- File permissions are incorrect

**Solutions**:
1. Contact your hosting provider to enable PHP
2. Verify all PHP files are in the same folder as HTML files
3. Check file permissions (should be 644)

### Error: "No payment URL received"
**Cause**: Invalid Yoco API key or API error

**Solutions**:
1. Verify your API key is correct
2. Check Yoco dashboard for any account issues
3. Review server error logs

### Error: 500 Internal Server Error
**Causes**:
- PHP version too old
- Syntax error in PHP files
- Missing PHP extensions

**Solutions**:
1. Update PHP to 7.4 or higher
2. Check error logs for specific errors
3. Ensure cURL extension is enabled

### Error: CORS policy blocked request
**Cause**: Missing CORS headers

**Solution**: Ensure `.htaccess` file is uploaded with CORS configuration

---

## Optional: Email Notifications

To receive order notifications via email:

### 1. Create SendGrid Account
1. Go to [https://sendgrid.com/](https://sendgrid.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Get API Key
1. Go to **Settings** → **API Keys**
2. Click **Create API Key**
3. Choose **Full Access** or **Restricted Access** (Mail Send)
4. Copy the API key

### 3. Configure in config.php
```php
define('SENDGRID_API_KEY', 'SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
```

### 4. Update Store Email
```php
define('STORE_EMAIL', 'your-email@example.com');
```

---

## Going Live

### Pre-Launch Checklist
- [ ] Switch to Yoco Live mode (use `sk_live_` key)
- [ ] Enable SSL/HTTPS on your website
- [ ] Test a real payment with a small amount
- [ ] Verify order emails are working
- [ ] Check that success/cancel pages work correctly

### Switch to Live Mode
1. Get your live secret key from Yoco dashboard
2. Update `config.php`:
```php
define('YOCO_SECRET_KEY', 'sk_live_xxxxxxxxxxxxxxxxxxxx');
```
3. Test with a real card (small amount like R1)
4. Refund the test transaction

---

## Need More Help?

### Yoco Support
- Documentation: [https://developer.yoco.com/](https://developer.yoco.com/)
- Support Email: support@yoco.com

### Hosting Support
Contact your hosting provider for:
- PHP configuration issues
- File permission problems
- Server error logs

---

## Summary of Changes Made

### Fixed Issues:
1. **API URL construction** - Now works reliably across different hosting setups
2. **Line items support** - Added proper line items to Yoco checkout
3. **Error handling** - Better error messages for debugging
4. **Session storage** - Stores customer info for order notifications
5. **Email notifications** - Automatic order emails after successful payment
6. **Security** - Added .htaccess with security rules

### New Files:
- `config.php` - Centralized configuration
- `.htaccess` - Server configuration and security

### Updated Files:
- `create-checkout.php` - Fixed API integration
- `verify-payment.php` - Improved verification
- `send-order-notification.php` - Better email formatting
- `script-enhanced.js` - Fixed checkout flow and added line items
