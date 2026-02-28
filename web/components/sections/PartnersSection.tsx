'use client';

import { SectionTitle } from '@/components/ui/SectionTitle';
import { motion } from 'framer-motion';

/* Landmarks: UAE, China, Turkey – Mixkit free stock videos (720p, loop, muted) */
const PARTNER_LANDMARKS = [
  {
    country: 'UAE',
    name: 'Burj Khalifa, Dubai',
    video: 'https://assets.mixkit.co/videos/20114/20114-720.mp4',
    poster: 'https://assets.mixkit.co/videos/20114/20114-thumb-720-3.jpg',
  },
  {
    country: 'China',
    name: 'Shanghai urban cityscape',
    video: 'https://assets.mixkit.co/videos/31089/31089-720.mp4',
    poster: 'https://assets.mixkit.co/videos/31089/31089-thumb-720-0.jpg',
  },
  {
    country: 'Turkey',
    name: 'Istanbul',
    video: 'https://assets.mixkit.co/videos/29043/29043-720.mp4',
    poster: 'https://assets.mixkit.co/videos/29043/29043-thumb-720-0.jpg',
  },
] as const;

export type PartnersDict = {
  subtitle: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
  tagline: string; // e.g. "ALWAYS READY TO PLEASE YOUR NEEDS" — will be split by spaces for vertical display
};

const defaultDict: PartnersDict = {
  subtitle: 'Global Collaboration',
  title: 'Our Partners',
  paragraph1:
    "Our partnership includes procurement from UAE, People's Republic of China, and Turkey that is proportional to what agrees with Saudi Arabia standards as part of the collaboration, creativity and commitment that we share. We work together to identify opportunities for cost optimization and improved performance, and to source efficient and reliable UAE, Chinese, and Turkish precursors that meet Saudi Arabia's quality and innovation standards.",
  paragraph2:
    "Procurement from China, Dubai and Turkey is an integral part of our collaborative approach, and we use it to create value for our customers and help them get projects done. With our partnership, we have the potential to provide great value to both parties, and we look forward to continuing to build on our success for years to come.",
  tagline: 'ALWAYS READY TO PLEASE YOUR NEEDS',
};

export function PartnersSection({ dict = defaultDict }: { dict?: Partial<PartnersDict> }) {
  const d = { ...defaultDict, ...dict };
  const taglineWords = d.tagline.split(/\s+/);

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Three-column landmark video background */}
      <div className="absolute inset-0 grid grid-cols-3" aria-hidden>
        {PARTNER_LANDMARKS.map(({ country, video, poster }) => (
          <div key={country} className="relative w-full h-full overflow-hidden">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src={video}
              poster={poster}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            />
          </div>
        ))}
      </div>
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-charcoal/75 backdrop-saturate-150" aria-hidden />
      <div className="relative z-10 mx-auto max-w-5xl">
        <SectionTitle subtitle={d.subtitle} title={d.title} className="mb-12" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4 }}
          className="space-y-6 text-muted text-base leading-relaxed max-w-3xl mx-auto text-center"
        >
          <p>{d.paragraph1}</p>
          <p>{d.paragraph2}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-16 flex justify-center"
        >
          <div className="relative inline-flex flex-col items-center justify-center gap-1 rounded-2xl border border-turquoise/40 bg-slate/40 backdrop-blur-sm px-10 py-8 shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_4px_24px_-4px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.06)] ring-1 ring-turquoise/20">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-turquoise/10 via-transparent to-transparent pointer-events-none" aria-hidden />
            {taglineWords.map((word, i) => (
              <span
                key={i}
                className="relative text-turquoise font-bold text-lg sm:text-xl tracking-[0.2em] uppercase drop-shadow-[0_0_20px_rgba(0,180,180,0.15)]"
              >
                {word}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
