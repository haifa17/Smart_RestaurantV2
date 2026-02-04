"use client";
import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { LogoAnimation } from "@/components/LogoAnimation";
import Link from "next/link";

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
      // 🔍 SHOW STATUS ON SCREEN
      if (result.status !== "complete") {
        setError(
          `DEBUG - Status: ${result.status}, SessionId: ${result.createdSessionId ? "exists" : "missing"}`,
        );
        return;
      }
      console.log("Sign in result status:", result.status);
      console.log("Full result:", result);
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        window.location.href = "/dashboard";
      } else if (result.status === "needs_first_factor") {
        const firstFactorResult = await signIn.attemptFirstFactor({
          strategy: "password",
          password: password,
        });

        if (firstFactorResult.status === "complete") {
          await setActive({ session: firstFactorResult.createdSessionId });
          window.location.href = "/dashboard";
        } else {
          setError(`Échec: ${firstFactorResult.status}`);
        }
      } else if (result.status === "needs_second_factor") {
        // ✅ THIS IS YOUR ISSUE - Handle second factor
        // Check what second factors are available
        const secondFactors = result.supportedSecondFactors;

        if (secondFactors && secondFactors.length > 0) {
          // If phone_code or totp is available, you need to show a 2FA input
          setError(
            "Authentification à deux facteurs requise. Veuillez utiliser Google Sign-In ou désactiver 2FA.",
          );
        } else {
          // No second factors configured but status says needs it - skip it
          try {
            // Try to set the session anyway if createdSessionId exists
            if (result.createdSessionId) {
              await setActive({ session: result.createdSessionId });
              window.location.href = "/dashboard";
            } else {
              setError("Session manquante. Veuillez réessayer.");
            }
          } catch (e) {
            setError(
              "Impossible de compléter la connexion. Utilisez Google Sign-In.",
            );
          }
        }
      } else {
        setError(`État inattendu: ${result.status}`);
      }
    } catch (err: any) {
      // Gestion des erreurs spécifiques de Clerk
      if (err.errors && err.errors.length > 0) {
        const clerkError = err.errors[0];

        // Mapper les codes d'erreur Clerk vers des messages en français
        switch (clerkError.code) {
          case "form_identifier_not_found":
            setError("Aucun compte n'existe avec cet email.");
            break;
          case "form_password_incorrect":
            setError("Mot de passe incorrect.");
            break;
          case "form_identifier_exists":
            setError("Un compte existe déjà avec cet email.");
            break;
          case "too_many_attempts":
            setError("Trop de tentatives. Veuillez réessayer plus tard.");
            break;
          case "network_error":
            setError("Erreur réseau. Vérifiez votre connexion internet.");
            break;
          default:
            // Utiliser le message long de Clerk si disponible, sinon le message par défaut
            setError(
              clerkError.longMessage ||
                clerkError.message ||
                "Une erreur est survenue lors de la connexion.",
            );
        }
      } else if (err.message) {
        // Erreurs générales
        setError(err.message);
      } else {
        setError("Email ou mot de passe invalide.");
      }

      // Log l'erreur complète pour le débogage (à retirer en production)
      console.error("Erreur de connexion:", err);
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
        err.errors?.[0]?.longMessage || err.message || "Google login failed",
      );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left side - Branding / Logo */}
      <div className="flex lg:w-1/2 bg-slate-900 text-white flex-col justify-center items-center p-8 lg:p-12 ">
        <LogoAnimation />
        <h1 className="text-4xl font-bold mb-4 text-center -mt-5">
          Bienvenue !
        </h1>
        <p className="text-md text-center">
          Accédez à votre tableau de bord et gérez vos produits facilement.
        </p>
      </div>

      {/* Right side - SignIn Form */}
      <div className="flex flex-1 justify-center items-center p-8 bg-gray-50">
        <div className="w-full lg:max-w-md bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl flex items-center gap-2 font-bold mb-6 text-gray-800 justify-center text-center">
            Connexion
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
                placeholder="utilisateur@exemple.com"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-xs"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mot de passe
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
              className="w-full bg-slate-900 cursor-pointer text-white py-2 rounded-md font-semibold hover:bg-slate-900/90 transition"
            >
              {loading ? "Chargement..." : "Se connecter"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-4 flex items-center">
            <hr className="flex-1 border-gray-300" />
            <span className="mx-2 text-gray-400 text-sm">ou</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Google login */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full text-sm bg-white border border-gray-300 py-2 rounded-md cursor-pointer flex items-center justify-center hover:bg-gray-50 transition"
          >
            <img src="/google-icon.png" alt="Google" className="w-5 h-5 mr-2" />
            Se connecter avec Google
          </button>

          <p className="mt-6 text-sm text-gray-500 text-center">
            Vous n'avez pas de compte ?{" "}
            <Link
              href="/sign-up"
              className="text-blue-600 cursor-pointer font-medium hover:underline"
            >
              Inscrivez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
