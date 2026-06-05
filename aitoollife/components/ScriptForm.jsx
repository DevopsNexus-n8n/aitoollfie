'use client'

import { useState } from 'react'

const TONE_OPTIONS = [
  { value: 'informative', label: 'Informative & Clear' },
  { value: 'excited', label: 'Excited & Energetic' },
  { value: 'conversational', label: 'Conversational & Chill' },
  { value: 'professional', label: 'Professional & Authoritative' },
  { value: 'storytelling', label: 'Story-Driven & Narrative' },
]

const DURATION_OPTIONS = [
  { value: '5', label: '5 min (~750 words)' },
  { value: '8', label: '8 min (~1,200 words)' },
  { value: '10', label: '10 min (~1,500 words)' },
  { value: '15', label: '15 min (~2,250 words)' },
  { value: '20', label: '20 min (~3,000 words)' },
]

const TOPIC_SUGGESTIONS = [
  'Top 5 AI Tools That Will Change Your Workflow in 2025',
  'ChatGPT vs Claude vs Gemini — Which AI is Best?',
  'How to Use AI to Make YouTube Videos Automatically',
  'Best Free AI Image Generators Compared',
  'I Used AI for 30 Days — Here\'s What Happened',
]

export default function ScriptForm({ onGenerate, isGenerating, error }) {
  const [form, setForm] = useState({
    topic: '',
    duration: '10',
    tone: 'informative',
    targetAudience: 'beginners and tech enthusiasts interested in AI tools',
    additionalNotes: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.topic.trim()) return
    onGenerate(form)
  }

  const fillSuggestion = (suggestion) => {
    setForm(prev => ({ ...prev, topic: suggestion }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Topic */}
      <div className="bg-dark-800 border border-white/5 rounded-2xl p-6">
        <label className="block text-sm font-semibold text-white/70 mb-3 uppercase tracking-wider">
          Video Topic *
        </label>
        <input
          type="text"
          value={form.topic}
          onChange={e => setForm(prev => ({ ...prev, topic: e.target.value }))}
          placeholder="e.g. Top 5 AI Tools That Will Change Your Workflow in 2025"
          className="w-full bg-dark-700/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all"
          required
        />

        {/* Suggestions */}
        <div className="mt-3">
          <p className="text-xs text-gray-600 mb-2">Quick suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {TOPIC_SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => fillSuggestion(s)}
                className="text-xs bg-dark-700/50 border border-white/5 hover:border-brand-500/30 hover:text-brand-300 text-gray-500 rounded-lg px-3 py-1.5 transition-all truncate max-w-[240px]"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Duration & Tone */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-dark-800 border border-white/5 rounded-2xl p-6">
          <label className="block text-sm font-semibold text-white/70 mb-3 uppercase tracking-wider">
            Video Duration
          </label>
          <div className="grid grid-cols-1 gap-2">
            {DURATION_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className={`flex items-center gap-3 cursor-pointer rounded-xl px-4 py-3 border transition-all ${
                  form.duration === opt.value
                    ? 'border-brand-500/50 bg-brand-500/10 text-white'
                    : 'border-white/5 hover:border-white/10 text-gray-400'
                }`}
              >
                <input
                  type="radio"
                  name="duration"
                  value={opt.value}
                  checked={form.duration === opt.value}
                  onChange={e => setForm(prev => ({ ...prev, duration: e.target.value }))}
                  className="sr-only"
                />
                <span className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${
                  form.duration === opt.value ? 'border-brand-500 bg-brand-500' : 'border-white/20'
                }`} />
                <span className="text-sm">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-dark-800 border border-white/5 rounded-2xl p-6">
          <label className="block text-sm font-semibold text-white/70 mb-3 uppercase tracking-wider">
            Script Tone
          </label>
          <div className="grid grid-cols-1 gap-2">
            {TONE_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className={`flex items-center gap-3 cursor-pointer rounded-xl px-4 py-3 border transition-all ${
                  form.tone === opt.value
                    ? 'border-brand-500/50 bg-brand-500/10 text-white'
                    : 'border-white/5 hover:border-white/10 text-gray-400'
                }`}
              >
                <input
                  type="radio"
                  name="tone"
                  value={opt.value}
                  checked={form.tone === opt.value}
                  onChange={e => setForm(prev => ({ ...prev, tone: e.target.value }))}
                  className="sr-only"
                />
                <span className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${
                  form.tone === opt.value ? 'border-brand-500 bg-brand-500' : 'border-white/20'
                }`} />
                <span className="text-sm">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Target Audience */}
      <div className="bg-dark-800 border border-white/5 rounded-2xl p-6">
        <label className="block text-sm font-semibold text-white/70 mb-3 uppercase tracking-wider">
          Target Audience
        </label>
        <input
          type="text"
          value={form.targetAudience}
          onChange={e => setForm(prev => ({ ...prev, targetAudience: e.target.value }))}
          placeholder="e.g. beginners and tech enthusiasts interested in AI tools"
          className="w-full bg-dark-700/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all"
        />
      </div>

      {/* Additional Notes */}
      <div className="bg-dark-800 border border-white/5 rounded-2xl p-6">
        <label className="block text-sm font-semibold text-white/70 mb-3 uppercase tracking-wider">
          Additional Notes <span className="text-gray-600 normal-case font-normal">(optional)</span>
        </label>
        <textarea
          value={form.additionalNotes}
          onChange={e => setForm(prev => ({ ...prev, additionalNotes: e.target.value }))}
          placeholder="Any specific points to cover, tools to mention, style preferences, or things to avoid..."
          rows={3}
          className="w-full bg-dark-700/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isGenerating || !form.topic.trim()}
        className="w-full py-4 bg-brand-500 hover:bg-brand-400 disabled:bg-dark-600 disabled:text-gray-600 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-200 text-lg glow-orange-sm hover:scale-[1.01] active:scale-[0.99]"
      >
        {isGenerating ? (
          <span className="flex items-center justify-center gap-3">
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Generating Your Script... (30–60 sec)
          </span>
        ) : (
          '✨ Generate Script'
        )}
      </button>

      {/* Disclaimer */}
      <p className="text-center text-xs text-gray-600">
        Scripts are 100% AI-generated and original. Always review before publishing.
      </p>

    </form>
  )
}
