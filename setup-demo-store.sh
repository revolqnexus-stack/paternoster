#!/bin/bash
# LRB Store Demo Data Setup Script
# Populates store with sample books and collections

STORE="pater-noster-jwjbtasv.myshopify.com"

echo "🔧 Setting up LRB Store demo data..."
echo "Store: $STORE"
echo ""

# Sample book data inspired by LRB Store
echo "📚 Creating sample products..."

# Product 1: LRB Tote Bag (matching real LRB Store item)
shopify product create --store=$STORE \
  --title="LRB Brown Canvas Tote Bag - LIMITED EDITION" \
  --description="Canvas tote bag featuring the London Review of Books logo. Durable, practical, and stylish." \
  --price=15.00 \
  --vendor="LRB Store" \
  --product-type="Merchandise" \
  --tags="Merchandise,Tote Bags,Limited Edition" \
  --status=active

# Product 2: Fiction
shopify product create --store=$STORE \
  --title="The New York Trilogy by Paul Auster" \
  --description="A groundbreaking postmodern detective trilogy that challenges the conventions of the genre. Three interconnected stories of mystery and identity." \
  --price=12.99 \
  --compare-at-price=16.99 \
  --vendor="LRB Store" \
  --product-type="Books" \
  --tags="Fiction,Literature,Paperback" \
  --status=active

# Product 3: Non-Fiction
shopify product create --store=$STORE \
  --title="Flights by Olga Tokarczuk" \
  --description="Winner of the International Booker Prize. A kaleidoscopic novel about travel, modernity, and the human body." \
  --price=14.99 \
  --vendor="LRB Store" \
  --product-type="Books" \
  --tags="Non-Fiction,Travel,Hardback" \
  --status=active

# Product 4: Poetry
shopify product create --store=$STORE \
  --title="Ariel by Sylvia Plath" \
  --description="The second collection of poetry by Sylvia Plath, published posthumously. Essential reading." \
  --price=11.99 \
  --vendor="LRB Store" \
  --product-type="Books" \
  --tags="Poetry,Classic,Paperback" \
  --status=active

# Product 5: Staff Pick
shopify product create --store=$STORE \
  --title="My Brilliant Friend by Elena Ferrante" \
  --description="The first book in the Neapolitan Novels quartet. A powerful story of friendship, family, and identity in post-war Italy." \
  --price=13.99 \
  --vendor="LRB Store" \
  --product-type="Books" \
  --tags="Fiction,Staff Picks,Paperback" \
  --status=active

# Product 6: LRB Subscription (matching real LRB Store)
shopify product create --store=$STORE \
  --title="LRB Subscription - 1 Year" \
  --description="Give the gift of incisive cultural criticism. One year subscription to the London Review of Books." \
  --price=29.99 \
  --vendor="LRB Store" \
  --product-type="Subscriptions" \
  --tags="Subscription,Gift" \
  --status=active

# Product 7: Audiobook (matching real LRB Store)
shopify product create --store=$STORE \
  --title="Becoming a Philosopher by Jonathan Rée - Audiobook" \
  --description="LRB audiobook collection exploring the journey of philosophical thought." \
  --price=18.99 \
  --vendor="LRB Store" \
  --product-type="Audiobooks" \
  --tags="Audiobooks,Philosophy,Digital" \
  --status=active

# Product 8: Sold out item
shopify product create --store=$STORE \
  --title="The London Review of Books Vol. 45 No. 23" \
  --description="Back issue of the LRB magazine. This issue is currently out of stock." \
  --price=8.99 \
  --vendor="LRB Store" \
  --product-type="Magazines" \
  --tags="Magazines,Back Issues" \
  --status=active \
  --inventory=0

echo ""
echo "📁 Creating collections..."

# Create collections
shopify collection create --store=$STORE \
  --title="Fiction" \
  --description="Literary fiction from around the world"

shopify collection create --store=$STORE \
  --title="Non-Fiction" \
  --description="Essays, memoirs, history, and cultural criticism"

shopify collection create --store=$STORE \
  --title="Poetry" \
  --description="Contemporary and classic poetry collections"

shopify collection create --store=$STORE \
  --title="LRB Merchandise" \
  --description="Authentic London Review of Books merchandise"

shopify collection create --store=$STORE \
  --title="Staff Picks" \
  --description="Recommended by our team"

shopify collection create --store=$STORE \
  --title="Audiobooks" \
  --description="LRB audiobook collections"

echo ""
echo "✅ Demo store setup complete!"
echo ""
echo "🌐 View your store at: https://$STORE"
echo "⚙️  Customize theme at: https://admin.shopify.com/store/pater-noster-jwjbtasv/themes"
echo ""
echo "Next steps:"
echo "1. Add product images in Shopify admin"
echo "2. Assign products to collections"
echo "3. Configure theme sections in customizer"
