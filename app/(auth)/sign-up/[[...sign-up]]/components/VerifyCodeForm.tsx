"use client";
import { SignUpResource } from "@clerk/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";

interface VerifyCodeFormProps {
  signUp: SignUpResource;
  email: string;
}

export default function VerifyCodeForm({ signUp, email }: VerifyCodeFormProps) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { signOut } = useClerk();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) {
      setError("Please enter the verification code.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await signUp.attemptEmailAddressVerification({ code });

      if (result.status === "complete") {
        await signOut();
        router.push("/sign-in");
      } else {
        setError("Verification incomplete. Check your code.");
      }
    } catch (err: any) {
      setError(
        err.errors?.[0]?.longMessage || err.message || "Verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Vérifiez votre email
      </h2>
      <p className="text-sm text-gray-600 mb-4 text-center">
        Entrez le code envoyé à {email}
      </p>

      {error && (
        <p className="mb-4 text-red-500 text-sm text-center">{error}</p>
      )}

      <form onSubmit={handleVerify} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Code de vérification
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-900 cursor-pointer text-white py-2 rounded-md font-semibold hover:bg-slate-900/90 transition"
        >
          {loading ? "Vérification en cours..." : "Vérifier l’email"}
        </button>
      </form>
    </div>

  );
}
