"use client";

import Header from "@/components/layout/Header";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ClerkProvider } from "@clerk/nextjs";
import { TabProvider } from "@/components/contexts/TabContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <TabProvider>
            <div className="flex min-h-screen">
              <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
              />
              <div className="flex-1 h-screen overflow-y-auto flex flex-col">
                <Header onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="flex-1 ">{children}</main>
              </div>
            </div>
          </TabProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
