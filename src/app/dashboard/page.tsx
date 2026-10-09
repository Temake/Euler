"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Cloud,
  Cpu,
  Network,
  Lock,
  Unlock,
  BookOpen,
  Award,
  Zap,
  LogOut,
  Trophy,
  Flame,
  Star,
  BookMarked,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Target,
  BarChart2,
  Compass,
  Home,
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

interface DomainDiagnostic {
  domain: string;
  totalSyllabusQuestions: number;
  attemptedCount: number;
  correctCount: number;
  incorrectCount: number;
  masteryPercentage: number;
  status: "NOT_ATTEMPTED" | "CRITICAL_WEAKNESS" | "NEEDS_PRACTICE" | "MASTERED";
  recommendedWeek: number;
}

interface DiagnosticSummary {
  totalAttempted: number;
  totalCorrect: number;
  overallAccuracy: number;
  totalSyllabusQuestions: number;
  userRank: number | null;
  totalRankedContestants: number;
  cumulativeScore: number;
  completedRounds: number;
  weakestDomain: string | null;
  weakestAccuracy: number | null;
  strongestDomain: string | null;
  strongestAccuracy: number | null;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [weeks, setWeeks] = useState<TrackWeek[]>([]);
  const [mistakeCount, setMistakeCount] = useState<number>(0);
  const [bookmarkCount, setBookmarkCount] = useState<number>(0);
  const [diagnostics, setDiagnostics] = useState<DomainDiagnostic[]>([]);
  const [summary, setSummary] = useState<DiagnosticSummary | null>(null);
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

