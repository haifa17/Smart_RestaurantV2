"use client";
import React, { useState } from "react";
import { TabNav } from "./tab-nav";
import { TabsMangement } from "./TabsMangement";
import { RESTAURANT_ID } from "../lib/constants";
import { Sidebar } from "@/components/Sidebar";

const DashContent = () => {
  const [activeTab, setActiveTab] = useState<"menu" | "qr" | "info" | "story">(
    "menu"
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content */}
      <main className="flex-1 p-8">
        <TabsMangement activeTab={activeTab} restaurantId={RESTAURANT_ID!} />
      </main>
    </div>
  );
};

export default DashContent;
