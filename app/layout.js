import { Inter, Outfit, JetBrains_Mono } from 'next/font/google';
import VSCodeLayout from '@/components/VSCodeLayout';
import { TabProvider } from '@/components/TabContext';
import AnimationProvider from '@/components/AnimationProvider';
import PageTransition from '@/components/PageTransition';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Mithil Astik | Portfolio',
  description: 'Mithil Astik portfolio',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <AnimationProvider>
          <TabProvider>
            <VSCodeLayout>
              <PageTransition>
                {children}
              </PageTransition>
            </VSCodeLayout>
          </TabProvider>
        </AnimationProvider>
      </body>
    </html>
  );
}
