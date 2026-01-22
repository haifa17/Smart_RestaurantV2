"use client";
import { QRCodeScreenProps } from "../../lib/types";
import { MESSAGES } from "../../lib/constants";
import { generateMenuUrl } from "../../lib/utils";
import { Card } from "@/components/ui/card";
import { useQRCodeGeneration } from "../../hooks/useQRCodeGeneration";
import { useQRCodeActions } from "../../hooks/useQRCodeActions";
import { QRCodeDisplay } from "./QRCodeDisplay";

export function QRCodeScreen({ restaurant, baseUrl }: QRCodeScreenProps) {
  let menuUrl: string;

  try {
    menuUrl = generateMenuUrl(restaurant.slug, baseUrl);
  } catch (error) {
    return (
      <div className="max-w-md mx-auto">
        <Card className="p-6 text-center border-destructive">
          <p className="text-destructive font-medium">
            Configuration du restaurant invalide{" "}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Veuillez consulter l'URL du restaurant{" "}
          </p>
        </Card>
      </div>
    );
  }

  const { qrCodeDataUrl, isGenerating, error, retry } =
    useQRCodeGeneration(menuUrl);
  const { copied, isDownloading, handleCopyLink, handleDownloadQR } =
    useQRCodeActions(menuUrl, qrCodeDataUrl, restaurant.name);

  return (
    <div className=" space-y-6">
      {/* Header */}
      <header className=" space-y-1">
        <h2 className="text-2xl font-bold ">{MESSAGES.TITLE}</h2>
        <p className="text-muted-foreground ">{MESSAGES.SUBTITLE}</p>
        <p className="text-xs text-muted-foreground  ">
          Restaurant: <span className="font-semibold">{restaurant.name}</span>
        </p>
      </header>

      {/* Main QR Code Display */}
      <QRCodeDisplay
        menuUrl={menuUrl}
        qrCodeDataUrl={qrCodeDataUrl}
        onCopyLink={handleCopyLink}
        onDownload={handleDownloadQR}
        onRetry={retry}
        copied={copied}
        isGenerating={isGenerating}
        hasError={!!error}
      />

      {/* Print Guidelines */}
      <Card className="p-4  border-primary/20">
        <h3 className="font-semibold  text-sm  flex items-center gap-2">
          <span role="img" aria-label="Tip">
            💡
          </span>
          {MESSAGES.TIP_TITLE}
        </h3>
        <p className="text-sm leading-relaxed">{MESSAGES.TIP_CONTENT}</p>
      </Card>
    </div>
  );
}
