# PUSH THE THEME TO SHOPIFY - DO THIS NOW

## Issue: Theme hasn't been pushed yet

The theme ID 185920684319 is probably Dawn's default theme, not our custom LRB theme.

---

## STEP 1: Fix Shopify CLI Permissions

Run this in Terminal:

```bash
rm -rf /Users/ajmal/Library/Preferences/shopify-cli-theme-conf-nodejs
```

---

## STEP 2: Navigate to Theme Directory

```bash
cd /Users/ajmal/johnsir/dawn
```

---

## STEP 3: Login to Shopify

```bash
shopify auth login
```

Browser will open - login to your store.

---

## STEP 4: Push Theme to Shopify

```bash
shopify theme push --unpublished --theme="LRB Store"
```

This will:
- Upload all our custom files
- Create a new theme called "LRB Store"
- Give you a preview URL

---

## STEP 5: Get the Preview URL

After successful push, you'll see:

```
✓ Theme pushed successfully
Preview your theme:
https://8mg1sv-ei.myshopify.com/?preview_theme_id=XXXXX
```

**Copy that URL and send it to me.**

---

## ALTERNATIVE: Push to Existing Theme

If you want to replace the current theme (ID: 185920684319):

```bash
shopify theme push --theme-id=185920684319
```

---

## What This Actually Does

Uploads all these files to Shopify:
- assets/lrb-design-system.css
- assets/lrb-typography.css
- assets/lrb-components.css
- sections/hero-featured-product-lrb.liquid
- sections/shop-by-type-lrb.liquid
- sections/promotional-banner-lrb.liquid
- sections/about-store-lrb.liquid
- sections/main-collection-lrb.liquid
- sections/main-product-lrb.liquid
- sections/footer-lrb.liquid
- snippets/product-card-lrb.liquid
- snippets/price-display-lrb.liquid
- snippets/badge-lrb.liquid
- templates/index.json
- templates/collection.lrb.json
- templates/product.lrb.json

And integrates them with Dawn's base theme.

---

## COPY AND PASTE THIS WHOLE BLOCK:

```bash
cd /Users/ajmal/johnsir/dawn
rm -rf /Users/ajmal/Library/Preferences/shopify-cli-theme-conf-nodejs
shopify auth login
shopify theme push --unpublished --theme="LRB Store"
```

Then send me the preview URL it gives you!
