'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export type FormDict = { name: string; email: string; phone: string; message: string; submit: string };

export function ContactForm({ dict }: { dict: FormDict }) {
  const [pending, setPending] = useState(false);

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="rounded-xl border border-slate bg-slate/50 p-8 space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        setPending(true);
        setTimeout(() => setPending(false), 500);
      }}
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
          {dict.name}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="w-full rounded-lg border border-slate bg-background px-4 py-3 text-foreground focus:border-turquoise focus:ring-1 focus:ring-turquoise"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
          {dict.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="w-full rounded-lg border border-slate bg-background px-4 py-3 text-foreground focus:border-turquoise focus:ring-1 focus:ring-turquoise"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
          {dict.phone}
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="w-full rounded-lg border border-slate bg-background px-4 py-3 text-foreground focus:border-turquoise focus:ring-1 focus:ring-turquoise"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
          {dict.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full rounded-lg border border-slate bg-background px-4 py-3 text-foreground focus:border-turquoise focus:ring-1 focus:ring-turquoise"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-turquoise px-4 py-3 font-semibold text-white transition-colors hover:opacity-90 disabled:opacity-50"
      >
        {dict.submit}
      </button>
    </motion.form>
  );
}
