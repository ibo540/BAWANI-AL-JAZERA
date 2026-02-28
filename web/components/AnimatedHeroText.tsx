'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

// Animates each WORD sliding up from behind a clip mask — the #1 Awwwards text effect
interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;         // initial delay before animation starts (seconds)
  stagger?: number;       // delay between each word (seconds)
  duration?: number;      // duration of each word reveal (seconds)
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export function AnimatedText({
  text,
  className = '',
  delay = 0,
  stagger = 0.08,
  duration = 0.75,
  as: Tag = 'p',
}: AnimatedTextProps) {
  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: '110%',
      opacity: 0,
    },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration,
        ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuart — cinematic feel
      },
    },
  };

  const MotionTag = motion[Tag] as typeof motion.p;

  return (
    <MotionTag
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25em' }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{ overflow: 'hidden', display: 'inline-block', paddingBottom: '0.1em' }}
        >
          <motion.span
            variants={wordVariants}
            style={{ display: 'inline-block' }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

// Fades + slides up a single block (for buttons, badges, etc.)
interface AnimatedFadeUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function AnimatedFadeUp({ children, delay = 0, className = '' }: AnimatedFadeUpProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}
