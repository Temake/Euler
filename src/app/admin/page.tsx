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
import { EulerSigma } from "@/components/EulerSigma";

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
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 text-[#777777]">
        <EulerSigma mood="thinking" size={90} />
        <div className="w-8 h-8 border-4 border-[#7c3aed] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-black text-[#100f3e]">Verifying Administrator Privileges...</p>
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
    <div className="min-h-screen bg-white text-[#100f3e] flex flex-col justify-between selection:bg-[#7c3aed] selection:text-white">
      {/* Top Header */}
      <header className="border-b-2 border-[#e5e5e5] bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <EulerSigma mood="neutral" size={40} />
            <div className="flex items-center gap-2">
              <span className="font-black text-2xl tracking-tight text-[#7c3aed]">euler</span>
              <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#ffdfe0] text-[#ff4b4b] border border-[#ff4b4b]/20 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Proctor Master</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              href="/dashboard"
              className="btn-tactile-secondary py-2 px-3.5 text-xs font-bold"
            >
              <span>Student View</span>
            </Link>
            <button
              onClick={handleLogout}
              className="p-2.5 rounded-2xl bg-white hover:bg-[#ffdfe0] text-[#777777] hover:text-[#ff4b4b] transition-colors border-2 border-[#e5e5e5] shadow-[0_2px_0_#e5e5e5] active:translate-y-0.5 active:shadow-none cursor-pointer"
              title="Admin Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-8">
        {/* Global Statistics Overview */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-5 rounded-3xl bg-white border-2 border-[#e5e5e5] shadow-[0_4px_0_#e5e5e5] space-y-1">
              <div className="w-8 h-8 rounded-xl bg-[#f3e8ff] text-[#7c3aed] flex items-center justify-center mb-2">
                <Users className="w-4 h-4" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#100f3e]">{stats.totalContestants}</div>
              <div className="text-xs font-bold text-[#777777]">Total Contestants</div>
            </div>

            <div className="p-5 rounded-3xl bg-white border-2 border-[#e5e5e5] shadow-[0_4px_0_#e5e5e5] space-y-1">
              <div className="w-8 h-8 rounded-xl bg-[#ddf4ff] text-[#1cb0f6] flex items-center justify-center mb-2">
                <Cloud className="w-4 h-4" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#1cb0f6]">{stats.cloudContestants}</div>
              <div className="text-xs font-bold text-[#777777]">Cloud Track</div>
            </div>

            <div className="p-5 rounded-3xl bg-white border-2 border-[#e5e5e5] shadow-[0_4px_0_#e5e5e5] space-y-1">
              <div className="w-8 h-8 rounded-xl bg-[#fff2d6] text-[#ff9600] flex items-center justify-center mb-2">
                <Cpu className="w-4 h-4" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#ff9600]">{stats.computingContestants}</div>
              <div className="text-xs font-bold text-[#777777]">Computing Track</div>
            </div>

            <div className="p-5 rounded-3xl bg-white border-2 border-[#e5e5e5] shadow-[0_4px_0_#e5e5e5] space-y-1">
              <div className="w-8 h-8 rounded-xl bg-[#f3e8ff] text-[#7c3aed] flex items-center justify-center mb-2">
                <Network className="w-4 h-4" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#7c3aed]">{stats.networkContestants}</div>
              <div className="text-xs font-bold text-[#777777]">Network Track</div>
            </div>

            <div className="p-5 rounded-3xl bg-white border-2 border-[#e5e5e5] shadow-[0_4px_0_#e5e5e5] space-y-1">
              <div className="w-8 h-8 rounded-xl bg-[#f3e8ff] text-[#7c3aed] flex items-center justify-center mb-2">
                <Smartphone className="w-4 h-4" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#7c3aed]">{stats.activeSessions}</div>
              <div className="text-xs font-bold text-[#777777]">Active Devices</div>
            </div>

            <div className="p-5 rounded-3xl bg-white border-2 border-[#e5e5e5] shadow-[0_4px_0_#e5e5e5] space-y-1">
              <div className="w-8 h-8 rounded-xl bg-[#ffdfe0] text-[#ff4b4b] flex items-center justify-center mb-2">
                <Flame className="w-4 h-4 fill-[#ff4b4b]" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#ff4b4b]">{stats.totalQuizzesCompleted}</div>
              <div className="text-xs font-bold text-[#777777]">Quizzes Taken</div>
            </div>
          </div>
        )}

        {/* Section Navigation Tabs */}
        <div className="flex border-b-2 border-[#e5e5e5] gap-3 pb-3 overflow-x-auto whitespace-nowrap">
          <button
            onClick={() => setActiveSection("CURRICULUM")}
            className={`py-3 px-5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeSection === "CURRICULUM"
                ? "bg-[#7c3aed] text-white shadow-[0_3px_0_#5b21b6]"
                : "bg-white text-[#777777] hover:text-[#100f3e] border-2 border-[#e5e5e5]"
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Weekly Curriculum & Arena Controls</span>
          </button>

          <button
            onClick={() => setActiveSection("CONTESTANTS")}
            className={`py-3 px-5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeSection === "CONTESTANTS"
                ? "bg-[#7c3aed] text-white shadow-[0_3px_0_#5b21b6]"
                : "bg-white text-[#777777] hover:text-[#100f3e] border-2 border-[#e5e5e5]"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Contestant Roster & Device Reset ({contestants.length})</span>
          </button>
        </div>

        {notice && (
          <div className="p-4 rounded-2xl bg-[#f3e8ff] border-2 border-[#7c3aed] text-[#100f3e] text-xs font-bold flex items-center justify-between shadow-[0_2px_0_#7c3aed] animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#7c3aed]" />
              <span>{notice}</span>
            </div>
            <button onClick={() => setNotice(null)} className="text-[#777777] hover:text-[#100f3e]">
              <X className="w-4 h-4" />
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
                    className={`py-2 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                      activeTab === tab
                        ? "bg-[#7c3aed] text-white shadow-[0_3px_0_#5b21b6]"
                        : "bg-white text-[#777777] hover:text-[#100f3e] border-2 border-[#e5e5e5]"
                    }`}
                  >
                    {tab === "ALL" ? "All Tracks (18 Modules)" : `${tab} Track`}
                  </button>
                ))}
              </div>

              <button
                onClick={fetchData}
                className="btn-tactile-secondary py-2 px-3 text-xs self-start sm:self-auto flex items-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#7c3aed]" />
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
                    className={`p-6 rounded-3xl border-2 transition-all flex flex-col justify-between ${
                      week.isUnlocked
                        ? "bg-white border-[#7c3aed] shadow-[0_4px_0_#7c3aed]"
                        : "bg-[#fcfcfc] border-[#e5e5e5] shadow-[0_4px_0_#e5e5e5]"
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-xs font-black px-2.5 py-1 rounded-xl bg-[#f7f7f7] text-[#100f3e] border border-[#e5e5e5]">
                          <Icon className="w-3.5 h-3.5 text-[#7c3aed]" />
                          <span>{week.track}</span>
                          <span className="text-[#777777]">&bull;</span>
                          <span>{isMock ? "Mock" : `W0${week.weekNumber}`}</span>
                        </span>

                        <span
                          className={`text-xs font-black px-2.5 py-1 rounded-full flex items-center gap-1 uppercase tracking-wider ${
                            week.isUnlocked
                              ? "bg-[#f3e8ff] text-[#7c3aed] border border-[#7c3aed]/30"
                              : "bg-[#f7f7f7] text-[#777777] border border-[#e5e5e5]"
                          }`}
                        >
                          {week.isUnlocked ? (
                            <>
                              <Unlock className="w-3 h-3 text-[#7c3aed]" />
                              <span>UNLOCKED</span>
                            </>
                          ) : (
                            <>
                              <Lock className="w-3 h-3 text-[#777777]" />
                              <span>LOCKED</span>
                            </>
                          )}
                        </span>
                      </div>

                      <h3 className="text-base font-black text-[#100f3e] leading-snug">{week.title}</h3>

                      <p className="text-xs font-bold text-[#777777]">
                        {week.unlockedAt
                          ? `Unlocked at: ${new Date(week.unlockedAt).toLocaleString()}`
                          : "Currently locked to contestants"}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t-2 border-[#e5e5e5]">
                      <button
                        onClick={() => handleToggle(week)}
                        disabled={isToggling}
                        className={`w-full py-3 px-4 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          week.isUnlocked
                            ? "btn-tactile-secondary hover:border-[#ff4b4b] hover:text-[#ff4b4b]"
                            : "btn-tactile-primary"
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
                    className={`py-2 px-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                      contestantTrackFilter === track
                        ? "bg-[#7c3aed] text-white shadow-[0_3px_0_#5b21b6]"
                        : "bg-white text-[#777777] hover:text-[#100f3e] border-2 border-[#e5e5e5]"
                    }`}
                  >
                    {track === "ALL" ? "All Contestants" : `${track} Track`}
                  </button>
                ))}
              </div>

              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-[#777777] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by username..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border-2 border-[#e5e5e5] rounded-xl text-xs font-bold text-[#100f3e] placeholder-[#777777] focus:outline-none focus:border-[#7c3aed]"
                />
              </div>
            </div>

            {/* Contestants Table */}
            <div className="bg-white border-2 border-[#e5e5e5] rounded-3xl overflow-hidden shadow-[0_6px_0_#e5e5e5]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#f7f7f7] border-b-2 border-[#e5e5e5] text-[#777777] font-black uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3.5 px-4">Contestant</th>
                      <th className="py-3.5 px-4">Track</th>
                      <th className="py-3.5 px-4">Joined Date</th>
                      <th className="py-3.5 px-4">Device Sessions</th>
                      <th className="py-3.5 px-4">Arena Attempts</th>
                      <th className="py-3.5 px-4 text-right">Proctor Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-[#f1f1f1] font-bold">
                    {filteredContestants.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-[#777777] text-xs font-bold">
                          No registered contestants match the search criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredContestants.map((c) => {
                        const trackColor = {
                          CLOUD: "text-[#1cb0f6] bg-[#ddf4ff] border-[#1cb0f6]/20",
                          COMPUTING: "text-[#ff9600] bg-[#fff2d6] border-[#ff9600]/20",
                          NETWORK: "text-[#7c3aed] bg-[#f3e8ff] border-[#7c3aed]/20",
                        }[c.track];

                        return (
                          <tr key={c.id} className="hover:bg-[#fcfaff] transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="font-black text-[#100f3e] text-sm">@{c.username}</div>
                              <div className="text-[10px] text-[#777777] font-mono">
                                ID: {c.id.slice(0, 8)}...
                              </div>
                            </td>

                            <td className="py-3.5 px-4">
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${trackColor}`}
                              >
                                {c.track}
                              </span>
                            </td>

                            <td className="py-3.5 px-4 text-[#777777]">
                              {new Date(c.createdAt).toLocaleDateString()}
                            </td>

                            <td className="py-3.5 px-4">
                              {c.activeSessionsCount > 0 ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#f3e8ff] text-[#7c3aed] border border-[#7c3aed]/20 text-[10px] font-black">
                                  <Smartphone className="w-3 h-3" />
                                  <span>1 Active Device</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[#777777] text-[10px]">
                                  No Active Session
                                </span>
                              )}
                              {c.latestDeviceUuid && (
                                <div className="text-[10px] text-[#777777] font-mono mt-0.5 truncate max-w-[120px]">
                                  {c.latestDeviceUuid}
                                </div>
                              )}
                            </td>

                            <td className="py-3.5 px-4">
                              <div className="font-black text-[#100f3e]">
                                {c.completedAttemptsCount} Completed
                              </div>
                              <div className="text-[10px] text-[#7c3aed] font-black">
                                Total: {c.totalScore} Pts
                              </div>
                            </td>

                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleResetSession(c)}
                                  disabled={actionLoadingId === c.id}
                                  title="Clear active device binding"
                                  className="btn-tactile-secondary py-1.5 px-3 text-xs"
                                >
                                  <Smartphone className="w-3 h-3 text-[#7c3aed]" />
                                  <span>Reset Device</span>
                                </button>

                                <button
                                  onClick={() => {
                                    setPinModalUser(c);
                                    setNewPinInput("");
                                    setPinError(null);
                                  }}
                                  title="Reset contestant 6-digit PIN"
                                  className="btn-tactile-primary py-1.5 px-3 text-xs"
                                >
                                  <KeyRound className="w-3 h-3" />
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
          <div className="fixed inset-0 z-50 bg-[#100f3e]/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white border-2 border-[#e5e5e5] rounded-3xl p-6 sm:p-8 max-w-sm w-full space-y-5 shadow-[0_8px_0_#e5e5e5] animate-in zoom-in-95">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-2xl bg-[#f3e8ff] text-[#7c3aed]">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-[#100f3e] text-base">Reset Contestant PIN</h3>
                    <p className="text-xs font-bold text-[#777777]">@{pinModalUser.username}</p>
                  </div>
                </div>
                <button
                  onClick={() => setPinModalUser(null)}
                  className="p-1 rounded-xl text-[#777777] hover:text-[#100f3e]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-[#100f3e] block">
                  New 6-Digit PIN
                </label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="e.g. 123456"
                  value={newPinInput}
                  onChange={(e) => setNewPinInput(e.target.value.replace(/\D/g, ""))}
                  className="w-full px-4 py-3 bg-white border-2 border-[#e5e5e5] rounded-2xl text-center text-xl font-mono font-bold tracking-widest text-[#100f3e] focus:outline-none focus:border-[#7c3aed] focus:shadow-[0_2px_0_#7c3aed] transition-all"
                />
                {pinError && <p className="text-xs font-bold text-[#ff4b4b]">{pinError}</p>}
                <p className="text-[11px] font-bold text-[#777777]">
                  Must be exactly 6 numbers. Contestant must use this PIN on next sign-in.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setPinModalUser(null)}
                  className="btn-tactile-secondary flex-1 py-3 text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePin}
                  disabled={actionLoadingId === pinModalUser.id || newPinInput.length !== 6}
                  className="btn-tactile-primary flex-1 py-3 text-xs"
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
