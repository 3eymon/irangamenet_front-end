export type Platform = "twitch" | "youtube" | "aparat" | "instagram";

export interface Streamer {
  id: number;
  name: string;            
  username: string;      
  platform: Platform;    
  avatar?: string;     
  followers?: string;    
  category?: string;      
  isLive?: boolean;       
  link: string;        
}