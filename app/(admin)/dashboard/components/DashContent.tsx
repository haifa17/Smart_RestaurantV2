"use client";
import React, { useState } from "react";
import { TabNav } from "./tab-nav";
import { TabsMangement } from "./TabsMangement";
import { RESTAURANT_ID } from "../lib/constants";

const DashContent = () => {
  const [activeTab, setActiveTab] = useState<"menu" | "qr" | "info" | "story">(
    "menu"
  );

  return (
    <div>
      {" "}
      <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="py-8">
        <TabsMangement activeTab={activeTab} restaurantId={RESTAURANT_ID!} />
      </main>
    </div>
  );
};

export default DashContent;
