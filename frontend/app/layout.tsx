import './globals.css'
import Header from '@/app/components/header'

export const metadata = {
  title: 'EasyReview',
  description: 'Web-based tool for reviewing datasets',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="light">
      <body
        className="min-h-screen pattern-wavy pattern-slate-100 pattern-bg-white pattern-size-32 pattern-opacity-100"
      >
        <div className="z-50 mx-52">
          <Header />
          <main>
            {children}
          </main>
        </div>
      </body>
    </html >
  )
}
