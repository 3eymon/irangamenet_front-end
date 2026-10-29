export interface News {
  id: string | number;
  title: string;
  image: string;
  author: string;
  authorImage: string;
  date: string;
  description: string;
  views: number;
  category?: string;
  rating?: number | string;
  like?: number | string;
  save?: number | string;
}