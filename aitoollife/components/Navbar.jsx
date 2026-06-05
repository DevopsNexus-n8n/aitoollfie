'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-dark-900/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
            <span className="text-white font-black text-sm">AI</span>
          </div>
          <span className="font-black text-lg tracking-tight">
            aitool<span className="text-brand-400">life</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${
              pathname === '/' ? 'text-white' : 'text-gray-500 hover:text-white'
            }`}
          >
            Home
          </Link>
          <Link
            href="/generate"
            className={`text-sm font-medium transition-colors ${
              pathname === '/generate' ? 'text-white' : 'text-gray-500 hover:text-white'
            }`}
          >
            Generate
          </Link>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-gray-500 hover:text-white transition-colors"
          >
            How It Works
          </a>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="/generate"
            className="hidden sm:block px-4 py-2 bg-brand-500 hover:bg-brand-400 text-white font-semibold rounded-lg text-sm transition-all"
          >
            Generate Script
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="w-5 h-px bg-current mb-1" />
            <div className="w-5 h-px bg-current mb-1" />
            <div className="w-5 h-px bg-current" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/5 bg-dark-900 px-4 py-4 space-y-3">
          <Link href="/" className="block text-sm text-gray-400 hover:text-white py-2" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/generate" className="block text-sm text-gray-400 hover:text-white py-2" onClick={() => setMenuOpen(false)}>Generate Script</Link>
          <Link href="/generate" className="block text-sm font-semibold text-brand-400 py-2" onClick={() => setMenuOpen(false)}>→ Start Generating</Link>
        </div>
      )}
    </nav>
  )
}
