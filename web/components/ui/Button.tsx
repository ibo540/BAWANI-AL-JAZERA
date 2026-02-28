'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
};

export function Button({
  children,
  href,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-turquoise focus:ring-offset-2 focus:ring-offset-background';
  const variants = {
    primary:
      'bg-turquoise text-white hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-turquoise/20',
    secondary:
      'border-2 border-turquoise text-turquoise hover:bg-turquoise/10 hover:scale-[1.02] active:scale-[0.98]',
    ghost: 'text-turquoise hover:bg-turquoise/10',
  };

  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href}>
        <motion.span
          className={cls}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {children}
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      className={cls}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
