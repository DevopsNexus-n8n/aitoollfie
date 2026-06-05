import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-4 mt-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center">
              <span className="text-white font-black text-xs">AI</span>
            </div>
            <span className="font-black tracking-tight">
              aitool<span className="text-brand-400">life</span>
            </span>
            <span className="text-gray-600 text-sm ml-2">— YouTube Script Generator</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/generate" className="hover:text-white transition-colors">Generate</Link>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          </div>

          <p className="text-xs text-gray-700">
            © {new Date().getFullYear()} aitoollife.com — All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
