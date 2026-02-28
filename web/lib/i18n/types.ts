export type Dict = {
  nav: { home: string; about: string; services: string; projects: string; contact: string; news: string };
  home: Record<string, unknown>;
  about: Record<string, unknown>;
  services: Record<string, unknown>;
  projects: Record<string, unknown>;
  contact: Record<string, unknown>;
  news: Record<string, unknown>;
  footer: Record<string, unknown>;
};
