import React from "react";
import { QrCode, Settings, UtensilsCrossed } from "lucide-react";
import { Tab, useTab } from "./contexts/TabContext";

const SidebarItems = () => {
  const { activeTab, setActiveTab } = useTab();

  const items: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "menu", label: "Menu", icon: <UtensilsCrossed size={18} /> },
    { key: "qr", label: "QR Code", icon: <QrCode size={18} /> },
    { key: "info", label: "Restaurant Info", icon: <Settings size={18} /> },
  ];

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <button
          key={item.key}
          onClick={() => setActiveTab(item.key)}
          className={`w-full flex gap-2 items-center text-left px-4 py-2 rounded-lg transition
            ${
              activeTab === item.key
                ? "bg-orange-700 text-white"
                : "hover:bg-gray-100"
            }`}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SidebarItems;
