# DEPLOYMENT INSTRUCTIONS FOR USER

## YOU NEED TO DO THIS MANUALLY

The deployment requires interactive authentication that cannot be automated.

---

## STEP 1: OPEN TERMINAL

Press `Cmd + Space`, type "Terminal", press Enter

---

## STEP 2: RUN DEPLOYMENT SCRIPT

Copy and paste this into Terminal:

```bash
cd /Users/ajmal/johnsir/dawn && ./DEPLOY.sh
```

Press Enter.

---

## STEP 3: FOLLOW THE PROMPTS

The script will ask:

**"Choose an option (1-4):"**

Type: **1** (Deploy as NEW unpublished theme)

Press Enter.

---

## STEP 4: SHOPIFY AUTHENTICATION

A browser window will open asking you to login to Shopify.

**IMPORTANT:** Make sure you're logging into your **DEVELOPMENT/TEST STORE**, not a live production store.

If you don't have a Shopify development store yet:
1. Go to https://partners.shopify.com/
2. Create a partner account (free)
3. Create a development store
4. Use those credentials for authentication

---

## STEP 5: DEPLOYMENT HAPPENS

After authentication, the terminal will show:

```
📦 Deploying as new unpublished theme...
[uploading files...]
✅ Theme deployed!

Preview your theme: https://YOUR_STORE.myshopify.com/?preview_theme_id=XXXXX
```

---

## STEP 6: SHARE THE PREVIEW URL

**Copy the preview URL** that looks like:
```
https://YOUR_STORE.myshopify.com/?preview_theme_id=XXXXX
```

**Send it to me** so I can:
- Access the deployed theme
- Test all features
- Compare to lrbstore.co.uk
- Fix any issues
- Provide verified status report

---

## TROUBLESHOOTING

### "Command not found: shopify"

Run:
```bash
brew tap shopify/shopify
brew install shopify-cli
```

Then try deployment again.

### "Permission denied: ./DEPLOY.sh"

Run:
```bash
chmod +x /Users/ajmal/johnsir/dawn/DEPLOY.sh
```

Then try deployment again.

### "Not logged in to Shopify"

The script will prompt you to login. Follow the browser prompts.

### "No development store"

Create one at: https://partners.shopify.com/organizations

---

## WHAT HAPPENS AFTER DEPLOYMENT

1. **You share preview URL** with me
2. **I access the theme** via the URL
3. **I test everything:**
   - Homepage rendering
   - Collection pages
   - Product pages
   - Add to cart
   - Mobile layouts
   - Visual comparison to lrbstore.co.uk
4. **I fix any bugs** I find
5. **I push updates** to your theme
6. **I verify fixes** work
7. **I provide final report** with actual test results

---

## OPTIONAL: ADD TEST DATA

To make testing easier, add a few test products in Shopify Admin:

1. Go to your Shopify admin
2. Products > Add product
3. Create 5-10 sample products:
   - LRB Canvas Tote Bag (£15.00)
   - LRB Diary (£20.00)
   - Advent Calendar (£8.99)
   - Notebook (£12.00)
   - Ceramic Mug (£18.00)

4. Create collections:
   - All Products
   - Stationery
   - Canvas Bags
   - Gifts

This lets me test:
- Product cards
- Collection grids
- Sorting/filtering
- Add to cart
- Cart operations

---

## EXPECTED TIMELINE

**Deployment:** 5-10 minutes (you)  
**Testing & Fixes:** 4-8 hours (me)  
**Final Verification:** 1-2 hours (me)  
**Total:** ~6-11 hours remaining work

---

## IMPORTANT NOTES

✅ This will **NOT** affect any live store  
✅ Theme is deployed as **unpublished** (not visible to customers)  
✅ You can test it privately via preview URL  
✅ You can publish it later when ready  

❌ Do **NOT** publish the theme until after I've tested and fixed issues  
❌ Do **NOT** use this on a live production store yet  

---

## QUESTIONS?

Check these docs:
- **HONEST_STATUS_REPORT.md** - Current truthful status
- **DEPLOY_AND_VERIFY.md** - What happens after deploy
- **LRB_DEPLOYMENT_GUIDE.md** - Complete configuration guide

---

## YOUR NEXT STEP

Run this now:

```bash
cd /Users/ajmal/johnsir/dawn && ./DEPLOY.sh
```

Choose option **1**

Share the preview URL with me.

Then I'll take over from there! 🚀
