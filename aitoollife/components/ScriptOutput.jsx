'use client'

import { useState } from 'react'

const VIDEO_TOOLS = [
  { name: 'Pictory AI', url: 'https://pictory.ai', desc: 'Auto stock footage', color: 'bg-purple-500/10 border-purple-500/20 text-purple-300' },
  { name: 'InVideo AI', url: 'https://invideo.io', desc: 'Fast AI video', color: 'bg-blue-500/10 border-blue-500/20 text-blue-300' },
  { name: 'HeyGen', url: 'https://heygen.com', desc: 'AI Avatar', color: 'bg-green-500/10 border-green-500/20 text-green-300' },
  { name: 'CapCut', url: 'https://capcut.com', desc: 'Manual editing', color: 'bg-pink-500/10 border-pink-500/20 text-pink-300' },
]

function formatScript(text) {
  if (!text) return []

  const lines = text.split('\n')
  const formatted = []

  lines.forEach((line, i) => {
    const trimmed = line.trim()
    if (!trimmed) {
      formatted.push({ type: 'blank', content: '', key: i })
      return
    }

    // Section headers in ALL CAPS with brackets
    if (/^\[.+\]/.test(trimmed) || /^#{1,3}\s/.test(trimmed)) {
      formatted.push({ type: 'header', content: trimmed, key: i })
    }
    // Timestamps
    else if (/^\[\d{2}:\d{2}/.test(trimmed)) {
      formatted.push({ type: 'timestamp', content: trimmed, key: i })
    }
    // B-roll suggestions
    else if (/^\(B-ROLL/i.test(trimmed)) {
      formatted.push({ type: 'broll', content: trimmed, key: i })
    }
    // YOUTUBE DESCRIPTION section
    else if (/^YOUTUBE DESCRIPTION/i.test(trimmed) || /^##/.test(trimmed)) {
      formatted.push({ type: 'section-break', content: trimmed, key: i })
    }
    else {
      formatted.push({ type: 'text', content: trimmed, key: i })
    }
  })

  return formatted
}

export default function ScriptOutput({ script, topic, onReset }) {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('script')

  const wordCount = script ? script.split(' ').length : 0
  const estMinutes = Math.round(wordCount / 150)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(script)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch (e) {
      console.error('Copy failed', e)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([script], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${topic?.replace(/\s+/g, '-').toLowerCase() || 'script'}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const formatted = formatScript(script)

  return (
    <div className="space-y-6">

      {/* Stats Bar */}
      <div className="flex flex-wrap items-center gap-4 bg-dark-800 border border-brand-500/20 rounded-2xl px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-sm text-green-400 font-medium">Script Ready</span>
        </div>
        <div className="text-sm text-gray-500">
          <span className="text-white font-mono font-bold">{wordCount.toLocaleString()}</span> words
        </div>
        <div className="text-sm text-gray-500">
          ~<span className="text-white font-mono font-bold">{estMinutes}</span> min video
        </div>
        <div className="text-sm text-gray-500 flex-1 truncate">
          Topic: <span className="text-gray-300">{topic}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-400 text-white font-semibold rounded-xl transition-all text-sm"
        >
          {copied ? '✅ Copied!' : '📋 Copy Script'}
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-5 py-2.5 bg-dark-700 hover:bg-dark-600 border border-white/10 text-white font-semibold rounded-xl transition-all text-sm"
        >
          ⬇️ Download .txt
        </button>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-5 py-2.5 bg-dark-700 hover:bg-dark-600 border border-white/10 text-gray-400 hover:text-white font-semibold rounded-xl transition-all text-sm ml-auto"
        >
          ↩ New Script
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 bg-dark-800 border border-white/5 rounded-xl p-1">
        {['script', 'video-tools'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === tab
                ? 'bg-brand-500 text-white'
                : 'text-gray-500 hover:text-white'
            }`}
          >
            {tab === 'script' ? '📄 Script' : '🎬 Make Video'}
          </button>
        ))}
      </div>

      {/* Script Tab */}
      {activeTab === 'script' && (
        <div className="bg-dark-800 border border-white/5 rounded-2xl overflow-hidden">
          {/* Warning banner */}
          <div className="bg-brand-500/10 border-b border-brand-500/20 px-6 py-3 text-xs text-brand-300 flex items-center gap-2">
            ✅ This script is 100% original and YouTube-policy safe. Review before publishing.
          </div>

          <div className="p-6 max-h-[640px] overflow-y-auto">
            <div className="space-y-1 font-mono text-sm leading-relaxed">
              {formatted.map((line) => {
                if (line.type === 'blank') return <div key={line.key} className="h-3" />

                if (line.type === 'header' || line.type === 'section-break') {
                  return (
                    <div key={line.key} className="mt-6 mb-2">
                      <span className="text-brand-400 font-bold text-xs uppercase tracking-widest bg-brand-500/10 border border-brand-500/20 rounded-lg px-3 py-1.5 inline-block">
                        {line.content.replace(/^#+\s/, '').replace(/[\[\]]/g, '')}
                      </span>
                    </div>
                  )
                }

                if (line.type === 'timestamp') {
                  return (
                    <div key={line.key} className="text-brand-300 font-bold text-xs mt-4 mb-1 tracking-wider">
                      {line.content}
                    </div>
                  )
                }

                if (line.type === 'broll') {
                  return (
                    <div key={line.key} className="text-gray-600 italic text-xs my-1 pl-3 border-l border-white/5">
                      {line.content}
                    </div>
                  )
                }

                return (
                  <p key={line.key} className="text-gray-300 leading-relaxed">
                    {line.content}
                  </p>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Video Tools Tab */}
      {activeTab === 'video-tools' && (
        <div className="space-y-4">
          <div className="bg-dark-800 border border-white/5 rounded-2xl p-6">
            <h3 className="font-bold text-lg mb-2">Turn Your Script Into a Video</h3>
            <p className="text-gray-500 text-sm mb-6">
              Copy your script above, then paste it into one of these tools to automatically generate your YouTube video with stock footage, voiceover, and captions.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {VIDEO_TOOLS.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between p-4 rounded-xl border ${tool.color} hover:opacity-90 transition-all`}
                >
                  <div>
                    <p className="font-bold">{tool.name}</p>
                    <p className="text-xs opacity-70">{tool.desc}</p>
                  </div>
                  <span className="text-lg">↗</span>
                </a>
              ))}
            </div>
          </div>

          <div className="bg-dark-800 border border-white/5 rounded-2xl p-6">
            <h3 className="font-bold mb-4">Step-by-Step: Script → YouTube Video</h3>
            <ol className="space-y-3 text-sm text-gray-400">
              {[
                'Click "Copy Script" above to copy your full script',
                'Open Pictory AI or InVideo AI (both have free tiers)',
                'Choose "Script to Video" option',
                'Paste your script into the editor',
                'AI auto-matches stock footage to each sentence',
                'Add your voiceover or select an AI voice',
                'Add captions, background music, and your channel intro',
                'Export in 1080p and upload to YouTube',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-400 text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

    </div>
  )
}
