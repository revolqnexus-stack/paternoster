# LRB STORE REFERENCE AUDIT
## Complete Site Analysis: https://www.lrbstore.co.uk/

**Audit Date:** 2024-11-12  
**Purpose:** Document exact visual structure, interactions, and functionality for recreation  
**Status:** In Progress

---

## SITE STRUCTURE

### Discovered Collections
Based on navigation and search results:

1. **All Products** - `/collections/all`
2. **Books** - `/collections/lrb-collections`
   - LRB Collections series (curated essay collections)
3. **Stationery** - `/collections/stationery`
   - Diaries, planners, notebooks
4. **Canvas Bags** - `/collections/canvas-bags`
   - Tote bags in various colors
5. **Decorations** - `/collections/decorations`
   - Ceramic and embroidered Christmas decorations
6. **Notebooks** - `/collections/notebook`
7. **Stocking Fillers** - `/collections/stocking-fillers`
8. **Gifts** - `/collections/gifts`
9. **Cressida Bell** - `/collections/cressida-bell` (Designer collaboration)
10. **Christmas** collections

### Product Categories Identified
- Books (LRB Collections series)
- Stationery (diaries, planners, notebooks, pens)
- Canvas bags (tote bags, limited editions)
- Homeware (ceramics, mugs, jugs)
- Decorations (Christmas ornaments, garlands, advent calendars)
- Prints (cover prints)
- Gift boxes
- Back issues

### URL Patterns
```
Homepage:          https://www.lrbstore.co.uk/
All Products:      https://www.lrbstore.co.uk/collections/all
Collection:        https://www.lrbstore.co.uk/collections/{handle}
Product:           https://www.lrbstore.co.uk/products/{handle}
Tagged Products:   https://www.lrbstore.co.uk/collections/all/{tag}
```

---

## HOMEPAGE ANALYSIS

### Layout Structure (From Fetch)

#### 1. Header / Navigation
- Logo area
- Main navigation (not fully captured in fetch)
- Cart access
- Search access (implied)

#### 2. Hero / Featured Product Section
**Featured:** LRB Brown Canvas Tote Bag - LIMITED EDITION
- Large product image
- Product title
- Pricing display:
  - Regular price: £15.00 GBP
  - Sale price display (when on sale)
  - Unit price display
- Sale badge (when applicable)
- Sold out badge (when applicable)
- Quantity selector with cart quantity indicator: "(0 in cart)"
- "View full details" link
- Tax notice: "Taxes included"

#### 3. Shop By Product Type Section
**Heading:** "Shop By Product Type"
- Carousel/slider format
- Shows "1 of 9" pagination
- 9 product type categories total
- Navigation arrows implied

#### 4. Promotional Banners
Two promotional sections detected:

**Banner 1: Subscription Promotion**
> "Do you know someone who values original ideas and incisive analysis? Give them a subscription to the LRB for as little as £29.99 and get a free 2027 LRB calendar with your order"
- Fine print: "**Gift is not available customers outside the UK. One gift per subscription. While stocks last."
- Call-to-action: "Order now"

**Banner 2: Audiobooks Promotion**
> "Audiobooks from the LRB"
> "Explore the LRB's new audiobook collections, including 'Becoming a Philosopher' by Jonathan Rée and 'Complicated Women' by Bee Wilson"
- Call-to-action: "Buy now"

#### 5. About Section
**Heading:** "About the LRB Store"

**Copy (paraphrased for compliance):**
- Describes the London Review of Books as a leading cultural magazine
- Published twice monthly
- Focus on intellectual essays and long-form content
- Global reputation for fearlessness, range, and elegance

- LRB Store described as new initiative for merchandise
- Previously only available at London Review Bookshop physical location
- Now available worldwide for remote customers
- Still encourages physical visits to London

---

## COLLECTION PAGES

### Structure Observed

#### Decorations Collection
**URL:** `/collections/decorations`
**Title:** "Decorations"
**Description:** 
- Describes ceramic Christmas decorations with reading characters
- Handmade in Wales
- Also mentions embroidered decorations

#### Other Collections (Stationery, Books)
**Minimal content captured in fetches:**
- Collection title
- "Sort by:" dropdown (sorting functionality)
- Product grid (not fully rendered in fetch)

