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
  Crown,
  Heart,
  Diamond,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { EulerSigma } from "@/components/EulerSigma";

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
        const sessionRes = await fetch("/api/auth/session");
        const sessionData = await sessionRes.json();

        if (!sessionRes.ok || !sessionData.authenticated) {
          router.push("/login");
          return;
        }

        setUser(sessionData.user);

        const weeksRes = await fetch("/api/curriculum/tracks");
        const weeksData = await weeksRes.json();

        if (weeksRes.ok && weeksData.success) {
          setWeeks(weeksData.weeks);
        }

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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 text-[#777777]">
        <EulerSigma mood="thinking" size={80} />
        <div className="w-8 h-8 border-4 border-[#7c3aed] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-bold text-[#100f3e]">Loading your learning roadmap...</p>
      </div>
    );
  }

  const trackBadge = {
    CLOUD: {
      name: "Cloud Track",
      icon: Cloud,
      color: "bg-[#ddf4ff] text-[#1cb0f6]",
      border: "border-[#1cb0f6]",
      mockWeighting: "60% Cloud Services / 40% AI & ModelArts",
    },
    COMPUTING: {
      name: "Computing Track",
      icon: Cpu,
      color: "bg-[#fff2d6] text-[#ff9600]",
      border: "border-[#ff9600]",
      mockWeighting: "50% openEuler / 30% openGauss / 20% Kunpeng",
    },
    NETWORK: {
      name: "Network Track",
      icon: Network,
      color: "bg-[#f3e8ff] text-[#7c3aed]",
      border: "border-[#7c3aed]",
      mockWeighting: "40% Datacom / 20% DCN / 20% Security / 20% WLAN",
    },
  }[user?.track || "NETWORK"];

  const TrackIcon = trackBadge.icon;
  const mockWeek = weeks.find((w) => w.weekNumber === 6);

  return (
    <div className="min-h-screen bg-white text-[#100f3e]">
      {/* Top Navigation */}
      <Navbar userTrack={user?.track} username={user?.username} />

      {/* Main Grid: Learning Path (Left) & Gamified Sidebars (Right) */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Learning Roadmap & Units */}
          <div className="lg:col-span-8 space-y-8">
            {/* Unit Banner */}
            <div className="bg-[#7c3aed] rounded-3xl p-6 text-white shadow-[0_6px_0_#5b21b6] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#e9d5ff]">
                  <span>Track Curriculum</span>
                  <span>•</span>
                  <span>{trackBadge.name}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
                  Level 1: Foundation to Mastery
                </h1>
                <p className="text-sm font-bold text-white/90 mt-1 max-w-lg">
                  Complete each weekly milestone to unlock the next level and build your competitive accuracy.
                </p>
              </div>
              <EulerSigma mood="happy" size={80} className="hidden sm:block shrink-0" />
            </div>

            {/* Stepping Stone Units / Weekly Progression Cards */}
            <div className="space-y-6">
              {weeks.map((week) => {
                const isMockWeek = week.weekNumber === 6;
                return (
                  <div
                    key={week.id}
                    className={`rounded-3xl border-2 transition-all p-6 ${
                      week.isUnlocked
                        ? isMockWeek
                          ? "bg-[#fff2d6] border-[#ff9600] shadow-[0_6px_0_#e58500]"
                          : "bg-white border-[#e5e5e5] shadow-[0_6px_0_#e5e5e5] hover:border-[#7c3aed]"
                        : "bg-[#f7f7f7] border-[#e5e5e5] opacity-70"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Left: Milestone node icon & details */}
                      <div className="flex items-start sm:items-center gap-4">
                        <div
                          className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border-2 ${
                            week.isUnlocked
                              ? isMockWeek
                                ? "bg-[#ff9600] border-[#e58500] text-white shadow-[0_4px_0_#d97700]"
                                : "bg-[#7c3aed] border-[#5b21b6] text-white shadow-[0_4px_0_#5b21b6]"
                              : "bg-[#e5e5e5] border-[#d0d0d0] text-[#777777] shadow-[0_4px_0_#d0d0d0]"
                          }`}
                        >
                          {week.isUnlocked ? (
                            isMockWeek ? (
                              <Crown className="w-8 h-8 fill-white" />
                            ) : (
                              <Star className="w-8 h-8 fill-white" />
                            )
                          ) : (
                            <Lock className="w-6 h-6" />
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs font-black uppercase px-2.5 py-0.5 rounded-full ${
                                week.isUnlocked
                                  ? isMockWeek
                                    ? "bg-[#ff9600] text-white"
                                    : "bg-[#f3e8ff] text-[#7c3aed]"
                                  : "bg-[#e5e5e5] text-[#777777]"
                              }`}
                            >
                              {isMockWeek ? "Final Mock Exam" : `Week 0${week.weekNumber}`}
                            </span>
                            {week.isUnlocked && (
                              <span className="text-xs font-bold text-[#7c3aed] flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Unlocked
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg font-black text-[#100f3e] mt-1">
                            {week.title}
                          </h3>
                          <p className="text-xs font-bold text-[#777777] mt-0.5">
                            {isMockWeek
                              ? "60 questions • 60 minutes • 1,000 points Huawei qualifier replica"
                              : "30 questions in 30 minutes • 1 graded official attempt"}
                          </p>
                        </div>
                      </div>

                      {/* Right: Tactile Action Buttons */}
                      <div className="flex items-center gap-2 sm:shrink-0 pt-2 sm:pt-0">
                        {week.isUnlocked ? (
                          <>
                            <Link
                              href={`/practice?week=${week.weekNumber}`}
                              className="px-4 py-2.5 rounded-xl bg-white text-[#7c3aed] border-2 border-[#e5e5e5] text-xs font-black uppercase tracking-wider shadow-[0_2px_0_#e5e5e5] hover:bg-[#f3e8ff]/50 active:translate-y-0.5 transition-all flex items-center gap-1.5"
                            >
                              <BookOpen className="w-4 h-4" />
                              <span>Practice</span>
                            </Link>
                            <Link
                              href={`/arena?week=${week.weekNumber}`}
                              className={`px-5 py-2.5 rounded-xl text-white text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                                isMockWeek
                                  ? "bg-[#ff9600] hover:bg-[#ffa726] shadow-[0_4px_0_#e58500] active:translate-y-1 active:shadow-[0_1px_0_#e58500]"
                                  : "btn-tactile-primary py-2.5 px-5 text-xs"
                              }`}
                            >
                              <Zap className="w-4 h-4 fill-white" />
                              <span>Enter Arena</span>
                            </Link>
                          </>
                        ) : (
                          <div className="px-4 py-2.5 rounded-xl bg-[#e5e5e5] text-[#777777] text-xs font-black uppercase tracking-wider flex items-center gap-1.5 select-none">
                            <Lock className="w-4 h-4" />
                            <span>Locked</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Gamified Sidebar Widgets */}
          <div className="lg:col-span-4 space-y-6">
            {/* Widget 1: Daily Quests Card */}
            <div className="bg-white rounded-3xl border-2 border-[#e5e5e5] shadow-[0_4px_0_#e5e5e5] p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-[#ff9600] fill-[#ff9600]" />
                  <h3 className="font-black text-[#100f3e] text-base">Daily Quests</h3>
                </div>
                <span className="text-xs font-black text-[#7c3aed] bg-[#f3e8ff] px-2 py-0.5 rounded-full">
                  1 / 3 DONE
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                    <span className="text-[#100f3e]">Complete 1 Arena Drill</span>
                    <span className="text-[#777777]">1 / 1</span>
                  </div>
                  <div className="w-full bg-[#e5e5e5] rounded-full h-3 overflow-hidden">
                    <div className="bg-[#7c3aed] h-full rounded-full w-full" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                    <span className="text-[#100f3e]">Score 80%+ Accuracy</span>
                    <span className="text-[#777777]">{summary?.overallAccuracy || 0}%</span>
                  </div>
                  <div className="w-full bg-[#e5e5e5] rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-[#1cb0f6] h-full rounded-full"
                      style={{ width: `${Math.min(100, summary?.overallAccuracy || 0)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                    <span className="text-[#100f3e]">Clear 5 Mistake Notes</span>
                    <span className="text-[#777777]">{mistakeCount} Left</span>
                  </div>
                  <div className="w-full bg-[#e5e5e5] rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-[#ff9600] h-full rounded-full"
                      style={{ width: `${mistakeCount === 0 ? 100 : 40}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Widget 2: League Rank Podium Card */}
            <div className="bg-white rounded-3xl border-2 border-[#e5e5e5] shadow-[0_4px_0_#e5e5e5] p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#ffc700] fill-[#ffc700]" />
                  <h3 className="font-black text-[#100f3e] text-base">Emerald League</h3>
                </div>
                <Link
                  href="/leaderboard"
                  className="text-xs font-black text-[#7c3aed] uppercase hover:underline"
                >
                  View All
                </Link>
              </div>

              <div className="p-4 rounded-2xl bg-[#f3e8ff] border-2 border-[#7c3aed]/20 flex items-center justify-between">
                <div>
                  <span className="text-xs font-black text-[#7c3aed] uppercase">Your Position</span>
                  <div className="text-2xl font-black text-[#100f3e] mt-0.5">
                    {summary?.userRank ? `Rank #${summary.userRank}` : "Unranked"}
                  </div>
                  <span className="text-[11px] font-bold text-[#7c3aed]">
                    Top 10 in Promotion Zone!
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white border-2 border-[#e5e5e5] flex items-center justify-center text-xl font-black text-[#ffc700]">
                  #{summary?.userRank || "—"}
                </div>
              </div>
            </div>

            {/* Widget 3: Weakness Chest & Starred Notes */}
            <div className="bg-white rounded-3xl border-2 border-[#e5e5e5] shadow-[0_4px_0_#e5e5e5] p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <BookMarked className="w-5 h-5 text-[#ff4b4b]" />
                  <h3 className="font-black text-[#100f3e] text-base">Mistakes Notebook</h3>
                </div>
                <Link
                  href="/mistakes"
                  className="text-xs font-black text-[#7c3aed] uppercase hover:underline"
                >
                  Review
                </Link>
              </div>

              <p className="text-xs font-bold text-[#777777] mb-4">
                You have {mistakeCount} questions requiring review to reach 100% mastery.
              </p>

              <Link
                href="/mistakes"
                className="w-full py-3 px-4 rounded-2xl bg-white text-[#ff4b4b] border-2 border-[#ff4b4b] text-xs font-black uppercase tracking-wider shadow-[0_2px_0_#ff4b4b] hover:bg-[#ffdfe0]/40 flex items-center justify-center gap-2"
              >
                <span>Fix {mistakeCount} Mistakes</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Widget 4: Domain Mastery Breakdown */}
            <div className="bg-white rounded-3xl border-2 border-[#e5e5e5] shadow-[0_4px_0_#e5e5e5] p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-[#7c3aed]" />
                  <h3 className="font-black text-[#100f3e] text-base">Domain Mastery</h3>
                </div>
              </div>

              <div className="space-y-3">
                {diagnostics.slice(0, 4).map((d) => (
                  <Link
                    key={d.domain}
                    href={`/practice?week=${d.recommendedWeek}&domain=${encodeURIComponent(d.domain)}`}
                    className="block p-2.5 rounded-xl hover:bg-[#f7f7f7] transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                      <span className="text-[#100f3e] truncate max-w-[160px]">{d.domain}</span>
                      <span
                        className={`font-black ${
                          d.masteryPercentage >= 80 ? "text-[#7c3aed]" : "text-[#ff9600]"
                        }`}
                      >
                        {d.masteryPercentage}%
                      </span>
                    </div>
                    <div className="w-full bg-[#e5e5e5] rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          d.masteryPercentage >= 80 ? "bg-[#7c3aed]" : "bg-[#ff9600]"
                        }`}
                        style={{ width: `${Math.max(8, d.masteryPercentage)}%` }}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
