export default function CancelPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#f8fafc] px-6">
      <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-lg w-full border border-slate-100">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-5xl">⚠️</span>
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Checkout Cancelled</h1>
        <p className="text-lg text-slate-500 mb-8">
          Your payment process was cancelled and no charges were made. Your cart is still saved if you wish to complete your purchase later.
        </p>
        <a 
          href="/" 
          className="w-full inline-block bg-slate-900 text-white font-bold py-4 px-6 rounded-xl hover:bg-slate-800 transition-colors"
        >
          Return to Store
        </a>
      </div>
    </div>
  );
}
