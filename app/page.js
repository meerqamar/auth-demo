import ProductCard from '@/components/ProductCard';

export const dynamic = 'force-dynamic';
export default async function Home() {
  let products = [];
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const res = await fetch(`${apiUrl}/api/products`, { cache: 'no-store' });
    if (res.ok) {
      products = await res.json();
    } else {
      console.error('Failed to fetch products:', res.statusText);
    }
  } catch (error) {
    console.error('API connection error:', error);
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans pt-12 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600 mb-4 tracking-tight">
            Discover Our Collection
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Experience the finest quality products meticulously curated for you.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center p-12 bg-white rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-semibold text-slate-800">No products found</h3>
            <p className="text-slate-500 mt-2">Make sure your Express API is running on port 3001!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
