# LRB STORE IMPLEMENTATION PLAN
## From Reference Audit to Working Shopify Store

**Based on:** Complete audit of https://www.lrbstore.co.uk/  
**Foundation:** Dawn theme + selective ABCBook components  
**Target:** High-fidelity recreation with client branding

---

## PHASE B: REPOSITORY INSPECTION & INTEGRATION MAP

### Current State Analysis

#### What We Have (Dawn)
✅ Solid Shopify theme foundation  
✅ Modern cart and checkout integration  
✅ Responsive grid system  
✅ Accessibility features  
✅ Theme customization schema  
✅ LRB design system CSS (Phase 1 complete)  
✅ LRB typography CSS (Phase 1 complete)

#### What We Need from ABCBook
Based on reference audit, we need:
- Product card layouts optimized for merchandise (not just books)
- Collection grid patterns
- Product image gallery patterns
- Quick-add functionality (if present on reference)

#### What We Build Custom
- LRB Store-specific homepage structure
- "Shop by Product Type" carousel
- Promotional banner sections
- About section
- Policy pages layout
- Footer with return addresses

---

## PHASE C: SHARED DESIGN SYSTEM & GLOBAL LAYOUT

### Typography Refinement
Current system uses Crimson Text + Inter. Verify against actual LRB Store:
- [ ] Inspect actual fonts used on lrbstore.co.uk
- [ ] Adjust font weights if needed
- [ ] Refine font sizes to match reference
- [ ] Match line heights and letter spacing

### Color System Extraction
From reference audit, extract:
- [ ] Background colors (appears to be clean white)
- [ ] Text colors (appears to be dark gray/black)
- [ ] Accent colors (minimal, restrained)
- [ ] Sale badge colors
- [ ] Sold out badge colors
- [ ] Button colors and hovers

### Component Library
Build reusable components:
- [ ] Product card (merchandise-focused, not book-specific)
- [ ] Collection card
- [ ] Badge component (Sale, Sold out, Limited Edition)
- [ ] Quantity selector with cart indicator
- [ ] Price display (regular, sale, unit)
- [ ] Promotional banner
- [ ] Section heading styles

---

## PHASE D: HOMEPAGE RECREATION

### Homepage Structure (From Audit)

#### 1. Header
```
- Logo: "The London Review of Books Store"
- Main navigation (dropdown capable)
- Search
- Cart icon with count
- Mobile menu
```

#### 2. Hero/Featured Product Section
```
- Large product image
- Product title
- Price display (regular/sale/unit)
- Badges (Sale, Sold out)
- Quantity selector with cart count: "(0 in cart)"
- Tax notice: "Taxes included"
- "View full details" link
```

**Implementation:** Custom section `hero-featured-product.liquid`

#### 3. Shop by Product Type Carousel
```
- Section heading: "Shop By Product Type"
- 9 product type tiles (carousel/slider)
- Pagination: "1 of 9"
- Navigation arrows
- Responsive (fewer visible on mobile)
```

**Implementation:** Custom section `shop-by-type.liquid`

#### 4. Promotional Banners
Two banner styles detected:

**Banner 1:** Subscription promotion
- Headline + description
- Price point callout
- Fine print/disclaimers
- CTA button: "Order now"

**Banner 2:** Product category promotion
- Headline
- Featured items
- CTA button: "Buy now"

**Implementation:** Flexible section `promotional-banner.liquid` with variants

#### 5. About Section
```
- Heading: "About the LRB Store"
- Two-column text layout
- Editorial/brand storytelling
- Link to physical bookshop
```

**Implementation:** Section `about-store.liquid`

#### 6. Footer
```
- Store contact information
- Return addresses (UK and USA)
- Help links
- Shipping & Delivery
- Refund Policy
- Terms of Service
- Newsletter signup
- Social links
```

**Implementation:** Update `sections/footer.liquid`

---

## PHASE E: COLLECTIONS & PRODUCT PAGES

### Collection Page Requirements

#### Discovered Collections (from audit)
1. All Products (`/collections/all`)
2. Books (`/collections/lrb-collections`)
3. Stationery (`/collections/stationery`)
4. Canvas Bags (`/collections/canvas-bags`)
5. Decorations (`/collections/decorations`)
6. Notebooks (`/collections/notebook`)
7. Stocking Fillers (`/collections/stocking-fillers`)
8. Gifts (`/collections/gifts`)
9. Cressida Bell (designer collab)
10. Sale (`/collections/sale-1`)
11. Christmas categories
12. London Review of Books Subscription

