"use client";
import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import SignUpForm from "./components/SignUpForm";
import VerifyCodeForm from "./components/VerifyCodeForm";

export default function CustomSignUpPage() {
  const [step, setStep] = useState<"form" | "verify">("form");

  const { signUp, isLoaded } = useSignUp();
  const [email, setEmail] = useState("");

  if (!isLoaded) return null; // Wait for Clerk to load

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left side - Branding / Logo */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 text-white flex-col justify-center items-center p-12  ">
        <LoadingSpinner />
        <h1 className="text-4xl font-bold mb-4 text-center -mt-5 ">Join Us!</h1>
        <p className="text-md text-center">
          Create an account to access your dashboard and manage your products.
        </p>
      </div>

      {/* Right side - SignUp Form */}
      <div className="flex flex-1 justify-center items-center p-8 bg-gray-50">
        {step === "form" && (
          <SignUpForm signUp={signUp} setStep={setStep} setEmail={setEmail} />
        )}
        {step === "verify" && <VerifyCodeForm signUp={signUp} email={email} />}
      </div>
    </div>
  );
}
