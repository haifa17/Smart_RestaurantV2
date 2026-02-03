"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import { useRestaurant } from "@/app/(admin)/dashboard/hooks/queries/useRestaurant";
import SidebarItems from "./SidebarItems";
import { useClerk } from "@clerk/nextjs";
import { pulseVariants } from "@/lib/variants";
import { motion } from "framer-motion";
import { useMyRestaurant } from "@/app/(admin)/dashboard/hooks/mutations/useMyRestaurantMutation";
export const Sidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { data: myRestaurant } = useMyRestaurant();
  const { data: restaurant } = useRestaurant(myRestaurant?.restaurantId!);
  const { signOut } = useClerk();
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-64 bg-slate-900 text-white
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          
          lg:translate-x-0 
          lg:sticky lg:top-0 lg:h-screen
          
          border-r px-4 flex flex-col
        `}
      >
        {/* Top Section */}
        <div className="space-y-10 py-6">
          <div className="flex flex-col items-center gap-2">
            <motion.div
              variants={pulseVariants}
              initial="initial"
              animate="animate"
              className="relative"
            >
              <div className="absolute inset-0 bg- menuBaseUrl String-to-r from-blue-500 to-blue-700 rounded-full blur-2xl opacity-30" />
              <div className="relative flex justify-center items-center">
                <img
                  src={restaurant?.logo || "/logo.svg"}
                  alt="Restaurant logo"
                  className="w-28 h-28 rounded-full border"
                />
              </div>
            </motion.div>

            {restaurant?.slug && (
              <Link
                href={`${restaurant.menuBaseUrl}/${restaurant.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-1 text-sm font-semibold items-center hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                Voir Menu
              </Link>
            )}
          </div>

          {/* Sidebar navigation */}
          <div onClick={onClose}>
            <SidebarItems />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pb-6 pt-4 border-t flex flex-col items-center gap-2">
          <Button
            onClick={() => signOut({ redirectUrl: "/sign-in" })}
            variant="outline"
            className="w-full flex items-center gap-2 hover:text-white hover:scale-95 bg-gradient-to-r from-blue-500 to-blue-700 border-none cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>

          <div className="mt-4 text-center text-xs text-gray-200">
            <div>
              Powered by{" "}
              <Link
                href="https://www.h2a-group.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-400"
              >
                H2A
              </Link>
            </div>
            <div>© {currentYear} H2A. All rights reserved.</div>
          </div>
        </div>
      </aside>
    </>
  );
};
