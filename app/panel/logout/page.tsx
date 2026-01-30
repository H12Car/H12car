"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, CheckCircle } from "lucide-react";
import Image from "next/image";

export default function LogoutPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"logging-out" | "done">("logging-out");

  useEffect(() => {
    async function performLogout() {
      try {
        await fetch("/api/auth/logout", { method: "POST" });
        setStatus("done");

        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push("/panel/login");
        }, 2000);
      } catch (error) {
        console.error("Logout failed:", error);
        router.push("/panel/login");
      }
    }

    performLogout();
  }, [router]);

  return (
    <div className="panel-auth min-h-screen bg-zinc-900 flex items-center justify-center p-4">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/h12carlogo.png"
            alt="H12 Logo"
            width={120}
            height={120}
            className="mx-auto rounded-full"
          />
        </div>

        {status === "logging-out" ? (
          <>
            <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-6">
              <LogOut className="w-8 h-8 text-zinc-400 animate-pulse" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Déconnexion en cours...</h1>
            <p className="text-zinc-500">Veuillez patienter</p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Vous êtes déconnecté</h1>
            <p className="text-zinc-500">Redirection vers la page de connexion...</p>
          </>
        )}
      </div>
    </div>
  );
}
