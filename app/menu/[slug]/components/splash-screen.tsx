"use client";

import { useEffect, useState } from "react";
import { PublicRestaurant } from "../lib/types";

interface SplashScreenProps {
    onComplete: () => void;
    restaurant: PublicRestaurant;
    duration?: number;
}

export function SplashScreen({
    onComplete,
    restaurant,
    duration = 2500,
}: SplashScreenProps) {
    const [progress, setProgress] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const startTime = Date.now();
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min((elapsed / duration) * 100, 100);
            setProgress(newProgress);

            if (newProgress < 100) {
                requestAnimationFrame(animate);
            } else {
                setFadeOut(true);
                setTimeout(onComplete, 500);
            }
        };
        requestAnimationFrame(animate);
    }, [duration, onComplete]);

    return (
        <div
            className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
        >
            {/* Decorative circles */}
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className="absolute top-[10%] right-[10%] w-32 h-32 rounded-full border border-border animate-pulse"
                    style={{ animationDelay: "0s" }}
                />
                <div
                    className="absolute bottom-[20%] left-[5%] w-24 h-24 rounded-full border border-border animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                />
                <div
                    className="absolute top-[40%] left-[15%] w-16 h-16 rounded-full bg-muted/30 animate-pulse"
                    style={{ animationDelay: "1s" }}
                />
            </div>

            {/* Main logo animation */}
            <div className="relative flex items-center justify-center">
                {/* Outer rotating ring */}
                <svg
                    className="absolute w-56 h-56 animate-spin"
                    style={{ animationDuration: "8s" }}
                    viewBox="0 0 200 200"
                >
                    <circle
                        cx="100"
                        cy="100"
                        r="90"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeDasharray="8 8"
                        className="text-border"
                    />
                </svg>

                {/* Inner progress ring */}
                <svg className="absolute w-48 h-48" viewBox="0 0 200 200">
                    <circle
                        cx="100"
                        cy="100"
                        r="80"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray={`${progress * 5.02} 502`}
                        strokeLinecap="round"
                        transform="rotate(-90 100 100)"
                        className="text-foreground transition-all duration-100"
                    />
                </svg>

                {/* Logo container */}
                <div
                    className="relative flex flex-col items-center justify-center transition-transform duration-700"
                    style={{
                        transform: `scale(${0.8 + (progress / 100) * 0.2})`,
                    }}
                >
                    {restaurant.logo ? (
                        <img
                            src={restaurant.logo}
                            alt={restaurant.name}
                            className="w-24 h-24 object-contain rounded-xl"
                            style={{
                                opacity: progress > 20 ? 1 : 0,
                                transition: "opacity 0.5s",
                            }}
                        />
                    ) : (
                        <div
                            className="w-24 h-24 rounded-xl bg-primary/10 flex items-center justify-center"
                            style={{
                                opacity: progress > 20 ? 1 : 0,
                                transition: "opacity 0.5s",
                            }}
                        >
                            <span className="text-4xl font-bold text-primary">
                                {restaurant.name.charAt(0)}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Restaurant name */}
            <div
                className="mt-8 text-center transition-all duration-500"
                style={{
                    opacity: progress > 40 ? 1 : 0,
                    transform: `translateY(${progress > 40 ? 0 : 20}px)`,
                }}
            >
                <h1 className="font-serif text-2xl md:text-3xl text-foreground font-light tracking-wide">
                    {restaurant.name}
                </h1>
                {restaurant.tagline && (
                    <p
                        className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase mt-2 transition-opacity duration-500"
                        style={{ opacity: progress > 60 ? 1 : 0 }}
                    >
                        {restaurant.tagline}
                    </p>
                )}
            </div>

            {/* Loading text */}
            <p
                className="absolute bottom-10 text-[10px] tracking-[0.3em] text-muted-foreground uppercase transition-opacity duration-300"
                style={{ opacity: progress < 95 ? 1 : 0 }}
            >
                Loading menu...
            </p>
        </div>
    );
}
