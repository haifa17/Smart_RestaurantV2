// =====================================================
// COPY THIS FILE TO: smart-menu/components/RatingForm.tsx
// This is a consumer-facing rating component for the menu app
// =====================================================

"use client";

import { useState } from "react";
import { Star, Send, X } from "lucide-react";

interface RatingFormProps {
    slug: string;
    orderId?: string;
    onSuccess?: () => void;
    onClose?: () => void;
}

export function RatingForm({ slug, orderId, onSuccess, onClose }: RatingFormProps) {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [foodRating, setFoodRating] = useState(0);
    const [serviceRating, setServiceRating] = useState(0);
    const [ambianceRating, setAmbianceRating] = useState(0);
    const [comment, setComment] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (rating === 0) {
            setError("Veuillez donner une note générale");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            // Change this URL to your Smart_RestaurantV2 API URL
            const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

            const res = await fetch(`${API_BASE}/api/public/ratings/${slug}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    rating,
                    comment: comment.trim() || null,
                    customerName: customerName.trim() || null,
                    orderId: orderId || null,
                    foodRating: foodRating || null,
                    serviceRating: serviceRating || null,
                    ambianceRating: ambianceRating || null,
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Erreur lors de l'envoi");
            }

            setSuccess(true);
            onSuccess?.();

            // Reset form after 2 seconds
            setTimeout(() => {
                setRating(0);
                setFoodRating(0);
                setServiceRating(0);
                setAmbianceRating(0);
                setComment("");
                setCustomerName("");
                setSuccess(false);
            }, 2000);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Une erreur est survenue");
        } finally {
            setIsSubmitting(false);
        }
    };

    const StarInput = ({
        value,
        onChange,
        hovered,
        onHover,
        size = "md",
    }: {
        value: number;
        onChange: (v: number) => void;
        hovered?: number;
        onHover?: (v: number) => void;
        size?: "sm" | "md" | "lg";
    }) => {
        const sizeClass = size === "lg" ? "w-10 h-10" : size === "md" ? "w-8 h-8" : "w-6 h-6";
        const displayValue = hovered && hovered > 0 ? hovered : value;

        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => onChange(star)}
                        onMouseEnter={() => onHover?.(star)}
                        onMouseLeave={() => onHover?.(0)}
                        className="focus:outline-none transition-transform hover:scale-110"
                    >
                        <Star
                            className={`${sizeClass} ${star <= displayValue
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                } transition-colors`}
                        />
                    </button>
                ))}
            </div>
        );
    };

    if (success) {
        return (
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center">
                    <Star className="w-8 h-8 text-green-600 dark:text-green-400 fill-green-600 dark:fill-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                    Merci pour votre avis !
                </h3>
                <p className="text-green-600 dark:text-green-400 text-sm mt-1">
                    Votre retour nous aide à nous améliorer
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Donnez votre avis
                </h2>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Main Rating */}
                <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Note générale *
                    </p>
                    <StarInput
                        value={rating}
                        onChange={setRating}
                        hovered={hoveredRating}
                        onHover={setHoveredRating}
                        size="lg"
                    />
                </div>

                {/* Category Ratings */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Nourriture</p>
                        <StarInput value={foodRating} onChange={setFoodRating} size="sm" />
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Service</p>
                        <StarInput value={serviceRating} onChange={setServiceRating} size="sm" />
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Ambiance</p>
                        <StarInput value={ambianceRating} onChange={setAmbianceRating} size="sm" />
                    </div>
                </div>

                {/* Comment */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Votre commentaire (optionnel)
                    </label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Partagez votre expérience..."
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                                 bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                 focus:ring-2 focus:ring-yellow-400 focus:border-transparent
                                 resize-none transition"
                    />
                </div>

                {/* Customer Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Votre nom (optionnel)
                    </label>
                    <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Anonyme"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                                 bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                 focus:ring-2 focus:ring-yellow-400 focus:border-transparent
                                 transition"
                    />
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting || rating === 0}
                    className="w-full py-3 px-4 bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 
                             text-black font-semibold rounded-lg flex items-center justify-center gap-2
                             transition-colors disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                        <>
                            <Send className="w-5 h-5" />
                            Envoyer mon avis
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}

// =====================================================
// COPY THIS FILE TO: smart-menu/components/RatingsDisplay.tsx
// This displays existing ratings for a restaurant
// =====================================================

export function RatingsDisplay({ slug }: { slug: string }) {
    const [ratings, setRatings] = useState<any[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
                const res = await fetch(`${API_BASE}/api/public/ratings/${slug}`);
                if (res.ok) {
                    const data = await res.json();
                    setRatings(data.data.ratings);
                    setStats(data.data.stats);
                }
            } catch (error) {
                console.error("Failed to fetch ratings:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRatings();
    }, [slug]);

    if (isLoading) {
        return <div className="animate-pulse h-32 bg-gray-200 rounded-lg" />;
    }

    if (!stats || stats.totalRatings === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                Aucun avis pour le moment
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Stats Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-4">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-yellow-500">
                            {stats.averageRating}
                        </div>
                        <div className="flex justify-center mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`w-4 h-4 ${star <= Math.round(stats.averageRating)
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-300"
                                        }`}
                                />
                            ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                            {stats.totalRatings} avis
                        </p>
                    </div>

                    {/* Rating Distribution */}
                    <div className="flex-1 space-y-1">
                        {[5, 4, 3, 2, 1].map((stars) => (
                            <div key={stars} className="flex items-center gap-2 text-sm">
                                <span className="w-3">{stars}</span>
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-yellow-400 rounded-full"
                                        style={{
                                            width: `${(stats.ratingDistribution[stars] / stats.totalRatings) * 100
                                                }%`,
                                        }}
                                    />
                                </div>
                                <span className="w-8 text-gray-500 text-right">
                                    {stats.ratingDistribution[stars]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
                {ratings.map((rating) => (
                    <div
                        key={rating.id}
                        className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    {rating.customerName || "Anonyme"}
                                </p>
                                <div className="flex items-center gap-1 mt-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`w-4 h-4 ${star <= rating.rating
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-gray-300"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <span className="text-xs text-gray-500">
                                {new Date(rating.createdAt).toLocaleDateString("fr-FR")}
                            </span>
                        </div>
                        {rating.comment && (
                            <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm">
                                {rating.comment}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

// Add this import at the top of the file
import { useEffect } from "react";
