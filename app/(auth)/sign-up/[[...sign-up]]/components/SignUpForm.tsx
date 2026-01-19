"use client";
import { SignUpResource } from "@clerk/types";
import { LogIn } from "lucide-react";
import { useState } from "react";

interface SignUpFormProps {
  signUp: SignUpResource;
  setStep: React.Dispatch<React.SetStateAction<"form" | "verify">>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

export default function SignUpForm({
  signUp,
  setStep,
  setEmail,
}: SignUpFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress: emailInput,
        password,
      });

      // Send verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setEmail(emailInput); // pass email to parent for verification step
      setStep("verify");
    } catch (err: any) {
      setError(
        err.errors?.[0]?.longMessage || err.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: `${window.location.origin}/dashboard`,
        redirectUrlComplete: `${window.location.origin}/dashboard`,
      });
    } catch (err: any) {
      setError(
        err.errors?.[0]?.longMessage || err.message || "Google signup failed"
      );
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl flex items-center gap-2 font-bold mb-6 text-gray-800 justify-center text-center">
        Sign Up <LogIn size={20} />
      </h2>
      {error && (
        <p className="mb-4 text-red-500 text-sm text-center">{error}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="First Name"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-xs"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Last Name"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-xs"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            required
            placeholder="user@example.com"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-xs"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="**********"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-xs"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-900 cursor-pointer text-white py-2 rounded-md font-semibold hover:bg-slate-900/90 transition"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      <div className="my-4 flex items-center">
        <hr className="flex-1 border-gray-300" />
        <span className="mx-2 text-gray-400 text-sm">or</span>
        <hr className="flex-1 border-gray-300" />
      </div>
      <div id="clerk-captcha"></div>{" "}
      <button
        onClick={handleGoogleSignUp}
        className="w-full bg-white cursor-pointer border border-gray-300 py-2 rounded-md flex items-center justify-center hover:bg-gray-50 transition"
      >
        <img src="/google-icon.png" alt="Google" className="w-5 h-5 mr-2" />
      </button>
    </div>
  );
}
