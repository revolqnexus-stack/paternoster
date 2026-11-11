# LRB Store Integration Plan
## Dawn + ABCBook → LRB Store Recreation

**Budget:** £1,100  
**Timeline:** Staged implementation  
**Approach:** Dawn foundation + selective ABCBook components + custom LRB design

---

## Architecture Decision

### Why This Combination Works
- Both are Shopify Liquid themes (no framework conflicts)
- Dawn: Modern, maintained, Shopify-native foundation
- ABCBook: Book-specific UI patterns already solved
- LRB inspiration: Editorial, restrained, typography-first

### What We're NOT Doing
❌ Merging two complete themes blindly  
❌ Overwriting Dawn's core files with ABCBook's  
❌ Using ABCBook's design system (we're recreating LRB's)

### What We ARE Doing
✅ Dawn architecture + routing + cart + checkout  
✅ ABCBook's book card layouts + metadata patterns  
✅ Custom LRB-inspired design system  
✅ One cohesive, maintainable theme

---

## Repository Setup

### Initial Setup
```bash
# Already have Dawn cloned at /Users/ajmal/johnsir/dawn

# Add ABCBook as remote (for reference)
cd /Users/ajmal/johnsir/dawn
git remote add abcbook https://github.com/ColorlibHQ/ABCBook.git
git fetch abcbook

# Create feature branch
git checkout -b feature/lrb-integration
```

### Inspection Commands
```bash
# List ABCBook sections
git show abcbook/main:sections/ --name-only

# List ABCBook snippets  
git show abcbook/main:snippets/ --name-only

# Inspect specific files
git show abcbook/main:snippets/card-product.liquid
git show abcbook/main:sections/main-product.liquid
```

---

## Component Migration Map

| Component | Source | Action | Priority |
|-----------|--------|--------|----------|
| **Core Architecture** |
| Theme layout | Dawn | Keep, customize header/footer | P0 |
| Routing & collections | Dawn | Keep | P0 |
| Cart system | Dawn | Keep, add quick-add from ABCBook | P1 |
| Checkout flow | Dawn | Keep (Shopify native) | P0 |
| **Book Display** |
| Book product cards | ABCBook | Port `snippets/card-product.liquid` | P0 |
| Author metadata | ABCBook | Port author display patterns | P1 |
| Book cover aspect ratio | ABCBook | Port 2:3 portrait layout | P0 |
| Rating/reviews | ABCBook | Port `product-card-rating.liquid` | P2 |
| **Collections** |
| Genre filtering | ABCBook | Port collection filtering logic | P1 |
| Tabbed collections | ABCBook | Port `sections/tabbed-collections.liquid` | P2 |
| Collection grid | ABCBook | Adapt grid patterns | P0 |
| **Product Pages** |
| Product layout | ABCBook | Port book-specific layout | P1 |
| Related products | ABCBook | Port recommendation patterns | P2 |
| Quick view | ABCBook | Port quick-add functionality | P2 |
| **Search & Nav** |
| Search | ABCBook | Port search templates | P1 |
| Navigation | Dawn | Redesign for LRB aesthetic | P0 |
| Mega menu | Custom | Build LRB-inspired | P2 |
| **Design System** |
| Typography | Custom | Recreate LRB styles | P0 |
| Spacing scale | Custom | LRB-inspired white space | P0 |
| Color palette | Custom | Neutral, editorial palette | P0 |
| Component styles | Custom | Minimal, restrained | P0 |

---

## Files to Port from ABCBook

### Priority 0 (Must Have)
```
snippets/
  ├── card-product.liquid          # Book card with portrait covers
  ├── price.liquid                 # Book pricing display
  └── product-media-gallery.liquid # Book cover galleries

sections/
  └── main-collection-product-grid.liquid  # Collection layout
```

### Priority 1 (Core Features)
```
snippets/
  ├── product-form.liquid          # Add to cart with metadata
  ├── card-collection.liquid       # Genre/category cards
  └── quick-add-bulk.liquid        # Quick add functionality

sections/
  ├── main-product.liquid          # Book detail page
  ├── featured-collection.liquid   # Homepage collections
  └── collection-filters.liquid    # Genre/author filtering

assets/
  └── component-product-card.css   # Book card styles (adapt)
```

### Priority 2 (Enhanced Features)
```
snippets/
  ├── product-card-rating.liquid   # Reviews/ratings
  ├── related-products.liquid      # Recommendations
  └── quick-view.liquid            # Quick view modal

sections/
  ├── tabbed-collections.liquid    # Genre tabs
  └── search-results.liquid        # Search layout
```

---

## Custom LRB Components to Build

### Design System
```
assets/
  ├── lrb-typography.css     # Serif headlines, sans-serif body
  ├── lrb-layout.css         # Grid system, spacing scale
  ├── lrb-colors.css         # Neutral palette variables
  └── lrb-components.css     # Buttons, cards, forms
```

