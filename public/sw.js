// Service Worker for Push Notifications
const CACHE_NAME = "smart-restaurant-v1";

// Install event
self.addEventListener("install", (event) => {
    console.log("[Service Worker] Installing...");
    self.skipWaiting();
});

// Activate event
self.addEventListener("activate", (event) => {
    console.log("[Service Worker] Activated");
    event.waitUntil(clients.claim());
});

// Push event - This fires when a push notification is received
self.addEventListener("push", (event) => {
    console.log("[Service Worker] Push received");

    let data = {
        title: "🔔 Nouvelle Commande!",
        body: "Vous avez une nouvelle commande",
        icon: "/favicon.ico",
        badge: "/favicon.ico",
        tag: "new-order",
        requireInteraction: true,
        data: { url: "/dashboard" },
    };

    if (event.data) {
        try {
            data = { ...data, ...event.data.json() };
        } catch (e) {
            data.body = event.data.text();
        }
    }

    const options = {
        body: data.body,
        icon: data.icon || "/favicon.ico",
        badge: data.badge || "/favicon.ico",
        tag: data.tag || "new-order",
        requireInteraction: true,
        vibrate: [200, 100, 200, 100, 200],
        data: data.data || { url: "/dashboard" },
        actions: [
            { action: "view", title: "Voir la commande" },
            { action: "dismiss", title: "Ignorer" },
        ],
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Notification click event
self.addEventListener("notificationclick", (event) => {
    console.log("[Service Worker] Notification clicked");
    event.notification.close();

    if (event.action === "dismiss") {
        return;
    }

    // Open or focus the dashboard and navigate to orders tab
    event.waitUntil(
        clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
            // Check if there's already a window open
            for (const client of clientList) {
                if (client.url.includes("/dashboard") && "focus" in client) {
                    // Send message to navigate to orders tab
                    client.postMessage({
                        type: "NAVIGATE_TO_ORDERS",
                        orderId: event.notification.data?.orderId,
                    });
                    return client.focus();
                }
            }
            // If no window is open, open a new one with orders tab param
            if (clients.openWindow) {
                return clients.openWindow("/dashboard?tab=orders");
            }
        })
    );
});

// Message event - for communication with the main app
self.addEventListener("message", (event) => {
    console.log("[Service Worker] Message received:", event.data);

    if (event.data && event.data.type === "SHOW_NOTIFICATION") {
        const { title, body, data } = event.data;
        self.registration.showNotification(title, {
            body,
            icon: "/favicon.ico",
            badge: "/favicon.ico",
            tag: "new-order-" + Date.now(),
            requireInteraction: true,
            vibrate: [200, 100, 200, 100, 200],
            data: data || { url: "/dashboard" },
            actions: [
                { action: "view", title: "Voir la commande" },
                { action: "dismiss", title: "Ignorer" },
            ],
        });
    }
});
