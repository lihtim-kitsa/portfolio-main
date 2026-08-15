import { VT323 } from 'next/font/google';
import MainLayout from '@/components/MainLayout';
import AnimationProvider from '@/components/AnimationProvider';
import PageTransition from '@/components/PageTransition';
import './globals.css';

const vt323 = VT323({
  weight: '400',
  variable: '--font-vt323',
  subsets: ['latin'],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Mithil Astik | Portfolio',
  description: 'Mithil Astik portfolio - Deltarune Edition',
  openGraph: {
    title: 'Mithil Astik | Portfolio',
    description: 'Mithil Astik portfolio - Deltarune Edition',
    url: '/',
    siteName: 'Mithil Astik | Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mithil Astik Portfolio SANS',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mithil Astik | Portfolio',
    description: 'Mithil Astik portfolio - Deltarune Edition',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${vt323.variable}`}
      suppressHydrationWarning
    >
      <body>
        <noscript>
          <div style={{ padding: '2rem', fontFamily: 'monospace', color: 'white', background: 'black' }}>
            <h1>Mithil Astik | Portfolio</h1>
            <p>ML Engineer, Web Developer, Designer.</p>
            <ul>
              <li><a href="/projects">Projects</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/resume.pdf">Resume</a></li>
            </ul>
          </div>
        </noscript>
        <AnimationProvider>
          <MainLayout>
            <PageTransition>
              {children}
            </PageTransition>
          </MainLayout>
        </AnimationProvider>
      </body>
    </html>
  );
}
