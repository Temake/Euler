"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  Cloud,
  Cpu,
  Network,
  Lock,
  Unlock,
  Play,
  BookOpen,
  Award,
  Zap,
  Laptop,
  LogOut,
  Trophy,
  Flame,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

interface UserProfile {
  id: string;
  username: string;
  track: "CLOUD" | "COMPUTING" | "NETWORK";
  role: string;
}

interface TrackWeek {
  id: string;
  track: string;
  weekNumber: number;
  title: string;
  isUnlocked: boolean;
  unlockedAt: string | null;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [weeks, setWeeks] = useState<TrackWeek[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        // 1. Verify session
        const sessionRes = await fetch("/api/auth/session");
        const sessionData = await sessionRes.json();

        if (!sessionRes.ok || !sessionData.authenticated) {
          router.push("/login");
          return;
        }

        setUser(sessionData.user);

        // 2. Fetch track weeks
        const weeksRes = await fetch("/api/curriculum/tracks");
        const weeksData = await weeksRes.json();

        if (weeksRes.ok && weeksData.success) {
          setWeeks(weeksData.weeks);
        }
      } catch (err) {
        console.error("Dashboard load error:", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch {
      router.push("/login");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4 text-slate-400">
        <div className="w-8 h-8 border-3 border-rose-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium">Synchronizing contestant arena...</p>
      </div>
    );
  }

  const trackBadge = {
    CLOUD: {
      name: "Cloud Track",
      icon: Cloud,
      color: "from-sky-500 to-blue-600",
      accent: "text-sky-400",
      border: "border-sky-500/30",
      bg: "bg-sky-950/20",
    },
    COMPUTING: {
      name: "Computing Track",
      icon: Cpu,
      color: "from-amber-500 to-orange-600",
      accent: "text-amber-400",
      border: "border-amber-500/30",
      bg: "bg-amber-950/20",
    },
    NETWORK: {
      name: "Network Track",
      icon: Network,
      color: "from-emerald-500 to-teal-600",
      accent: "text-emerald-400",
      border: "border-emerald-500/30",
      bg: "bg-emerald-950/20",
    },
  }[user?.track || "NETWORK"];

  const TrackIcon = trackBadge.icon;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-rose-500 selection:text-white">
      {/* Top Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-lg shadow-rose-900/40">
              <span className="text-xl font-black text-white italic">E</span>
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Euler
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                Huawei ICT Arena
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/50 text-xs">
              <TrackIcon className={`w-4 h-4 ${trackBadge.accent}`} />
              <span className="font-semibold text-slate-200">{trackBadge.name}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-300">
                @{user?.username}
              </span>
              <button
                onClick={handleLogout}
                title="Log out"
                className="p-2 rounded-lg bg-slate-800/40 hover:bg-slate-800 text-slate-400 hover:text-rose-400 transition-colors border border-slate-700/40"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome Hero Banner */}
        <div className={`p-6 sm:p-8 rounded-3xl border ${trackBadge.border} ${trackBadge.bg} bg-gradient-to-br from-slate-900/90 to-slate-950 shadow-2xl relative overflow-hidden`}>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-300">
                <TrackIcon className={`w-3.5 h-3.5 ${trackBadge.accent}`} />
                <span>Personalized Track: {trackBadge.name}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Welcome to the Arena, {user?.username}
              </h1>
              <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
                Complete your weekly structured curriculum, practice on demand, and take the official weekly competitive quiz to climb the regional leaderboard!
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 shrink-0">
              <div className="px-4 py-3 rounded-2xl bg-slate-800/40 border border-slate-700/40 text-center">
                <div className="text-xl sm:text-2xl font-black text-white">
                  {weeks.filter((w) => w.isUnlocked).length} / 6
                </div>
                <div className="text-[11px] text-slate-400 font-medium">Weeks Open</div>
              </div>
              <div className="px-4 py-3 rounded-2xl bg-slate-800/40 border border-slate-700/40 text-center">
                <div className="text-xl sm:text-2xl font-black text-rose-400 flex items-center justify-center gap-1">
                  <Flame className="w-5 h-5" />
                  <span>W1</span>
                </div>
                <div className="text-[11px] text-slate-400 font-medium">Active Round</div>
              </div>
              <div className="px-4 py-3 rounded-2xl bg-slate-800/40 border border-slate-700/40 text-center">
                <div className="text-xl sm:text-2xl font-black text-emerald-400">
                  Top 10
                </div>
                <div className="text-[11px] text-slate-400 font-medium">Target Rank</div>
              </div>
            </div>
          </div>
        </div>

        {/* 6-Week Progression Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-rose-400" />
              <span>Curriculum & Weekly Arena Roadmap</span>
            </h2>
            <span className="text-xs text-slate-400 font-medium">
              6-Week Huawei Preliminary Qualifier Schedule
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {weeks.map((week) => {
              const isMockWeek = week.weekNumber === 6;
              return (
                <div
                  key={week.id}
                  className={`p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                    week.isUnlocked
                      ? isMockWeek
                        ? "bg-gradient-to-br from-rose-950/30 to-slate-900/90 border-rose-500/40 shadow-lg shadow-rose-950/20"
                        : "bg-slate-900/80 border-slate-700/60 hover:border-slate-600 shadow-md"
                      : "bg-slate-900/30 border-slate-800/50 opacity-60"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                          week.isUnlocked
                            ? isMockWeek
                              ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                              : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-slate-800 text-slate-400 border border-slate-700"
                        }`}
                      >
                        {isMockWeek ? "Preliminary Mock" : `Week 0${week.weekNumber}`}
                      </span>

                      <div className="flex items-center gap-1.5 text-xs">
                        {week.isUnlocked ? (
                          <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                            <Unlock className="w-3.5 h-3.5" />
                            <span>Unlocked</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-slate-500 font-semibold">
                            <Lock className="w-3.5 h-3.5" />
                            <span>Locked by Admin</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white leading-snug">
                      {week.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {isMockWeek
                        ? "Full 60-question, 60-minute simulation with official Huawei track weighting (1,000 points total)."
                        : `30 questions in 30 minutes. 1 official graded attempt for the weekly track leaderboard.`}
                    </p>
                  </div>

                  {/* Action Controls */}
                  <div className="pt-6 mt-4 border-t border-slate-800/60 flex items-center gap-3">
                    {week.isUnlocked ? (
                      <>
                        <Link
                          href={`/practice?week=${week.weekNumber}`}
                          className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                          <span>Practice</span>
                        </Link>

                        <Link
                          href={`/arena?week=${week.weekNumber}`}
                          className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-rose-950/40"
                        >
                          <Zap className="w-3.5 h-3.5 fill-white" />
                          <span>Enter Arena</span>
                        </Link>
                      </>
                    ) : (
                      <div className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-500 text-xs font-medium text-center flex items-center justify-center gap-1.5">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Awaiting Proctor Unlock</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
