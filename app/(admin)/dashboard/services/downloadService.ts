import { jsPDF } from 'jspdf'
import { dataUrlToBlob, generateQRCodeSVG } from './qrCodeGenerator'
import { PDF_CONFIG } from '../lib/constants'
import { DownloadFormat } from '../lib/types'


/**
 * Sanitize filename for download
 */
function sanitizeFilename(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Trigger browser download
 */
function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.style.display = 'none'
  
  document.body.appendChild(link)
  link.click()
  
  // Cleanup
  setTimeout(() => {
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }, 100)
}

/**
 * Download QR code as high-resolution PNG
 */
export async function downloadQRCodeAsPNG(
  dataUrl: string, 
  restaurantName: string
): Promise<void> {
  try {
    const blob = dataUrlToBlob(dataUrl)
    const filename = `${sanitizeFilename(restaurantName)}-menu-qr.png`
    triggerDownload(blob, filename)
  } catch (error) {
    console.error('PNG download error:', error)
    throw new Error('Failed to download PNG')
  }
}

/**
 * Download QR code as SVG (scalable for any print size)
 */
export async function downloadQRCodeAsSVG(
  menuUrl: string,
  restaurantName: string
): Promise<void> {
  try {
    const svgString = await generateQRCodeSVG(menuUrl)
    const blob = new Blob([svgString], { type: 'image/svg+xml' })
    const filename = `${sanitizeFilename(restaurantName)}-menu-qr.svg`
    triggerDownload(blob, filename)
  } catch (error) {
    console.error('SVG download error:', error)
    throw new Error('Failed to download SVG')
  }
}

/**
 * Download QR code as professional PDF with branding
 */
export async function downloadQRCodeAsPDF(
  dataUrl: string,
  restaurantName: string,
  menuUrl: string
): Promise<void> {
  try {
    const pdf = new jsPDF({
      orientation: PDF_CONFIG.ORIENTATION,
      unit: PDF_CONFIG.UNIT,
      format: PDF_CONFIG.FORMAT,
    })

    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    
    // Calculate center positions
    const qrSize = PDF_CONFIG.QR_SIZE
    const qrX = (pageWidth - qrSize) / 2
    const qrY = 60

    // Add restaurant name as header
    pdf.setFontSize(24)
    pdf.setFont('helvetica', 'bold')
    pdf.text(restaurantName, pageWidth / 2, 30, { align: 'center' })

    // Add subtitle
    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'normal')
    pdf.text('Scan for Digital Menu', pageWidth / 2, 45, { align: 'center' })

    // Add QR code
    pdf.addImage(dataUrl, 'PNG', qrX, qrY, qrSize, qrSize)

    // Add URL below QR code
    pdf.setFontSize(10)
    pdf.setTextColor(100, 100, 100)
    const urlY = qrY + qrSize + 15
    pdf.text(menuUrl, pageWidth / 2, urlY, { align: 'center' })

    // Add instructions
    pdf.setFontSize(12)
    pdf.setTextColor(0, 0, 0)
    const instructionsY = urlY + 20
    pdf.text('Instructions:', pageWidth / 2, instructionsY, { align: 'center' })
    
    pdf.setFontSize(10)
    pdf.setTextColor(100, 100, 100)
    const instructions = [
      '1. Open your phone camera app',
      '2. Point it at this QR code',
      '3. Tap the notification to view our menu',
    ]
    
    instructions.forEach((instruction, index) => {
      pdf.text(instruction, pageWidth / 2, instructionsY + 10 + (index * 7), { align: 'center' })
    })

    // Add footer
    pdf.setFontSize(8)
    pdf.text(
      'For assistance, please ask your server',
      pageWidth / 2,
      pageHeight - 15,
      { align: 'center' }
    )

    // Save PDF
    const filename = `${sanitizeFilename(restaurantName)}-menu-qr.pdf`
    pdf.save(filename)
  } catch (error) {
    console.error('PDF download error:', error)
    throw new Error('Failed to download PDF')
  }
}

/**
 * Main download router
 */
export async function downloadQRCode(
  format: DownloadFormat,
  dataUrl: string,
  menuUrl: string,
  restaurantName: string
): Promise<void> {
  switch (format) {
    case 'png':
      await downloadQRCodeAsPNG(dataUrl, restaurantName)
      break
    case 'svg':
      await downloadQRCodeAsSVG(menuUrl, restaurantName)
      break
    case 'pdf':
      await downloadQRCodeAsPDF(dataUrl, restaurantName, menuUrl)
      break
    default:
      throw new Error(`Unsupported format: ${format}`)
  }
}