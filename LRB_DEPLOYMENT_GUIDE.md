# LRB STORE DEPLOYMENT GUIDE
## From Repository to Live Shopify Store

**Repository:** https://github.com/revolqnexus-stack/paternoster  
**Reference:** https://www.lrbstore.co.uk/  
**Status:** Ready for deployment and configuration

---

## IMPLEMENTATION STATUS

### ✅ Completed Phases

#### Phase A: Reference Audit
- Complete site structure documented
- Visual design analyzed
- Commerce features mapped
- See: `LRB_REFERENCE_AUDIT.md`

#### Phase B: Repository Inspection
- Dawn foundation analyzed
- Integration strategy defined
- See: `LRB_IMPLEMENTATION_PLAN.md`

#### Phase C: Component Library
- `lrb-design-system.css` - Complete design tokens
- `lrb-typography.css` - Editorial typography system
- `lrb-components.css` - Reusable UI components
- `product-card-lrb.liquid` - Product card snippet
- `price-display-lrb.liquid` - Price formatting
- `badge-lrb.liquid` - Badge system

#### Phase D: Homepage
- `hero-featured-product-lrb.liquid` - Featured product hero
- `shop-by-type-lrb.liquid` - Collection carousel
- `promotional-banner-lrb.liquid` - Promotional banners
- `about-store-lrb.liquid` - Store information
- `templates/index.json` - Homepage configuration

#### Phase E: Collections & Products
- `main-collection-lrb.liquid` - Collection pages
- `main-product-lrb.liquid` - Product detail pages
- `templates/collection.lrb.json` - Collection template
- `templates/product.lrb.json` - Product template

#### Phase F (Partial): Footer
- `footer-lrb.liquid` - Complete footer with return addresses

### 🚧 Remaining Work

