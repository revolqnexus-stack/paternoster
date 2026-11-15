# Complete E-Commerce Setup Guide

## 1. Google Sign-In (Customer Accounts)

### Enable Customer Accounts
1. Go to: https://admin.shopify.com/store/pater-noster-jwjbtasv/settings/customer_accounts
2. Under **Customer accounts**, select: **Accounts are required** (or **Optional**)
3. Enable **Social login**
4. Check **Google**
5. Click **Save**

### Configure Google OAuth (if needed)
- Shopify handles Google OAuth automatically
- No additional API keys required
- Customers can click "Sign in with Google" at checkout

**Customer Account Features:**
- ✅ Order history
- ✅ Saved addresses
- ✅ Wishlist (requires app)
- ✅ Email preferences
- ✅ Google one-click login

---

## 2. Email Notifications Setup

### A. Enable Email Notifications
Go to: https://admin.shopify.com/store/pater-noster-jwjbtasv/settings/notifications

#### Customer Notifications (Auto-enabled):
- ✅ **Order confirmation** - Sent immediately after purchase
- ✅ **Order cancelled** - When you cancel an order
- ✅ **Order refund** - When you issue a refund
- ✅ **Shipping confirmation** - When you fulfill an order
- ✅ **Shipping update** - When tracking updates
- ✅ **Out for delivery** - Final delivery notification
- ✅ **Delivered** - Confirmation of delivery
- ✅ **Customer account invite** - Welcome email
- ✅ **Customer account password reset**

#### Marketing Emails:
- Abandoned checkout emails (enable in settings)
- Back-in-stock notifications
- Price drop alerts

