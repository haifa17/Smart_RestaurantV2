export const QR_CODE_CONFIG = {
  SIZE: 400, // High resolution for print quality
  ERROR_CORRECTION: "H" as const, // Highest error correction (30% recovery)
  MARGIN: 2,
  COLOR: {
    DARK: "#000000",
    LIGHT: "#FFFFFF",
  },
  // DPI settings for print
  PRINT_DPI: 300,
  PRINT_SIZE_INCHES: 3, // 3x3 inches for table display
} as const;

export const PDF_CONFIG = {
  FORMAT: "a4" as const,
  ORIENTATION: "portrait" as const,
  UNIT: "mm" as const,
  QR_SIZE: 80, // 80mm QR code size
  MARGIN: 20,
} as const;

export const DOWNLOAD_FORMATS = ["png", "svg", "pdf"] as const;

export const COPY_SUCCESS_DURATION = 2000;

export const MESSAGES = {
  TITLE: "Your QR Code",
  SUBTITLE: "Print this QR code and place it on your tables",
  DESCRIPTION: "Scan to view the digital menu",
  COPY_SUCCESS: "Link copied to clipboard",
  COPY_ERROR: "Failed to copy link",
  DOWNLOAD_SUCCESS: (format: string) =>
    `QR code downloaded as ${format.toUpperCase()}`,
  DOWNLOAD_ERROR: "Failed to download QR code. Please try again.",
  GENERATION_ERROR: "Failed to generate QR code",
  TIP_TITLE: "Print Guidelines",
  TIP_CONTENT:
    "For best results, print on high-quality paper or laminate for durability. Recommended size: 3x3 inches minimum.",
  RETRY: "Retry",
} as const;

export const RESTAURANT_ID =
  process.env.NEXT_PUBLIC_RESTAURANT_ID || "resteau_test";
