"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

const Header = () => {
  const { user } = useUser();

  return (
    <header className="sticky top-0 z-10 bg-white flex flex-col md:flex-row justify-end items-center px-4 py-6 gap-4 shadow">
      <SignedOut>
        <SignInButton />
        <SignUpButton>
          <button className="bg-orange-700 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
            Sign Up
          </button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <div className="flex items-center gap-3">
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
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </SignedIn>
    </header>
  );
};

export default Header;
