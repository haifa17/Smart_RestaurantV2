"use client";

import { Book, QrCode, Settings, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useRestaurant } from "@/app/(admin)/dashboard/hooks/queries/useRestaurant";
import { useAuth } from "@clerk/nextjs";
import { RESTAURANT_ID } from "@/app/(admin)/dashboard/lib/constants";
type Tab = "menu" | "qr" | "info" | "story";

interface SidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const { userId } = useAuth();
  console.log("userId", userId);
  const { data: restaurant } = useRestaurant(RESTAURANT_ID!);
  console.log("restaurant", restaurant);
  const items: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "menu", label: "Menu", icon: <UtensilsCrossed size={18} /> },
    { key: "qr", label: "QR Code", icon: <QrCode size={18} /> },
    { key: "story", label: "Story", icon: <Book size={18} /> },
    { key: "info", label: "Restaurant Info", icon: <Settings size={18} /> },
  ];

  return (
    <aside className="w-64 border-r min-h-screen px-4 space-y-10">
      <div className="flex flex-col items-center gap-1">
        <img
          src={restaurant?.logo || "/H2A.png"}
          alt="Restaurant logo"
          className=" w-20 h-20 rounded-full "
        />
        <Button
          className="hover:underline bg-transparent text-black hover:bg-transparent "
          size="sm"
          asChild
          disabled={!restaurant}
        >
          <Link href="/" target="_blank" rel="noopener noreferrer" className="">
            <ExternalLink className="h-4 w-4" />
            View Menu
          </Link>
        </Button>
      </div>
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
    </aside>
  );
};
