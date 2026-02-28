'use client';

import { useEffect, useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Building2, X, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import type { Project, ProjectType } from '@/data/saudi-projects';

const TYPE_KEYS: ProjectType[] = ['residential', 'commercial', 'infrastructure'];

const TYPE_LABELS: Record<string, string> = {
  residential: 'Residential',
  commercial: 'Commercial',
  infrastructure: 'Infrastructure',
};

type FilterState = 'all' | Set<ProjectType>;

function filterProjects(projects: Project[], filter: FilterState): Project[] {
  if (filter === 'all') return projects;
  return projects.filter((p) => filter.has(p.type));
}

type ProjectEntry = { owner?: string; city?: string; district?: string; description?: string };

export function ProjectsList({
  projects,
  categoryLabels,
  filterAllLabel = 'All',
  viewAllLabel = 'View Project',
  noProjectsMatch = 'No projects match the selected filter. Try choosing "All" or another type.',
  projectEntries,
}: {
  projects: Project[];
  categoryLabels: Record<string, string>;
  filterAllLabel?: string;
  viewAllLabel?: string;
  noProjectsMatch?: string;
  projectEntries?: Record<string, ProjectEntry>;
}) {
  const [openId, setOpenId] = useState<number | null>(null);
  const [typeFilter, setTypeFilter] = useState<FilterState>('all');
  const [galleryProject, setGalleryProject] = useState<Project | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const filteredProjects = useMemo(
    () => filterProjects(projects, typeFilter),
    [projects, typeFilter]
  );

  const setFilterAll = () => setTypeFilter('all');
  const toggleType = (type: ProjectType) => {
    setTypeFilter((prev) => {
      if (prev === 'all') return new Set([type]);
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next.size === 0 ? 'all' : next;
    });
  };

  useEffect(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    const match = hash.match(/^#project-(\d+)$/);
    if (match) {
      const id = Number(match[1]);
      setOpenId(id);
      const el = document.getElementById(`project-${id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      setOpenId(null);
    }
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash;
      const match = hash.match(/^#project-(\d+)$/);
      setOpenId(match ? Number(match[1]) : null);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <>
      {/* Type filter */}
      <div className="flex justify-center gap-3 mb-10 flex-wrap">
        <button
          type="button"
          onClick={setFilterAll}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
            typeFilter === 'all'
              ? 'bg-turquoise text-background border-turquoise'
              : 'bg-transparent text-muted border-turquoise/40 hover:border-turquoise/60 hover:text-foreground'
          }`}
        >
          {filterAllLabel}
        </button>
        {TYPE_KEYS.map((type) => {
          const isActive = typeFilter !== 'all' && typeFilter.has(type);
          const label = categoryLabels[type] ?? TYPE_LABELS[type];
          return (
            <button
              key={type}
              type="button"
              onClick={() => toggleType(type)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                isActive
                  ? 'bg-turquoise/20 text-turquoise border-turquoise'
                  : 'bg-transparent text-muted border-turquoise/40 hover:border-turquoise/60 hover:text-foreground'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {filteredProjects.map((p, i) => {
        const t = projectEntries?.[String(p.id)];
        const owner = t?.owner ?? p.owner;
        const city = t?.city ?? p.city;
        const district = t?.district ?? p.district;
        const description = t?.description ?? p.description;
        const thumb = p.image ?? p.images?.[0];
        const hasGallery = (p.images?.length ?? 0) > 1;
        return (
        <div
          key={p.id}
          id={`project-${p.id}`}
          className={`scroll-mt-24 rounded-xl transition-shadow duration-300 ${openId === p.id ? 'ring-2 ring-turquoise/50 ring-offset-4 ring-offset-background' : ''}`}
        >
          <Card delay={i * 0.06}>
            <div
              className="aspect-video rounded-lg bg-slate mb-4 flex items-center justify-center text-muted overflow-hidden relative group cursor-pointer"
              onClick={() => { if (hasGallery) { setGalleryProject(p); setGalleryIndex(0); } }}
              role={hasGallery ? 'button' : undefined}
              tabIndex={hasGallery ? 0 : undefined}
              onKeyDown={hasGallery ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setGalleryProject(p); setGalleryIndex(0); } } : undefined}
              aria-label={hasGallery ? 'View gallery' : undefined}
            >
              {thumb ? (
                <img src={thumb} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              ) : (
                <Building2 className="h-16 w-16" strokeWidth={1} />
              )}
              {hasGallery && (
                <span className="absolute bottom-2 right-2 rounded-full bg-background/80 px-2 py-1 text-xs font-medium text-foreground flex items-center gap-1">
                  <Images className="h-3.5 w-3.5" /> {p.images!.length}
                </span>
              )}
            </div>
            <p className="text-xs text-turquoise font-medium uppercase tracking-wider mb-1">
              {categoryLabels[p.type] ?? TYPE_LABELS[p.type] ?? p.type}
            </p>
            <h3 className="text-lg font-semibold text-foreground">{owner}</h3>
            <p className="text-sm text-muted mt-1">
              {city}
              {district ? ` / ${district}` : ''}
            </p>
            <p className="text-sm text-muted mt-2 line-clamp-2">{description}</p>
            <p className="text-sm text-turquoise/80 mt-2">{viewAllLabel} →</p>
          </Card>
        </div>
      );})}
      </div>

      {filteredProjects.length === 0 && (
        <p className="text-center text-muted py-12">{noProjectsMatch}</p>
      )}

      {/* Gallery modal */}
      {galleryProject?.images && galleryProject.images.length > 0 && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Project gallery"
        >
          <button
            type="button"
            onClick={() => setGalleryProject(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close gallery"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative max-w-5xl w-full max-h-[85vh] flex items-center justify-center">
            <img
              src={galleryProject.images[galleryIndex]}
              alt=""
              className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg"
            />
            {galleryProject.images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setGalleryIndex((prev) => (prev === 0 ? galleryProject.images!.length - 1 : prev - 1))}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button
                  type="button"
                  onClick={() => setGalleryIndex((prev) => (prev === galleryProject.images!.length - 1 ? 0 : prev + 1))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              </>
            )}
          </div>
          <p className="text-white/80 text-sm mt-2">
            {galleryIndex + 1} / {galleryProject.images.length}
          </p>
        </div>
      )}
    </>
  );
}