### B. Customize Email Templates
1. Go to: https://admin.shopify.com/store/pater-noster-jwjbtasv/settings/notifications
2. Click on any notification (e.g., "Order confirmation")
3. Click **Edit code** to customize HTML
4. Add LRB branding:
   - LRB logo
   - Brand colors (#667eea, #f093fb)
   - Crimson Text font

### C. Email Marketing Apps (Optional)
**Install Klaviyo or Omnisend:**
- Abandoned cart recovery
- Product recommendation emails
- Customer segmentation
- Newsletter campaigns

Install: https://apps.shopify.com/klaviyo-email-marketing

---

## 3. Shipping Setup

### A. Set Shipping Zones
Go to: https://admin.shopify.com/store/pater-noster-jwjbtasv/settings/shipping

#### UK Shipping (Domestic)
1. Click **Manage** next to "United Kingdom"
2. Add shipping rates:
   - **Standard UK Shipping**: £3.95 (3-5 business days)
   - **Express UK Shipping**: £7.95 (1-2 business days)
   - **Free UK Shipping**: £0.00 (orders over £50)

#### International Shipping
1. Click **Create shipping zone**
2. Add regions:
   - **Europe**: £8.95 (5-7 business days)
   - **United States**: £12.95 (7-14 business days)
   - **Rest of World**: £15.95 (10-20 business days)

### B. Enable Calculated Shipping (Advanced)
If you want real-time carrier rates:
1. Connect Royal Mail, DHL, or FedEx
2. Shopify calculates exact shipping costs at checkout

### C. Local Pickup (Optional)
If you have a physical store:
1. Enable **Local pickup**
2. Add pickup location address
3. Set pickup hours

### D. Shipping Labels
Go to: https://admin.shopify.com/store/pater-noster-jwjbtasv/settings/shipping/label_purchases

Enable Shopify Shipping:
- Buy and print shipping labels
- Discounted carrier rates
- Auto-tracking updates

---

## 4. Payment Setup

### Enable Payment Methods
Go to: https://admin.shopify.com/store/pater-noster-jwjbtasv/settings/payments

**Shopify Payments** (Recommended):
- Credit/Debit cards (Visa, Mastercard, Amex)
- Apple Pay
- Google Pay
- Shop Pay (1-click checkout)

**Alternative Payment Methods:**
- PayPal Express
- Stripe
- Amazon Pay

### Tax Setup
Go to: https://admin.shopify.com/store/pater-noster-jwjbtasv/settings/taxes_and_duties

- Enable **Automatic tax** for UK VAT (20%)
- Set tax-exempt products (books in UK are 0% VAT)

---

## 5. Checkout Customization

### Enable Features
Go to: https://admin.shopify.com/store/pater-noster-jwjbtasv/settings/checkout

**Customer accounts:**
- ✅ Require accounts OR optional accounts
- ✅ Enable Google Sign-In

**Checkout options:**
- ✅ Show "Subscribe to newsletter" checkbox
- ✅ Show "Save my info for next time"
- ✅ Enable gift messages
- ✅ Show estimated delivery dates

**Branding:**
- Upload LRB logo
- Set brand colors
- Customize checkout page

---

## 6. Essential Shopify Apps

### A. Email Marketing
**Klaviyo** - https://apps.shopify.com/klaviyo-email-marketing
- Automated flows (welcome, abandoned cart, post-purchase)
- Segmented campaigns
- Product recommendations

### B. Reviews & Social Proof
**Judge.me** - https://apps.shopify.com/judgeme
- Product reviews
- Photo reviews
- Star ratings

### C. Abandoned Cart Recovery
**Shopify Email** (Free, built-in)
- Go to: https://admin.shopify.com/store/pater-noster-jwjbtasv/marketing/automations
- Enable abandoned checkout emails

### D. Live Chat
**Tidio** or **Gorgias**
- Real-time customer support
- AI chatbot

---

## 7. Quick Setup Checklist

Run these in Shopify Admin:

### ✅ Customer Accounts
```
Settings → Customer accounts → Enable Google Sign-In
```

### ✅ Email Notifications
```
Settings → Notifications → Verify all enabled
```

### ✅ Shipping
```
Settings → Shipping → Add UK (£3.95 standard, £7.95 express)
Settings → Shipping → Add International zones
```

### ✅ Payments
```
Settings → Payments → Enable Shopify Payments + PayPal
```

### ✅ Checkout
```
Settings → Checkout → Enable newsletter signup
Settings → Checkout → Upload LRB logo
```

### ✅ Tax
```
Settings → Taxes → Enable automatic UK VAT
```

---

## 8. Test the Full Flow

1. **Place a test order:**
   - https://pater-noster-jwjbtasv.myshopify.com
   - Use Shopify's test card: `1` (Bogus Gateway)

2. **Check emails:**
   - Order confirmation email sent?
   - Customize template if needed

3. **Fulfill the order:**
   - Go to Orders → Mark as fulfilled
   - Add tracking number
   - Customer receives shipping email

4. **Test Google Sign-In:**
   - Go to: https://pater-noster-jwjbtasv.myshopify.com/account/login
   - Click "Sign in with Google"

---

## Quick Links

- **Customer Accounts**: https://admin.shopify.com/store/pater-noster-jwjbtasv/settings/customer_accounts
- **Notifications**: https://admin.shopify.com/store/pater-noster-jwjbtasv/settings/notifications
- **Shipping**: https://admin.shopify.com/store/pater-noster-jwjbtasv/settings/shipping
- **Payments**: https://admin.shopify.com/store/pater-noster-jwjbtasv/settings/payments
- **Checkout**: https://admin.shopify.com/store/pater-noster-jwjbtasv/settings/checkout
- **Apps**: https://apps.shopify.com/

---

## What's Already Configured

✅ Theme with modern animations and gradients  
✅ Product catalog structure  
✅ Custom LRB sections  
✅ Responsive design  

## What You Need To Do NOW

1. **Enable Customer Accounts + Google Sign-In** (2 minutes)
2. **Set up shipping zones and rates** (5 minutes)
3. **Verify email notifications are active** (1 minute)
4. **Test checkout flow** (3 minutes)

**Total setup time: ~11 minutes**

Then your store is FULLY OPERATIONAL with:
- ✅ Google Sign-In
- ✅ Automated emails
- ✅ Shipping configured
- ✅ Payment processing
- ✅ Customer accounts
- ✅ Order management

Ready to go live! 🚀
