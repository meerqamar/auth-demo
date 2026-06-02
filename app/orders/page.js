import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function OrdersPage() {
  const session = await auth();

  // Redirect to login if not authenticated
  if (!session?.user) {
    redirect('/api/auth/signin');
  }

  // Fetch user's orders from database
  const orders = await prisma.order.findMany({
    where: { userId: parseInt(session.user.id) },
    orderBy: { createdAt: 'desc' },
    include: {
      items: {
        include: { product: true }
      }
    }
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Your Order History</h1>
        
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center border border-slate-100">
            <span className="text-4xl mb-4 block">📦</span>
            <h3 className="text-xl font-semibold text-slate-700">No orders yet</h3>
            <p className="text-slate-500 mt-2 mb-6">Looks like you haven't made any purchases.</p>
            <a href="/" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center flex-wrap gap-4">
                  <div>
                    <span className="text-sm font-semibold text-slate-500 uppercase">Order #{order.id}</span>
                    <div className="text-sm text-slate-600 mt-1">
                      {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      order.status === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                    <div className="text-right">
                      <span className="text-sm text-slate-500 block">Total</span>
                      <span className="text-lg font-bold text-slate-900">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-sm text-slate-500 border-b border-slate-100">
                        <th className="pb-2 font-medium">Item</th>
                        <th className="pb-2 font-medium text-center">Qty</th>
                        <th className="pb-2 font-medium text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {order.items.map(item => (
                        <tr key={item.id}>
                          <td className="py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-lg">🛍️</div>
                              <span className="font-medium text-slate-700">{item.product.name}</span>
                            </div>
                          </td>
                          <td className="py-3 text-center text-slate-600">{item.quantity}</td>
                          <td className="py-3 text-right font-medium text-slate-800">${item.price.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}