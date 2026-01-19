"use client";
import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function CustomSignInPage() {
  const router = useRouter();
  const { signIn, isLoaded, setActive } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded || !signIn) return;

    setLoading(true);
    setError(null);

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        // ✅ Set the active session before redirecting
        await setActive({
          session: result.createdSessionId,
        });

        router.replace("/dashboard");
      } else if (result.status === "needs_first_factor") {
        setError("Please verify your login method.");
      } else {
        setError("Login incomplete.");
      }
    } catch (err: any) {
      setError(
        err.errors?.[0]?.longMessage ||
          err.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleSignIn = async () => {
    if (!isLoaded || !signIn) return;
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: `${window.location.origin}/dashboard`, // where user lands after login
        redirectUrlComplete: `${window.location.origin}/dashboard`, // required to complete redirect flow
      });
    } catch (err: any) {
      setError(
        err.errors?.[0]?.longMessage || err.message || "Google login failed"
      );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left side - Branding / Logo */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 text-white flex-col justify-center items-center p-12 ">
        <LoadingSpinner />
        <h1 className="text-4xl font-bold mb-4 text-center -mt-5 ">Welcome Back!</h1>
        <p className="text-md text-center">
          Access your dashboard and manage your products with ease.
        </p>
      </div>

      {/* Right side - SignIn Form */}
      <div className="flex flex-1 justify-center items-center p-8 bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl flex items-center gap-2 font-bold mb-6 text-gray-800 justify-center text-center">
            Sign In
            <LogIn size={20} />
          </h2>

          {error && (
            <p className="mb-4 text-red-500 text-sm font-medium text-center">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="user@example.com"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-xs"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="**********"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-xs"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 cursor-pointer  text-white py-2 rounded-md font-semibold hover:bg-slate-900/90 transition"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-4 flex items-center">
            <hr className="flex-1 border-gray-300" />
            <span className="mx-2 text-gray-400 text-sm">or</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Google login */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full text-sm bg-white border border-gray-300 py-2 rounded-md  cursor-pointer flex items-center justify-center hover:bg-gray-50 transition"
          >
            <img src="/google-icon.png" alt="Google" className="w-5 h-5 mr-2" />
          </button>

          <p className="mt-6 text-sm text-gray-500 text-center">
            Don't have an account?{" "}
            <a
              href="/sign-up"
              className="text-blue-600 cursor-pointer font-medium hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