### Expected Collection Page Features
Based on Shopify standards and detected elements:
- Collection banner/header
- Collection description
- Sort dropdown
- Filter options (possibly)
- Product grid
- Pagination
- Product cards with:
  - Images
  - Titles
  - Prices
  - Sale badges
  - Sold out states

---

## PRODUCT PAGES

### Example: LRB Brown Canvas Tote Bag

#### Product Information Structure
- **Product Title:** "LRB Brown Canvas Tote Bag - LIMITED EDITION"
- **Pricing:**
  - Regular price: £15.00 GBP
  - Sale price (when applicable)
  - Unit price display
- **Badges:**
  - "Sale" badge
  - "Sold out" badge
- **Tax Notice:** "Taxes included"
- **Quantity Selector**
- **Cart Quantity Indicator:** "(0 in cart)"
- **Action Button:** "View full details"

### Product Page Features (From Search Results)

#### Advent Calendar Product
- Product descriptions include artist/creator credits
- Example: "Created by Jon McNaught exclusively for the London Review Bookshop"

#### Ceramic Jug Product
- Describes handmade nature
- Notes uniqueness: "each piece is unique"
- Mentions variation: "colours and wording on each piece will be different"

#### Gift Box Product
- Curated by staff attribution
- "Specially put together by the staff of the London Review Bookshop"

### Expected Product Page Features
- Large product image gallery
- Thumbnail navigation
- Product title
- Price display (regular, sale, unit)
- Availability status
- Quantity controls
- Add to cart button
- Product description (rich text)
- Product specifications/details
- Shipping information
- Related products
- Back to collection link

---

## NAVIGATION STRUCTURE

### Primary Navigation (Inferred from Collections)
Based on discovered collections, likely navigation structure:

```
- All Products
- Books / Collections
- Stationery
- Canvas Bags
- Decorations
- Gifts
- [Seasonal categories: Christmas, etc.]
- [Designer collaborations: Cressida Bell]
```

### Expected Navigation Features
- Dropdown menus (for subcategories)
- Search
- Cart icon with count
- Account/login (if applicable)
- Mobile hamburger menu

---

## PRODUCT CARD STRUCTURE

### From Canvas Bags Collection
Each product card appears to include:

- Product image
- Product title
- Regular price: "Regular price £15.00 GBP"
- Sale price (when on sale): "Sale price £15.00 GBP"
- Unit price: "Unit price / per"
- Badge indicators:
  - "Sale"
  - "Sold out"
  - "LIMITED EDITION" (in title)
  - "NEW LIMITED EDITION" (in title)

### Product Naming Patterns
- LRB [Color] Canvas [Type] Tote Bag
- LRB [Product Type] for [Year]
- [Brand/Designer] [Product Description]
- Limited edition and new status in title

---

## TYPOGRAPHY & VISUAL STYLE

### Observations from Site Title & Content

**Site Title:** "The London Review of Books Store"

**Tone & Voice:**
- Formal, literary
- Emphasis on intellectual/cultural credentials
- British English spelling and conventions
- Detailed product descriptions with provenance

### Expected Typography
Based on LRB editorial brand:
- Serif headlines (likely similar to editorial site)
- Clean sans-serif body text
- Restrained, classical aesthetic
- High readability
- Generous line height

---

## PRICING & COMMERCE

### Price Format
- Currency: GBP (£)
- Format: "£15.00 GBP"
- Decimal places always shown
- "Regular price" and "Sale price" labels
- Unit price calculations shown
- Tax inclusion notice: "Taxes included"

### Sale Indicators
- "Sale" badge on products
- Strike-through regular price
- Highlighted sale price
- Dual price display (regular + sale)

### Stock Status
- "Sold out" badge
- Quantity in cart indicator: "(0 in cart)"
- Stock availability messaging (implied)

---

## SUBSCRIPTION PRODUCTS

### Featured Subscription Offer
- Price point: "as little as £29.99"
- Includes gift incentive (2027 LRB calendar)
- Geographic restrictions noted (UK only for gift)
- Stock limitations noted ("While stocks last")
- Separate promotional treatment on homepage

**Note:** Subscription products likely link to external subscription system (LRB main site) rather than standard Shopify checkout

---

## SPECIAL PRODUCT TYPES

