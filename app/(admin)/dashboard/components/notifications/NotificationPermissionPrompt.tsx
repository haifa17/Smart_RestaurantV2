"use client";

import { useState, useEffect } from "react";
import { Bell, X, BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface NotificationPermissionPromptProps {
  onPermissionGranted?: () => void;
  onPermissionDenied?: () => void;
}

export function NotificationPermissionPrompt({
  onPermissionGranted,
  onPermissionDenied,
}: NotificationPermissionPromptProps) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [permissionState, setPermissionState] = useState<string>("unknown");

  useEffect(() => {
    // Check if we should show the prompt
    if (typeof window === "undefined" || !("Notification" in window)) {
      console.log("[NotificationPrompt] Notifications not supported");
      return;
    }

    const currentPermission = Notification.permission;
    console.log("[NotificationPrompt] Current permission:", currentPermission);
    setPermissionState(currentPermission);

    // Check if user dismissed the prompt before
    const wasDismissed = localStorage.getItem("notification-prompt-dismissed");
    console.log("[NotificationPrompt] Was dismissed:", wasDismissed);

    // Show prompt if permission is "default" (not yet asked) and not dismissed
    if (currentPermission === "default" && !wasDismissed) {
      console.log("[NotificationPrompt] Showing prompt in 1.5s...");
      const timer = setTimeout(() => {
        console.log("[NotificationPrompt] Showing prompt now!");
        setShowPrompt(true);
      }, 1500);
      return () => clearTimeout(timer);
    } else if (currentPermission === "denied") {
      console.log("[NotificationPrompt] Permission was denied");
    } else if (currentPermission === "granted") {
      console.log("[NotificationPrompt] Permission already granted");
    }
  }, []);

  const handleEnableNotifications = async () => {
    setIsRequesting(true);

    try {
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        // Register service worker
        if ("serviceWorker" in navigator) {
          try {
            await navigator.serviceWorker.register("/sw.js", { scope: "/" });
          } catch (e) {
            console.log("Service worker registration failed:", e);
          }
        }

        // Show a test notification
        new Notification("🎉 Notifications activées!", {
          body: "Vous recevrez maintenant des alertes pour les nouvelles commandes.",
          icon: "/favicon.ico",
        });

        onPermissionGranted?.();
        setShowPrompt(false);
      } else {
        onPermissionDenied?.();
        setShowPrompt(false);
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    } finally {
      setIsRequesting(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Store in localStorage to not ask again for this session
    localStorage.setItem("notification-prompt-dismissed", "true");
  };

  const handleResetAndShow = () => {
    // Clear the dismissed flag and show the prompt
    localStorage.removeItem("notification-prompt-dismissed");
    setShowPrompt(true);
  };

  // Show a small banner if notifications are denied
  if (permissionState === "denied") {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <Card className="p-4 bg-yellow-50 border-yellow-300 shadow-lg max-w-sm">
          <div className="flex items-start gap-3">
            <Bell className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-yellow-800">
                Notifications bloquées
              </p>
              <p className="text-xs text-yellow-700 mt-1">
                Pour activer les notifications, cliquez sur l&apos;icône 🔒 dans
                la barre d&apos;adresse de votre navigateur et autorisez les
                notifications.
              </p>
            </div>
            <button
              onClick={() => setPermissionState("hidden")}
              className="text-yellow-600 hover:text-yellow-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </Card>
      </div>
    );
  }

  if (!showPrompt) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <Card className="relative max-w-md mx-4 p-6 shadow-2xl border-2 border-orange-200 animate-in zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-25" />
            <div className="relative bg-gradient-to-br from-orange-400 to-orange-600 p-4 rounded-full">
              <BellRing className="h-10 w-10 text-white animate-bounce" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-center mb-2">
          Ne manquez aucune commande! 🔔
        </h2>

        {/* Description */}
        <p className="text-center text-muted-foreground mb-6">
          Activez les notifications pour être alerté instantanément
          lorsqu&apos;un client passe une nouvelle commande, même si vous
          n&apos;êtes pas sur cette page.
        </p>

        {/* Features */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-sm">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span>Alertes sonores pour chaque commande</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span>Notifications même si l&apos;onglet est en arrière-plan</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span>Cliquez pour voir la commande instantanément</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2">
          <Button
            onClick={handleEnableNotifications}
            disabled={isRequesting}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-6"
          >
            {isRequesting ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Activation...
              </>
            ) : (
              <>
                <Bell className="h-5 w-5 mr-2" />
                Activer les notifications
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            onClick={handleDismiss}
            className="w-full text-muted-foreground"
          >
            Plus tard
          </Button>
        </div>

        {/* Note */}
        <p className="text-xs text-center text-muted-foreground mt-4">
          Vous pourrez modifier ce paramètre à tout moment
        </p>
      </Card>
    </div>
  );
}
