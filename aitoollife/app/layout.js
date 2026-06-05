import './globals.css'

export const metadata = {
  title: 'AI Tool Life — YouTube Script & Video Generator',
  description: 'Generate long-form YouTube scripts and videos powered by AI. 100% original content, YouTube-policy safe.',
  keywords: 'AI YouTube script generator, long form video script, AI tools, YouTube automation',
  openGraph: {
    title: 'AI Tool Life — YouTube Script & Video Generator',
    description: 'Generate long-form YouTube scripts powered by AI. 100% original, YouTube-safe.',
    url: 'https://aitoollife.com',
    siteName: 'AI Tool Life',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-dark-900 text-white antialiased" style={{fontFamily: "'Syne', sans-serif"}}>
        {children}
      </body>
    </html>
  )
}
