'use client';

import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const transition = { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const };

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={transition}
        className="min-h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
