"use client"

import { Phone, Clock } from "lucide-react"
import Image from "next/image"
import { Restaurant } from "@/lib/models/restaurant"
import Link from "next/link"
import { formatSchedules } from "@/lib/utils"

interface HeroBannerProps {
  restaurant: Restaurant
}

export function HeroBanner({ restaurant }: HeroBannerProps) {
  // const { t, isRTL } = useLanguage()
  return (
    <section className="relative h-[70vh] sm:h-[75vh] min-h-[500px] sm:min-h-[550px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={restaurant.heroImage || "/machawi-restaurant.jpeg"}
          alt={`${restaurant.name} Restaurant`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end pb-8 sm:pb-10 px-4 sm:px-6">
        {/* Logo if available */}
        {restaurant.logo && (
          <div className="mb-4 sm:mb-6">
            <Image
              src={restaurant.logo}
              alt={`${restaurant.name} Logo`}
              width={120}
              height={120}
              className="w-24 sm:w-32 h-24 sm:h-32 object-contain drop-shadow-2xl"
            />
          </div>
        )}

        {/* Badges */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-5">
          <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-card/90 backdrop-blur-sm rounded-full text-xs sm:text-sm text-cream border border-border/50">
            <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-primary animate-pulse" />
            {/* {t("مطعم عائلي", "Restaurant Familial")} */}
            Restaurant Familial
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/20 backdrop-blur-sm rounded-full text-xs sm:text-sm text-primary border border-primary/30">
            {/* {t("فحم طبيعي 100%", "100% Charbon Naturel")} */}
            100% Charbon Naturel
          </span>
        </div>

        {/* Title */}
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl font-bold text-cream tracking-tight mb-2 text-balance`}
        >
          {restaurant.name}
        </h1>

        {/* Tagline */}
        {restaurant.tagline && (
          <p className="text-smoke text-base sm:text-lg tracking-wide mb-6 sm:mb-8 max-w-md">
            {restaurant.tagline}
          </p>
        )}

        {/* Quick Info */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {restaurant.phone && (
            <Link
              href={`tel:${restaurant.phone}`}
              className="inline-flex items-center gap-3 text-cream hover:text-primary transition-colors group"
            >
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors border border-primary/30">
                <Phone className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-semibold">{restaurant.phone}</span>
                <span className="text-xs sm:text-sm text-smoke">Appelez-nous</span>
              </div>
            </Link>
          )}

          <div className="flex items-center gap-3 text-smoke">
            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-card flex items-center justify-center border border-border">
              <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-muted-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-cream text-sm sm:text-base">Ouvert tous les jours</span>
              <span className="text-xs sm:text-sm">
               {formatSchedules(restaurant.schedules)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Curved bottom edge */}
      <div className="absolute -bottom-1 left-0 right-0 h-6 sm:h-8">
        <svg viewBox="0 0 1440 48" fill="none" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0 48h1440V24C1200 0 240 0 0 24v24z" fill="currentColor" className="text-background" />
        </svg>
      </div>
    </section>
  )
}
