export interface Game {
  id: string | number;
  title: string;
  slug: string;
  image: string;
  category: string;
  description: string;
  shortDescription: string;

  genres: string[];
  platforms: string[];
  modes: string[];

  releaseYear: number;
  releaseDate: string;

  developer: string;
  publisher: string;

  author: string;
  author_image: string;

  created_at: string;
  updated_at?: string;

  price: string;
  currency: string | null;
  isFree: boolean;

  screenshots: string[];
  trailerUrl?: string;
  storeUrl: string;
  steamAppId: number;

  status: string;
  language: string[];
  ageRating: string | null;

  rating: number;
  reviewCount: number;
  views: number;
  likes: number;
  saves: number;

  pros: string[];
  cons: string[];
}

export interface GameCenter {
  id: string | number;
  title: string;
  image: string;
  description: string;
  saves?: number;
  likes?: number;
  author?: string;
  views: number | string;
  rating: number | string;
  city?: string;
  created_at?: string;
  updated_at?: string;
  details?: {
    images: string[];
    location: {
      main: {
        desc: string;
      };
    };
    completeExplanations?: {
      amenities: Array<{
        icon: string;
        type: string;
        typeEnglish: string;
        description: string;
      }>;
    };
  };
}

export interface Category {
  id: string | number;
  text: string,
  slug: string,
  image: string,
}