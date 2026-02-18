// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// // Simple token check - the token itself is the secret, set httpOnly so it can't be stolen via JS
// const VALID_TOKEN = process.env.AUTH_SECRET;

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const authCookie = request.cookies.get("h12_admin_auth");
//   const isAuthenticated = !!VALID_TOKEN && authCookie?.value === VALID_TOKEN;

//   // Protect admin API routes (vehicles, quotes, transfers, and excursions management)
//   // Allow public access only to: POST /api/quotes (reservations), GET /api/transfers, GET /api/excursions
//   if (pathname.startsWith("/api/vehicles") || pathname.startsWith("/api/quotes") || pathname.startsWith("/api/transfers") || pathname.startsWith("/api/excursions") || pathname.startsWith("/api/stats")) {
//     // Allow POST to /api/quotes without auth (public reservation form)
//     if (pathname === "/api/quotes" && request.method === "POST") {
//       return NextResponse.next();
//     }

//     // Allow GET to /api/transfers without auth (public transfer routes listing)
//     if (pathname.startsWith("/api/transfers") && request.method === "GET") {
//       return NextResponse.next();
//     }

//     // Allow GET to /api/excursions without auth (public excursions listing)
//     if (pathname.startsWith("/api/excursions") && request.method === "GET") {
//       return NextResponse.next();
//     }

//     // All other API calls require auth
//     if (!isAuthenticated) {
//       return NextResponse.json(
//         { error: "Non autorisé" },
//         { status: 401 }
//       );
//     }
//   }

//   // Protect /panel routes (except login and logout)
//   if (pathname.startsWith("/panel") && !pathname.startsWith("/panel/login") && !pathname.startsWith("/panel/logout")) {
//     if (!isAuthenticated) {
//       return NextResponse.redirect(new URL("/panel/login", request.url));
//     }
//   }

//   // If already logged in and trying to access login page, redirect to dashboard
//   if (pathname === "/panel/login" && isAuthenticated) {
//     return NextResponse.redirect(new URL("/panel/dashboard", request.url));
//   }

//   // Add pathname header for layout to use
//   const response = NextResponse.next();
//   response.headers.set("x-pathname", pathname);
//   return response;
// }

// export const config = {
//   matcher: ["/panel/:path*", "/api/vehicles/:path*", "/api/quotes/:path*", "/api/transfers/:path*", "/api/excursions/:path*", "/api/stats"],
// };


// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// // Pages publiques qui ne nécessitent pas d'authentification
// const publicPaths = ['/panel']
// const authSecret = process.env.AUTH_SECRET

// export function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname
  
//   // Vérifier si c'est une page publique
//   const isPublicPath = publicPaths.includes(path)
  
//   // Récupérer les cookies de session
//   const session = request.cookies.get('h12_admin_session')
//   const adminInfo = request.cookies.get('h12_admin_info')
  
//   // Vérifier si l'utilisateur est authentifié (session valide)
//   const isAuthenticated = session?.value === authSecret && adminInfo
  
//   // Cas 1: L'utilisateur est sur une page publique mais déjà authentifié
//   if (isPublicPath && isAuthenticated) {
//     return NextResponse.redirect(new URL('/panel/dashboard', request.url))
//   }
  
//   // Cas 2: L'utilisateur n'est pas authentifié et essaie d'accéder à une page protégée
//   if (!isPublicPath && !isAuthenticated) {
//     return NextResponse.redirect(new URL('/panel', request.url))
//   }
  
//   // Cas 3: L'utilisateur est authentifié, on peut ajouter les infos admin aux headers
//   if (isAuthenticated) {
//     const response = NextResponse.next()
//     // Ajouter les infos admin aux headers pour les utiliser dans les composants serveur
//     if (adminInfo) {
//       try {
//         const adminData = JSON.parse(adminInfo.value)
//         response.headers.set('x-admin-id', adminData.id)
//         response.headers.set('x-admin-email', adminData.email)
//         response.headers.set('x-admin-name', adminData.name || '')
//       } catch {
//         // Ignorer les erreurs de parsing
//       }
//     }
//     return response
//   }
  
//   // Par défaut, continuer
//   return NextResponse.next()
// }

// // Configuration du middleware pour s'exécuter uniquement sur les routes /panel/*
// export const config = {
//   matcher: '/panel/:path*',
// }


import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicPaths = ['/panel', '/panel/login', '/panel/signup']
const authSecret = process.env.AUTH_SECRET

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  
  // IMPORTANT: Vérifier si c'est exactement /panel/login ou /panel/signup
  const isExactLoginPage = path === '/panel/login'
  const isExactSignupPage = path === '/panel/signup'
  const isExactPanelPage = path === '/panel'
  
  // Considérer /panel, /panel/login et /panel/signup comme publics
  const isPublicPath = publicPaths.includes(path)
  
  const session = request.cookies.get('h12_admin_session')
  const isAuthenticated = session?.value === authSecret

  // Log pour debug (à retirer après résolution)
  console.log({
    path,
    isPublicPath,
    isAuthenticated,
    session: session?.value ? 'exists' : 'none'
  })

  // Si l'utilisateur est sur /panel/login ou /panel/signup et est authentifié
  // On le laisse quand même sur ces pages (pas de redirection automatique)
  if ((isExactLoginPage || isExactSignupPage) && isAuthenticated) {
    return NextResponse.next()
  }

  // Pour /panel, on redirige vers dashboard si authentifié
  if (isExactPanelPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/panel/dashboard', request.url))
  }

  // Redirection si non authentifié sur page protégée
  if (!isPublicPath && !isAuthenticated) {
    return NextResponse.redirect(new URL('/panel/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/panel/:path*',
}