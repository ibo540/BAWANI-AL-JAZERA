'use client';

import { useState, useEffect, useRef, useMemo } from 'react';

const DURATION_MS = 1400;
const easeOutQuad = (t: number) => t * (2 - t);

function CountUp({ target, inView }: { target: number; inView: boolean }) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;
    startTime.current = null;

    const tick = (timestamp: number) => {
      if (startTime.current === null) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / DURATION_MS, 1);
      const eased = easeOutQuad(progress);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return <>{count}</>;
}
import Link from 'next/link';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { SAUDI_PROJECTS, Project } from '@/data/saudi-projects';
import type { ProjectType } from '@/data/saudi-projects';

import 'leaflet/dist/leaflet.css';

const TYPE_KEYS: ProjectType[] = ['residential', 'commercial', 'infrastructure'];

const TYPE_COLORS = {
  residential: '#00b4b4',
  commercial: '#00e5e5',
  infrastructure: '#007a7a',
};

const TYPE_LABELS = {
  residential: 'Residential',
  commercial: 'Commercial',
  infrastructure: 'Infrastructure',
};

// Inline SVG icons for each project type (house, building, landmark/road)
const MARKER_ICONS: Record<ProjectType, string> = {
  residential: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  commercial: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>`,
  infrastructure: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="21" x2="3" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/><line x1="15" y1="21" x2="15" y2="9"/><line x1="21" y1="21" x2="21" y2="9"/><path d="M3 9h18"/><path d="M5 9V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"/></svg>`,
};

