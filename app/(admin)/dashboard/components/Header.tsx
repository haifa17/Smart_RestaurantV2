"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useAuth,
  UserButton,
} from "@clerk/nextjs";
import { useRestaurant } from "../hooks/queries/useRestaurant";
import { RESTAURANT_ID } from "../lib/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const Header = () => {
  const { userId } = useAuth();
  console.log("userId", userId);
  const { data: restaurant } = useRestaurant(RESTAURANT_ID!);
  console.log("restaurant", restaurant);
  return (
    <header className="flex flex-col md:flex-row justify-between items-center p-4 gap-4 ">
      <div className="w-16 h-10 shadow-xl flex gap-2 items-center  rounded-full">
        <img
          src={restaurant?.logo || "/H2A.png"}
          alt="Restaurant logo"
          className=" object-cover"
        />
        <Button className="hover:underline" size="sm" asChild disabled={!restaurant}>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            View Menu
          </Link>
        </Button>
      </div>
      <SignedOut>
        <SignInButton />
        <SignUpButton>
          <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
            Sign Up
          </button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
};

export default Header;
