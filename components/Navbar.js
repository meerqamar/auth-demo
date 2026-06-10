// components/NavBar.js

import { auth } from '@/auth'
import CartMenu from './CartMenu'
import { GoogleSignInButton, GitHubSignInButton, SignOutButton } from './AuthButtons'

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
            <div className="flex items-center gap-4">
              <a
                href="/orders"
                className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
              >
                📦 Orders
              </a>
              <div className="flex items-center gap-4 bg-slate-50 pl-2 pr-4 py-2 rounded-full border border-slate-200">
                <img
                  src={session.user.image}
                  width={32}
                  height={32}
                  className="rounded-full shadow-sm ring-2 ring-white"
                  alt="Profile"
                />
                <span className="font-medium text-slate-700 text-sm">{session.user.name}</span>
                <SignOutButton />
              </div>
            </div>
          ) : (
            <div className="flex gap-3">
              <GoogleSignInButton />
              <GitHubSignInButton />
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}