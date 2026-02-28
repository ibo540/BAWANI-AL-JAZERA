'use client';

import { motion } from 'framer-motion';

export function SectionTitle({
  subtitle,
  title,
  className = '',
}: {
  subtitle: string;
  title: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
      className={`text-center max-w-2xl mx-auto ${className}`}
    >
      <p className="text-turquoise font-medium text-sm uppercase tracking-wider mb-2">{subtitle}</p>
      <h2 className="text-3xl sm:text-4xl font-bold text-foreground">{title}</h2>
    </motion.div>
  );
}
