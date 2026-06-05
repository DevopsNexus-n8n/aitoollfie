import Anthropic from '@anthropic-ai/sdk'

export async function POST(req) {
  try {
    const body = await req.json()
    const { topic, duration, tone, targetAudience, additionalNotes } = body

    if (!topic) {
      return Response.json({ error: 'Topic is required' }, { status: 400 })
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return Response.json({ error: 'API key not configured' }, { status: 500 })
    }

    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })

    const wordCount = (parseInt(duration) || 10) * 150
    const toneLabel = tone || 'informative and engaging'
    const audience = targetAudience || 'tech enthusiasts and beginners interested in AI tools'

    const systemPrompt = `You are an expert YouTube scriptwriter for the channel "AI Tool Life" — a channel focused on AI tools, tech tutorials, and productivity software for a tech-savvy audience.

Your scripts are:
- 100% ORIGINAL — never copy, paraphrase, or reference specific content from existing YouTube videos or websites
- YouTube-policy compliant — no copyrighted phrases, no brand slogans, no misleading claims
- Naturally spoken — written the way a real person talks, with contractions, pauses, and conversational flow
- Highly engaging — every 30 seconds has a reason to keep watching
- SEO optimized — naturally includes relevant keywords throughout

Script structure rules:
1. HOOK (first 30 seconds) — bold statement or question that grabs attention immediately
2. INTRO (30s–1min) — introduce the topic, preview what viewer will learn, brief channel intro
3. MAIN CONTENT (3–5 sections, each with clear label and [TIMESTAMP])
4. TRANSITION lines between sections to maintain flow
5. OUTRO — summarize key takeaways, strong CTA for like/subscribe/comment

Formatting rules:
- Use [00:00] timestamp format at the start of each section
- Use ALL CAPS for section headers like [HOOK], [INTRO], [SECTION 1: Title], etc.
- Add (B-ROLL SUGGESTION: ...) notes after key points for video editing
- Write naturally — no bullet points mid-script, only flowing paragraphs
- End every section with a smooth transition sentence to the next`

    const userPrompt = `Write a complete, production-ready YouTube script for the "AI Tool Life" channel.

Topic: ${topic}
Target Duration: ${duration || 10} minutes (~${wordCount} words)
Tone: ${toneLabel}
Target Audience: ${audience}
${additionalNotes ? `Additional Notes: ${additionalNotes}` : ''}

Requirements:
- Start with an INCREDIBLE hook that stops the scroll
- Include 4-5 main content sections with timestamps
- Each section must have at least 2-3 B-ROLL suggestions
- Natural transitions between every section
- Include 2-3 specific, practical tips the viewer can apply immediately
- End with a strong outro and CTA
- After the script, add a "YOUTUBE DESCRIPTION" section with:
  - SEO-optimized description (150 words)
  - 10 relevant hashtags
  - Chapter timestamps

Write the COMPLETE script now — don't truncate or summarize:`

    const message = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 8000,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    })

    const scriptText = message.content[0]?.text || ''

    return Response.json({
      script: scriptText,
      usage: message.usage,
    })

  } catch (err) {
    console.error('Script generation error:', err)

    if (err?.status === 401) {
      return Response.json({ error: 'Invalid API key. Check your ANTHROPIC_API_KEY.' }, { status: 401 })
    }
    if (err?.status === 429) {
      return Response.json({ error: 'Rate limit reached. Try again in a moment.' }, { status: 429 })
    }

    return Response.json(
      { error: err.message || 'Failed to generate script. Please try again.' },
      { status: 500 }
    )
  }
}