### Header & Navigation
```
sections/
  ├── header-lrb.liquid      # Editorial masthead
  └── navigation-lrb.liquid  # Clean category nav

snippets/
  ├── icon-lrb-logo.liquid   # Custom logo
  └── search-bar-lrb.liquid  # Integrated search
```

### Homepage
```
sections/
  ├── hero-editorial.liquid       # Large image + editorial text
  ├── featured-books-grid.liquid  # Curated selection
  ├── category-showcase.liquid    # BOOKS · JOURNALS · GIFTS
  └── editorial-content.liquid    # LRB magazine integration
```

### Footer
```
sections/
  └── footer-lrb.liquid      # Multi-column, newsletter signup

snippets/
  └── newsletter-form.liquid # Email capture
```

---

## Design System Specifications

### Typography
```css
/* Inspired by LRB's restrained elegance */
--font-heading: 'Crimson Text', Georgia, serif;
--font-body: 'Inter', -apple-system, sans-serif;
--font-mono: 'IBM Plex Mono', monospace;

--font-size-xl: 2.5rem;    /* Page titles */
--font-size-lg: 1.75rem;   /* Section headings */
--font-size-md: 1.125rem;  /* Book titles */
--font-size-base: 1rem;    /* Body text */
--font-size-sm: 0.875rem;  /* Metadata */
```

### Spacing Scale (LRB-inspired)
```css
--space-xs: 0.5rem;   /* 8px - tight elements */
--space-sm: 1rem;     /* 16px - card padding */
--space-md: 2rem;     /* 32px - section spacing */
--space-lg: 4rem;     /* 64px - major sections */
--space-xl: 6rem;     /* 96px - hero spacing */
```

### Color Palette
```css
/* Neutral, editorial */
--color-text: #1a1a1a;
--color-text-muted: #666666;
--color-background: #ffffff;
--color-background-alt: #f8f8f8;
--color-border: #e0e0e0;
--color-accent: #c41e3a;  /* LRB red, sparingly */
```

### Book Card Specifications
```css
/* Portrait book covers */
--book-cover-aspect: 2 / 3;
--book-card-width: 280px;
--book-card-gap: 2rem;

/* Grid layouts */
--grid-columns-desktop: 4;
--grid-columns-tablet: 3;
--grid-columns-mobile: 2;
```

---

## Implementation Phases

### Phase 1: Foundation (Week 1)
- [ ] Set up ABCBook remote
- [ ] Audit Dawn's current structure
- [ ] Create custom design system files
- [ ] Build LRB typography system
- [ ] Build LRB color system
- [ ] Test on development store

### Phase 2: Book Cards (Week 1-2)
- [ ] Port ABCBook's `card-product.liquid`
- [ ] Adapt to LRB design system
- [ ] Ensure 2:3 portrait aspect ratio
- [ ] Add author metadata display
- [ ] Style book titles + pricing
- [ ] Test responsive behavior

### Phase 3: Collection Pages (Week 2)
- [ ] Port ABCBook's collection grid
- [ ] Add genre/category filtering
- [ ] Build collection header
- [ ] Add sort + filter UI
- [ ] Test with sample books

### Phase 4: Product Pages (Week 2-3)
- [ ] Port ABCBook's product layout
- [ ] Adapt to LRB aesthetic
- [ ] Add book-specific metadata (author, publisher, ISBN, etc.)
- [ ] Build image gallery
- [ ] Add related books section
- [ ] Test add-to-cart flow

### Phase 5: Navigation & Header (Week 3)
- [ ] Design LRB-inspired masthead
- [ ] Build category navigation (BOOKS · JOURNALS · GIFTS)
- [ ] Integrate search
- [ ] Add cart drawer (from Dawn)
- [ ] Test mobile menu

### Phase 6: Homepage (Week 3-4)
- [ ] Build editorial hero section
- [ ] Build featured books grid
- [ ] Build category showcase
- [ ] Add editorial content blocks
- [ ] Newsletter signup

### Phase 7: Cart & Checkout (Week 4)
- [ ] Enhance Dawn's cart drawer
- [ ] Add ABCBook's quick-add
- [ ] Style cart UI
- [ ] Test checkout flow
- [ ] Add cart recommendations

### Phase 8: Polish (Week 4)
- [ ] Footer design
- [ ] Search results page
- [ ] 404 page
- [ ] Loading states
- [ ] Accessibility audit
- [ ] Performance optimization

---

## File Structure (Final)

