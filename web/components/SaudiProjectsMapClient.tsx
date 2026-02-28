'use client';

import dynamic from 'next/dynamic';

const SaudiProjectsMap = dynamic(() => import('@/components/SaudiProjectsMap'), {
  ssr: false,
});

const defaultMapDict: Record<string, string> = {
  sectionSubtitle: 'Our Footprint',
  sectionTitle: 'Projects Across Saudi Arabia',
  intro: 'Click a marker to zoom and see project details.',
  filterAll: 'All',
  residential: 'Residential',
  commercial: 'Commercial',
  infrastructure: 'Infrastructure',
  viewFullDetails: 'View full details',
  clickHint: 'Click a marker to zoom and view details',
};

export type ProjectEntry = {
  owner?: string;
  city?: string;
  district?: string;
  description?: string;
};

export default function SaudiProjectsMapClient({
  locale = 'en',
  mapDict = defaultMapDict,
  projectEntries,
}: {
  locale?: string;
  mapDict?: Record<string, string>;
  projectEntries?: Record<string, ProjectEntry>;
}) {
  const d = { ...defaultMapDict, ...mapDict };
  return <SaudiProjectsMap locale={locale} mapDict={d} projectEntries={projectEntries} />;
}
