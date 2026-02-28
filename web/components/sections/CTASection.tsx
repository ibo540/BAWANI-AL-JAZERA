'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

type CTADict = {
  title: string;
  description: string;
  button: string;
};

export function CTASection({ dict, locale }: { dict: CTADict; locale: string }) {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        animate={{
          boxShadow: [
            '0 25px 50px -12px rgba(0, 187, 190, 0.12), 0 0 0 1px rgba(0, 187, 190, 0.15)',
            '0 25px 55px -10px rgba(0, 187, 190, 0.2), 0 0 0 1px rgba(0, 187, 190, 0.25)',
            '0 25px 50px -12px rgba(0, 187, 190, 0.12), 0 0 0 1px rgba(0, 187, 190, 0.15)',
          ],
        }}
        transition={{
          opacity: { duration: 0.5, ease: 'easeOut' },
          scale: { duration: 0.5, ease: 'easeOut' },
          y: { duration: 0.5, ease: 'easeOut' },
          boxShadow: {
            duration: 3,
            repeat: Infinity,
            repeatType: 'reverse',
          },
        }}
        className="mx-auto max-w-4xl rounded-2xl border border-turquoise/30 bg-gradient-to-br from-turquoise/10 to-transparent p-12 text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-3xl font-bold text-foreground mb-4"
        >
          {dict.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-muted mb-8"
        >
          {dict.description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          animate={{
            scale: [1, 1.04, 1],
          }}
          transition={{
            opacity: { duration: 0.35, delay: 0.3 },
            scale: {
              duration: 2.2,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            },
          }}
          className="inline-block"
        >
          <Button href={`/${locale}/contact`} variant="primary" className="shadow-lg shadow-turquoise/25 hover:shadow-xl hover:shadow-turquoise/30">
            {dict.button}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
