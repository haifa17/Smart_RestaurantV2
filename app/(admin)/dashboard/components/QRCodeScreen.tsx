"use client"
import { QRCodeScreenProps } from '../lib/types'
import { MESSAGES } from '../lib/constants'
import { generateMenuUrl } from '../lib/utils'
import { QRCodeDisplay } from './QRCodeDisplay'
import { Card } from '@/components/ui/card'
import { useQRCodeGeneration } from '../hooks/useQRCodeGeneration'
import { useQRCodeActions } from '../hooks/useQRCodeActions'

export function QRCodeScreen({ restaurant, baseUrl }: QRCodeScreenProps) {
  let menuUrl: string
  
  try {
    menuUrl = generateMenuUrl(restaurant.slug, baseUrl)
  } catch (error) {
    return (
      <div className="max-w-md mx-auto">
        <Card className="p-6 text-center border-destructive">
          <p className="text-destructive font-medium">Invalid restaurant configuration</p>
          <p className="text-sm text-muted-foreground mt-2">
            Please check the restaurant slug
          </p>
        </Card>
      </div>
    )
  }

  const { qrCodeDataUrl, isGenerating, error, retry } = useQRCodeGeneration(menuUrl)
  const { copied, isDownloading, handleCopyLink, handleDownloadQR } = useQRCodeActions(
    menuUrl,
    qrCodeDataUrl,
    restaurant.name
  )

  return (
    <div className="max-w-lg mx-auto space-y-6">
      {/* Header */}
      <header className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">{MESSAGES.TITLE}</h2>
        <p className="text-sm text-muted-foreground">{MESSAGES.SUBTITLE}</p>
        <p className="text-xs text-muted-foreground">
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
      <Card className="p-4 bg-primary/5 border-primary/20">
        <h3 className="font-semibold text-foreground text-sm mb-2 flex items-center gap-2">
          <span role="img" aria-label="Tip">💡</span>
          {MESSAGES.TIP_TITLE}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {MESSAGES.TIP_CONTENT}
        </p>
      </Card>
    </div>
  )
}