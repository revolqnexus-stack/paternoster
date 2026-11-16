import { getProducts } from '@/lib/shopify';

export default async function DebugPage() {
  let products;
  let error;
  
  try {
    products = await getProducts(3);
  } catch (e: any) {
    error = e.message;
  }

  return (
    <div className="p-8 bg-white">
      <h1 className="text-2xl font-bold mb-4">Debug: Shopify API Response</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {products && (
        <div>
          <p className="mb-4">Products fetched: {products.length}</p>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-xs">
            {JSON.stringify(products, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