### Limited Edition Products
- "LIMITED EDITION" designation in title
- "NEW LIMITED EDITION" for recent additions
- Appears to create urgency/exclusivity

### Handmade/Artisan Products
- Clear attribution to makers
- Description of handmade process
- Unique piece messaging
- Provenance emphasis (e.g., "hand-made in Wales")

### Curated Collections
- Staff curation noted
- Gift boxes with explanation
- Designer collaborations featured

### Back Issues
- Year-based organization
- Archive function
- Presumably multiple issues per year listing

---

## PROMOTIONAL CONTENT

### Homepage Promotional Sections
Two distinct promotional banners:

1. **Subscription Drive**
   - Value proposition
   - Price point
   - Gift incentive
   - Geographic and stock disclaimers
   - CTA: "Order now"

2. **Product Launch/Category**
   - New product line introduction (audiobooks)
   - Specific title examples
   - CTA: "Buy now"

### Promotional Banner Style (Inferred)
- Text-heavy
- Clear CTAs
- Value propositions
- Fine print for terms
- Links to relevant pages

---

## CONTENT STRATEGY

### Product Descriptions
Emphasis on:
- Provenance (where made, by whom)
- Materials and craftsmanship
- Unique characteristics
- Cultural/literary connections
- Exclusivity (limited editions, handmade)
- Staff curation and taste

### Brand Voice
- Literate and detailed
- British cultural references
- Emphasis on authenticity
- Connection to editorial brand
- Quality and craftsmanship focus

---

## FUNCTIONAL REQUIREMENTS

### Cart System
- Quantity indicator on product cards
- "(0 in cart)" display pattern
- Cart accessibility from header
- Tax-inclusive pricing

### Search
- Search functionality present (standard Shopify)
- Access from header (implied)

### Filtering & Sorting
- Sort dropdown on collection pages
- "Sort by:" label detected
- Filtering options (to be confirmed)

### Responsive Behavior
- Mobile-first considerations
- Product carousels with pagination
- "1 of 9" style pagination indicators

---

## NEXT STEPS: PAGES TO AUDIT

### High Priority
1. ✅ Homepage - Initial audit complete
2. ⏳ Full navigation structure
3. ⏳ Collection page (full render)
4. ⏳ Product page (full render)
5. ⏳ Cart page/drawer
6. ⏳ Search interface
7. ⏳ Footer structure

### Medium Priority
8. ⏳ About/store information pages
9. ⏳ Shipping & delivery info
10. ⏳ Returns policy
11. ⏳ Contact page

### Lower Priority
12. ⏳ Mobile-specific layouts
13. ⏳ Tablet layouts
14. ⏳ Hover states and interactions
15. ⏳ Transitions and animations

---

## TECHNICAL OBSERVATIONS

### Platform
- **Shopify** (confirmed by URL structure and liquid patterns)
- Standard Shopify collection/product URL patterns
- Likely custom theme (not obviously Dawn or other stock theme)

### Performance
- Minimal initial page weight (2.8KB homepage fetch)
- Likely uses progressive loading
- Image optimization (expected)

### Accessibility
- Tax inclusion notices
- Sold out indicators
- Quantity in cart feedback
- Screen reader considerations (to be tested)

---

## DESIGN TOKENS TO EXTRACT

### Spacing
- To be measured from visual inspection
- Section spacing
- Card spacing
- Grid gaps

### Colors
- Background colors
- Text colors
- Button colors
- Badge colors
- Sale/discount colors
- Border colors

### Typography
- Font families
- Font sizes
- Font weights
- Line heights
- Letter spacing

### Components
- Button styles
- Card styles
- Badge styles
- Form elements
- Navigation elements

---

## STATUS: PARTIAL AUDIT COMPLETE

**Completed:**
- ✅ Homepage structure documented
- ✅ Collection structure identified
- ✅ Product card structure documented
- ✅ URL patterns mapped
- ✅ Commerce features identified
- ✅ Content strategy analyzed

**In Progress:**
- ⏳ Visual design tokens
- ⏳ Complete page layouts
- ⏳ Interactive elements
- ⏳ Responsive breakpoints

**Next Actions:**
1. Continue fetching additional pages for complete structure
2. Document visual design specifications
3. Map component hierarchy
4. Create implementation plan based on findings

---

**Last Updated:** 2024-11-12  
**Audit Progress:** ~40% complete
