import { Home, Building2, Landmark, Wrench } from 'lucide-react';

const iconMap = {
  residential: Home,
  commercial: Building2,
  infrastructure: Landmark,
  renovation: Wrench,
} as const;

type ServiceIconName = keyof typeof iconMap;

export function ServiceIcon({ name, className }: { name: ServiceIconName; className?: string }) {
  const Icon = iconMap[name];
  return <Icon className={className ?? 'h-8 w-8'} strokeWidth={1.5} />;
}
