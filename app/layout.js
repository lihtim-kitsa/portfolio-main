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
  title: 'Mithil Astik | Portfolio',
  description: 'Mithil Astik portfolio - Deltarune Edition',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${vt323.variable}`}
      suppressHydrationWarning
    >
      <body>
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
