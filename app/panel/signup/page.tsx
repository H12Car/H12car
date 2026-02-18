// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Lock, Mail, User, Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// export default function SignupPage() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     setLoading(true);

//     // Validation basique
//     if (password !== confirmPassword) {
//       setError("Les mots de passe ne correspondent pas");
//       setLoading(false);
//       return;
//     }

//     if (password.length < 8) {
//       setError("Le mot de passe doit contenir au moins 8 caractères");
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch("/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setSuccess("Compte créé avec succès ! Redirection vers la page de connexion...");
//         setTimeout(() => {
//           router.push("/panel");
//         }, 2000);
//       } else {
//         setError(data.error || "Erreur lors de la création du compte");
//       }
//     } catch {
//       setError("Erreur de connexion");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="panel-auth min-h-screen bg-zinc-900 flex items-center justify-center p-4">
//       <div className="w-full max-w-sm">
//         {/* Lien retour */}
//         <Link 
//           href="/panel/login" 
//           className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6"
//         >
//           <ArrowLeft className="w-4 h-4" />
//           Retour à la connexion
//         </Link>

//         {/* Logo */}
//         <div className="text-center mb-8">
//           <Image
//             src="/h12carlogo.png"
//             alt="H12 Logo"
//             width={80}
//             height={80}
//             className="mx-auto mb-4 rounded-full"
//           />
//           <h1 className="text-2xl font-bold text-white">Créer un compte</h1>
//           <p className="text-zinc-500 text-sm mt-1">Devenir administrateur H12</p>
//         </div>

//         {/* Signup Form */}
//         <form onSubmit={handleSubmit} className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-6">
//           {/* Name Field */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-zinc-400 mb-2">
//               Nom complet
//             </label>
//             <div className="relative">
//               <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
//                 <User className="w-5 h-5" />
//               </div>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full pl-11 pr-3 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 transition-colors"
//                 placeholder="John Doe"
//                 required
//               />
//             </div>
//           </div>

//           {/* Email Field */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-zinc-400 mb-2">
//               Email
//             </label>
//             <div className="relative">
//               <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
//                 <Mail className="w-5 h-5" />
//               </div>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full pl-11 pr-3 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 transition-colors"
//                 placeholder="admin@example.com"
//                 required
//               />
//             </div>
//           </div>

//           {/* Password Field */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-zinc-400 mb-2">
//               Mot de passe
//             </label>
//             <div className="relative">
//               <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
//                 <Lock className="w-5 h-5" />
//               </div>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full pl-11 pr-11 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 transition-colors"
//                 placeholder="••••••••"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
//               >
//                 {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//               </button>
//             </div>
//           </div>

//           {/* Confirm Password Field */}
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-zinc-400 mb-2">
//               Confirmer le mot de passe
//             </label>
//             <div className="relative">
//               <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
//                 <Lock className="w-5 h-5" />
//               </div>
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className="w-full pl-11 pr-11 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 transition-colors"
//                 placeholder="••••••••"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
//               >
//                 {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//               </button>
//             </div>
//           </div>

//           {error && (
//             <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
//               {error}
//             </div>
//           )}

//           {success && (
//             <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center">
//               {success}
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="w-5 h-5 animate-spin" />
//                 Création en cours...
//               </>
//             ) : (
//               "Créer un compte"
//             )}
//           </button>
//         </form>

//         <p className="text-center text-zinc-600 text-xs mt-6">
//           H12 Premium Rentals - Admin v1.0
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, User, Eye, EyeOff, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validation basique
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Compte créé avec succès ! Redirection vers la page de connexion...");
        setTimeout(() => {
          router.push("/panel");
        }, 2000);
      } else {
        setError(data.error || "Erreur lors de la création du compte");
      }
    } catch {
      setError("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="panel-auth min-h-screen bg-zinc-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Image
            src="/h12carlogo.png"
            alt="H12 Logo"
            width={80}
            height={80}
            className="mx-auto mb-4 rounded-full"
          />
          <h1 className="text-2xl font-bold text-white">Créer un compte</h1>
          <p className="text-zinc-500 text-sm mt-1">Devenir administrateur H12</p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-6">
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Nom complet
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-11 pr-3 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Email
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-3 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                placeholder="admin@example.com"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-11 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Confirmer le mot de passe
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-11 pr-11 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Création en cours...
              </>
            ) : (
              "Créer un compte"
            )}
          </button>

          {/* Lien vers la page de connexion */}
          <div className="text-center mt-4">
            <p className="text-sm text-zinc-400">
              Vous avez déjà un compte ?{" "}
              <Link 
                href="/panel/login" 
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Connectez-vous
              </Link>
            </p>
          </div>
        </form>

        <p className="text-center text-zinc-600 text-xs mt-6">
          H12 Premium Rentals - Admin v1.0
        </p>
      </div>
    </div>
  );
}