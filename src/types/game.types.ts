export interface Game {
  id: string | number;
  title: string;
  image: string;
  company: {
    name: string;
    image: string
  }
  author: string;
  authorImage?: string
  date: string;
  description: string;
  views: number;
  category: string;
  rating?: number | string;
  like?: number | string;
  save?: number | string;
}

export interface GameCenter
  extends Omit<Game, "views" | "category" | "author"> {
  author?: string;
  views: number | string;
  rating: number | string;
  city?: string;
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
