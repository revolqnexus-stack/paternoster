/**
 * LRB Store Demo Product Setup
 * Uses Shopify Admin API to create sample products
 */

const https = require('https');

const STORE = 'pater-noster-jwjbtasv.myshopify.com';

// Sample products based on real LRB Store
const products = [
  {
    title: "LRB Brown Canvas Tote Bag - LIMITED EDITION",
    body_html: "<p>Canvas tote bag featuring the London Review of Books logo. Durable, practical, and stylish.</p>",
    vendor: "LRB Store",
    product_type: "Merchandise",
    tags: ["Merchandise", "Tote Bags", "Limited Edition"],
    variants: [{ price: "15.00", inventory_quantity: 50 }]
  },
  {
    title: "The New York Trilogy by Paul Auster",
    body_html: "<p>A groundbreaking postmodern detective trilogy that challenges the conventions of the genre. Three interconnected stories of mystery and identity.</p>",
    vendor: "LRB Store",
    product_type: "Books",
    tags: ["Fiction", "Literature", "Paperback"],
    variants: [{ price: "12.99", compare_at_price: "16.99", inventory_quantity: 100 }]
  },
  {
    title: "Flights by Olga Tokarczuk",
    body_html: "<p>Winner of the International Booker Prize. A kaleidoscopic novel about travel, modernity, and the human body.</p>",
    vendor: "LRB Store",
    product_type: "Books",
    tags: ["Non-Fiction", "Travel", "Hardback"],
    variants: [{ price: "14.99", inventory_quantity: 75 }]
  },
  {
    title: "Ariel by Sylvia Plath",
    body_html: "<p>The second collection of poetry by Sylvia Plath, published posthumously. Essential reading.</p>",
    vendor: "LRB Store",
    product_type: "Books",
    tags: ["Poetry", "Classic", "Paperback"],
    variants: [{ price: "11.99", inventory_quantity: 60 }]
  },
  {
    title: "My Brilliant Friend by Elena Ferrante",
    body_html: "<p>The first book in the Neapolitan Novels quartet. A powerful story of friendship, family, and identity in post-war Italy.</p>",
    vendor: "LRB Store",
    product_type: "Books",
    tags: ["Fiction", "Staff Picks", "Paperback"],
    variants: [{ price: "13.99", inventory_quantity: 80 }]
  },
  {
    title: "LRB Subscription - 1 Year",
    body_html: "<p>Give the gift of incisive cultural criticism. One year subscription to the London Review of Books.</p><p><strong>Gift is not available to customers outside the UK. One gift per subscription. While stocks last.</strong></p>",
    vendor: "LRB Store",
    product_type: "Subscriptions",
    tags: ["Subscription", "Gift"],
    variants: [{ price: "29.99", inventory_quantity: 999 }]
  },
  {
    title: "Becoming a Philosopher by Jonathan Rée - Audiobook",
    body_html: "<p>LRB audiobook collection exploring the journey of philosophical thought.</p>",
    vendor: "LRB Store",
    product_type: "Audiobooks",
    tags: ["Audiobooks", "Philosophy", "Digital"],
    variants: [{ price: "18.99", inventory_quantity: 999 }]
  },
  {
    title: "The London Review of Books Vol. 45 No. 23",
    body_html: "<p>Back issue of the LRB magazine. This issue is currently out of stock.</p>",
    vendor: "LRB Store",
    product_type: "Magazines",
    tags: ["Magazines", "Back Issues"],
    variants: [{ price: "8.99", inventory_quantity: 0 }]
  }
];

console.log('╭─────────────────────────────────────────────────────────────────╮');
console.log('│  LRB Store Demo Product Setup                                   │');
console.log('╰─────────────────────────────────────────────────────────────────╯');
console.log('');
console.log('⚠️  IMPORTANT: This script requires Shopify Admin API access.');
console.log('');
console.log('To populate products, you need to:');
console.log('');
console.log('1. Go to: https://admin.shopify.com/store/pater-noster-jwjbtasv/settings/apps/development');
console.log('2. Create a custom app with "Admin API" access');
console.log('3. Grant these scopes: write_products, write_collections');
console.log('4. Get your Admin API access token');
console.log('5. Set environment variable: export SHOPIFY_ACCESS_TOKEN=your_token');
console.log('6. Re-run this script');
console.log('');
console.log('📚 Sample products ready to create:');
products.forEach((p, i) => {
  console.log(`   ${i + 1}. ${p.title} - £${p.variants[0].price}`);
});
console.log('');
console.log('💡 OR use the Shopify Admin UI manually:');
console.log('   https://admin.shopify.com/store/pater-noster-jwjbtasv/products');
console.log('');
