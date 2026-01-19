"use client";

import { useTab } from "@/components/contexts/TabContext";
import { TabsMangement } from "./TabsMangement";
import { RESTAURANT_ID } from "../lib/constants";

export default function DashboardClient() {
  const { activeTab } = useTab();

  return (
    <div className="p-8">
      <TabsMangement activeTab={activeTab} restaurantId={RESTAURANT_ID!} />
    </div>
  );
}