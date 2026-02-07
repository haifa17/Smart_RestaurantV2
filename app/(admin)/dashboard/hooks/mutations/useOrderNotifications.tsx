"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Order } from "@/lib/models/order";

interface OrderNotification {
  id: string;
  orderNumber: string;
  customerName: string;
  total: number;
  timestamp: Date;
  isRead: boolean;
}

interface UseOrderNotificationsOptions {
  restaurantId: string;
  enabled?: boolean;
  pollingInterval?: number; // in milliseconds
  onNotificationClick?: () => void;
}

// Function to create a notification sound using Web Audio API
function createNotificationSound(): () => void {
  return () => {
    if (typeof window === "undefined") return;

    try {
      const audioContext = new (
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext
      )();

      // Create oscillator for the "ding" sound
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Bell-like sound - louder and more urgent
      oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
      oscillator.type = "sine";

      // Volume envelope - louder
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(
        0.7,
        audioContext.currentTime + 0.01,
      );
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.6,
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.6);

      // Second tone for richer sound
      const oscillator2 = audioContext.createOscillator();
      const gainNode2 = audioContext.createGain();

      oscillator2.connect(gainNode2);
      gainNode2.connect(audioContext.destination);

      oscillator2.frequency.setValueAtTime(1320, audioContext.currentTime);
      oscillator2.type = "sine";

      gainNode2.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode2.gain.linearRampToValueAtTime(
        0.5,
        audioContext.currentTime + 0.01,
      );
      gainNode2.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.4,
      );

      oscillator2.start(audioContext.currentTime);
      oscillator2.stop(audioContext.currentTime + 0.4);

      // Third tone for more urgency
      setTimeout(() => {
        try {
          const ctx = new (
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext })
              .webkitAudioContext
          )();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.setValueAtTime(1100, ctx.currentTime);
          osc.type = "sine";
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.3);
        } catch (e) {
          console.log("Sound error:", e);
        }
      }, 150);
    } catch (err) {
      console.log("Could not play notification sound:", err);
    }
  };
}

// Request browser notification permission and register service worker
async function requestNotificationPermission(): Promise<boolean> {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return false;
  }

  if (Notification.permission === "granted") {
    await registerServiceWorker();
    return true;
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      await registerServiceWorker();
      return true;
    }
  }

  return false;
}

// Register service worker for push notifications
async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    console.log("Service workers not supported");
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
    });
    console.log("Service Worker registered:", registration.scope);
    return registration;
  } catch (error) {
    console.error("Service Worker registration failed:", error);
    return null;
  }
}

// Show notification via Service Worker (works even when tab is closed)
async function showServiceWorkerNotification(
  title: string,
  body: string,
  data?: Record<string, unknown>,
): Promise<void> {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    return;
  }

  try {
    const registration = await navigator.serviceWorker.ready;

    // Send message to service worker to show notification
    if (registration.active) {
      registration.active.postMessage({
        type: "SHOW_NOTIFICATION",
        title,
        body,
        data,
      });
    }
  } catch (error) {
    console.error("Failed to show service worker notification:", error);
  }
}

// Show browser notification
function showBrowserNotification(
  title: string,
  body: string,
  onClick?: () => void,
): Notification | null {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return null;
  }

  if (Notification.permission === "granted") {
    const notification = new Notification(title, {
      body,
      icon: "/favicon.ico",
      badge: "/favicon.ico",
      tag: "new-order",
      requireInteraction: true, // Keep notification until user interacts
      silent: true, // We handle sound ourselves
    });

    if (onClick) {
      notification.onclick = () => {
        window.focus();
        onClick();
        notification.close();
      };
    }

    return notification;
  }

  return null;
}

