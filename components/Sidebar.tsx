"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import { useRestaurant } from "@/app/(admin)/dashboard/hooks/queries/useRestaurant";
import { RESTAURANT_ID } from "@/app/(admin)/dashboard/lib/constants";
import SidebarItems from "./SidebarItems";
import { useClerk } from "@clerk/nextjs";

export const Sidebar = () => {
  const { data: restaurant } = useRestaurant(RESTAURANT_ID!);
  const { signOut } = useClerk();

  return (
    <aside className="w-64 border-r h-screen sticky top-0 px-4 flex flex-col">
      {/* Top Section */}
      <div className="space-y-10 py-6 flex-1 overflow-y-auto">
        <div className="flex flex-col items-center gap-1">
          <img
            src={restaurant?.logo || "/H2A.png"}
            alt="Restaurant logo"
            className="w-20 h-20 rounded-full"
          />
          <Button
            className="hover:underline bg-transparent text-black hover:bg-transparent"
            size="sm"
            asChild
            disabled={!restaurant}
          >
            <Link href="/" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              View Menu
            </Link>
          </Button>
        </div>
        <SidebarItems />
      </div>

      {/* Bottom Section - Logout */}
      <div className="pb-6 pt-4 border-t">
        <Button
          onClick={() => signOut()}
          variant="outline"
          className="w-full flex items-center gap-2 text-orange-700 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
};
