#!/bin/bash

# LRB Store Deployment Script
# Run this script manually in your terminal to deploy to Shopify

set -e

echo "=========================================="
echo "LRB Store - Shopify Theme Deployment"
echo "=========================================="
echo ""

# Check if we're in the right directory
if [ ! -f "layout/theme.liquid" ]; then
    echo "❌ Error: Please run this script from the theme root directory"
    echo "   cd /Users/ajmal/johnsir/dawn && ./DEPLOY.sh"
    exit 1
fi

echo "✅ Theme directory verified"
echo ""

# Check if Shopify CLI is installed
if ! command -v shopify &> /dev/null; then
    echo "❌ Shopify CLI not found. Installing..."
    echo ""
    brew tap shopify/shopify
    brew install shopify-cli
    echo ""
    echo "✅ Shopify CLI installed"
else
    echo "✅ Shopify CLI found (version: $(shopify version))"
fi

echo ""
echo "=========================================="
echo "DEPLOYMENT OPTIONS:"
echo "=========================================="
echo ""
echo "1. Deploy as NEW unpublished theme (recommended for first deploy)"
echo "2. Deploy to DEVELOPMENT theme (for testing)"
echo "3. Deploy to EXISTING theme (requires theme ID)"
echo "4. PUBLISH as live theme (after testing)"
echo ""

read -p "Choose an option (1-4): " option

case $option in
    1)
        echo ""
        echo "📦 Deploying as new unpublished theme..."
        echo ""
        shopify theme push --unpublished --name="LRB Store"
        echo ""
        echo "✅ Theme deployed!"
        echo ""
        echo "Next steps:"
        echo "1. Go to your Shopify admin > Online Store > Themes"
        echo "2. Find 'LRB Store' in unpublished themes"
        echo "3. Click 'Customize' to configure with theme editor"
        echo "4. When ready, click 'Publish' to make it live"
        ;;
    
    2)
        echo ""
        echo "🔧 Deploying to development theme..."
        echo ""
        shopify theme push --development
        echo ""
        echo "✅ Development theme updated!"
        echo ""
        echo "Preview URL will be shown above"
        ;;
    
    3)
        echo ""
        read -p "Enter theme ID: " theme_id
        echo ""
        echo "📤 Deploying to theme $theme_id..."
        echo ""
        shopify theme push --theme-id="$theme_id"
        echo ""
        echo "✅ Theme updated!"
        ;;
    
    4)
        echo ""
        read -p "Enter theme ID to publish: " theme_id
        echo ""
        echo "🚀 Publishing theme $theme_id..."
        echo ""
        shopify theme publish --theme-id="$theme_id"
        echo ""
        echo "✅ Theme is now LIVE!"
        echo ""
        echo "🌐 Visit your store to see the changes"
        ;;
    
    *)
        echo ""
        echo "❌ Invalid option"
        exit 1
        ;;
esac

echo ""
echo "=========================================="
echo "DEPLOYMENT COMPLETE"
echo "=========================================="
echo ""
echo "📚 For more information, see:"
echo "   - LRB_DEPLOYMENT_GUIDE.md (complete configuration guide)"
echo "   - README.md (theme overview)"
echo ""
