export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      game_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_path: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_path?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_path?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      game_category_links: {
        Row: {
          category_id: string
          created_at: string
          game_id: string
        }
        Insert: {
          category_id: string
          created_at?: string
          game_id: string
        }
        Update: {
          category_id?: string
          created_at?: string
          game_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "game_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_categories_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      game_images: {
        Row: {
          alt_text: string | null
          created_at: string
          game_id: string
          id: string
          path: string
          sort_order: number
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          game_id: string
          id?: string
          path: string
          sort_order?: number
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          game_id?: string
          id?: string
          path?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "game_images_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      games: {
        Row: {
          age_rating: string | null
          cover_path: string | null
          created_at: string
          description: string | null
          id: string
          is_free: boolean
          languages: string[]
          likes: number
          modes: string[]
          platforms: string[]
          price_amount: number | null
          price_currency: string | null
          producer_id: string | null
          rating: number
          release_date: string | null
          saves: number
          screenshots: string[] | null
          short_description: string | null
          slug: string
          status: string
          steam_app_id: number | null
          store_url: string | null
          system: Json | null
          title: string
          trailer_url: string | null
          updated_at: string
          views: number
        }
        Insert: {
          age_rating?: string | null
          cover_path?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_free?: boolean
          languages?: string[]
          likes?: number
          modes?: string[]
          platforms?: string[]
          price_amount?: number | null
          price_currency?: string | null
          producer_id?: string | null
          rating?: number
          release_date?: string | null
          saves?: number
          screenshots?: string[] | null
          short_description?: string | null
          slug: string
          status?: string
          steam_app_id?: number | null
          store_url?: string | null
          system?: Json | null
          title: string
          trailer_url?: string | null
          updated_at?: string
          views?: number
        }
        Update: {
          age_rating?: string | null
          cover_path?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_free?: boolean
          languages?: string[]
          likes?: number
          modes?: string[]
          platforms?: string[]
          price_amount?: number | null
          price_currency?: string | null
          producer_id?: string | null
          rating?: number
          release_date?: string | null
          saves?: number
          screenshots?: string[] | null
          short_description?: string | null
          slug?: string
          status?: string
          steam_app_id?: number | null
          store_url?: string | null
          system?: Json | null
          title?: string
          trailer_url?: string | null
          updated_at?: string
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "games_producer_id_fkey"
            columns: ["producer_id"]
            isOneToOne: false
            referencedRelation: "producers"
            referencedColumns: ["id"]
          },
        ]
      }
      news: {
        Row: {
          author_id: string
          category_id: string | null
          cover_path: string | null
          created_at: string
          excerpt: string | null
          id: string
          is_featured: boolean
          likes: number
          published_at: string | null
          slug: string
          status: string
          title: string
          updated_at: string
          views: number
        }
        Insert: {
          author_id: string
          category_id?: string | null
          cover_path?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          is_featured?: boolean
          likes?: number
          published_at?: string | null
          slug: string
          status?: string
          title: string
          updated_at?: string
          views?: number
        }
        Update: {
          author_id?: string
          category_id?: string | null
          cover_path?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          is_featured?: boolean
          likes?: number
          published_at?: string | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "news_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "news_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "news_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      news_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_path: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_path?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_path?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      news_sections: {
        Row: {
          content: string[]
          created_at: string
          id: string
          news_id: string
          sort_order: number
          title: string
        }
        Insert: {
          content?: string[]
          created_at?: string
          id?: string
          news_id: string
          sort_order?: number
          title: string
        }
        Update: {
          content?: string[]
          created_at?: string
          id?: string
          news_id?: string
          sort_order?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "news_sections_news_id_fkey"
            columns: ["news_id"]
            isOneToOne: false
            referencedRelation: "news"
            referencedColumns: ["id"]
          },
        ]
      }
      producers: {
        Row: {
          created_at: string
          description: string | null
          employees: number | null
          founded_year: number | null
          growth_rate: number | null
          id: string
          logo_path: string | null
          name: string
          revenue: number | null
          revenue_currency: string | null
          slug: string
          updated_at: string
          website: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          employees?: number | null
          founded_year?: number | null
          growth_rate?: number | null
          id?: string
          logo_path?: string | null
          name: string
          revenue?: number | null
          revenue_currency?: string | null
          slug: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          employees?: number | null
          founded_year?: number | null
          growth_rate?: number | null
          id?: string
          logo_path?: string | null
          name?: string
          revenue?: number | null
          revenue_currency?: string | null
          slug?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_path: string | null
          bio: string | null
          created_at: string | null
          display_name: string | null
          id: string
          updated_at: string | null
          username: string
        }
        Insert: {
          avatar_path?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          id: string
          updated_at?: string | null
          username: string
        }
        Update: {
          avatar_path?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
