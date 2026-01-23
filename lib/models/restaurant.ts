import { BaseModel } from "./base";
import { Schedule } from "./schedule";

export interface Restaurant extends BaseModel {
  slug: string;
  name: string;
  phone: string | null;
  logo: string | null;
  heroImage: string | null;
  schedules: Schedule[];
  description?: string;
  tagline: string | null;
  story: string | null;
  isActive: boolean;
  currency?: string;
  menuBaseUrl?:string
}
