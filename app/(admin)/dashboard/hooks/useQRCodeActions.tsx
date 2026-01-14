"use client";
import { useState, useCallback } from "react";
import { COPY_SUCCESS_DURATION, MESSAGES } from "../lib/constants";
import { DownloadFormat } from "../lib/types";
import { downloadQRCode } from "../services/downloadService";
import { toast } from "react-toastify";

export function useQRCodeActions(
  menuUrl: string,
  qrCodeDataUrl: string,
  restaurantName: string
) {
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(menuUrl);
      setCopied(true);
       toast.success( MESSAGES.COPY_SUCCESS);
      setTimeout(() => setCopied(false), COPY_SUCCESS_DURATION);
    } catch (error) {
      console.error("Copy failed:", error);
       toast.error( MESSAGES.COPY_ERROR);
    }
  }, [menuUrl]);

  const handleDownloadQR = useCallback(
    async (format: DownloadFormat) => {
      if (!qrCodeDataUrl && format !== "svg") {
        toast.error( "QR code not ready. Please wait...");
        return;
      }

      setIsDownloading(true);
      try {
        await downloadQRCode(format, qrCodeDataUrl, menuUrl, restaurantName);
        toast.success(MESSAGES.DOWNLOAD_SUCCESS(format.toUpperCase()));
      } catch (error) {
        console.error("Download failed:", error);
        toast.error(MESSAGES.DOWNLOAD_ERROR);
      } finally {
        setIsDownloading(false);
      }
    },
    [qrCodeDataUrl, menuUrl, restaurantName]
  );

  return {
    copied,
    isDownloading,
    handleCopyLink,
    handleDownloadQR,
  };
}
