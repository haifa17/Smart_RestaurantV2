import { Download, Copy, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { QRCodePlaceholder } from "./QRCodePlaceholder";
import { QRCodeDisplayProps } from "../../lib/types";
import { DOWNLOAD_FORMATS, MESSAGES } from "../../lib/constants";

export function QRCodeDisplay({
  menuUrl,
  qrCodeDataUrl,
  onCopyLink,
  onDownload,
  onRetry,
  copied,
  isGenerating,
  hasError,
}: QRCodeDisplayProps) {
  return (
    <Card className="p-8">
      <div className="flex flex-col items-center">
        {/* QR Code Display */}
        <div
          className="w-64 h-64 bg-white border-2 border-border rounded-xl p-4 mb-6 flex items-center justify-center shadow-sm"
          role="img"
          aria-label="Restaurant menu QR code"
        >
          {hasError ? (
            <div className="flex flex-col items-center justify-center text-center p-4">
              <AlertCircle className="h-12 w-12 text-destructive mb-3" />
              <p className="text-sm text-muted-foreground mb-3">
                {MESSAGES.GENERATION_ERROR}
              </p>
              <Button onClick={onRetry} variant="outline" size="sm">
                {MESSAGES.RETRY}
              </Button>
            </div>
          ) : isGenerating || !qrCodeDataUrl ? (
            <QRCodePlaceholder />
          ) : (
            <img
              src={qrCodeDataUrl}
              alt="QR Code for restaurant menu"
              className="w-full h-full object-contain"
            />
          )}
        </div>

        <p className="text-sm text-muted-foreground text-center mb-6">
          {MESSAGES.DESCRIPTION}
        </p>

        {/* Menu URL Display */}
        <div
          className="w-full p-3 bg-muted rounded-lg mb-6"
          role="region"
          aria-label="Menu URL"
        >
          <p className="text-xs text-center text-muted-foreground break-all font-mono">
            {menuUrl}
          </p>
        </div>

        {/* Download Format Info */}
        {!hasError && !isGenerating && (
          <Alert className="mb-4">
            <AlertDescription className="text-xs">
              <strong>PNG:</strong> Best for digital use • <strong>SVG:</strong>{" "}
              Perfect for large prints • <strong>PDF:</strong> Ready to print
              with instructions
            </AlertDescription>
          </Alert>
        )}

        {/* Action Buttons */}
        <div className="w-full space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {DOWNLOAD_FORMATS.map((format) => (
              <Button
                key={format}
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={() => onDownload(format)}
                disabled={isGenerating || hasError}
                aria-label={`Download QR code as ${format.toUpperCase()}`}
              >
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                {format.toUpperCase()}
              </Button>
            ))}
          </div>

          <Button
            variant="secondary"
            className="w-full gap-2"
            onClick={onCopyLink}
            disabled={isGenerating}
            aria-label={copied ? "Link copied" : "Copy menu link to clipboard"}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" aria-hidden="true" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" aria-hidden="true" />
                Copy Menu Link
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
