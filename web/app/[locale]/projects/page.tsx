import { getDictionary } from '@/lib/i18n/get-dictionary';
import type { Locale } from '@/lib/i18n/config';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ProjectsList } from '@/components/ProjectsList';
import { SAUDI_PROJECTS } from '@/data/saudi-projects';

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const validLocale: Locale =
    locale === 'ar' ? 'ar' : locale === 'zh' ? 'zh' : locale === 'tr' ? 'tr' : 'en';
  const dict = await getDictionary(validLocale);
  const projects = dict.projects as Record<string, unknown>;

  const categoryLabel: Record<string, string> = {
    residential: (projects.residential as string) ?? 'Residential',
    commercial: (projects.commercial as string) ?? 'Commercial',
    infrastructure: (projects.infrastructure as string) ?? 'Infrastructure',
  };
  const filterAll =
    typeof projects.filterAll === 'string' ? projects.filterAll : 'All';
  const noProjectsMatch =
    typeof projects.noProjectsMatch === 'string'
      ? projects.noProjectsMatch
      : 'No projects match the selected filter. Try choosing "All" or another type.';
  const projectEntries = projects.entries as Record<
    string,
    { owner?: string; city?: string; district?: string; description?: string }
  > | undefined;

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle subtitle={(projects.subtitle as string) ?? ''} title={(projects.title as string) ?? 'Projects'} className="mb-8" />
        <p className="text-muted text-center max-w-2xl mx-auto mb-16">{(projects.intro as string) ?? ''}</p>
        <ProjectsList
          projects={SAUDI_PROJECTS}
          categoryLabels={categoryLabel}
          filterAllLabel={filterAll}
          viewAllLabel={(projects.viewAll as string) ?? 'View Project'}
          noProjectsMatch={noProjectsMatch}
          projectEntries={projectEntries}
        />
      </div>
    </div>
  );
}
