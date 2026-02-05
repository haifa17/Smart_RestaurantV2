"use client";
import { SignedIn, useUser } from "@clerk/nextjs";
import UserAvatarMenu from "./UserAvatarMenu";
import { Menu } from "lucide-react";
import { OrderNotificationBell } from "@/app/(admin)/dashboard/components/notifications/OrderNotificationBell";
import { useTab } from "../contexts/TabContext";

const Header = ({
  onMenuClick,
  showNotifications = false,
}: {
  onMenuClick: () => void;
  showNotifications?: boolean;
}) => {
  const { user } = useUser();
  const { setActiveTab } = useTab();

  const handleOrderClick = () => {
    setActiveTab("orders");
  };

  return (
    <header className="sticky top-0 z-30 bg-white flex flex-row justify-between md:justify-end items-center px-4 py-6 gap-4 shadow">
      {/* Hamburger only mobile */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-md hover:bg-gray-100 justify-end"
      >
        <Menu className="w-6 h-6" />
      </button>

      <SignedIn>
        <div className="flex items-center gap-3">
          {/* Notification Bell - only show when restaurant is loaded */}
          {showNotifications && (
            <OrderNotificationBell onOrderClick={handleOrderClick} />
          )}

          {user && (
            <div className="text-sm font-medium">
              <p>
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-gray-600">
                {user.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          )}
          <UserAvatarMenu />
        </div>
      </SignedIn>
    </header>
  );
};

export default Header;