#### Phase F: Navigation & Cart (Minor)
- Update header navigation to match LRB aesthetic (Dawn's header works, styling needed)
- Style cart drawer to match LRB (Dawn's cart works, styling needed)
- Style search to match LRB (Dawn's search works, styling needed)

#### Phase G: Shopify Admin Configuration
- Theme settings configuration
- Metafields setup (optional)
- Navigation menus
- Content population

#### Phase H: Testing & Polish
- Responsive testing
- Browser testing
- Performance optimization
- Visual refinement

---

## DEPLOYMENT STEPS

### 1. Install Shopify CLI

```bash
# macOS (using Homebrew)
brew tap shopify/shopify
brew install shopify-cli

# Verify installation
shopify version
```

### 2. Connect to Shopify Store

```bash
cd /Users/ajmal/johnsir/dawn

# Log in to Shopify
shopify auth login

# Connect to your store
shopify theme init
```

### 3. Push Theme to Shopify

```bash
# Push to development theme
shopify theme push --development

# Or push to a specific theme
shopify theme push --theme-id=YOUR_THEME_ID

# Or create a new theme
shopify theme push --unpublished --name="LRB Store"
```

### 4. Access Theme Editor

Once pushed, you'll get a preview URL:
```
https://YOUR_STORE.myshopify.com/?preview_theme_id=THEME_ID
```

Access the theme editor at:
```
https://YOUR_STORE.myshopify.com/admin/themes/THEME_ID/editor
```

---

## THEME EDITOR CONFIGURATION

### Homepage Setup

#### 1. Hero Featured Product Section
- **Section:** Hero Featured Product
- **Setting:** Select a featured product
- **Recommendation:** Choose a new or limited edition item

#### 2. Shop By Product Type
- **Section:** Shop by Product Type
- **Settings:** Add 9 collection blocks
- **Collections to add (based on reference):**
  1. All Products
  2. Books / Collections
  3. Stationery
  4. Canvas Bags
  5. Decorations
  6. Notebooks
  7. Gifts
  8. Homeware
  9. Sale

#### 3. Promotional Banner 1
- **Section:** Promotional Banner
- **Style:** Subscription
- **Heading:** Your subscription offer
- **Text:** Promotional copy
- **CTA:** "Order now"
- **Link:** Link to subscription page or product
- **Fine Print:** Terms and conditions

#### 4. Promotional Banner 2
- **Section:** Promotional Banner
- **Style:** Product
- **Heading:** Featured category or product line
- **Text:** Description
- **CTA:** "Buy now"
- **Link:** Collection or product link

#### 5. About the Store
- **Section:** About the Store
- **Heading:** "About [Your Store Name]"
- **Text:** Your store's story (2-3 paragraphs)
- Include:
  - What you offer
  - Your mission
  - Connection to physical location (if applicable)
  - Invitation to visit

### Footer Configuration

#### Section: Footer LRB

**Store Information:**
- Heading: "Store Information" or "[Your Store Name]"
- Store info text: Brief description
- Contact email: your-email@example.com

**Help & Policies Links:**
Add blocks for:
- Shipping & Delivery
- Refund Policy
- Terms of Service
- Privacy Policy
- Contact Us

**Return Addresses:**
- UK & Rest of World address
- USA & Canada address (if applicable)

**Newsletter:**
- Enable newsletter signup
- Heading: "Newsletter" or "Stay Updated"
- Text: Subscription invitation

**Social:**
- Enable social links
- Configure social URLs in Theme Settings > Social media

---

## NAVIGATION MENU SETUP

### Main Navigation

Go to: **Online Store > Navigation > Main menu**

Suggested structure (based on lrbstore.co.uk):
```
- All Products → /collections/all
- Books → /collections/books
  - Collections → /collections/collections
  - Back Issues → /collections/back-issues
- Stationery → /collections/stationery
  - Diaries → /collections/diaries
  - Notebooks → /collections/notebooks
  - Pens → /collections/pens
- Canvas Bags → /collections/canvas-bags
- Homeware → /collections/homeware
- Decorations → /collections/decorations
- Gifts → /collections/gifts
- Sale → /collections/sale
```

### Footer Menu

Go to: **Online Store > Navigation > Footer menu**

Structure:
```
Help & Policies:
- Shipping & Delivery → /pages/shipping
- Refund Policy → /policies/refund-policy
- Terms of Service → /policies/terms-of-service
- Privacy Policy → /policies/privacy-policy
- Contact Us → /pages/contact
```

---

## COLLECTION SETUP

### Create Collections

Go to: **Products > Collections**

Based on reference audit, create:

1. **All Products**
   - Type: Automated
   - Conditions: All products

2. **Books / LRB Collections**
   - Type: Manual or by tag
   - Add book products

3. **Stationery**
   - Type: Automated by product type or tag
   
4. **Canvas Bags**
   - Type: Automated by tag: "canvas-bag"

5. **Decorations**
   - Type: Automated by tag: "decoration"
   - Description: "Our ceramic Christmas tree decorations, with characters reading the London Review of Books, are hand-made in Wales. Embroidered decorations are also available."

6. **Gifts**
   - Type: Manual
   - Curated selection

7. **Sale**
   - Type: Automated
   - Conditions: Compare at price > price

### Collection Images

For each collection:
- Upload a featured image (will show in Shop By Product Type carousel)
- Recommended size: 1000x1000px minimum
- Format: JPG or PNG

---

## PRODUCT SETUP

### Product Information Template

Based on lrbstore.co.uk reference, products should include:

**Basic Information:**
- Title (include edition info: "LIMITED EDITION", "NEW")
- Description (provenance, materials, dimensions)
- Price
- Compare at price (for sale items)
- Images (multiple angles)

**Product Description Template:**
```
[Introduction paragraph about the product]

[Provenance/maker information]
Created by [Artist/Designer] exclusively for [Your Store].

[Materials and specifications]
Materials: [List]
Dimensions: [Size]
Made in: [Location]

[Special characteristics]
[Note about handmade nature, uniqueness, etc.]
```

**Tags to Use:**
- Product type: `books`, `stationery`, `canvas-bag`, `decoration`, `homeware`
- Status: `limited-edition`, `new`, `handmade`
- Material: `ceramic`, `canvas`, `cotton`, etc.
- Collection: `christmas`, `gift`, etc.

### Sample Products (from Reference)

1. **LRB Canvas Tote Bags**
   - Variants: Brown, Blue, Pink, Denim
   - Price: £15.00
   - Tag: `canvas-bag`, `limited-edition`

2. **LRB Diary**
   - Title: "LRB Diary for 2027: What were you reading?"
   - Price: £X.XX
   - Tag: `stationery`, `diary`

3. **LRB Collections (Books)**
   - Example: "LRB Collections 1: 'Royal Bodies' (Coronation Edition)"
   - Tag: `books`, `collections`

4. **Advent Calendar**
   - Price: £8.99
   - Description includes artist attribution
   - Tag: `decoration`, `christmas`

---

## PAGES TO CREATE

### 1. Shipping & Delivery

Path: `/pages/shipping`

**Content (from reference audit):**

```
Dispatch Times

We advise allowing at least 7-10 working days for UK delivery, 
and 21-28 days for rest of world.

We endeavour to dispatch your items within 3 working days. 

Delivery cost will depend on the destination, but you will 
receive a final shipping cost at checkout.

Shipping Costs

All prices are based on current postal guidelines.

Charges are calculated automatically when you check out.

For bulk order queries, email us at [your-email]
```

### 2. Contact

Path: `/pages/contact`

Include:
- Contact form (use Shopify's contact form)
- Email address
- Physical address (if applicable)
- Hours (if applicable)

### 3. About

Path: `/pages/about`

Your extended store story.

---

## POLICIES

### Refund Policy

Go to: **Settings > Policies > Refund policy**

Reference content from lrbstore.co.uk (paraphrased):

**Returns:**
- 28-day return window
- Items must be in original, sellable condition
- Proof of purchase required

**Return Addresses:**
- UK & Rest of World: [Your UK address]
- USA & Canada: [Your USA address]

**Refunds:**
- Processed after inspection
- Credit applied to original payment method

**Exchanges:**
- Defective or damaged items replaced
- Contact: [your-email] with evidence

### Terms of Service

Standard Shopify terms, customize as needed.

### Privacy Policy

Standard Shopify privacy policy, review and customize.

---

## TEMPLATE ASSIGNMENT

### Assign LRB Templates

1. **Collection Template:**
   - Go to: Collections > [Collection Name]
   - Theme template: Select "collection.lrb"
   - Repeat for all collections

2. **Product Template:**
   - Go to: Products > [Product Name]
   - Theme template: Select "product.lrb"
   - For special products, can use default template

---

## THEME SETTINGS

### Colors

While LRB colors are set in CSS, verify:
- Background: White (#ffffff)
- Text: Dark gray/black (#1a1a1a)
- Accent: LRB Red (#c41e3a) - use sparingly

### Typography

Fonts are loaded via Google Fonts:
- Headings: Crimson Text
- Body: Inter

### Social Media

Go to: **Theme Settings > Social media**

Add your social links:
- Instagram
- Twitter/X
- Facebook
- etc.

### Checkout

Go to: **Settings > Checkout**

Configure:
- Logo (upload)
- Colors (match theme)
- Typography (match theme if possible)

---

## TESTING CHECKLIST

### Functionality Testing

- [ ] Homepage loads correctly
- [ ] Featured product displays
- [ ] Shop by Type carousel works
- [ ] Promotional banners display
- [ ] Collection pages load
- [ ] Product pages load
- [ ] Add to cart works
- [ ] Cart updates quantity
- [ ] Checkout flow works
- [ ] Search returns results
- [ ] Navigation menus work
- [ ] Footer links work
- [ ] Newsletter signup works

### Visual Testing

- [ ] Typography matches LRB aesthetic
- [ ] Spacing feels generous and editorial
- [ ] Product cards display correctly
- [ ] Images load properly
- [ ] Badges show correctly (Sale, Sold out)
- [ ] Prices format correctly: "£X.XX GBP"
- [ ] Tax notice displays: "Taxes included"
- [ ] Quantity selector shows "(0 in cart)"

### Responsive Testing

- [ ] Mobile (320px - 640px)
- [ ] Tablet (640px - 1024px)
- [ ] Desktop (1024px - 1440px)
- [ ] Wide (1440px+)

### Browser Testing

- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Mobile Safari
- [ ] Mobile Chrome

---

## LAUNCH CHECKLIST

### Pre-Launch

- [ ] All products added with proper information
- [ ] All collections created and organized
- [ ] Navigation menus configured
- [ ] Footer configured with return addresses
- [ ] Pages created (About, Shipping, Contact)
- [ ] Policies reviewed and customized
- [ ] Theme settings configured
- [ ] Social media links added
- [ ] Logo uploaded
- [ ] Favicon uploaded
- [ ] Test orders completed successfully

### Launch

1. **Set theme as live:**
   ```bash
   shopify theme publish --theme-id=YOUR_THEME_ID
   ```
   
   Or in Shopify Admin:
   - Go to: Online Store > Themes
   - Find "LRB Store" theme
   - Click Actions > Publish

2. **Verify live site:**
   - Visit your store URL
   - Test add to cart
   - Test checkout (use Shopify test card)
   - Check mobile view

3. **Remove password (if applicable):**
   - Go to: Online Store > Preferences
   - Disable password protection

### Post-Launch

- [ ] Set up Google Analytics
- [ ] Configure email notifications
- [ ] Set up automated emails (order confirmation, shipping, etc.)
- [ ] Create first blog post (if using blog)
- [ ] Announce launch on social media

---

## ONGOING MAINTENANCE

### Regular Tasks

**Weekly:**
- Check for new orders
- Update inventory
- Respond to customer inquiries

**Monthly:**
- Review best sellers
- Update featured product
- Refresh promotional banners
- Add new products

**Quarterly:**
- Review policies
- Update About page
- Refresh homepage content
- Performance review

---

## SUPPORT & RESOURCES

### Documentation
- [Shopify Theme Documentation](https://shopify.dev/docs/themes)
- [Liquid Reference](https://shopify.dev/docs/api/liquid)
- [Dawn Theme GitHub](https://github.com/Shopify/dawn)

### Getting Help

**For theme issues:**
- Check `LRB_REFERENCE_AUDIT.md` for reference site details
- Check `LRB_IMPLEMENTATION_PLAN.md` for implementation notes
- Review section files in `/sections` for configuration options

**For Shopify issues:**
- Shopify Help Center
- Shopify Community Forums
- Shopify Support

---

## CUSTOM MODIFICATIONS

### Adding New Sections

All LRB sections are configurable via theme editor. To add more:

1. Duplicate existing section file
2. Modify schema settings
3. Update liquid markup
4. Test in theme editor

### Styling Adjustments

Edit these CSS files:
- `assets/lrb-design-system.css` - Design tokens
- `assets/lrb-typography.css` - Typography
- `assets/lrb-components.css` - Components

### Changing Fonts

1. Update Google Fonts link in `layout/theme.liquid`
2. Update CSS variables in `assets/lrb-design-system.css`:
   - `--lrb-font-heading`
   - `--lrb-font-body`

---

## ESTIMATED TIMELINE

### Initial Setup (Day 1)
- Deploy theme to Shopify
- Configure theme settings
- Set up navigation menus

### Content Population (Days 2-3)
- Add products
- Create collections
- Write pages
- Upload images

### Configuration & Testing (Days 4-5)
- Homepage setup
- Template assignments
- Footer configuration
- Testing all functionality

### Launch (Day 6)
- Final checks
- Publish theme
- Remove password
- Announce

**Total: ~1 week for full setup and launch**

---

**Last Updated:** 2024-11-12  
**Theme Version:** 1.0.0  
**Status:** Ready for deployment
