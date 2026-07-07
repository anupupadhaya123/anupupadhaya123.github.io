export interface Skill {
  name: string;
  level: number; // 0-100
  details?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  iconName: string;
  skills: Skill[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
  skillsUsed: string[];
  category: 'it_support' | 'analytics_dev';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: 'systems_networking' | 'data_analytics' | 'software_dev';
  highlights?: string[];
}

export interface Achievement {
  id: string;
  title: string;
  issuer?: string;
  date: string;
  description: string;
  badgeText?: string;
}

export interface Reference {
  id: string;
  name: string;
  role: string;
  company: string;
  phone: string;
  email: string;
}
