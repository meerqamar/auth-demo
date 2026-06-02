'use client';
import { useCart } from '@/components/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white/70 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="h-48 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center p-6">
        {/* Placeholder for product image */}
        <div className="w-24 h-24 bg-white rounded-full shadow-inner flex items-center justify-center text-4xl">
          🛍️
        </div>
      </div>
      <div className="p-6">
        <div className="text-sm text-indigo-600 font-semibold mb-1 uppercase tracking-wider">
          Category {product.categoryId}
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">{product.name}</h3>
        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-black text-slate-900">${product.price.toFixed(2)}</span>
          {product.stock > 0 ? (
            <button
              onClick={() => addToCart(product)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              Add to Cart
            </button>
          ) : (
            <span className="text-red-500 font-semibold bg-red-50 px-3 py-1 rounded-full">Out of Stock</span>
          )}
        </div>
      </div>
    </div>
  );
}
