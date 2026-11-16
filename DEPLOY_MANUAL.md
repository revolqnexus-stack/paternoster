# Manual Deployment Instructions

Since Shopify CLI requires interactive authentication, follow these manual steps:

## Option 1: Using Terminal (Recommended)

Open your **Terminal** app and run:

```bash
cd /Users/ajmal/johnsir/dawn

# Run the deployment script
./DEPLOY.sh
```

The script will guide you through the deployment process.

## Option 2: Step-by-Step Manual Commands

### Step 1: Open Terminal

Press `Cmd + Space`, type "Terminal", and press Enter.

### Step 2: Navigate to Theme Directory

```bash
cd /Users/ajmal/johnsir/dawn
```

### Step 3: Login to Shopify

```bash
shopify auth login
```

This will open your browser for authentication. Follow the prompts.

### Step 4: Deploy Theme

Choose one of these options:

#### A. Deploy as New Unpublished Theme (First Time)

```bash
shopify theme push --unpublished --name="LRB Store"
```

#### B. Deploy to Development Theme (For Testing)

```bash
shopify theme push --development
```

#### C. Deploy to Existing Theme

```bash
# First, list your themes to get the ID
shopify theme list

# Then push to specific theme
shopify theme push --theme-id=YOUR_THEME_ID
```

### Step 5: Configure in Theme Editor

1. Go to your Shopify admin: `https://YOUR_STORE.myshopify.com/admin`
2. Navigate to: **Online Store > Themes**
3. Find "LRB Store" in the themes list
4. Click **Customize** to open the theme editor

### Step 6: Configure Homepage

In the theme editor:

1. **Hero Featured Product Section**
   - Click on the section
   - Select a featured product from your catalog

2. **Shop by Product Type Section**
   - Add 9 collection blocks
   - Select a collection for each block

3. **Promotional Banner 1**
   - Set heading, text, and link
   - Add fine print if needed

4. **Promotional Banner 2**
   - Set heading, text, and link

5. **About Store Section**
   - Write your store description

### Step 7: Configure Footer

In theme editor, go to **Footer** section:

1. **Store Information**
   - Add your store description
   - Add contact email

2. **Return Addresses**
   - UK & Rest of World address
   - USA & Canada address (if applicable)

3. **Newsletter**
   - Enable newsletter signup
   - Write subscription text

### Step 8: Assign Templates to Collections and Products

For each collection:
1. Go to **Products > Collections > [Collection Name]**
2. Scroll to **Theme templates**
3. Select **collection.lrb**
4. Click **Save**

For each product:
1. Go to **Products > Products > [Product Name]**
2. Scroll to **Theme templates**
3. Select **product.lrb**
4. Click **Save**

### Step 9: Set Up Navigation Menus

1. Go to **Online Store > Navigation**
2. Edit **Main menu** and add your product categories
3. Edit **Footer menu** and add policy links

### Step 10: Publish Theme (When Ready)

When you're happy with the configuration:

1. Go to **Online Store > Themes**
2. Find "LRB Store"
3. Click **Actions > Publish**

## Troubleshooting

### "Command not found: shopify"

Install Shopify CLI:

```bash
brew tap shopify/shopify
brew install shopify-cli
```

### "Not logged in"

Run:

```bash
shopify auth login
```

And follow the browser prompts.

### "Permission denied"

Make the script executable:

```bash
chmod +x /Users/ajmal/johnsir/dawn/DEPLOY.sh
```

## Quick Reference Commands

```bash
# Check CLI version
shopify version

# List themes
shopify theme list

# Deploy new theme
shopify theme push --unpublished --name="LRB Store"

# Deploy to development
shopify theme push --development

# Publish theme
shopify theme publish --theme-id=YOUR_THEME_ID

# Pull theme from Shopify
shopify theme pull --theme-id=YOUR_THEME_ID
```

## Support

For complete deployment instructions, see:
- **LRB_DEPLOYMENT_GUIDE.md** - Full configuration guide
- **README.md** - Theme overview

---

**Need help?** Check the Shopify CLI documentation:
https://shopify.dev/docs/themes/tools/cli
