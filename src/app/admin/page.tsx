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
  Smartphone,
  KeyRound,
  Trash2,
  Search,
  Check,
  X,
  Flame,
} from "lucide-react";

interface AdminTrackWeek {
  id: string;
  track: "CLOUD" | "COMPUTING" | "NETWORK";
  weekNumber: number;
  title: string;
  isUnlocked: boolean;
  unlockedAt: string | null;
}

interface Contestant {
  id: string;
  username: string;
  track: "CLOUD" | "COMPUTING" | "NETWORK";
  role: string;
  createdAt: string;
  activeSessionsCount: number;
  latestDeviceUuid: string | null;
  lastActive: string | null;
  completedAttemptsCount: number;
  totalScore: number;
}

interface AdminStats {
  totalContestants: number;
  cloudContestants: number;
  computingContestants: number;
  networkContestants: number;
  activeSessions: number;
  totalQuizzesCompleted: number;
}

export default function AdminPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<"CURRICULUM" | "CONTESTANTS">("CURRICULUM");

  // Weeks state
  const [weeks, setWeeks] = useState<AdminTrackWeek[]>([]);
  const [activeTab, setActiveTab] = useState<"ALL" | "CLOUD" | "COMPUTING" | "NETWORK">("ALL");
  const [togglingId, setTogglingId] = useState<string | null>(null);

  // Contestants state
  const [contestants, setContestants] = useState<Contestant[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [contestantTrackFilter, setContestantTrackFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // PIN reset dialog state
  const [pinModalUser, setPinModalUser] = useState<Contestant | null>(null);
  const [newPinInput, setNewPinInput] = useState("");
  const [pinError, setPinError] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      // 1. Verify admin session
      const sessionRes = await fetch("/api/admin/session");
      const sessionData = await sessionRes.json();
      if (!sessionRes.ok || !sessionData.authenticated) {
        router.push("/admin/login");
        return;
      }

      // 2. Fetch track weeks
      const weeksRes = await fetch("/api/admin/curriculum/unlock");
      const weeksData = await weeksRes.json();
      if (weeksRes.ok && weeksData.success) {
        setWeeks(weeksData.weeks);
      }

      // 3. Fetch contestants and stats
      const usersRes = await fetch("/api/admin/users");
      const usersData = await usersRes.json();
      if (usersRes.ok && usersData.success) {
        setContestants(usersData.users);
        setStats(usersData.stats);
      }
    } catch (err) {
      console.error("Admin fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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

  const handleResetSession = async (user: Contestant) => {
    setActionLoadingId(user.id);
    setNotice(null);

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reset_session",
          userId: user.id,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setContestants((prev) =>
          prev.map((u) => (u.id === user.id ? { ...u, activeSessionsCount: 0 } : u))
        );
        setNotice(data.message || `Session reset for @${user.username}`);
      }
    } catch (err) {
      console.error("Reset session error:", err);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleSavePin = async () => {
    if (!pinModalUser) return;
    setPinError(null);

    if (!/^\d{6}$/.test(newPinInput.trim())) {
      setPinError("PIN must be exactly 6 numeric digits.");
      return;
    }

    setActionLoadingId(pinModalUser.id);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reset_pin",
          userId: pinModalUser.id,
          newPin: newPinInput.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setNotice(`PIN for @${pinModalUser.username} successfully reset to ${newPinInput.trim()}`);
        setPinModalUser(null);
        setNewPinInput("");
        fetchData();
      } else {
        setPinError(data.error || "Failed to reset PIN");
      }
    } catch (err) {
      console.error("Reset PIN error:", err);
      setPinError("Failed to connect to server");
    } finally {
      setActionLoadingId(null);
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
    activeTab === "ALL" ? weeks : weeks.filter((w) => w.track === activeTab);

  const filteredContestants = contestants.filter((u) => {
    const matchesTrack =
      contestantTrackFilter === "ALL" || u.track === contestantTrackFilter;
    const matchesSearch =
      !searchQuery || u.username.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTrack && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-rose-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-rose-900/30 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 to-red-700 flex items-center justify-center shadow-lg shadow-rose-950/60">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-white">Euler Admin Console</span>
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
        {/* Global Statistics Overview */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-2xl font-black text-white">{stats.totalContestants}</div>
              <div className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                <Users className="w-3.5 h-3.5 text-rose-400" />
                <span>Total Contestants</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-2xl font-black text-sky-400">{stats.cloudContestants}</div>
              <div className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                <Cloud className="w-3.5 h-3.5 text-sky-400" />
                <span>Cloud Track</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-2xl font-black text-amber-400">{stats.computingContestants}</div>
              <div className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                <Cpu className="w-3.5 h-3.5 text-amber-400" />
                <span>Computing Track</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-2xl font-black text-emerald-400">{stats.networkContestants}</div>
              <div className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                <Network className="w-3.5 h-3.5 text-emerald-400" />
                <span>Network Track</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-2xl font-black text-purple-400">{stats.activeSessions}</div>
              <div className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                <Smartphone className="w-3.5 h-3.5 text-purple-400" />
                <span>Active Devices</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-2xl font-black text-rose-400">{stats.totalQuizzesCompleted}</div>
              <div className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                <Flame className="w-3.5 h-3.5 text-rose-400" />
                <span>Quizzes Taken</span>
              </div>
            </div>
          </div>
        )}

        {/* Section Navigation Tabs */}
        <div className="flex border-b border-slate-800 gap-4">
          <button
            onClick={() => setActiveSection("CURRICULUM")}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeSection === "CURRICULUM"
                ? "border-rose-500 text-white"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sliders className="w-4 h-4 text-rose-400" />
            <span>Weekly Curriculum & Arena Controls</span>
          </button>

          <button
            onClick={() => setActiveSection("CONTESTANTS")}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeSection === "CONTESTANTS"
                ? "border-rose-500 text-white"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Users className="w-4 h-4 text-sky-400" />
            <span>Contestant Roster & Device Reset ({contestants.length})</span>
          </button>
        </div>

        {notice && (
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{notice}</span>
            </div>
            <button onClick={() => setNotice(null)} className="text-emerald-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* SECTION 1: CURRICULUM UNLOCK CONTROLS */}
        {activeSection === "CURRICULUM" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
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
                    {tab === "ALL" ? "All Tracks (18 Modules)" : `${tab} Track`}
                  </button>
                ))}
              </div>

              <button
                onClick={fetchData}
                className="self-start sm:self-auto py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center gap-2 transition-colors border border-slate-700"
              >
                <RefreshCw className="w-3.5 h-3.5 text-rose-400" />
                <span>Refresh</span>
              </button>
            </div>

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
                          <span>{isMock ? "Mock" : `W0${week.weekNumber}`}</span>
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

                      <h3 className="text-sm font-bold text-white leading-snug">{week.title}</h3>

                      <p className="text-[11px] text-slate-400">
                        {week.unlockedAt
                          ? `Unlocked at: ${new Date(week.unlockedAt).toLocaleString()}`
                          : "Currently locked to contestants"}
                      </p>
                    </div>

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
                            <span>Lock Module</span>
                          </>
                        ) : (
                          <>
                            <Unlock className="w-3.5 h-3.5" />
                            <span>Unlock for Contestants</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SECTION 2: CONTESTANT ROSTER & DEVICE RESET */}
        {activeSection === "CONTESTANTS" && (
          <div className="space-y-6">
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {(["ALL", "CLOUD", "COMPUTING", "NETWORK"] as const).map((track) => (
                  <button
                    key={track}
                    onClick={() => setContestantTrackFilter(track)}
                    className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all ${
                      contestantTrackFilter === track
                        ? "bg-rose-600 text-white shadow-lg shadow-rose-950/50"
                        : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800"
                    }`}
                  >
                    {track === "ALL" ? "All Contestants" : `${track} Track`}
                  </button>
                ))}
              </div>

              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by username..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            {/* Contestants Table */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3.5 px-4">Contestant</th>
                      <th className="py-3.5 px-4">Track</th>
                      <th className="py-3.5 px-4">Joined Date</th>
                      <th className="py-3.5 px-4">Device Sessions</th>
                      <th className="py-3.5 px-4">Arena Attempts</th>
                      <th className="py-3.5 px-4 text-right">Proctor Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredContestants.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-slate-500 text-xs">
                          No registered contestants match the search criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredContestants.map((c) => {
                        const trackColor = {
                          CLOUD: "text-sky-400 bg-sky-500/10 border-sky-500/20",
                          COMPUTING: "text-amber-400 bg-amber-500/10 border-amber-500/20",
                          NETWORK: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
                        }[c.track];

                        return (
                          <tr key={c.id} className="hover:bg-slate-850 transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-white text-sm">@{c.username}</div>
                              <div className="text-[10px] text-slate-500 font-mono">
                                ID: {c.id.slice(0, 8)}...
                              </div>
                            </td>

                            <td className="py-3.5 px-4">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${trackColor}`}
                              >
                                {c.track}
                              </span>
                            </td>

                            <td className="py-3.5 px-4 text-slate-400">
                              {new Date(c.createdAt).toLocaleDateString()}
                            </td>

                            <td className="py-3.5 px-4">
                              {c.activeSessionsCount > 0 ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold">
                                  <Smartphone className="w-3 h-3" />
                                  <span>1 Active Device</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-slate-500 text-[10px]">
                                  No Active Session
                                </span>
                              )}
                              {c.latestDeviceUuid && (
                                <div className="text-[10px] text-slate-600 font-mono mt-0.5 truncate max-w-[120px]">
                                  {c.latestDeviceUuid}
                                </div>
                              )}
                            </td>

                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-white">
                                {c.completedAttemptsCount} Completed
                              </div>
                              <div className="text-[10px] text-slate-400">
                                Total: {c.totalScore} Pts
                              </div>
                            </td>

                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleResetSession(c)}
                                  disabled={actionLoadingId === c.id}
                                  title="Clear active device binding"
                                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-[11px] font-bold flex items-center gap-1 transition-colors disabled:opacity-50"
                                >
                                  <Smartphone className="w-3 h-3 text-purple-400" />
                                  <span>Reset Device</span>
                                </button>

                                <button
                                  onClick={() => {
                                    setPinModalUser(c);
                                    setNewPinInput("");
                                    setPinError(null);
                                  }}
                                  title="Reset contestant 6-digit PIN"
                                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-[11px] font-bold flex items-center gap-1 transition-colors"
                                >
                                  <KeyRound className="w-3 h-3 text-amber-400" />
                                  <span>Reset PIN</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* PIN RESET MODAL */}
        {pinModalUser && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl animate-in zoom-in-95">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Reset Contestant PIN</h3>
                    <p className="text-xs text-slate-400">@{pinModalUser.username}</p>
                  </div>
                </div>
                <button
                  onClick={() => setPinModalUser(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">
                  New 6-Digit PIN
                </label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="e.g. 123456"
                  value={newPinInput}
                  onChange={(e) => setNewPinInput(e.target.value.replace(/\D/g, ""))}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-center text-lg font-mono tracking-widest text-white focus:outline-none focus:border-rose-500"
                />
                {pinError && <p className="text-xs text-rose-400">{pinError}</p>}
                <p className="text-[11px] text-slate-500">
                  Must be exactly 6 numbers. Contestant must use this PIN on next sign-in.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setPinModalUser(null)}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePin}
                  disabled={actionLoadingId === pinModalUser.id || newPinInput.length !== 6}
                  className="flex-1 py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white disabled:opacity-50"
                >
                  Confirm PIN
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
