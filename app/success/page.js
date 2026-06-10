'use client';
import { useEffect } from 'react';
import { useCart } from '@/components/CartContext';

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#f8fafc] px-6">
      <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-lg w-full border border-slate-100">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <span className="text-5xl">🎉</span>
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Payment Successful!</h1>
        <p className="text-lg text-slate-500 mb-8">
          Thank you for your purchase. We have received your order and an email confirmation has been sent to you.
        </p>
        <div className="flex flex-col gap-4">
          <a 
            href="/orders" 
            className="w-full block text-center bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-bold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            View Order History
          </a>
          <a 
            href="/" 
            className="w-full block text-center bg-slate-100 text-slate-700 font-bold py-4 px-6 rounded-xl hover:bg-slate-200 transition-colors"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    </div>
  );
}
