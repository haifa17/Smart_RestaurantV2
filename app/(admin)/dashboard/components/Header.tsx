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

const Header = () => {
  const { userId } = useAuth();
  console.log("userId", userId);
  const { data: restaurant } = useRestaurant(RESTAURANT_ID);
  console.log("restaurant", restaurant);
  return (
    <header className="flex flex-col md:flex-row justify-between items-center p-4 gap-4 ">
      <div className="w-16 h-10 shadow-xl  rounded-full">
        <img
          src={restaurant?.logo || "/H2A.png"}
          alt="Restaurant logo"
          className=" object-cover"
        />
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
