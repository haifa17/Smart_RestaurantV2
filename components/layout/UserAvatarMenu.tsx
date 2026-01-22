"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { LogOut, Settings, User2 } from "lucide-react";
import { useState } from "react";
import { useTab } from "../contexts/TabContext";

export default function UserAvatarMenu() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [open, setOpen] = useState(false);
  const { setActiveTab } = useTab();

  if (!user) return null;

  return (
    <div className="relative">
      {/* Avatar */}
      <button onClick={() => setOpen(!open)}>
        <img
          src={user.imageUrl}
          alt="avatar"
          className="w-10 h-10 rounded-full border cursor-pointer"
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 py-2 bg-white border rounded-md shadow z-50">
          <div className="px-4 py-2 flex items-center gap-2 text-sm font-semibold text-gray-700 border-b">
            <User2 size={15} />
            {user.firstName} {user.lastName}
          </div>
          <button
            className="w-full text-left  flex items-center gap-2 px-4 py-2 text-sm cursor-pointer capitalize hover:bg-gray-100"
            onClick={() => setActiveTab("info")}
          >
            {" "}
            <Settings size={15} /> Paramètres
          </button>
          <button
            onClick={() => signOut({ redirectUrl: "/sign-in" })}
            className="w-full text-left  flex items-center gap-2 px-4 py-2 text-sm text-red-600 cursor-pointer capitalize hover:bg-gray-100"
          >
            <LogOut size={15} />
            se déconnecter{" "}
          </button>
        </div>
      )}
    </div>
  );
}
