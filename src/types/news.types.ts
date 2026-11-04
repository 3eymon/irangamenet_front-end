
export interface NewsSection {
  id: string;
  title: string;
  content: string[];
  image?: string;
  imageCaption?: string;
}

export interface News {
  id: string | number;
  title: string;
  image: string;
  description: string;
  category?: string;
  tags?: string[];
  author: string;
  authorImage: string;
  created_at: string;
  updated_at?: string;
  readingTime: number;
  views: number;
  rating?: number | string;
  likes?: number | string;
  saves?: number | string;
  sections: NewsSection[];
  relatedNewsIds?: Array<string | number>;
}


