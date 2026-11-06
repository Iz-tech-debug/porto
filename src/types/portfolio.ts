export interface ProfileInfo {
  name: string;
  shortName: string;
  title: string;
  subtitle: string;
  major: string;
  university: string;
  location: string;
  status: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  instagramUrl: string;
  unsplashUrl: string;
  bio: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  keyFeatures: string[];
  techStack: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  status: 'Completed' | 'In Progress' | 'Prototype' | 'Template';
  year: string;
}

export interface PhotoItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  category: 'Architecture' | 'Portraits' | 'Street' | 'Minimal';
  imageSrc: string;
  alt: string;
  exif: {
    camera: string;
    lens: string;
    shutter: string;
    aperture: string;
    iso: string;
    location: string;
    year: string;
  };
  aspectRatio?: '4:3' | '3:4' | '16:9' | '1:1';
}

export interface SkillItem {
  name: string;
  category: 'informatics' | 'photography';
  subCategory: string;
  level: 'Advanced' | 'Intermediate' | 'Familiar';
  years: string;
}