#### Collection Page Layout
```
- Collection title
- Collection description (rich text)
- Sort dropdown: "Sort by:"
- Filter options (if applicable)
- Product grid (responsive: 2-3-4-5 columns)
- Product cards with:
  - Image
  - Title
  - Price (regular/sale/unit)
  - Badges (Sale, Sold out, LIMITED EDITION)
- Pagination
```

**Implementation:** Update `sections/main-collection-product-grid.liquid`

### Product Page Requirements

#### Product Page Layout (from audit)
```
- Large product image
- Thumbnail gallery navigation
- Product title
- Price display:
  - Regular price: "Regular price £X.XX GBP"
  - Sale price (if applicable)
  - Unit price display
- Badges (Sale, Sold out)
- Tax notice: "Taxes included"
- Quantity selector
- Cart quantity indicator: "(0 in cart)"
- Add to cart / View full details button
- Product description (rich text)
  - Provenance (where made, by whom)
  - Materials
  - Specifications
  - Size information
- Related products section
```

**Implementation:** Update `sections/main-product.liquid`

#### Product Types to Support
- Books/Collections
- Stationery (diaries, planners, notebooks, pens)
- Canvas bags (various colors and editions)
- Homeware (ceramics, mugs)
- Decorations (ornaments, garlands, advent calendars)
- Prints
- Gift boxes
- Back issues
- Subscription products (special handling)

---

## PHASE F: CART, SEARCH & NAVIGATION

### Cart System

#### Cart Features (from audit)
```
- Cart drawer (preferred) or cart page
- Quantity adjustment
- Cart quantity indicator: "(X in cart)"
- Item removal
- Subtotal display
- Tax-inclusive pricing
- Empty cart state
- "Continue shopping" link
- Checkout button
```

**Implementation:** Use Dawn's cart-drawer, style to match LRB

### Search Interface
```
- Search overlay or drawer
- Search input
- Predictive results (Shopify native)
- Product results
- Collection results
- Search results page
- Empty results state
- Mobile-optimized
```

**Implementation:** Use Dawn's search, style to match LRB

### Navigation Structure

#### Primary Navigation (from audit)
```
Main menu items (inferred):
- All Products
- Books / Collections
- Stationery
- Canvas Bags
- Decorations
- Gifts
- Christmas (seasonal)
- Sale
- About
```

#### Footer Navigation
```
Column 1: Store Information
- About the LRB Store
- Contact
- Newsletter

Column 2: Help & Policies
- Shipping & Delivery
- Refund Policy
- Terms of Service

Column 3: Return Addresses
- UK Address
- USA Address

Column 4: Connect
- Social links
- Contact email: store@lrb.co.uk
```

**Implementation:** Update `sections/header.liquid` and `sections/footer.liquid`

---

## PHASE G: SHOPIFY ADMIN CONFIGURATION

### Theme Settings to Add

#### Homepage Settings
```
- Featured product selector
- Shop by Type: 9 collection selectors
- Promotional banner 1: enable/disable, text, link
- Promotional banner 2: enable/disable, text, link
- About section: rich text editor
```

#### Store Information
```
- Store contact email
- UK return address
- USA return address
- Dispatch time notice
- Shipping disclaimer
```

#### Design Settings
```
- Logo upload
- Color scheme selector
- Typography options (if allowing customization)
- Badge styles
```

### Metafields to Configure

#### Product Metafields
```
- Product provenance (text)
- Made by / Designer (text)
- Made in location (text)
- Dimensions (text)
- Materials (text list)
- Care instructions (rich text)
- Edition information (text)
```

#### Collection Metafields
```
- Collection description (rich text)
- Featured banner image
```

---

## PHASE H: RESPONSIVE TESTING & VISUAL REFINEMENT

### Breakpoint Testing
- [ ] Mobile (320px - 640px)
- [ ] Tablet (640px - 1024px)
- [ ] Desktop (1024px - 1440px)
- [ ] Wide desktop (1440px+)

### Component Testing
- [ ] Product cards in grids
- [ ] Product image galleries
- [ ] Carousels/sliders
- [ ] Navigation dropdowns
- [ ] Mobile navigation
- [ ] Cart drawer
- [ ] Search overlay
- [ ] Forms (newsletter, contact)

### Visual Fidelity Checks
Compare against reference:
- [ ] Typography matches
- [ ] Spacing matches
- [ ] Colors match
- [ ] Button styles match
- [ ] Badge styles match
- [ ] Image aspect ratios match
- [ ] Grid density matches
- [ ] Overall aesthetic matches

