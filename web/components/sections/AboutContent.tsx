'use client';

import { motion } from 'framer-motion';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Building2, Eye, Target, Users } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export function AboutContent({ about }: { about: Record<string, string> }) {
  const values = [
    { key: 'integrity', title: about.integrity, desc: about.integrityDesc },
    { key: 'excellence', title: about.excellence, desc: about.excellenceDesc },
    { key: 'partnership', title: about.partnership, desc: about.partnershipDesc },
  ];

  const storyParagraphs = typeof about.story === 'string' && about.story.includes('\n\n')
    ? about.story.split('\n\n')
    : [about.story];
  const visionParagraphs = about.vision?.includes('\n\n') ? about.vision.split('\n\n') : about.vision ? [about.vision] : [];
  const missionParagraphs = about.mission?.includes('\n\n') ? about.mission.split('\n\n') : about.mission ? [about.mission] : [];

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle subtitle={about.subtitle} title={about.title} className="mb-16" />

        {/* Story — with icon and fade-up paragraphs */}
        <motion.div
          className="relative mb-24"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
        >
          <motion.div
            className="flex justify-center mb-8"
            variants={fadeUp}
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-turquoise/10 text-turquoise ring-2 ring-turquoise/20">
              <Building2 className="h-8 w-8" strokeWidth={1.5} />
            </span>
          </motion.div>
          <div className="text-muted text-lg max-w-3xl mx-auto text-center space-y-5">
            {storyParagraphs.map((p, i) => (
              <motion.p key={i} variants={fadeUp} className="leading-relaxed">
                {p}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* Vision & Mission — two-column cards, professional styling */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 mb-24">
          {about.visionTitle && about.vision && (
            <motion.article
              className="group relative rounded-2xl border border-slate/50 bg-gradient-to-b from-slate/25 to-slate/10 p-8 sm:p-10 shadow-lg shadow-black/5 overflow-hidden"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              whileHover={{ boxShadow: '0 20px 40px -15px rgba(0, 187, 190, 0.12), 0 0 0 1px rgba(0, 187, 190, 0.2)' }}
            >
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-turquoise/10 pointer-events-none" />
              <div className="absolute top-0 right-0 w-40 h-40 bg-turquoise/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-turquoise/20 text-turquoise ring-1 ring-turquoise/20 mb-6">
                  <Eye className="h-7 w-7" strokeWidth={1.5} />
                </span>
                <h3 className="text-2xl font-bold text-foreground mb-5 tracking-tight">{about.visionTitle}</h3>
                <div className="text-muted space-y-4 text-base leading-[1.7]">
                  {visionParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </motion.article>
          )}

          {about.missionTitle && about.mission && (
            <motion.article
              className="group relative rounded-2xl border border-slate/50 bg-gradient-to-b from-slate/25 to-slate/10 p-8 sm:p-10 shadow-lg shadow-black/5 overflow-hidden"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ boxShadow: '0 20px 40px -15px rgba(0, 187, 190, 0.12), 0 0 0 1px rgba(0, 187, 190, 0.2)' }}
            >
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-turquoise/10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-turquoise/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-turquoise/20 text-turquoise ring-1 ring-turquoise/20 mb-6">
                  <Target className="h-7 w-7" strokeWidth={1.5} />
                </span>
                <h3 className="text-2xl font-bold text-foreground mb-5 tracking-tight">{about.missionTitle}</h3>
                <div className="text-muted space-y-4 text-base leading-[1.7]">
                  {missionParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </motion.article>
          )}
        </div>

        {/* Our Values */}
        <motion.h3
          className="text-2xl font-bold text-foreground text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {about.values}
        </motion.h3>
        <div className="grid gap-8 md:grid-cols-3 mb-20">
          {values.map((v, i) => (
            <Card key={v.key} delay={i * 0.1}>
              <h4 className="text-lg font-semibold text-turquoise mb-2">{v.title}</h4>
              <p className="text-muted text-sm">{v.desc}</p>
            </Card>
          ))}
        </div>

        {/* Our Team */}
        <motion.div
          className="text-center rounded-2xl border border-slate/50 bg-slate/10 py-12 px-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-turquoise/10 text-turquoise mb-4">
            <Users className="h-6 w-6" strokeWidth={1.5} />
          </span>
          <h3 className="text-xl font-semibold text-foreground mb-2">{about.team}</h3>
          <p className="text-muted max-w-2xl mx-auto">{about.teamDesc}</p>
        </motion.div>
      </div>
    </div>
  );
}
