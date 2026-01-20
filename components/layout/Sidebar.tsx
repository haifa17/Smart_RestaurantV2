"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import { useRestaurant } from "@/app/(admin)/dashboard/hooks/queries/useRestaurant";
import { RESTAURANT_ID } from "@/app/(admin)/dashboard/lib/constants";
import SidebarItems from "./SidebarItems";
import { useClerk } from "@clerk/nextjs";
import { pulseVariants } from "@/lib/variants";
import { motion } from "framer-motion";

export const Sidebar = () => {
  const { data: restaurant } = useRestaurant(RESTAURANT_ID!);
  const { signOut } = useClerk();
  const currentYear = new Date().getFullYear();

  return (
    <aside className="w-64 border-r h-screen text-white sticky top-0 px-4 flex flex-col bg-slate-900">
      {/* Top Section */}
      <div className="space-y-10 py-6 flex-1 overflow-y-auto">
        <div className="flex flex-col items-center gap-2">
          <motion.div
            variants={pulseVariants}
            initial="initial"
            animate="animate"
            className="relative "
          >
            <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-blue-700 rounded-full blur-2xl opacity-30" />
            <div className="relative flex justify-center items-center ">
              <img
                src={restaurant?.logo || "/logo.svg"}
                alt="Restaurant logo"
                className="w-28 h-28 rounded-full border "
              />
            </div>
          </motion.div>
          <Link href="/" target="_blank" rel="noopener noreferrer " className="flex gap-1 text-sm font-semibold items-center hover:underline">
            <ExternalLink className="h-4 w-4" />
            View Menu
          </Link>
        </div>
        <SidebarItems />
      </div>

      {/* Bottom Section - Logout + Footer */}
      <div className="pb-6 pt-4 border-t flex flex-col items-center gap-2">
        {/* Logout Button */}
        <Button
          onClick={() => signOut({ redirectUrl: "/sign-in" })}
          variant="outline"
          className="w-full flex items-center gap-2 hover:text-white hover:scale-95 bg-linear-to-r from-blue-500 to-blue-700 border-none cursor-pointer "
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>

        {/* Footer */}
        <div className="mt-4 text-center text-xs text-gray-200">
          <div>
            Powered by{" "}
            <Link
              href="https://www.h2a-group.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-600"
            >
              H2A
            </Link>
          </div>
          <div>© {currentYear} H2A. All rights reserved.</div>
        </div>
      </div>
    </aside>
  );
};
