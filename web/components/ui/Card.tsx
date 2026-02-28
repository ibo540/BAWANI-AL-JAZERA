'use client';

import { motion } from 'framer-motion';

export function Card({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4 }}
      className={`rounded-xl border border-slate bg-slate/50 p-6 transition-shadow duration-200 hover:shadow-lg hover:shadow-turquoise/5 hover:border-turquoise/30 flex flex-col ${className}`}
    >
      {children}
    </motion.div>
  );
}
