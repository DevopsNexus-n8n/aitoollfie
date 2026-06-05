'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import ScriptForm from '@/components/ScriptForm'
import ScriptOutput from '@/components/ScriptOutput'

export default function GeneratePage() {
  const [script, setScript] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState(null)

  const handleGenerate = async (data) => {
    setIsGenerating(true)
    setError(null)
    setScript(null)
    setFormData(data)

    try {
      const res = await fetch('/api/generate-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const json = await res.json()

      if (!res.ok) throw new Error(json.error || 'Failed to generate script')

      setScript(json.script)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleReset = () => {
    setScript(null)
    setError(null)
    setFormData(null)
  }

  return (
    <main className="min-h-screen bg-dark-900">
      <Navbar />

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">

          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black mb-3">
              Script <span className="gradient-text">Generator</span>
            </h1>
            <p className="text-gray-500">
              Fill in the details below — AI will write your complete YouTube script.
            </p>
          </div>

          {/* Main Content */}
          {!script ? (
            <ScriptForm
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
              error={error}
            />
          ) : (
            <ScriptOutput
              script={script}
              topic={formData?.topic}
              onReset={handleReset}
            />
          )}

        </div>
      </div>
    </main>
  )
}
