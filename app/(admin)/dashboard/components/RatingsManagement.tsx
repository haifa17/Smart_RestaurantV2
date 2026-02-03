"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Star, ThumbsUp, ThumbsDown, Trash2, Eye, EyeOff, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface Rating {
    id: string;
    rating: number;
    comment: string | null;
    customerName: string | null;
    foodRating: number | null;
    serviceRating: number | null;
    ambianceRating: number | null;
    isPublic: boolean;
    isApproved: boolean;
    createdAt: string;
    order?: {
        orderNumber: string;
        total: number;
        customerName: string | null;
        createdAt: string;
    } | null;
}

interface RatingsData {
    ratings: Rating[];
    stats: {
        totalRatings: number;
        approvedRatings: number;
        pendingRatings: number;
        averageRating: number;
    };
}

interface RatingsManagementProps {
    restaurantId: string;
}

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
    const sizeClass = size === "lg" ? "h-6 w-6" : "h-4 w-4";
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={cn(
                        sizeClass,
                        star <= rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                    )}
                />
            ))}
        </div>
    );
}

function RatingBar({ label, value, max = 5 }: { label: string; value: number | null; max?: number }) {
    if (value === null) return null;
    const percentage = (value / max) * 100;

    return (
        <div className="flex items-center gap-2 text-sm">
            <span className="w-20 text-muted-foreground">{label}</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-full bg-yellow-400 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <span className="w-8 text-right font-medium">{value.toFixed(1)}</span>
        </div>
    );
}

export function RatingsManagement({ restaurantId }: RatingsManagementProps) {
    const queryClient = useQueryClient();
    const [deleteId, setDeleteId] = useState<string | null>(null);

    // Fetch ratings
    const { data, isLoading, error } = useQuery<RatingsData>({
        queryKey: ["ratings", restaurantId],
        queryFn: async () => {
            const res = await fetch(`/api/admin/restaurants/${restaurantId}/ratings`);
            if (!res.ok) throw new Error("Failed to fetch ratings");
            const json = await res.json();
            return json.data;
        },
    });

    // Update rating mutation
    const updateMutation = useMutation({
        mutationFn: async ({ id, data }: { id: string; data: Partial<Rating> }) => {
            const res = await fetch(`/api/admin/ratings/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error("Failed to update rating");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ratings", restaurantId] });
        },
    });

    // Delete rating mutation
    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`/api/admin/ratings/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete rating");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ratings", restaurantId] });
            setDeleteId(null);
        },
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="text-center text-muted-foreground py-8">
                Erreur lors du chargement des avis
            </div>
        );
    }

    const { ratings, stats } = data;

    return (
        <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Note moyenne</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-3xl font-bold">{stats.averageRating}</span>
                                    <StarRating rating={Math.round(stats.averageRating)} size="lg" />
                                </div>
                            </div>
                            <Star className="h-10 w-10 text-yellow-400 fill-yellow-400" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total des avis</p>
                                <p className="text-3xl font-bold mt-1">{stats.totalRatings}</p>
                            </div>
                            <MessageSquare className="h-10 w-10 text-blue-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Avis approuvés</p>
                                <p className="text-3xl font-bold mt-1 text-green-600">{stats.approvedRatings}</p>
                            </div>
                            <ThumbsUp className="h-10 w-10 text-green-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">En attente</p>
                                <p className="text-3xl font-bold mt-1 text-orange-600">{stats.pendingRatings}</p>
                            </div>
                            <ThumbsDown className="h-10 w-10 text-orange-500" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Ratings List */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        Avis des clients
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {ratings.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            <Star className="h-12 w-12 mx-auto mb-4 opacity-20" />
                            <p>Aucun avis pour le moment</p>
                            <p className="text-sm mt-1">Les avis des clients apparaîtront ici</p>
                        </div>
                    ) : (
                        <ScrollArea className="h-[500px]">
                            <div className="space-y-4">
                                {ratings.map((rating) => (
                                    <Card
                                        key={rating.id}
                                        className={cn(
                                            "border",
                                            !rating.isApproved && "border-orange-300 bg-orange-50/50"
                                        )}
                                    >
                                        <CardContent className="pt-4">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <StarRating rating={rating.rating} size="lg" />
                                                        <span className="font-semibold text-lg">
                                                            {rating.rating}/5
                                                        </span>
                                                        {!rating.isApproved && (
                                                            <Badge variant="outline" className="text-orange-600 border-orange-300">
                                                                Non approuvé
                                                            </Badge>
                                                        )}
                                                        {!rating.isPublic && (
                                                            <Badge variant="outline" className="text-gray-500">
                                                                Masqué
                                                            </Badge>
                                                        )}
                                                    </div>

                                                    {rating.comment && (
                                                        <p className="text-gray-700 mb-3">&quot;{rating.comment}&quot;</p>
                                                    )}

                                                    <div className="grid grid-cols-3 gap-4 mb-3">
                                                        <RatingBar label="Nourriture" value={rating.foodRating} />
                                                        <RatingBar label="Service" value={rating.serviceRating} />
                                                        <RatingBar label="Ambiance" value={rating.ambianceRating} />
                                                    </div>

                                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                        <span>
                                                            Par: <strong>{rating.customerName || "Anonyme"}</strong>
                                                        </span>
                                                        {rating.order && (
                                                            <span>
                                                                Commande: <strong>#{rating.order.orderNumber}</strong>
                                                            </span>
                                                        )}
                                                        <span>
                                                            {formatDistanceToNow(new Date(rating.createdAt), {
                                                                addSuffix: true,
                                                                locale: fr,
                                                            })}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex items-center gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() =>
                                                            updateMutation.mutate({
                                                                id: rating.id,
                                                                data: { isApproved: !rating.isApproved },
                                                            })
                                                        }
                                                        title={rating.isApproved ? "Désapprouver" : "Approuver"}
                                                    >
                                                        {rating.isApproved ? (
                                                            <ThumbsDown className="h-4 w-4 text-orange-500" />
                                                        ) : (
                                                            <ThumbsUp className="h-4 w-4 text-green-500" />
                                                        )}
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() =>
                                                            updateMutation.mutate({
                                                                id: rating.id,
                                                                data: { isPublic: !rating.isPublic },
                                                            })
                                                        }
                                                        title={rating.isPublic ? "Masquer" : "Afficher"}
                                                    >
                                                        {rating.isPublic ? (
                                                            <EyeOff className="h-4 w-4 text-gray-500" />
                                                        ) : (
                                                            <Eye className="h-4 w-4 text-blue-500" />
                                                        )}
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => setDeleteId(rating.id)}
                                                        title="Supprimer"
                                                    >
                                                        <Trash2 className="h-4 w-4 text-red-500" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </ScrollArea>
                    )}
                </CardContent>
            </Card>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Supprimer cet avis ?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Cette action est irréversible. L&apos;avis sera définitivement supprimé.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-500 hover:bg-red-600"
                            onClick={() => deleteId && deleteMutation.mutate(deleteId)}
                        >
                            Supprimer
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