export function useOrderNotifications({
  restaurantId,
  enabled = true,
  pollingInterval = 10000, // Poll every 10 seconds
  onNotificationClick,
}: UseOrderNotificationsOptions) {
  const queryClient = useQueryClient();
  const playSoundRef = useRef<(() => void) | null>(null);
  const soundIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const browserNotificationRef = useRef<Notification | null>(null);
  const lastOrderCountRef = useRef<number>(0);
  const lastOrderIdsRef = useRef<Set<string>>(new Set());
  const isInitialLoadRef = useRef<boolean>(true);
  const [notifications, setNotifications] = useState<OrderNotification[]>([]);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<
    NotificationPermission | "default"
  >("default");

  // Request notification permission and register service worker on mount
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setNotificationPermission(Notification.permission);

      // Always try to register service worker if permission is granted
      if (Notification.permission === "granted") {
        registerServiceWorker();
      } else if (Notification.permission === "default") {
        requestNotificationPermission().then((granted) => {
          setNotificationPermission(granted ? "granted" : "denied");
        });
      }
    }
  }, []);

  // Initialize sound function
  useEffect(() => {
    if (typeof window !== "undefined") {
      playSoundRef.current = createNotificationSound();
    }
  }, []);

  // Play notification sound
  const playSound = useCallback(() => {
    if (playSoundRef.current && !isMuted) {
      playSoundRef.current();
    }
  }, [isMuted]);

  // Start repeating sound every 2 seconds
  const startRepeatingSound = useCallback(() => {
    // Clear any existing interval
    if (soundIntervalRef.current) {
      clearInterval(soundIntervalRef.current);
    }

    // Play sound immediately
    playSound();

    // Then repeat every 2 seconds
    soundIntervalRef.current = setInterval(() => {
      playSound();
    }, 2000);
  }, [playSound]);

  // Stop repeating sound
  const stopRepeatingSound = useCallback(() => {
    if (soundIntervalRef.current) {
      clearInterval(soundIntervalRef.current);
      soundIntervalRef.current = null;
    }
    // Close browser notification
    if (browserNotificationRef.current) {
      browserNotificationRef.current.close();
      browserNotificationRef.current = null;
    }
  }, []);

  // Toggle mute
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      if (!prev) {
        // If muting, stop the repeating sound
        stopRepeatingSound();
      }
      return !prev;
    });
  }, [stopRepeatingSound]);

  // Add a new notification
  const addNotification = useCallback(
    (order: Order) => {
      const notification: OrderNotification = {
        id: order.id,
        orderNumber: order.orderNumber,
        customerName: order.customerName || "Client",
        total: Number(order.total),
        timestamp: new Date(),
        isRead: false,
      };

      setNotifications((prev) => {
        // Check if notification already exists
        if (prev.some((n) => n.id === notification.id)) {
          return prev;
        }
        return [notification, ...prev];
      });
      setHasUnreadNotifications(true);

      // Start repeating sound
      if (!isMuted) {
        startRepeatingSound();
      }

      // Show push notification via Service Worker (works even when tab/browser is closed)
      showServiceWorkerNotification(
        "🔔 Nouvelle Commande!",
        `Commande ${order.orderNumber} - ${order.customerName || "Client"} - ${Number(order.total).toFixed(2)} DT`,
        { orderId: order.id, url: "/dashboard" },
      );

      // Also show regular browser notification as fallback
      browserNotificationRef.current = showBrowserNotification(
        "🔔 Nouvelle Commande!",
        `Commande ${order.orderNumber} - ${order.customerName || "Client"} - ${Number(order.total).toFixed(2)} DT`,
        () => {
          stopRepeatingSound();
          onNotificationClick?.();
        },
      );
    },
    [isMuted, startRepeatingSound, stopRepeatingSound, onNotificationClick],
  );

  // Mark notification as read
  const markAsRead = useCallback(
    (notificationId: string) => {
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n)),
      );
      // Check if there are still unread notifications
      setNotifications((prev) => {
        const stillHasUnread = prev.some(
          (n) => !n.isRead && n.id !== notificationId,
        );
        setHasUnreadNotifications(stillHasUnread);
        // Stop sound if no more unread
        if (!stillHasUnread) {
          stopRepeatingSound();
        }
        return prev;
      });
    },
    [stopRepeatingSound],
  );

  // Mark all notifications as read
  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setHasUnreadNotifications(false);
    stopRepeatingSound();
  }, [stopRepeatingSound]);

  // Clear all notifications
  const clearNotifications = useCallback(() => {
    setNotifications([]);
    setHasUnreadNotifications(false);
    stopRepeatingSound();
  }, [stopRepeatingSound]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (soundIntervalRef.current) {
        clearInterval(soundIntervalRef.current);
      }
      if (browserNotificationRef.current) {
        browserNotificationRef.current.close();
      }
    };
  }, []);

  // Poll for new orders
  useEffect(() => {
    if (!enabled || !restaurantId) return;

    const checkForNewOrders = async () => {
      try {
        const res = await fetch(
          `/api/admin/restaurants/${restaurantId}/orders`,
        );
        if (!res.ok) return;

        const json = await res.json();
        const orders: Order[] = Array.isArray(json.data) ? json.data : [];

        // Get current order IDs
        const currentOrderIds = new Set(orders.map((o) => o.id));

        // Find new orders (orders that weren't in the previous set)
        const newOrders = orders.filter(
          (order) =>
            !lastOrderIdsRef.current.has(order.id) &&
            order.status === "PENDING",
        );

        // Only notify for new orders after initial load
        if (!isInitialLoadRef.current && newOrders.length > 0) {
          newOrders.forEach((order) => {
            addNotification(order);
          });
        }

        // Auto-mark notifications as read if their orders are no longer PENDING
        const pendingOrderIds = new Set(
          orders.filter((o) => o.status === "PENDING").map((o) => o.id),
        );
        setNotifications((prev) => {
          const updatedNotifications = prev.map((notification) => {
            // If the order is no longer pending, mark notification as read
            if (!pendingOrderIds.has(notification.id) && !notification.isRead) {
              return { ...notification, isRead: true };
            }
            return notification;
          });

          // Check if there are still unread notifications
          const stillHasUnread = updatedNotifications.some((n) => !n.isRead);
          setHasUnreadNotifications(stillHasUnread);

          // Stop sound if no more unread notifications
          if (!stillHasUnread) {
            stopRepeatingSound();
          }

          return updatedNotifications;
        });

        // Mark initial load as complete
        isInitialLoadRef.current = false;

        // Update refs
        lastOrderCountRef.current = orders.length;
        lastOrderIdsRef.current = currentOrderIds;

        // Update the query cache
        queryClient.setQueryData(["orders", restaurantId], orders);
      } catch (error) {
        console.error("Error checking for new orders:", error);
      }
    };

    // Initial check
    checkForNewOrders();

    // Set up polling interval
    const intervalId = setInterval(checkForNewOrders, pollingInterval);

    return () => clearInterval(intervalId);
  }, [enabled, restaurantId, pollingInterval, addNotification, queryClient]);

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return {
    notifications,
    unreadCount,
    hasUnreadNotifications,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    playSound, // For testing
    isMuted,
    toggleMute,
    stopRepeatingSound,
    notificationPermission,
  };
}
