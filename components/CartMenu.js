'use client';
import { useState } from 'react';
import { useCart } from '@/components/CartContext';

export default function CartMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { cart, removeFromCart, updateQuantity, isClient } = useCart();

  if (!isClient) return null; // Prevent hydration mismatch

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setLoading(true);
    try {
      // In a real app we'd pass the actual userId from the session if needed
      // but for this demo the webhook uses session metadata logic
      const res = await fetch('http://localhost:3001/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart, userId: 1 })
      });
      
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Checkout failed');
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert('Network error during checkout');
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-2 font-medium"
      >
        <span className="text-2xl">🛒</span>
        <span>Cart</span>
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-2 bg-fuchsia-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {itemCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-4 w-96 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/60 overflow-hidden z-50">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-lg text-slate-800">Your Cart</h3>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
          </div>
          
          <div className="max-h-96 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <p className="text-center text-slate-500 py-8">Your cart is empty.</p>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex justify-between items-center gap-4 bg-slate-50 p-3 rounded-xl">
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-800 text-sm truncate">{item.name}</h4>
                    <p className="text-indigo-600 font-bold text-sm">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2 bg-white rounded-lg border border-slate-200 p-1">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center text-slate-500 hover:bg-slate-100 rounded">-</button>
                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center text-slate-500 hover:bg-slate-100 rounded">+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 p-1">
                    🗑️
                  </button>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-4 border-t border-slate-100 bg-slate-50/50">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-slate-600">Total:</span>
                <span className="font-black text-xl text-slate-900">${totalPrice.toFixed(2)}</span>
              </div>
              <button 
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:transform-none"
              >
                {loading ? 'Processing...' : 'Checkout with Stripe'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
