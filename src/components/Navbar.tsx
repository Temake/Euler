"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Flame,
  BookOpen,
  Trophy,
  Zap,
  BookMarked,
  LogOut,
  Layers,
  Heart,
  Diamond,
  Menu,
  X,
} from "lucide-react";
import { EulerSigma } from "./EulerSigma";

interface NavbarProps {
  userTrack?: string;
  username?: string;
}

export function Navbar({ userTrack = "CLOUD", username = "Contestant" }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "LEARN", href: "/dashboard", icon: BookOpen },
    { label: "ARENA", href: "/arena", icon: Zap },
    { label: "PRACTICE", href: "/practice", icon: Layers },
    { label: "LEADERBOARDS", href: "/leaderboard", icon: Trophy },
    { label: "MISTAKES", href: "/mistakes", icon: BookMarked },
  ];

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch {
      router.push("/login");
    }
  }

  const trackLabels: Record<string, { label: string; bg: string; color: string }> = {
    CLOUD: { label: "Cloud Track", bg: "bg-[#ddf4ff]", color: "text-[#1cb0f6]" },
    COMPUTING: { label: "Computing", bg: "bg-[#fff2d6]", color: "text-[#ff9600]" },
    NETWORK: { label: "Network", bg: "bg-[#f3e8ff]", color: "text-[#7c3aed]" },
  };

  const currentTrack = trackLabels[userTrack] || trackLabels.CLOUD;

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-[#e5e5e5] px-4 lg:px-8">
      <div className="max-w-7xl mx-auto h-18 flex items-center justify-between">
        {/* Left: Brand */}
        <div className="flex items-center gap-5">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <EulerSigma mood="happy" size={38} />
            <span className="font-extrabold text-2xl tracking-tight text-[#7c3aed]">
              euler
            </span>
          </Link>

          {/* Track Badge */}
          <div
            className={`hidden md:inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${currentTrack.bg} ${currentTrack.color}`}
          >
            {currentTrack.label}
          </div>
        </div>

        {/* Center: Desktop Navigation links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black tracking-wider transition-all duration-150 ${
                  isActive
                    ? "bg-[#f3e8ff] text-[#7c3aed] border-2 border-[#7c3aed] shadow-[0_2px_0_#7c3aed]"
                    : "text-[#777777] hover:bg-[#f7f7f7] hover:text-[#100f3e]"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#7c3aed]" : "text-[#777777]"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right: Gamified Stats (Streaks, Gems, Hearts) & User */}
        <div className="flex items-center gap-3">
          {/* Streaks */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white border-2 border-[#e5e5e5] shadow-[0_2px_0_#e5e5e5] text-[#ff9600] font-extrabold text-sm">
            <Flame className="w-4 h-4 fill-[#ff9600] text-[#ff9600]" />
            <span>3</span>
          </div>

          {/* Gems / XP */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white border-2 border-[#e5e5e5] shadow-[0_2px_0_#e5e5e5] text-[#1cb0f6] font-extrabold text-sm">
            <Diamond className="w-4 h-4 fill-[#1cb0f6] text-[#1cb0f6]" />
            <span>450</span>
          </div>

          {/* Hearts */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white border-2 border-[#e5e5e5] shadow-[0_2px_0_#e5e5e5] text-[#ff4b4b] font-extrabold text-sm">
            <Heart className="w-4 h-4 fill-[#ff4b4b]" />
            <span>5</span>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            title="Log out"
            className="p-2 rounded-xl text-[#777777] hover:text-[#ff4b4b] hover:bg-[#ffdfe0] transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#777777] hover:bg-[#f7f7f7]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#100f3e]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden py-4 border-t-2 border-[#e5e5e5] space-y-2">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-extrabold tracking-wider ${
                  isActive
                    ? "bg-[#f3e8ff] text-[#7c3aed] border-2 border-[#7c3aed]"
                    : "text-[#100f3e] hover:bg-[#f7f7f7]"
                }`}
              >
                <Icon className="w-5 h-5 text-[#7c3aed]" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
