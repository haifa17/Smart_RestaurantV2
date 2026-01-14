import { Restaurant } from "@/lib/models/restaurant";
import { DOWNLOAD_FORMATS } from "./constants";

export interface CategoryFormData {
  name: string;
}

export interface MenuItemFormData {
  categoryId: string;
  name: string;
  description?: string;
  price: number;
  image?: string | null;
  available?: boolean;
  restaurantId: string;
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
