"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "../../../../components/Header";
import DashContent from "./DashContent";
import { useState } from "react";

export default function DashboardClient() {
  // Create query client on first render
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
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <div className=" flex flex-col gap-5">
        <Header />
        <DashContent />
      </div>
    </QueryClientProvider>
  );
}
