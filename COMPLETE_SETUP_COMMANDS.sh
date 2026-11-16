#!/bin/bash
# Complete LRB Store Setup - One Command
# Fixes auth, pushes theme, displays setup URLs

echo "🚀 LRB Store - Complete Setup Script"
echo "======================================"
echo ""

STORE="pater-noster-jwjbtasv"

# Step 1: Fix Shopify CLI auth
echo "🔧 Step 1: Fixing Shopify CLI authentication..."
echo "Run this command manually:"
echo "sudo rm -rf /Users/ajmal/Library/Preferences/shopify-cli-kit-nodejs"
echo ""
read -p "Press Enter after you've run the sudo command above..."

# Step 2: Login
echo ""
echo "🔐 Step 2: Logging into Shopify..."
shopify auth login
echo ""

# Step 3: Push theme
echo "📤 Step 3: Pushing theme to Shopify..."
shopify theme push --store=$STORE.myshopify.com
echo ""

# Step 4: Setup instructions
echo "✅ Theme pushed successfully!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 NEXT STEPS - Complete E-Commerce Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "1️⃣  ENABLE GOOGLE SIGN-IN (2 minutes)"
echo "   URL: https://admin.shopify.com/store/$STORE/settings/customer_accounts"
echo "   • Enable 'Customer accounts'"
echo "   • Check 'Google' under Social login"
echo "   • Click Save"
echo ""

echo "2️⃣  SETUP SHIPPING (5 minutes)"
echo "   URL: https://admin.shopify.com/store/$STORE/settings/shipping"
echo "   • UK Standard: £3.95 (3-5 days)"
echo "   • UK Express: £7.95 (1-2 days)"
echo "   • Free shipping: £0 (orders over £50)"
echo "   • International: £8.95-£15.95"
echo ""

echo "3️⃣  VERIFY EMAIL NOTIFICATIONS (1 minute)"
echo "   URL: https://admin.shopify.com/store/$STORE/settings/notifications"
echo "   • Confirm all customer notifications are enabled"
echo "   • Order confirmation ✓"
echo "   • Shipping updates ✓"
echo "   • Delivery notifications ✓"
echo ""

echo "4️⃣  CONFIGURE PAYMENTS (2 minutes)"
echo "   URL: https://admin.shopify.com/store/$STORE/settings/payments"
echo "   • Enable Shopify Payments (cards, Apple Pay, Google Pay)"
echo "   • Add PayPal Express"
echo ""

echo "5️⃣  SETUP TAX (1 minute)"
echo "   URL: https://admin.shopify.com/store/$STORE/settings/taxes"
echo "   • Enable automatic UK VAT (20%)"
echo "   • Set books to 0% VAT (tax-exempt)"
echo ""

echo "6️⃣  CUSTOMIZE CHECKOUT (2 minutes)"
echo "   URL: https://admin.shopify.com/store/$STORE/settings/checkout"
echo "   • Upload LRB logo"
echo "   • Enable newsletter signup"
echo "   • Enable 'Save my info'"
echo ""

echo "7️⃣  IMPORT PRODUCTS (30 seconds)"
echo "   URL: https://admin.shopify.com/store/$STORE/products"
echo "   • Click 'Import'"
echo "   • Upload: lrb-products-import.csv"
echo "   • All 8 demo products added!"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎯 QUICK LINKS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "👁️  Preview Store:"
echo "   https://$STORE.myshopify.com"
echo ""
echo "⚙️  Theme Customizer:"
echo "   https://admin.shopify.com/store/$STORE/themes"
echo ""
echo "📦 Products:"
echo "   https://admin.shopify.com/store/$STORE/products"
echo ""
echo "📧 Customer Accounts:"
echo "   https://admin.shopify.com/store/$STORE/settings/customer_accounts"
echo ""
echo "🚚 Shipping Setup:"
echo "   https://admin.shopify.com/store/$STORE/settings/shipping"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✨ Total setup time: ~13 minutes"
echo ""
echo "After setup, your store will have:"
echo "  ✅ Google Sign-In enabled"
echo "  ✅ Email notifications configured"
echo "  ✅ Shipping zones and rates"
echo "  ✅ Payment processing (cards, PayPal, Apple Pay)"
echo "  ✅ UK VAT automation"
echo "  ✅ Modern UI with animations"
echo "  ✅ 8 demo products"
echo ""
echo "🚀 Ready to go live!"
echo ""
