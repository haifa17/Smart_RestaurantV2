"use client";

import Header from "@/components/layout/Header";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ClerkProvider } from "@clerk/nextjs";
import { TabProvider } from "@/components/contexts/TabContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { OrderNotificationProvider } from "@/lib/contexts/OrderNotificationContext";
import { useMyRestaurant } from "./hooks/mutations/useMyRestaurantMutation";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: restaurant } = useMyRestaurant();

  // Render layout without notification provider if restaurant not loaded yet
  if (!restaurant?.restaurantId) {
    return (
      <div className="flex min-h-screen">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className="flex-1 h-screen overflow-y-auto flex flex-col">
          <Header
            onMenuClick={() => setIsSidebarOpen(true)}
            showNotifications={false}
          />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    );
  }

  return (
    <OrderNotificationProvider
      restaurantId={restaurant.restaurantId}
      onNotificationClick={() => {}}
    >
      <div className="flex min-h-screen">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className="flex-1 h-screen overflow-y-auto flex flex-col">
          <Header
            onMenuClick={() => setIsSidebarOpen(true)}
            showNotifications={true}
          />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </OrderNotificationProvider>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 30000,
          },
        },
      }),
  );

  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <TabProvider>
            <LayoutContent>{children}</LayoutContent>
          </TabProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
