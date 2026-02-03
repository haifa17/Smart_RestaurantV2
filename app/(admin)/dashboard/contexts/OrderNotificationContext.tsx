"use client";

import React, { createContext, useContext, ReactNode, useCallback } from "react";
import { useOrderNotifications } from "../hooks/useOrderNotifications";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface OrderNotification {
    id: string;
    orderNumber: string;
    customerName: string;
    total: number;
    timestamp: Date;
    isRead: boolean;
}

interface OrderNotificationContextType {
    notifications: OrderNotification[];
    unreadCount: number;
    hasUnreadNotifications: boolean;
    markAsRead: (notificationId: string) => void;
    markAllAsRead: () => void;
    clearNotifications: () => void;
    isMuted: boolean;
    toggleMute: () => void;
    stopRepeatingSound: () => void;
    notificationPermission: NotificationPermission | "default";
    acceptOrder: (orderId: string) => Promise<void>;
}

const OrderNotificationContext = createContext<OrderNotificationContextType | null>(null);

export function OrderNotificationProvider({
    children,
    restaurantId,
    onNotificationClick,
}: {
    children: ReactNode;
    restaurantId: string;
    onNotificationClick?: () => void;
}) {
    const queryClient = useQueryClient();

    const notificationState = useOrderNotifications({
        restaurantId,
        enabled: !!restaurantId,
        pollingInterval: 5000, // Poll every 5 seconds for faster notifications
        onNotificationClick,
    });

    const acceptOrder = useCallback(async (orderId: string) => {
        try {
            const res = await fetch(
                `/api/admin/restaurants/${restaurantId}/orders/${orderId}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: "CONFIRMED" }),
                }
            );
            if (!res.ok) throw new Error("Failed to accept order");

            // Invalidate orders query to refresh the list
            queryClient.invalidateQueries({ queryKey: ["orders", restaurantId] });
            toast.success("Commande confirmée");
        } catch (error) {
            console.error("Failed to accept order:", error);
            toast.error("Échec de la confirmation");
        }
    }, [restaurantId, queryClient]);

    return (
        <OrderNotificationContext.Provider value={{ ...notificationState, acceptOrder }}>
            {children}
        </OrderNotificationContext.Provider>
    );
}

export function useOrderNotificationContext() {
    const context = useContext(OrderNotificationContext);
    if (!context) {
        throw new Error(
            "useOrderNotificationContext must be used within an OrderNotificationProvider"
        );
    }
    return context;
}
