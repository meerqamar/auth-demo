import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from '@/components/Navbar'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GROWURK Store — Premium Ecommerce",
  description: "Shop the finest curated collection of products. Google login, Stripe checkout, and order tracking — all in one seamless experience.",
};

import { CartProvider } from '@/components/CartContext';

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f8fafc] text-slate-900">
        <CartProvider>
          <NavBar />
          <main className="flex-1">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