        // 3. Fetch mistake & bookmark counts + analytics diagnostics in parallel
        try {
          const [mRes, bRes, dRes] = await Promise.all([
            fetch("/api/mistakes"),
            fetch("/api/bookmarks"),
            fetch("/api/analytics/diagnostics"),
          ]);
          if (mRes.ok) {
            const mData = await mRes.json();
            if (mData.success) setMistakeCount(mData.totalMistakes || 0);
          }
          if (bRes.ok) {
            const bData = await bRes.json();
            if (bData.success) setBookmarkCount(bData.count || 0);
          }
          if (dRes.ok) {
            const dData = await dRes.json();
            if (dData.success) {
              setDiagnostics(dData.domains || []);
              setSummary(dData.summary || null);
            }
          }
        } catch (e) {
          console.warn("Error fetching dashboard telemetry", e);
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
        <p className="text-sm font-medium">Synchronizing contestant arena & diagnostics...</p>
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
      mockWeighting: "60% Cloud Services / 40% AI & ModelArts",
    },
    COMPUTING: {
      name: "Computing Track",
      icon: Cpu,
      color: "from-amber-500 to-orange-600",
      accent: "text-amber-400",
      border: "border-amber-500/30",
      bg: "bg-amber-950/20",
      mockWeighting: "50% openEuler / 30% openGauss / 20% Kunpeng",
    },
    NETWORK: {
      name: "Network Track",
      icon: Network,
      color: "from-emerald-500 to-teal-600",
      accent: "text-emerald-400",
      border: "border-emerald-500/30",
      bg: "bg-emerald-950/20",
      mockWeighting: "40% Datacom / 20% DCN / 20% Security / 20% WLAN",
    },
  }[user?.track || "NETWORK"];

  const TrackIcon = trackBadge.icon;
  const mockWeek = weeks.find((w) => w.weekNumber === 6);

  // SVG Radar Polygon calculations
  const radarCenter = 130;
  const radarRadius = 85;
  const numAxes = diagnostics.length || 5;

  const getAxisPoint = (index: number, valPercentage: number) => {
    const angle = (2 * Math.PI * index) / numAxes - Math.PI / 2;
    const r = (radarRadius * Math.max(10, Math.min(100, valPercentage))) / 100;
    const x = radarCenter + r * Math.cos(angle);
    const y = radarCenter + r * Math.sin(angle);
    return { x, y };
  };

  const radarPolygonPoints = diagnostics
    .map((d, i) => {
      const pt = getAxisPoint(i, d.attemptedCount > 0 ? d.masteryPercentage : 15);
      return `${pt.x},${pt.y}`;
    })
    .join(" ");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-rose-500 selection:text-white">
      {/* Top Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-lg shadow-rose-900/40 shrink-0">
              <span className="text-lg sm:text-xl font-black text-white italic">E</span>
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Euler
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                Huawei ICT Arena
              </span>
            </div>
          </div>

          {/* Nav Controls */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/50 text-xs">
              <TrackIcon className={`w-4 h-4 ${trackBadge.accent}`} />
              <span className="font-semibold text-slate-200">{trackBadge.name}</span>
            </div>

            <Link
              href="/mistakes"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-slate-300 text-xs font-bold transition-colors shadow-sm shrink-0"
              title="Mistake Notebook"
            >
              <BookMarked className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden md:inline">Notebook</span>
              {mistakeCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-bold">
                  {mistakeCount}
                </span>
              )}
            </Link>

            <Link
              href="/leaderboard"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold transition-colors shadow-sm shrink-0"
              title="Rankings"
            >
              <Trophy className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Leaderboard</span>
              {summary?.userRank && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                  #{summary.userRank}
                </span>
              )}
            </Link>

            <div className="flex items-center gap-1.5 sm:gap-2 pl-1 border-l border-slate-800 shrink-0">
              <span className="hidden sm:inline text-xs sm:text-sm font-medium text-slate-300 max-w-[100px] truncate">
                @{user?.username}
              </span>
              <button
                onClick={handleLogout}
                title="Log out"
                className="p-1.5 sm:p-2 rounded-lg bg-slate-800/40 hover:bg-slate-800 text-slate-400 hover:text-rose-400 transition-colors border border-slate-700/40"
              >
                <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 pb-24 md:pb-8">
        {/* Welcome Hero Banner with Diagnostic Telemetry */}
        <div className={`p-4 sm:p-8 rounded-2xl sm:rounded-3xl border ${trackBadge.border} ${trackBadge.bg} bg-gradient-to-br from-slate-900/90 to-slate-950 shadow-2xl relative overflow-hidden`}>
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-[11px] sm:text-xs font-semibold text-slate-300">
                <TrackIcon className={`w-3.5 h-3.5 ${trackBadge.accent}`} />
                <span>Personalized Track: {trackBadge.name}</span>
              </div>
              <h1 className="text-xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                Welcome to the Arena, {user?.username}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
                Complete your weekly structured curriculum, practice on demand, track knowledge mastery diagnostics, and compete on regional leaderboards!
              </p>
            </div>

            {/* Quick Diagnostic Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 w-full lg:w-auto shrink-0">
              <Link
                href="/leaderboard"
                className="p-3 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/40 text-center transition-colors group flex flex-col items-center justify-center"
              >
                <div className="text-lg sm:text-2xl font-black text-amber-400 flex items-center justify-center gap-1 group-hover:scale-105 transition-transform">
                  <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{summary?.userRank ? `#${summary.userRank}` : "—"}</span>
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium">Season Rank</div>
              </Link>

              <div className="p-3 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl bg-slate-800/40 border border-slate-700/40 text-center flex flex-col items-center justify-center">
                <div className="text-lg sm:text-2xl font-black text-emerald-400">
                  {summary ? `${summary.overallAccuracy}%` : "0%"}
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium">Mastery Accuracy</div>
              </div>

              <Link
                href="/mistakes"
                className="p-3 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/40 text-center transition-colors group flex flex-col items-center justify-center"
              >
                <div className="text-lg sm:text-2xl font-black text-rose-400 flex items-center justify-center gap-1 group-hover:scale-105 transition-transform">
                  <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{mistakeCount}</span>
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium">Weaknesses</div>
              </Link>

              <Link
                href="/mistakes"
                className="p-3 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/40 text-center transition-colors group flex flex-col items-center justify-center"
              >
                <div className="text-lg sm:text-2xl font-black text-amber-400 flex items-center justify-center gap-1 group-hover:scale-105 transition-transform">
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400/30" />
                  <span>{bookmarkCount}</span>
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium">Starred Qs</div>
              </Link>
            </div>
          </div>
        </div>

        {/* Highlight Banner: Mode 3 - Week 6 Preliminary Mock Exam Simulator */}
        {mockWeek && (
          <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-900 border border-rose-500/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-black bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>PRELIMINARY MOCK EXAM SIMULATOR</span>
                </span>
                <span className="text-[11px] sm:text-xs text-slate-400 font-medium">
                  Official Qualifier Replica
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white leading-snug">
                Huawei ICT Competition 2026–2027 Mock Simulation
              </h2>
              <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
                60 questions &bull; 60 minutes countdown &bull; 1,000 pts total &bull; 600 pts passing benchmark.
                Weighted: <span className="text-rose-300 font-semibold">{trackBadge.mockWeighting}</span>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto shrink-0">
              {mockWeek.isUnlocked ? (
                <>
                  <Link
                    href="/practice?week=6"
                    className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors border border-slate-700 flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-4 h-4 text-sky-400" />
                    <span>Practice Pool</span>
                  </Link>
                  <Link
                    href="/arena?week=6"
                    className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white text-xs font-bold transition-all shadow-lg shadow-rose-950/50 flex items-center justify-center gap-1.5"
                  >
                    <Zap className="w-4 h-4 fill-white" />
                    <span>Launch Mock Exam</span>
                  </Link>
                </>
              ) : (
                <div className="py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-500 text-xs font-medium flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>Unlocks on Week 6 (Proctor Managed)</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 6-Week Progression Grid: Curriculum & Weekly Arena Roadmap */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-rose-400 shrink-0" />
              <span>Curriculum & Weekly Arena Roadmap</span>
            </h2>
            <span className="text-xs text-slate-400 font-medium">
              6-Week Huawei Preliminary Qualifier Schedule
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {weeks.map((week) => {
              const isMockWeek = week.weekNumber === 6;
              return (
                <div
                  key={week.id}
                  className={`p-4 sm:p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                    week.isUnlocked
                      ? isMockWeek
                        ? "bg-gradient-to-br from-rose-950/30 to-slate-900/90 border-rose-500/40 shadow-lg shadow-rose-950/20"
                        : "bg-slate-900/80 border-slate-700/60 hover:border-slate-600 shadow-md"
                      : "bg-slate-900/30 border-slate-800/50 opacity-60"
                  }`}
                >
                  <div className="space-y-2.5 sm:space-y-3">
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
                            <span>Locked</span>
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
                  <div className="pt-4 sm:pt-6 mt-3 sm:mt-4 border-t border-slate-800/60 flex items-center gap-2.5 sm:gap-3">
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

        {/* Phase 5 Section: Weak-Area Diagnostic Radar & Knowledge Mastery */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-sky-400 shrink-0" />
                <span>Knowledge Mastery & Diagnostic</span>
              </h2>
              <p className="text-xs text-slate-400">
                Continuous performance telemetry across Huawei {trackBadge.name} syllabus domains
              </p>
            </div>

            {summary?.weakestDomain && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold self-start sm:self-auto">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Priority Focus: {summary.weakestDomain} ({summary.weakestAccuracy}%)</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
            {/* Visual Radar / Polygon Canvas Card */}
            <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col items-center justify-between shadow-lg overflow-hidden">
              <div className="w-full flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
                <span className="flex items-center gap-1.5 text-white">
                  <Compass className="w-4 h-4 text-sky-400" />
                  <span>Proficiency Radar</span>
                </span>
                <span className="text-[10px] sm:text-[11px] text-slate-500">
                  {summary?.totalAttempted || 0} / 150 Qs Attempted
                </span>
              </div>

              {/* Responsive SVG Radar: padded viewBox prevents label clipping on mobile */}
              <div className="relative w-full max-w-[240px] sm:max-w-[260px] aspect-square my-2 sm:my-auto flex items-center justify-center">
                <svg viewBox="-25 -25 310 310" className="w-full h-full">
                  {/* Concentric Guide Circles */}
                  {[0.25, 0.5, 0.75, 1.0].map((level, i) => (
                    <circle
                      key={i}
                      cx={radarCenter}
                      cy={radarCenter}
                      r={radarRadius * level}
                      fill="none"
                      stroke="#334155"
                      strokeDasharray={level < 1.0 ? "3 3" : undefined}
                      strokeWidth="1"
                    />
                  ))}

                  {/* Radiating Axes */}
                  {diagnostics.map((_, i) => {
                    const outer = getAxisPoint(i, 100);
                    return (
                      <line
                        key={i}
                        x1={radarCenter}
                        y1={radarCenter}
                        x2={outer.x}
                        y2={outer.y}
                        stroke="#1e293b"
                        strokeWidth="1"
                      />
                    );
                  })}

                  {/* Filled Diagnostic Polygon */}
                  {diagnostics.length > 0 && (
                    <polygon
                      points={radarPolygonPoints}
                      fill="rgba(244, 63, 94, 0.25)"
                      stroke="#f43f5e"
                      strokeWidth="2"
                    />
                  )}

                  {/* Node Dots & Labels */}
                  {diagnostics.map((d, i) => {
                    const pt = getAxisPoint(i, d.attemptedCount > 0 ? d.masteryPercentage : 15);
                    const labelPt = getAxisPoint(i, 118);
                    return (
                      <g key={d.domain}>
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="4"
                          fill="#f43f5e"
                          stroke="#ffffff"
                          strokeWidth="1.5"
                        />
                        <text
                          x={labelPt.x}
                          y={labelPt.y}
                          fill="#94a3b8"
                          fontSize="9"
                          fontWeight="bold"
                          textAnchor="middle"
                          dominantBaseline="central"
                        >
                          {d.domain.split(" ")[0]}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div className="w-full pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
                  <span>Domain Mastery</span>
                </span>
                <span>Threshold: 80%</span>
              </div>
            </div>

            {/* Domain Breakdown Mastery Bars */}
            <div className="lg:col-span-2 p-4 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-lg flex flex-col justify-between">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-bold gap-1">
                <span className="text-white">Domain Mastery Progress</span>
                <span className="text-slate-400 text-[11px]">Click to Launch Targeted Drill</span>
              </div>

              <div className="space-y-3 flex-1">
                {diagnostics.map((d) => {
                  let barColor = "bg-slate-700";
                  let statusBadge = (
                    <span className="text-[10px] font-bold text-slate-400 px-2 py-0.5 rounded bg-slate-800 shrink-0">
                      Not Attempted
                    </span>
                  );

                  if (d.status === "MASTERED") {
                    barColor = "bg-emerald-500";
                    statusBadge = (
                      <span className="text-[10px] font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30 shrink-0">
                        Mastered ({d.masteryPercentage}%)
                      </span>
                    );
                  } else if (d.status === "NEEDS_PRACTICE") {
                    barColor = "bg-amber-500";
                    statusBadge = (
                      <span className="text-[10px] font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/30 shrink-0">
                        Competitive ({d.masteryPercentage}%)
                      </span>
                    );
                  } else if (d.status === "CRITICAL_WEAKNESS") {
                    barColor = "bg-rose-500";
                    statusBadge = (
                      <span className="text-[10px] font-bold text-rose-400 px-2 py-0.5 rounded bg-rose-500/20 border border-rose-500/30 shrink-0">
                        Weak Area ({d.masteryPercentage}%)
                      </span>
                    );
                  }

                  return (
                    <Link
                      key={d.domain}
                      href={`/practice?week=${d.recommendedWeek}&domain=${encodeURIComponent(d.domain)}`}
                      className="block p-3 rounded-xl bg-slate-950/60 hover:bg-slate-800/60 border border-slate-800/80 hover:border-slate-700 transition-all group"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs mb-1.5">
                        <span className="font-bold text-slate-200 group-hover:text-white transition-colors truncate">
                          {d.domain}
                        </span>
                        <div className="flex items-center gap-2 justify-between sm:justify-end shrink-0">
                          <span className="text-[11px] text-slate-400 font-mono">
                            {d.correctCount} / {d.attemptedCount} Correct
                          </span>
                          {statusBadge}
                        </div>
                      </div>

                      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${barColor}`}
                          style={{ width: `${Math.max(5, d.masteryPercentage)}%` }}
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                <span className="text-slate-400 text-[11px] sm:text-xs">
                  Target: Maintain <strong className="text-emerald-400">&gt;= 80%</strong> across all domains to qualify for Regionals.
                </span>
                <Link
                  href="/practice"
                  className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors self-start sm:self-auto"
                >
                  <span>Practice All Modules</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Mobile Sticky Bottom Navigation Bar (app-grade mobile ergonomics) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/90 px-4 py-2 flex items-center justify-around shadow-2xl">
        <Link
          href="/dashboard"
          className="flex flex-col items-center gap-0.5 text-rose-400 text-[10px] font-bold py-1 px-3"
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>
        <Link
          href="/practice"
          className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-slate-200 text-[10px] font-medium py-1 px-3 transition-colors"
        >
          <BookOpen className="w-5 h-5" />
          <span>Practice</span>
        </Link>
        <Link
          href="/arena"
          className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-slate-200 text-[10px] font-medium py-1 px-3 transition-colors"
        >
          <Zap className="w-5 h-5" />
          <span>Arena</span>
        </Link>
        <Link
          href="/mistakes"
          className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-slate-200 text-[10px] font-medium py-1 px-3 transition-colors relative"
        >
          <BookMarked className="w-5 h-5" />
          <span>Notebook</span>
          {mistakeCount > 0 && (
            <span className="absolute top-0 right-2 w-2 h-2 rounded-full bg-rose-500" />
          )}
        </Link>
        <Link
          href="/leaderboard"
          className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-slate-200 text-[10px] font-medium py-1 px-3 transition-colors"
        >
          <Trophy className="w-5 h-5" />
          <span>Ranks</span>
        </Link>
      </nav>
    </div>
  );
}