```
/Users/ajmal/johnsir/dawn/
├── assets/
│   ├── base.css                    # Dawn's base (keep)
│   ├── lrb-design-system.css      # Custom design system
│   ├── lrb-typography.css         # LRB typography
│   ├── lrb-book-cards.css         # Book card styles
│   ├── component-cart.css         # Dawn's cart (keep)
│   └── theme.js                    # Dawn's JS (keep)
├── sections/
│   ├── header-lrb.liquid          # Custom header
│   ├── footer-lrb.liquid          # Custom footer
│   ├── hero-editorial.liquid      # Custom homepage hero
│   ├── featured-books.liquid      # Custom featured section
│   ├── main-collection.liquid     # Adapted from ABCBook
│   └── main-product.liquid        # Adapted from ABCBook
├── snippets/
│   ├── card-product-book.liquid   # Adapted from ABCBook
│   ├── book-metadata.liquid       # Custom book info
│   ├── price.liquid               # Adapted from ABCBook
│   └── quick-add.liquid           # Adapted from ABCBook
├── templates/
│   ├── index.json                 # Homepage template
│   ├── collection.json            # Collection template
│   └── product.json               # Product template
└── config/
    └── settings_schema.json       # Theme settings
```

---

## Integration Workflow

### For Each ABCBook Component

1. **Extract from ABCBook**
   ```bash
   git show abcbook/main:path/to/file.liquid > temp-file.liquid
   ```

2. **Analyze Dependencies**
   - Check what snippets it includes
   - Check what CSS classes it uses
   - Check what JS it requires
   - Note any ABCBook-specific settings

3. **Adapt to Dawn**
   - Replace ABCBook snippets with Dawn equivalents where possible
   - Update class names to match our design system
   - Remove ABCBook-specific settings
   - Add LRB-specific markup

4. **Test Integration**
   - Add to development store
   - Test functionality
   - Test responsive design
   - Check browser compatibility

5. **Document Changes**
   - Note what was changed
   - Document any Dawn features used
   - Document any custom code added

---

## Key Integration Rules

### DO
✅ Keep Dawn's core architecture intact  
✅ Port ABCBook components selectively  
✅ Adapt everything to LRB design system  
✅ Test each component individually  
✅ Maintain Shopify compatibility  
✅ Document all customizations

### DON'T
❌ Overwrite Dawn's base files  
❌ Copy ABCBook's entire design system  
❌ Mix ABCBook and Dawn CSS indiscriminately  
❌ Skip testing on development store  
❌ Forget mobile responsive design  
❌ Ignore Shopify theme requirements

---

## Testing Checklist

### Per Component
- [ ] Renders correctly on desktop
- [ ] Renders correctly on tablet
- [ ] Renders correctly on mobile
- [ ] Works with Dawn's cart
- [ ] Works with Dawn's navigation
- [ ] Matches LRB design aesthetic
- [ ] No console errors
- [ ] No broken dependencies

### Full Theme
- [ ] Homepage loads correctly
- [ ] Collection pages work
- [ ] Product pages work
- [ ] Cart and checkout flow works
- [ ] Search works
- [ ] Navigation works
- [ ] All sections editable in theme editor
- [ ] Performance score > 80
- [ ] Accessibility score > 90
- [ ] Works in Chrome, Safari, Firefox

---

## Licensing Compliance

### Dawn
- MIT License
- ✅ Can modify freely
- ✅ Can use for commercial projects
- ✅ Attribution not required but appreciated

### ABCBook
- ✅ Can use for client projects
- ✅ Can modify
- ❌ Cannot repackage and resell as theme
- Ensure compliance with ColorlibHQ terms

### LRB Design Inspiration
- Visual inspiration only
- No copyrighted assets used
- No trademark infringement
- Original implementation

---

## Budget Breakdown (£1,100)

| Phase | Estimated Hours | Cost Estimate |
|-------|----------------|---------------|
| Setup & planning | 4h | £100 |
| Design system | 8h | £200 |
| Book cards | 6h | £150 |
| Collection pages | 6h | £150 |
| Product pages | 8h | £200 |
| Navigation | 4h | £100 |
| Homepage | 6h | £150 |
| Polish & testing | 4h | £100 |
| **Total** | **46h** | **£1,150** |

*Slightly over budget - can reduce by simplifying Phase 8 polish*

---

## Next Steps

1. **Immediate**
   - Clone ABCBook locally for inspection
   - Audit ABCBook's sections/snippets
   - List exact files to port

2. **This Week**
   - Create design system CSS
   - Port first book card component
   - Test on development store

3. **Ongoing**
   - Follow phase-by-phase implementation
   - Test each component before moving on
   - Document all customizations

---

## Resources

- [Dawn Documentation](https://github.com/Shopify/dawn)
- [ABCBook Repository](https://github.com/ColorlibHQ/ABCBook)
- [LRB Store](https://shop.lrb.co.uk/) - Design reference
- [Shopify Liquid Reference](https://shopify.dev/docs/themes/liquid/reference)
- [Shopify Theme Requirements](https://shopify.dev/docs/themes/tools/theme-check)

---

## Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| Component conflicts | Test each port individually |
| Breaking Dawn features | Never overwrite Dawn core files |
| Design inconsistency | Strict design system adherence |
| Performance issues | Audit after each major phase |
| Budget overrun | Prioritize P0/P1 features first |
| Timeline slip | Weekly milestone reviews |

---

**Status:** Ready to begin  
**Next Action:** Clone ABCBook and audit target components  
**Owner:** Development team  
**Review Date:** Weekly during implementation
