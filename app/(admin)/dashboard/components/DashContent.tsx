"use client";
import React, { useState } from "react";
import { TabNav } from "../../../../components/tab-nav";
import { TabsMangement } from "./TabsMangement";

const DashContent = () => {
  const [activeTab, setActiveTab] = useState<"menu" | "qr" | "info" | "story">(
    "menu"
  );
  const RESTAURANT_ID = process.env.NEXT_PUBLIC_RESTAURANT_ID || "";

  return (
    <div>
      {" "}
      <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <TabsMangement activeTab={activeTab} restaurantId={RESTAURANT_ID} />
      </main>
    </div>
  );
};

export default DashContent;
