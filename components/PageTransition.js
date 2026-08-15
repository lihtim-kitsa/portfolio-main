'use client';

import { m, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <m.div
        key={pathname}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.15, ease: "easeInOut" }}
        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        {children}
      </m.div>
    </AnimatePresence>
  );
}
