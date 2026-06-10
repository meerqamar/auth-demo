'use client';

import { signIn, signOut } from "next-auth/react";

export function GoogleSignInButton() {
  return (
    <button 
      onClick={() => signIn('google')} 
      className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold py-2 px-4 rounded-xl shadow-sm transition-all flex items-center gap-2"
    >
      <span className="text-lg">G</span> Google
    </button>
  );
}

export function GitHubSignInButton() {
  return (
    <button 
      onClick={() => signIn('github')} 
      className="bg-[#24292e] hover:bg-black text-white font-semibold py-2 px-4 rounded-xl shadow-sm transition-all flex items-center gap-2"
    >
      <span className="text-lg">🐙</span> GitHub
    </button>
  );
}

export function SignOutButton() {
  return (
    <button 
      onClick={() => signOut()} 
      className="text-sm font-semibold text-red-500 hover:text-red-700 ml-2 transition-colors"
    >
      Sign Out
    </button>
  );
}
