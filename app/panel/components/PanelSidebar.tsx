"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  FileText,
  Car,
  Plane,
  Compass,
  ExternalLink,
  LogOut
} from "lucide-react";

const navItems = [
  {
    href: "/panel/dashboard",
    label: "Tableau de bord",
    icon: LayoutDashboard
  },
  {
    href: "/panel/quotes",
    label: "Devis",
    icon: FileText,
    badge: true
  },
  {
    href: "/panel/vehicles",
    label: "Véhicules",
    icon: Car
  },
  {
    href: "/panel/transfers",
    label: "Transferts",
    icon: Plane
  },
  {
    href: "/panel/excursions",
    label: "Excursions",
    icon: Compass
  },
];

interface PanelSidebarProps {
  pendingQuotes?: number;
}

export default function PanelSidebar({ pendingQuotes = 0 }: PanelSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-zinc-950 border-r border-zinc-800/50 flex flex-col z-50">
      {/* Logo */}
      <div className="p-6">
        <Link href="/panel/dashboard" className="flex items-center gap-3">
          <Image
            src="/h12carlogo.png"
            alt="H12 Logo"
            width={44}
            height={44}
            className="rounded-full"
          />
          <div>
            <span className="text-lg font-bold text-white">Admin</span>
            <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">
              Panneau de gestion
            </p>
          </div>
        </Link>
      </div>

      {/* Divider */}
      <div className="mx-4 h-px bg-zinc-800/50" />

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <p className="px-3 py-2 text-[10px] font-semibold text-zinc-600 uppercase tracking-wider">
          Menu principal
        </p>
        {navItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== "/panel/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-blue-500/15 text-blue-400"
                  : "text-zinc-400 lg:hover:text-white lg:hover:bg-zinc-800/50"
              }`}
            >
              <div className={`p-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-500/20"
                  : "bg-zinc-800/50 lg:group-hover:bg-zinc-700/50"
              }`}>
                <item.icon className="w-4 h-4" />
              </div>
              <span className="font-medium text-sm">{item.label}</span>

              {/* Badge for pending quotes */}
              {item.badge && pendingQuotes > 0 && (
                <span className="ml-auto px-2 py-0.5 text-[10px] font-bold bg-amber-500 text-white rounded-full animate-pulse">
                  {pendingQuotes}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 space-y-1">
        <div className="mx-0 mb-3 h-px bg-zinc-800/50" />

        {/* View Site */}
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 text-zinc-500 lg:hover:text-white lg:hover:bg-zinc-800/50 rounded-xl transition-all duration-200"
        >
          <div className="p-2 rounded-lg bg-zinc-800/50">
            <ExternalLink className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium">Voir le site</span>
        </Link>

        {/* Logout - goes to dedicated logout page */}
        <Link
          href="/panel/logout"
          className="w-full flex items-center gap-3 px-3 py-2.5 text-zinc-500 lg:hover:text-red-400 lg:hover:bg-red-500/10 rounded-xl transition-all duration-200"
        >
          <div className="p-2 rounded-lg bg-zinc-800/50">
            <LogOut className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium">Déconnexion</span>
        </Link>
      </div>

      {/* Version & Credit */}
      <div className="px-6 py-4 border-t border-zinc-800/50">
        <p className="text-[10px] text-zinc-600 mb-1">
          H12 Admin v2.5
        </p>
        <a
          href="https://digital-maroc.vercel.app/services"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-zinc-700 lg:hover:text-zinc-500 transition-colors"
        >
          Codé par <span className="font-medium">DigitalMaroc Team</span>
        </a>
      </div>
    </aside>
  );
}
