# House of Kryo - Folder Structure Guide

This document explains the recommended folder structure for the House of Kryo e-commerce website with Yoco payment integration.

## Recommended Folder Structure

```
house-of-kyro/
│
├── 📁 Root Directory (public_html/ or www/)
│   │
│   ├── 📄 index.html              # Homepage
│   ├── 📄 products.html           # Products listing page
│   ├── 📄 cart.html               # Shopping cart page
│   ├── 📄 checkout.html           # Checkout page
│   ├── 📄 success.html            # Payment success page
│   ├── 📄 cancel.html             # Payment cancelled page
│   ├── 📄 404.html                # 404 error page (optional)
│   ├── 📄 500.html                # 500 error page (optional)
│   │
│   ├── 📄 styles-enhanced.css     # Main stylesheet
│   ├── 📄 script-enhanced.js      # Main JavaScript file (FIXED)
│   │
│   ├── 📄 config.php              # Configuration file (NEW)
│   ├── 📄 create-checkout.php     # Yoco checkout creation (FIXED)
│   ├── 📄 verify-payment.php      # Payment verification (FIXED)
│   ├── 📄 send-order-notification.php  # Order email (FIXED)
│   │
│   ├── 📄 .htaccess               # Apache configuration (NEW)
│   │
│   ├── 📁 images/                 # Product images folder
│   │   ├── 📄 logo.jpg
│   │   ├── 📄 nike air force.jpg
│   │   ├── 📄 nb 530.jpg
│   │   └── ... (all product images)
│   │
│   └── 📁 assets/                 # Additional assets (optional)
│       ├── 📁 fonts/
│       ├── 📁 icons/
│       └── 📁 documents/
│
└── 📁 backups/                    # Backup folder (outside web root)
    └── ... (backup files)
```

## File Descriptions

### HTML Files (Frontend)
| File | Purpose |
|------|---------|
| `index.html` | Homepage with featured products and sales |
| `products.html` | Full product catalog with filters |
| `cart.html` | Shopping cart review page |
| `checkout.html` | Customer information and payment initiation |
| `success.html` | Payment success confirmation page |
| `cancel.html` | Payment cancellation page |

### PHP Files (Backend API)
| File | Purpose | Security Level |
|------|---------|----------------|
| `config.php` | Centralized configuration and API keys | **CRITICAL** |
| `create-checkout.php` | Creates Yoco checkout session | Protected |
| `verify-payment.php` | Verifies payment status | Protected |
| `send-order-notification.php` | Sends order emails via SendGrid | Protected |

### Configuration Files
| File | Purpose |
|------|---------|
| `.htaccess` | Apache server configuration, security rules, caching |

### Static Assets
| File/Folder | Purpose |
|-------------|---------|
| `styles-enhanced.css` | All CSS styles for the website |
| `script-enhanced.js` | All JavaScript functionality (cart, checkout, etc.) |
| `images/` | Product photos, logos, banners |

## Hosting Requirements

### Minimum Requirements
- **PHP Version**: 7.4 or higher (8.0+ recommended)
- **Web Server**: Apache with mod_rewrite enabled
- **SSL Certificate**: Required for production (HTTPS)
- **cURL Extension**: Required for API calls

### Recommended Hosting Providers (South Africa)
1. **Afrihost** - Reliable local hosting with PHP support
2. **Axxess** - Good performance and support
3. **HostAfrica** - Affordable with cPanel
4. **Xneelo (Hetzner)** - Enterprise-grade hosting

### International Options
1. **SiteGround** - Excellent performance and support
2. **Bluehost** - Affordable with good features
3. **HostGator** - Reliable with cPanel

## Setup Instructions

### Step 1: Upload Files
1. Extract all files to your local computer
2. Upload ALL files to your web hosting root directory (usually `public_html/` or `www/`)
3. Ensure the folder structure matches the diagram above

### Step 2: Configure API Keys
Edit `config.php` and add your API keys:

```php
// Yoco API Key (Required)
// Get from: https://developer.yoco.com/
define('YOCO_SECRET_KEY', 'sk_live_xxxxxxxxxxxxxxxxxxxx');

// SendGrid API Key (Optional - for email notifications)
// Get from: https://app.sendgrid.com/
define('SENDGRID_API_KEY', 'SG.xxxxxxxxxxxxxxxxxxxx');
```

**Alternative**: Set API keys as environment variables in your hosting control panel:
- `YOCO_SECRET_KEY`
- `SENDGRID_API_KEY`

### Step 3: Set Permissions
Set the following file permissions (usually via FTP or cPanel File Manager):

```
Files: 644 (rw-r--r--)
Directories: 755 (rwxr-xr-x)
.htaccess: 644
```

### Step 4: Test the Integration
1. Visit your website homepage
2. Add a product to cart
3. Go to checkout
4. Complete a test payment (use Yoco test mode)

## Troubleshooting Common Issues

### Issue: "Payment gateway not configured" error
**Solution**: Add your Yoco secret key to `config.php`

### Issue: "Cannot connect to payment server" error
**Solutions**:
- Ensure PHP is enabled on your hosting
- Check that all PHP files are uploaded
- Verify file permissions are correct
- Check `.htaccess` is properly configured

### Issue: 500 Internal Server Error
**Solutions**:
- Check PHP version (must be 7.4+)
- Review error logs in cPanel
- Temporarily rename `.htaccess` to test

### Issue: CORS errors in browser console
**Solution**: Ensure `.htaccess` has the CORS headers section

## Security Best Practices

1. **Never commit API keys to version control**
   - Use environment variables instead
   - Add `config.php` to `.gitignore`

2. **Use HTTPS in production**
   - Install SSL certificate
   - Force HTTPS in `.htaccess`

3. **Regular backups**
   - Backup files weekly
   - Keep backups outside web root

4. **Keep software updated**
   - Update PHP to latest stable version
   - Monitor for security patches

## Support

If you continue to experience issues:

1. Check browser console for JavaScript errors
2. Check server error logs
3. Verify Yoco dashboard for payment attempts
4. Contact your hosting provider for PHP-related issues