function createMarkerIcon(type: ProjectType, color: string, isSelected: boolean) {
  const size = isSelected ? 44 : 38;
  const iconSvg = MARKER_ICONS[type];
  return L.divIcon({
    className: 'map-project-marker',
    html: `<div class="map-marker-pin" style="background-color:${color};width:${size}px;height:${size}px;border-width:${isSelected ? 3 : 2}px">${iconSvg}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
  });
}

// Saudi Arabia center [lat, lng], zoom to show country
const DEFAULT_CENTER: [number, number] = [24, 45];
const DEFAULT_ZOOM = 5;

// Our data is [lng, lat]; Leaflet uses [lat, lng]
function toLatLng(coords: [number, number]): [number, number] {
  return [coords[1], coords[0]];
}

function FlyToProject({ project }: { project: Project | null }) {
  const map = useMap();
  const prevId = useRef<number | null>(null);

  useEffect(() => {
    if (!project) {
      if (prevId.current !== null) {
        map.flyTo(DEFAULT_CENTER, DEFAULT_ZOOM, { duration: 0.5 });
        prevId.current = null;
      }
      return;
    }
    const [lat, lng] = toLatLng(project.coordinates);
    map.flyTo([lat, lng], 12, { duration: 0.8 });
    prevId.current = project.id;
  }, [project, map]);

  return null;
}

const DEFAULT_MAP_DICT: Record<string, string> = {
  sectionSubtitle: 'Our Footprint',
  sectionTitle: 'Projects Across Saudi Arabia',
  intro: 'Click a marker to zoom and see project details.',
  filterAll: 'All',
  residential: 'Residential',
  commercial: 'Commercial',
  infrastructure: 'Infrastructure',
  viewFullDetails: 'View full details',
  clickHint: 'Click a marker to zoom and view details',
  projectsLabel: 'Projects',
};

function ProjectMarker({
  project,
  locale,
  onSelect,
  isSelected,
  mapDict,
  projectEntries,
}: {
  project: Project;
  locale: string;
  onSelect: (p: Project | null) => void;
  isSelected: boolean;
  mapDict: Record<string, string>;
  projectEntries?: Record<string, { owner?: string; city?: string; district?: string; description?: string }>;
}) {
  const [lat, lng] = toLatLng(project.coordinates);
  const color = TYPE_COLORS[project.type];
  const icon = useMemo(
    () => createMarkerIcon(project.type, color, isSelected),
    [project.type, color, isSelected]
  );
  const typeLabel = mapDict[project.type] ?? TYPE_LABELS[project.type];
  const viewFullDetails = mapDict.viewFullDetails ?? DEFAULT_MAP_DICT.viewFullDetails;
  const t = projectEntries?.[String(project.id)];
  const owner = t?.owner ?? project.owner;
  const city = t?.city ?? project.city;
  const district = t?.district ?? project.district;
  const description = t?.description ?? project.description;

  return (
    <Marker
      position={[lat, lng]}
      icon={icon}
      eventHandlers={{
        click: () => onSelect(isSelected ? null : project),
      }}
    >
      <Popup className="map-project-popup" closeButton>
        <div className="min-w-[220px] max-w-[280px] text-left px-3 py-2 pt-6">
          <span
            className="inline-block text-[10px] uppercase tracking-widest font-semibold mb-2 px-2 py-0.5 rounded-md"
            style={{ backgroundColor: `${color}22`, color }}
          >
            {typeLabel}
          </span>
          <h3 className="font-semibold text-white text-sm leading-tight mt-2">
            {owner}
          </h3>
          <p className="text-gray-400 text-xs mt-1">
            {city}
            {district ? ` / ${district}` : ''}
          </p>
          <p className="text-gray-500 text-xs mt-2 line-clamp-2 leading-relaxed">
            {description}
          </p>
          <Link
            href={`/${locale}/projects#project-${project.id}`}
            className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-[#00b4b4] hover:text-[#00e5e5] transition-colors"
          >
            {viewFullDetails}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </Popup>
    </Marker>
  );
}

type FilterState = 'all' | Set<ProjectType>;

function getFilteredProjects(filter: FilterState): Project[] {
  if (filter === 'all') return SAUDI_PROJECTS;
  return SAUDI_PROJECTS.filter((p) => filter.has(p.type));
}

export default function SaudiProjectsMap({
  locale = 'en',
  mapDict = DEFAULT_MAP_DICT,
  projectEntries,
}: {
  locale?: string;
  mapDict?: Record<string, string>;
  projectEntries?: Record<string, { owner?: string; city?: string; district?: string; description?: string }>;
}) {
  const d = { ...DEFAULT_MAP_DICT, ...mapDict };
  const [selected, setSelected] = useState<Project | null>(null);
  const [typeFilter, setTypeFilter] = useState<FilterState>('all');
  const countSectionRef = useRef<HTMLDivElement>(null);
  const [countsInView, setCountsInView] = useState(false);

  useEffect(() => {
    const el = countSectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setCountsInView(true);
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const toggleType = (type: ProjectType) => {
    setTypeFilter((prev) => {
      if (prev === 'all') return new Set([type]);
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next.size === 0 ? 'all' : next;
    });
    setSelected(null);
  };

  const setFilterAll = () => {
    setTypeFilter('all');
    setSelected(null);
  };

  const filteredProjects = getFilteredProjects(typeFilter);

  useEffect(() => {
    if (selected && !filteredProjects.some((p) => p.id === selected.id)) {
      setSelected(null);
    }
  }, [typeFilter, filteredProjects, selected]);

  return (
    <section className="py-20 px-4 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#00b4b4] text-sm font-semibold tracking-widest uppercase mb-3">
            {d.sectionSubtitle}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {d.sectionTitle}
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            {d.intro}
          </p>
        </div>

        {/* Type filter */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          <button
            type="button"
            onClick={setFilterAll}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              typeFilter === 'all'
                ? 'bg-[#00b4b4] text-[#051515] border-[#00b4b4]'
                : 'bg-transparent text-gray-400 border-[#00b4b4]/40 hover:border-[#00b4b4]/60 hover:text-gray-300'
            }`}
          >
            {d.filterAll}
          </button>
          {TYPE_KEYS.map((type) => {
            const isActive = typeFilter !== 'all' && typeFilter.has(type);
            const label = d[type] ?? TYPE_LABELS[type];
            return (
              <button
                key={type}
                type="button"
                onClick={() => toggleType(type)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors border border-[#00b4b4]/40 hover:border-[#00b4b4]/60"
                style={{
                  backgroundColor: isActive ? `${TYPE_COLORS[type]}22` : 'transparent',
                  color: isActive ? TYPE_COLORS[type] : 'rgb(156 163 175)',
                  borderColor: isActive ? TYPE_COLORS[type] : undefined,
                }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: TYPE_COLORS[type] }}
                />
                {label}
              </button>
            );
          })}
        </div>

        <div
          className="relative rounded-2xl overflow-hidden border border-[#00b4b4]/20 bg-[#051515]"
          style={{ height: '520px' }}
        >
          <MapContainer
            center={DEFAULT_CENTER}
            zoom={DEFAULT_ZOOM}
            style={{ height: '100%', width: '100%', borderRadius: '1rem' }}
            scrollWheelZoom
            className="z-0"
            attributionControl={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <FlyToProject project={selected} />
            {filteredProjects.map((project) => (
              <ProjectMarker
                key={project.id}
                project={project}
                locale={locale}
                onSelect={setSelected}
                isSelected={selected?.id === project.id}
                mapDict={d}
                projectEntries={projectEntries}
              />
            ))}
          </MapContainer>

          <p className="absolute bottom-3 right-4 text-gray-500 text-xs z-[1000] pointer-events-none bg-[#051515]/80 px-2 py-1 rounded">
            {d.clickHint}
          </p>
        </div>

        <div ref={countSectionRef} className="mt-8 grid grid-cols-3 gap-4 text-center">
          {TYPE_KEYS.map((type) => {
            const label = d[type] ?? TYPE_LABELS[type];
            const projectsLabel = d.projectsLabel ?? DEFAULT_MAP_DICT.projectsLabel;
            const value = SAUDI_PROJECTS.filter((p) => p.type === type).length;
            return (
              <div key={type} className="p-4 rounded-xl border border-[#00b4b4]/10 bg-[#051515]">
                <p
                  className="text-3xl font-bold mb-1 tabular-nums"
                  style={{ color: TYPE_COLORS[type as keyof typeof TYPE_COLORS] }}
                >
                  <CountUp target={value} inView={countsInView} />
                </p>
                <p className="text-gray-400 text-sm">{label} {projectsLabel}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
