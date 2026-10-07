"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldAlert,
  Cloud,
  Cpu,
  Network,
  Lock,
  Unlock,
  Users,
  Database,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  LogOut,
  Sliders,
  Sparkles,
} from "lucide-react";

interface AdminTrackWeek {
  id: string;
  track: "CLOUD" | "COMPUTING" | "NETWORK";
  weekNumber: number;
  title: string;
  isUnlocked: boolean;
  unlockedAt: string | null;
}

export default function AdminPage() {
  const router = useRouter();
  const [weeks, setWeeks] = useState<AdminTrackWeek[]>([]);
  const [activeTab, setActiveTab] = useState<"ALL" | "CLOUD" | "COMPUTING" | "NETWORK">("ALL");
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const fetchWeeks = async () => {
    try {
      // 1. Verify admin session
      const sessionRes = await fetch("/api/admin/session");
      const sessionData = await sessionRes.json();
      if (!sessionRes.ok || !sessionData.authenticated) {
        router.push("/admin/login");
        return;
      }

      // 2. Fetch track weeks
      const res = await fetch("/api/admin/curriculum/unlock");
      const data = await res.json();
      if (res.ok && data.success) {
        setWeeks(data.weeks);
      }
    } catch (err) {
      console.error("Admin fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeeks();
  }, [router]);

  const handleToggle = async (week: AdminTrackWeek) => {
    setTogglingId(week.id);
    setNotice(null);

    try {
      const res = await fetch("/api/admin/curriculum/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          track: week.track,
          weekNumber: week.weekNumber,
          isUnlocked: !week.isUnlocked,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setWeeks((prev) =>
          prev.map((w) =>
            w.id === week.id ? { ...w, isUnlocked: !week.isUnlocked } : w
          )
        );
        setNotice(
          `${week.track} Week ${week.weekNumber} is now ${
            !week.isUnlocked ? "UNLOCKED" : "LOCKED"
          }.`
        );
      }
    } catch (err) {
      console.error("Toggle error:", err);
    } finally {
      setTogglingId(null);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4 text-slate-400">
        <div className="w-8 h-8 border-3 border-rose-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium">Verifying Administrator Privileges...</p>
      </div>
    );
  }

  const filteredWeeks =
    activeTab === "ALL"
      ? weeks
      : weeks.filter((w) => w.track === activeTab);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-rose-900/30 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 to-red-700 flex items-center justify-center shadow-lg shadow-rose-950/60">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-white">
                Euler Admin Console
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Exam Proctor Master
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-xs text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/60 transition-colors"
            >
              View Student App
            </Link>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-slate-800/60 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 transition-colors border border-slate-700/60"
              title="Admin Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Banner */}
        <div className="p-6 sm:p-8 rounded-3xl border border-rose-900/40 bg-gradient-to-br from-rose-950/20 via-slate-900/90 to-slate-950 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Sliders className="w-6 h-6 text-rose-400" />
              <span>Weekly Arena Unlock Controller</span>
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
              Control the weekly competition progression. Contestants only have access to unlocked weeks for their respective tracks. Week 1 is unlocked by default.
            </p>
          </div>

          <button
            onClick={fetchWeeks}
            className="self-start md:self-auto py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center gap-2 transition-colors border border-slate-700"
          >
            <RefreshCw className="w-4 h-4 text-rose-400" />
            <span>Refresh State</span>
          </button>
        </div>

        {notice && (
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{notice}</span>
          </div>
        )}

        {/* Track Filter Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
          {(["ALL", "CLOUD", "COMPUTING", "NETWORK"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab
                  ? "bg-rose-600 text-white shadow-lg shadow-rose-950/50"
                  : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800"
              }`}
            >
              {tab === "ALL" ? "All Tracks (18 Weeks)" : `${tab} Track`}
            </button>
          ))}
        </div>

        {/* Track Weeks Control Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredWeeks.map((week) => {
            const isMock = week.weekNumber === 6;
            const isToggling = togglingId === week.id;

            const trackIcon = {
              CLOUD: Cloud,
              COMPUTING: Cpu,
              NETWORK: Network,
            }[week.track];
            const Icon = trackIcon;

            return (
              <div
                key={week.id}
                className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                  week.isUnlocked
                    ? "bg-slate-900/90 border-slate-700 shadow-lg"
                    : "bg-slate-950/60 border-slate-800/80"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                      <Icon className="w-3.5 h-3.5 text-rose-400" />
                      <span>{week.track}</span>
                      <span className="text-slate-500">&bull;</span>
                      <span>{isMock ? "Mock" : `W${week.weekNumber}`}</span>
                    </span>

                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                        week.isUnlocked
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                          : "bg-slate-800 text-slate-500 border border-slate-700/60"
                      }`}
                    >
                      {week.isUnlocked ? (
                        <>
                          <Unlock className="w-3 h-3" />
                          <span>UNLOCKED</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3 h-3" />
                          <span>LOCKED</span>
                        </>
                      )}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white leading-snug">
                    {week.title}
                  </h3>

                  <p className="text-[11px] text-slate-400">
                    {week.unlockedAt
                      ? `Unlocked at: ${new Date(week.unlockedAt).toLocaleString()}`
                      : "Currently locked to contestants"}
                  </p>
                </div>

                {/* Toggle Action */}
                <div className="pt-4 mt-4 border-t border-slate-800/80">
                  <button
                    onClick={() => handleToggle(week)}
                    disabled={isToggling}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      week.isUnlocked
                        ? "bg-slate-800 hover:bg-rose-950/50 text-slate-300 hover:text-rose-300 border border-slate-700 hover:border-rose-700/50"
                        : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md shadow-emerald-950/40"
                    }`}
                  >
                    {isToggling ? (
                      <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : week.isUnlocked ? (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        <span>Lock Week</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="w-3.5 h-3.5" />
                        <span>Unlock for Students</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
