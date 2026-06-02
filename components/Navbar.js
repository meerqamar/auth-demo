// components/NavBar.js

import { signIn, signOut, auth } from '@/auth'
import CartMenu from './CartMenu'

export default async function NavBar() {
  const session = await auth()

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
        <h2 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-fuchsia-600 tracking-tighter">
          GROWURK
        </h2>

        <div className="flex items-center gap-8">
          <CartMenu />

          {session ? (
            <div className="flex items-center gap-4 bg-slate-50 pl-2 pr-4 py-2 rounded-full border border-slate-200">
              <img
                src={session.user.image}
                width={32}
                height={32}
                className="rounded-full shadow-sm ring-2 ring-white"
                alt="Profile"
              />
              <span className="font-medium text-slate-700 text-sm">{session.user.name}</span>

              <form action={async () => {
                'use server'
                await signOut()
              }}>
                <button type="submit" className="text-sm font-semibold text-red-500 hover:text-red-700 ml-2 transition-colors">
                  Sign Out
                </button>
              </form>
            </div>
          ) : (
            <div className="flex gap-3">
              {/* Google Button */}
              <form action={async () => {
                'use server'
                await signIn('google')
              }}>
                <button type="submit" className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold py-2 px-4 rounded-xl shadow-sm transition-all flex items-center gap-2">
                  <span className="text-lg">G</span> Google
                </button>
              </form>

              {/* GitHub Button */}
              <form action={async () => {
                'use server'
                await signIn('github')
              }}>
                <button type="submit" className="bg-[#24292e] hover:bg-black text-white font-semibold py-2 px-4 rounded-xl shadow-sm transition-all flex items-center gap-2">
                  <span className="text-lg">🐙</span> GitHub
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}