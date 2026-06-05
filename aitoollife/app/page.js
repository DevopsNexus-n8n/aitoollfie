import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-900 overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative grid-bg pt-32 pb-24 px-4">
        {/* Radial glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-brand-500/5 blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-brand-500/30 bg-brand-500/10 rounded-full px-4 py-1.5 text-sm text-brand-300 mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse-slow" />
            AI-Powered YouTube Script Generator
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6">
            Create YouTube Scripts<br />
            <span className="gradient-text">Without Copy Issues</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Generate 100% original long-form YouTube scripts with AI. Structured, engaging, and fully YouTube-policy compliant — for your <span className="text-white font-medium">AI Tools & Tech</span> channel.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/generate"
              className="px-8 py-4 bg-brand-500 hover:bg-brand-400 text-white font-bold rounded-xl transition-all duration-200 text-lg glow-orange-sm hover:scale-105 active:scale-95"
            >
              Generate Your Script →
            </Link>
            <a
              href="#how-it-works"
              className="px-8 py-4 border border-white/10 hover:border-brand-500/40 text-white/70 hover:text-white font-medium rounded-xl transition-all duration-200 text-lg"
            >
              See How It Works
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 justify-center mt-16 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="text-brand-400 font-mono font-bold text-2xl">100%</span>
              <span>Original content</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-brand-400 font-mono font-bold text-2xl">0</span>
              <span>Copyright issues</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-brand-400 font-mono font-bold text-2xl">10+</span>
              <span>Minute scripts</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              From Idea to Video in <span className="gradient-text">3 Steps</span>
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">No more staring at a blank page. Our AI does the heavy lifting.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Enter Your Topic',
                desc: 'Type any AI tools or tech topic — our AI researches the best angle for your channel.',
                icon: '✏️'
              },
              {
                step: '02',
                title: 'AI Writes the Script',
                desc: 'Claude AI generates a full long-form script with hook, sections, and CTA. Fully original.',
                icon: '🤖'
              },
              {
                step: '03',
                title: 'Turn Into a Video',
                desc: 'Copy to Pictory, InVideo, or CapCut to auto-generate your YouTube video with footage.',
                icon: '🎬'
              }
            ].map((item) => (
              <div key={item.step} className="feature-card bg-dark-800 border border-white/5 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="font-mono text-brand-500/40 text-4xl font-black">{item.step}</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 bg-dark-800/30 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Built for <span className="gradient-text">YouTube Creators</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: 'YouTube Policy Safe',
                desc: 'Every script is written from scratch — no copied content, no flagged phrases, no copyright issues.',
                tag: 'Safety'
              },
              {
                title: 'Long-Form Optimized',
                desc: 'Scripts designed for 8–15 minute videos with proper pacing, hooks, and viewer retention techniques.',
                tag: 'Performance'
              },
              {
                title: 'AI Tools Niche Focus',
                desc: 'Understands AI tools, tech topics, and your audience. Writes like a real tech creator, not a robot.',
                tag: 'Niche'
              },
              {
                title: 'Timestamps & Chapters',
                desc: 'Auto-generates YouTube chapter markers. Copy-paste straight into your description.',
                tag: 'SEO'
              },
              {
                title: 'Hook + CTA Built In',
                desc: 'Every script has a proven hook in the first 30 seconds and strong CTAs for likes & subscribes.',
                tag: 'Engagement'
              },
              {
                title: 'Video-Ready Export',
                desc: 'One-click copy or download. Works directly with Pictory, InVideo AI, and CapCut.',
                tag: 'Workflow'
              }
            ].map((f) => (
              <div key={f.title} className="feature-card flex gap-4 bg-dark-800 border border-white/5 rounded-xl p-5">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold">{f.title}</h3>
                    <span className="text-xs border border-brand-500/30 text-brand-400 px-2 py-0.5 rounded-full">{f.tag}</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Tools Integration */}
      <section className="py-24 px-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Works With Your <span className="gradient-text">Video Tools</span>
          </h2>
          <p className="text-gray-500 mb-12 max-w-lg mx-auto">
            Copy your script and paste into any of these tools to generate the full video automatically.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Pictory AI', desc: 'Auto stock footage', free: '3 free/mo' },
              { name: 'InVideo AI', desc: 'Fast generation', free: '10 free/mo' },
              { name: 'HeyGen', desc: 'AI Avatar', free: '1 min free' },
              { name: 'CapCut', desc: 'Manual editing', free: '100% free' },
            ].map((tool) => (
              <div key={tool.name} className="feature-card bg-dark-800 border border-white/5 rounded-xl p-4 text-center">
                <p className="font-bold text-sm mb-1">{tool.name}</p>
                <p className="text-gray-500 text-xs mb-2">{tool.desc}</p>
                <span className="text-xs text-brand-400 font-mono">{tool.free}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <div className="animated-border rounded-2xl p-px">
            <div className="bg-dark-900 rounded-2xl p-12">
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                Ready to Create Your<br /><span className="gradient-text">Next Viral Video?</span>
              </h2>
              <p className="text-gray-500 mb-8">Generate your first long-form YouTube script in under 60 seconds.</p>
              <Link
                href="/generate"
                className="inline-block px-10 py-4 bg-brand-500 hover:bg-brand-400 text-white font-bold rounded-xl transition-all duration-200 text-lg glow-orange hover:scale-105 active:scale-95"
              >
                Start Generating — It's Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
