export interface BaseModel {
  id: string;
  created_at?: string; // Date
  updated_at?: string;
  deletedAt?: string | null;
}
