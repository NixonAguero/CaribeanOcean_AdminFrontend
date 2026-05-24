export interface HeroImage {
  id: number;
  url: string;
  alt: string;
}

export interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  images: HeroImage[];
}
