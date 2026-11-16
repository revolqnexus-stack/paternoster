// Shopify Storefront API client

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

const endpoint = `https://${domain}/api/2024-01/graphql.json`;

async function shopifyFetch<T>({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, any>;
}): Promise<T> {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();

    if (json.errors) {
      throw new Error(json.errors[0].message);
    }

    return json.data;
  } catch (error) {
    console.error('Shopify API Error:', error);
    throw error;
  }
}

export async function getProducts(first: number = 20) {
  const query = `
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                  width
                  height
                }
              }
            }
            tags
            availableForSale
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ products: any }>({
    query,
    variables: { first },
  });

  return data.products.edges.map((edge: any) => edge.node);
}

export async function getProduct(handle: string) {
  const query = `
    query GetProduct($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        description
        descriptionHtml
        tags
        availableForSale
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
              width
              height
            }
          }
        }
        variants(first: 50) {
          edges {
            node {
              id
              title
              availableForSale
              priceV2 {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ productByHandle: any }>({
    query,
    variables: { handle },
  });

  return data.productByHandle;
}

export async function createCart() {
  const query = `
    mutation CreateCart {
      cartCreate {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    priceV2 {
                      amount
                      currencyCode
                    }
                    product {
                      title
                      images(first: 1) {
                        edges {
                          node {
                            url
                            altText
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          estimatedCost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ cartCreate: { cart: any } }>({ query });
  return data.cartCreate.cart;
}

export async function addToCart(cartId: string, merchandiseId: string, quantity: number = 1) {
  const query = `
    mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 50) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    priceV2 {
                      amount
                      currencyCode
                    }
                    product {
                      title
                      handle
                      images(first: 1) {
                        edges {
                          node {
                            url
                            altText
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          estimatedCost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ cartLinesAdd: { cart: any } }>({
    query,
    variables: {
      cartId,
      lines: [{ merchandiseId, quantity }],
    },
  });

  return data.cartLinesAdd.cart;
}

export async function removeFromCart(cartId: string, lineIds: string[]) {
  const query = `
    mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          lines(first: 50) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    priceV2 {
                      amount
                      currencyCode
                    }
                    product {
                      title
                    }
                  }
                }
              }
            }
          }
          estimatedCost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ cartLinesRemove: { cart: any } }>({
    query,
    variables: { cartId, lineIds },
  });

  return data.cartLinesRemove.cart;
}

export async function getCart(cartId: string) {
  const query = `
    query GetCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    handle
                    images(first: 1) {
                      edges {
                        node {
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          estimatedCost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ cart: any }>({ query, variables: { cartId } });
  return data.cart;
}
