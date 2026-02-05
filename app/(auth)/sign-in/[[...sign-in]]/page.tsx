"use client";
import { SignIn } from "@clerk/nextjs";
import { LogoAnimation } from "@/components/LogoAnimation";

export default function SignInPage() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left side - Branding / Logo */}
      <div className="flex lg:w-1/2 bg-slate-900 text-white flex-col justify-center items-center p-8 lg:p-12">
        <LogoAnimation />
        <h1 className="text-4xl font-bold mb-4 text-center -mt-5">
          Bienvenue !
        </h1>
        <p className="text-md text-center">
          Accédez à votre tableau de bord et gérez vos produits facilement.
        </p>
      </div>

      {/* Right side - Clerk SignIn Component */}
      <div className="flex flex-1 justify-center items-center p-8 bg-gray-50">
        <div className="[&_.cl-socialButtons]:hidden [&_.cl-dividerRow]:hidden">
          <SignIn
            appearance={{
              elements: {
                rootBox: "w-full max-w-md",
                card: "bg-white shadow-lg rounded-xl",
                headerTitle: "text-2xl font-bold text-gray-800",
                headerSubtitle: "text-gray-600",
                formButtonPrimary:
                  "bg-slate-900 hover:bg-slate-900/90 text-white",
                footerActionLink: "text-blue-600 hover:underline",
                formFieldInput:
                  "border-gray-300 focus:ring-blue-500 focus:border-blue-500",
                dividerLine: "bg-gray-300",
                dividerText: "text-gray-400",
                // Hide these elements
                footerAction: "hidden",
                footerActionText: "hidden",
              },
              layout: {
                showOptionalFields: false,
              },
            }}
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            redirectUrl="/dashboard"
          />
        </div>
      </div>
    </div>
  );
}