### Browser Testing
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### Accessibility Testing
- [ ] Keyboard navigation
- [ ] Screen reader testing (VoiceOver, NVDA)
- [ ] Color contrast (WCAG AA minimum)
- [ ] Focus indicators
- [ ] ARIA labels
- [ ] Alt text for images
- [ ] Form labels

### Performance Testing
- [ ] Lighthouse score (target: 90+)
- [ ] Page load time
- [ ] Time to interactive
- [ ] Image optimization
- [ ] CSS minification
- [ ] JS bundle size

---

## FILE STRUCTURE (PLANNED)

```
/Users/ajmal/johnsir/dawn/
├── assets/
│   ├── lrb-design-system.css          ✅ Phase 1 complete
│   ├── lrb-typography.css             ✅ Phase 1 complete
│   ├── lrb-components.css             ⏳ Phase C
│   ├── lrb-homepage.css               ⏳ Phase D
│   ├── lrb-collection.css             ⏳ Phase E
│   ├── lrb-product.css                ⏳ Phase E
│   ├── lrb-cart.css                   ⏳ Phase F
│   ├── lrb-navigation.css             ⏳ Phase F
│   └── lrb-homepage.js                ⏳ Phase D (carousel)
├── sections/
│   ├── hero-featured-product.liquid   ⏳ Phase D
│   ├── shop-by-type.liquid            ⏳ Phase D
│   ├── promotional-banner.liquid      ⏳ Phase D
│   ├── about-store.liquid             ⏳ Phase D
│   ├── header-lrb.liquid              ⏳ Phase F
│   ├── footer-lrb.liquid              ⏳ Phase F
│   ├── main-collection-lrb.liquid     ⏳ Phase E
│   └── main-product-lrb.liquid        ⏳ Phase E
├── snippets/
│   ├── product-card-lrb.liquid        ⏳ Phase C
│   ├── collection-card-lrb.liquid     ⏳ Phase C
│   ├── badge-lrb.liquid               ⏳ Phase C
│   ├── price-display-lrb.liquid       ⏳ Phase C
│   ├── quantity-selector-lrb.liquid   ⏳ Phase C
│   └── promotional-banner-content.liquid ⏳ Phase D
├── templates/
│   ├── index.json                     ⏳ Phase D (configure homepage)
│   ├── collection.json                ⏳ Phase E
│   └── product.json                   ⏳ Phase E
└── config/
    └── settings_schema.json           ⏳ Phase G
```

---

## IMPLEMENTATION PRIORITY

### Week 1: Foundation & Core Components
- [x] Phase A: Reference audit (complete)
- [x] Phase B: Repository inspection (complete)
- [ ] Phase C: Design system refinement
- [ ] Phase C: Component library

### Week 2: Homepage & Collections
- [ ] Phase D: Homepage structure
- [ ] Phase D: Promotional banners
- [ ] Phase E: Collection pages
- [ ] Phase E: Product cards

### Week 3: Products & Navigation
- [ ] Phase E: Product pages
- [ ] Phase E: Product galleries
- [ ] Phase F: Navigation
- [ ] Phase F: Search
- [ ] Phase F: Cart styling

### Week 4: Polish & Launch
- [ ] Phase G: Admin configuration
- [ ] Phase H: Responsive testing
- [ ] Phase H: Visual refinement
- [ ] Phase H: Performance optimization
- [ ] Phase H: Accessibility audit

---

## SUCCESS CRITERIA

### Functional Requirements
✅ All products display correctly  
✅ Collections work properly  
✅ Add to cart functions  
✅ Cart updates quantity  
✅ Checkout redirects properly  
✅ Search returns results  
✅ Mobile navigation works  
✅ Admin can manage content without code

### Visual Requirements
✅ Matches LRB Store aesthetic  
✅ Typography is faithful to reference  
✅ Spacing and layout match  
✅ Responsive across all devices  
✅ Badges and indicators match  
✅ Product cards match reference  
✅ Overall brand feel is consistent

### Technical Requirements
✅ Lighthouse score 90+  
✅ No console errors  
✅ No Liquid errors  
✅ Accessible (WCAG AA)  
✅ Works in all major browsers  
✅ Fast load times

---

## NEXT STEPS

1. **Immediate:** Begin Phase C - refine design system based on reference
2. **Then:** Build component library (product cards, badges, etc.)
3. **Then:** Start homepage implementation
4. **Ongoing:** Test each component as it's built

---

**Last Updated:** 2024-11-12  
**Current Phase:** B complete, starting Phase C  
**Status:** On track
