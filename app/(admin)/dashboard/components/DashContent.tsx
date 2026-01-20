"use client";
import React, { useState } from "react";
import { TabsMangement } from "./TabsMangement";

interface DashContentProps {
  restaurantId: string;
}

const DashContent = ({ restaurantId }: DashContentProps) => {
  const [activeTab, setActiveTab] = useState<"menu" | "qr" | "info" | "story">(
    "menu"
  );

  return (
    <div className="p-8">
      <TabsMangement activeTab={activeTab} restaurantId={restaurantId} />
    </div>
  );
};

export default DashContent;
