export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
  externalUrl?: string;
}

export interface Tool {
  slug: string;
  title: string;
  description: string;
  icon: string;
  path: string;
}

export interface Repo {
  slug: string;
  title: string;
  description: string;
  url: string;
  tags?: string[];
}

export interface NavItem {
  key: string;
  label: string;
  path?: string;
  children?: NavItem[];
}
