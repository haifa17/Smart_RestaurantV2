"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  X,
  Check,
  CheckCheck,
  Volume2,
  VolumeX,
  BellOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useOrderNotificationContext } from "@/lib/contexts/OrderNotificationContext";

interface OrderNotificationBellProps {
  onOrderClick?: (orderId: string) => void;
}

export function OrderNotificationBell({
  onOrderClick,
}: OrderNotificationBellProps) {
  const {
    notifications,
    unreadCount,
    hasUnreadNotifications,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    isMuted,
    toggleMute,
    stopRepeatingSound,
    notificationPermission,
    acceptOrder,
  } = useOrderNotificationContext();

  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Animate bell when new notification arrives
  useEffect(() => {
    if (hasUnreadNotifications) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [hasUnreadNotifications, unreadCount]);

  const handleNotificationClick = (notificationId: string) => {
    markAsRead(notificationId);
    onOrderClick?.(notificationId);
    setIsOpen(false);
  };

  const handleAcceptOrder = async (
    e: React.MouseEvent,
    notificationId: string,
  ) => {
    e.stopPropagation();
    await acceptOrder(notificationId);
    markAsRead(notificationId);
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "relative p-3 rounded-full bg-linear-to-r from-blue-500 to-blue-700 text-white",
          isAnimating && "animate-bounce",
          hasUnreadNotifications && "text-orange-500 shadow  ",
          
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell
          className={cn(
            "h-5 w-5 transition-colors",
            hasUnreadNotifications && "fill-orange-500 text-orange-500",
          )}
        />
        {unreadCount > 0 && (
          <Badge
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs animate-pulse"
            variant="destructive"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </Badge>
        )}
      </Button>

      {/* Notification Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Panel */}
          <Card className="absolute right-0 top-12  z-50 shadow-lg border-2 border-orange-200">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-orange-500" />
                <h3 className="font-semibold">Nouvelles Commandes</h3>
                {unreadCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 text-orange-700"
                  >
                    {unreadCount} nouvelle{unreadCount > 1 ? "s" : ""}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={toggleMute}
                  title={isMuted ? "Activer le son" : "Désactiver le son"}
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Volume2 className="h-4 w-4 text-green-500" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Notifications List */}
            <ScrollArea className="max-h-[400px]">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <Bell className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p>Aucune notification</p>
                  <p className="text-sm">
                    Les nouvelles commandes apparaîtront ici
                  </p>
                </div>
              ) : (
                <div className="divide-y">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        "p-4 cursor-pointer transition-colors hover:bg-muted/50",
                        !notification.isRead &&
                          "bg-orange-50 dark:bg-orange-950/20",
                      )}
                      onClick={() => handleNotificationClick(notification.id)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            {!notification.isRead && (
                              <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                            )}
                            <p className="font-medium truncate">
                              Commande #{notification.orderNumber}
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {notification.customerName}
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-sm font-semibold text-green-600">
                              {notification.total.toFixed(2)} €
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(notification.timestamp, {
                                addSuffix: true,
                                locale: fr,
                              })}
                            </span>
                          </div>
                        </div>
                        {!notification.isRead && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 shrink-0"
                            onClick={(e) =>
                              handleAcceptOrder(e, notification.id)
                            }
                            title="Confirmer la commande"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>

            {/* Footer Actions */}
            {notifications.length > 0 && (
              <div className="flex items-center justify-between p-3 border-t bg-muted/30">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                >
                  <CheckCheck className="h-3 w-3 mr-1" />
                  Tout marquer comme lu
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-destructive hover:text-destructive"
                  onClick={clearNotifications}
                >
                  Effacer tout
                </Button>
              </div>
            )}
          </Card>
        </>
      )}

      {/* Persistent Banner for Unread Notifications */}
      {hasUnreadNotifications && !isOpen && (
        <div className="fixed bottom-4 right-4 z-50">
          <Card className="p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-2xl border-0 animate-pulse">
            <div className="flex items-center gap-3">
              <Bell className="h-8 w-8 animate-bounce" />
              <div className="flex-1">
                <p className="font-bold text-lg">
                  🔔 {unreadCount} nouvelle{unreadCount > 1 ? "s" : ""} commande
                  {unreadCount > 1 ? "s" : ""}!
                </p>
                <p className="text-sm opacity-90">
                  Nouvelle commande en attente
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <Button
                variant="secondary"
                size="sm"
                className="flex-1 bg-white text-orange-600 hover:bg-gray-100"
                onClick={() => setIsOpen(true)}
              >
                Voir les commandes
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/20 text-white hover:bg-white/30 border-white/50"
                onClick={(e) => {
                  e.stopPropagation();
                  stopRepeatingSound();
                  markAllAsRead();
                }}
              >
                <BellOff className="h-4 w-4 mr-1" />
                Arrêter
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
