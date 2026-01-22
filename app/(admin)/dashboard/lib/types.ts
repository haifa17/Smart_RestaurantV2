import { Restaurant } from "@/lib/models/restaurant";
import { DOWNLOAD_FORMATS } from "./constants";

export interface CategoryFormData {
  nameEn?: string;
  nameFr?: string;
  nameAr?: string;
}

export interface MenuItemFormData {
  restaurantId: string;
  categoryId: string;

  nameEn?: string;
  nameFr?: string;
  nameAr?: string;

  descriptionEn?: string;
  descriptionFr?: string;
  descriptionAr?: string;

  price: number;
  image?: string | null;
  available?: boolean;

  isActive?: boolean;
  isChefRecommendation?: boolean;
  isPopular?: boolean;
  isSpicy?: boolean;
  isVegetarian?: boolean;
}

export type DeleteConfirmState = {
  type: "category" | "item";
  id: string;
} | null;

export type DownloadFormat = (typeof DOWNLOAD_FORMATS)[number];
export interface QRCodeScreenProps {
  restaurant: Restaurant;
  baseUrl?: string;
}

export interface QRCodeDisplayProps {
  menuUrl: string;
  qrCodeDataUrl: string;
  onCopyLink: () => void;
  onDownload: (format: DownloadFormat) => void;
  onRetry: () => void;
  copied: boolean;
  isGenerating: boolean;
  hasError: boolean;
}

export interface DashboardStats {
  totalCategories: number
  totalItems: number
  lastUpdated: string
}
