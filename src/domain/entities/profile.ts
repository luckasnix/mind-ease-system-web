export interface Profile {
  id: string;
  user_id: string;
  name: string;
  avatar_url?: string | null;
  cognitive_type?: string | null;
  cognitive_description?: string | null;
  cognitive_strengths?: string[] | null;
  created_at: string;
  updated_at?: string | null;
}

export type ProfileUpdate = {
  name?: string;
  avatar_url?: string | null;
  cognitive_type?: string | null;
  cognitive_description?: string | null;
  cognitive_strengths?: string[] | null;
};
