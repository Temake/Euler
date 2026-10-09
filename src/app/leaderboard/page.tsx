"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Trophy,
  Medal,
  Clock,
  ChevronLeft,
  Flame,
  Award,
  Sparkles,
  Users,
  Search,
  UserCheck,
  ShieldCheck,
  Crown,
  Zap,
  Home,
  BookOpen,
  BookMarked,
} from "lucide-react";

interface Standing {
  rank: number;
  userId: string;
  username: string;
  track: string;
  weekNumber?: number;
  score?: number;
  totalScore?: number;
  bestScore?: number;
  timeTakenSeconds?: number;
  totalTimeSeconds?: number;
  completedWeeks?: number;
  isCurrentUser?: boolean;
}

function LeaderboardPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultWeek = searchParams.get("week") || "season";

  const [selectedWeek, setSelectedWeek] = useState<string>(defaultWeek);
  const [standings, setStandings] = useState<Standing[]>([]);
  const [track, setTrack] = useState<string>("NETWORK");
  const [myRank, setMyRank] = useState<number | null>(null);
  const [myScore, setMyScore] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadLeaderboard() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/leaderboard?week=${selectedWeek}`);
        const data = await res.json();

        if (res.ok && data.success) {
          setStandings(data.standings);
          setTrack(data.track);
          setMyRank(data.myRank ?? null);
          setMyScore(data.myScore ?? null);
        } else {
          setError(data.error || "Failed to load leaderboard.");
        }
      } catch (err) {
        console.error("Leaderboard error:", err);
        setError("Network error while loading leaderboard.");
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, [selectedWeek]);

  const filteredStandings = standings.filter((s) =>
    s.username.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const isSeasonTab = selectedWeek === "season";
  const isMockTab = selectedWeek === "6";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-rose-500 selection:text-white flex flex-col justify-between">
      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Link
              href="/dashboard"
              className="p-1.5 sm:p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-slate-700/60 shrink-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-black shrink-0">
                <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="min-w-0">
                <h1 className="font-extrabold text-xs sm:text-base tracking-tight text-white flex items-center gap-1.5 truncate">
                  <span className="truncate">{track} Track Standings</span>
                </h1>
                <p className="text-[10px] sm:text-[11px] text-slate-400 truncate hidden xs:block sm:block">
                  Huawei ICT Competition 2026–2027
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/dashboard"
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-700/60 transition-colors flex items-center gap-1.5"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Leaderboard Body */}
      <main className="max-w-5xl mx-auto w-full px-3 sm:px-4 py-6 sm:py-8 flex-1 space-y-6 sm:space-y-8 pb-24 md:pb-8">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {[
              { id: "season", label: "🏆 Season Cumulative" },
              { id: "1", label: "Week 01" },
              { id: "2", label: "Week 02" },
              { id: "3", label: "Week 03" },
              { id: "4", label: "Week 04" },
              { id: "5", label: "Week 05" },
              { id: "6", label: "⚡ Preliminary Mock" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedWeek(tab.id)}
                className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all ${
                  selectedWeek === tab.id
                    ? "bg-rose-600 text-white shadow-lg shadow-rose-950/50"
                    : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>Tie-Breaker: <strong className="text-slate-300">Fastest Elapsed Time</strong></span>
          </div>
        </div>

        {/* Contestant Personal Placement Banner (if participated) */}
        {myRank !== null && (
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-950/30 via-slate-900 to-slate-900 border border-rose-500/40 flex items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center font-black text-sm">
                #{myRank}
              </div>
              <div>
                <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Your Current Standing</span>
                </div>
                <div className="text-sm font-bold text-white">
                  Ranked #{myRank} of {standings.length} Contestants in {track}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs text-slate-400 font-medium">Your Score</div>
              <div className="text-lg font-black text-rose-400">
                {myScore} pts
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4 text-slate-400">
            <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm">Calculating Regional Standings & Tie-Breakers...</p>
          </div>
        ) : standings.length === 0 ? (
          <div className="p-12 rounded-3xl bg-slate-900/50 border border-slate-800 text-center space-y-3">
            <Trophy className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No Official Submissions Yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              Be the first contestant from the {track} track to complete this official Arena round and claim the #1 spot on the regional leaderboard!
            </p>
            <Link
              href={`/arena?week=${selectedWeek === "season" ? 1 : selectedWeek}`}
              className="inline-block mt-2 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors shadow-md shadow-rose-950/40"
            >
              Take Arena Quiz Now
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Top 3 Podium Cards */}
            {standings.length >= 3 && !searchQuery && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {/* 2nd Place (Silver) */}
                <div className="order-2 sm:order-1 p-6 rounded-2xl bg-gradient-to-b from-slate-800/80 to-slate-900 border border-slate-700/80 text-center space-y-2 shadow-lg">
                  <div className="w-10 h-10 rounded-full bg-slate-400/20 text-slate-300 font-black text-sm flex items-center justify-center mx-auto border border-slate-400/40">
                    <Medal className="w-5 h-5 text-slate-300" />
                  </div>
                  <div className="font-bold text-white text-base truncate flex items-center justify-center gap-1">
                    <span>@{standings[1].username}</span>
                    {standings[1].isCurrentUser && (
                      <span className="text-[10px] text-rose-400 font-bold">(You)</span>
                    )}
                  </div>
                  <div className="text-xl font-black text-slate-200">
                    {standings[1].score ?? standings[1].totalScore} pts
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>
                      {Math.round(
                        (standings[1].timeTakenSeconds ?? standings[1].totalTimeSeconds ?? 0) / 60
                      )}{" "}
                      mins
                    </span>
                  </div>
                </div>

                {/* 1st Place (Gold Crown) */}
                <div className="order-1 sm:order-2 p-6 rounded-2xl bg-gradient-to-b from-amber-950/50 via-slate-900 to-slate-900 border border-amber-500/60 text-center space-y-2 shadow-xl shadow-amber-950/30 sm:-translate-y-2">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 font-black text-base flex items-center justify-center mx-auto border border-amber-500/50">
                    <Crown className="w-6 h-6 text-amber-400" />
                  </div>
                  <div className="font-bold text-white text-lg truncate flex items-center justify-center gap-1">
                    <span>@{standings[0].username}</span>
                    {standings[0].isCurrentUser && (
                      <span className="text-[10px] text-rose-400 font-bold">(You)</span>
                    )}
                  </div>
                  <div className="text-2xl font-black text-amber-400">
                    {standings[0].score ?? standings[0].totalScore} pts
                  </div>
                  <div className="text-[11px] text-amber-300/80 flex items-center justify-center gap-1 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>
                      {Math.round(
                        (standings[0].timeTakenSeconds ?? standings[0].totalTimeSeconds ?? 0) / 60
                      )}{" "}
                      mins
                    </span>
                  </div>
                </div>

                {/* 3rd Place (Bronze) */}
                <div className="order-3 sm:order-3 p-6 rounded-2xl bg-gradient-to-b from-slate-800/80 to-slate-900 border border-slate-700/80 text-center space-y-2 shadow-lg">
                  <div className="w-10 h-10 rounded-full bg-amber-700/20 text-amber-600 font-black text-sm flex items-center justify-center mx-auto border border-amber-700/40">
                    <Medal className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="font-bold text-white text-base truncate flex items-center justify-center gap-1">
                    <span>@{standings[2].username}</span>
                    {standings[2].isCurrentUser && (
                      <span className="text-[10px] text-rose-400 font-bold">(You)</span>
                    )}
                  </div>
                  <div className="text-xl font-black text-slate-200">
                    {standings[2].score ?? standings[2].totalScore} pts
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>
                      {Math.round(
                        (standings[2].timeTakenSeconds ?? standings[2].totalTimeSeconds ?? 0) / 60
                      )}{" "}
                      mins
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Standings Table with Search Filter */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-lg space-y-3">
              {/* Table search bar */}
              <div className="p-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search contestant..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div className="text-xs text-slate-400 font-medium">
                  {filteredStandings.length} Contestants Listed
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                      <th className="py-3 px-3 sm:px-4 w-12 sm:w-16 text-center">Rank</th>
                      <th className="py-3 px-3 sm:px-4">Contestant</th>
                      <th className="py-3 px-3 sm:px-4 text-right">Score</th>
                      <th className="hidden sm:table-cell py-3 px-4 text-right">Time</th>
                      {isSeasonTab && (
                        <th className="hidden md:table-cell py-3 px-4 text-right">Rounds</th>
                      )}
                      <th className="py-3 px-3 sm:px-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-medium">
                    {filteredStandings.map((row) => {
                      const scoreValue = row.score ?? row.totalScore ?? 0;
                      const isPassing = isSeasonTab
                        ? scoreValue >= 1800
                        : scoreValue >= 600;

                      return (
                        <tr
                          key={row.userId}
                          className={`transition-colors ${
                            row.isCurrentUser
                              ? "bg-rose-950/30 border-l-2 border-rose-500"
                              : "hover:bg-slate-800/40"
                          }`}
                        >
                          <td className="py-3.5 px-3 sm:px-4 text-center font-bold">
                            {row.rank === 1 ? (
                              <span className="inline-block w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-black leading-6">
                                1
                              </span>
                            ) : row.rank === 2 ? (
                              <span className="inline-block w-6 h-6 rounded-full bg-slate-400/20 text-slate-300 text-xs font-black leading-6">
                                2
                              </span>
                            ) : row.rank === 3 ? (
                              <span className="inline-block w-6 h-6 rounded-full bg-amber-700/20 text-amber-600 text-xs font-black leading-6">
                                3
                              </span>
                            ) : (
                              <span className="text-slate-500">#{row.rank}</span>
                            )}
                          </td>
                          <td className="py-3.5 px-3 sm:px-4 text-white font-bold flex items-center gap-1.5 sm:gap-2">
                            <span className="truncate max-w-[120px] sm:max-w-none">@{row.username}</span>
                            {row.isCurrentUser && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-rose-500/20 text-rose-400 border border-rose-500/30 shrink-0">
                                YOU
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-3 sm:px-4 text-right font-black text-rose-400">
                            {scoreValue} pts
                          </td>
                          <td className="hidden sm:table-cell py-3.5 px-4 text-right text-slate-400 font-mono">
                            {Math.round(
                              (row.timeTakenSeconds ?? row.totalTimeSeconds ?? 0) / 60
                            )}{" "}
                            mins
                          </td>
                          {isSeasonTab && (
                            <td className="hidden md:table-cell py-3.5 px-4 text-right text-slate-300 font-medium">
                              {row.completedWeeks} / 6
                            </td>
                          )}
                          <td className="py-3.5 px-3 sm:px-4 text-right">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                isPassing
                                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                  : "bg-slate-800 text-slate-400"
                              }`}
                            >
                              {isPassing ? "QUALIFIER" : "PARTICIPANT"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Sticky Bottom Navigation Bar (app-grade mobile ergonomics) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/90 px-4 py-2 flex items-center justify-around shadow-2xl">
        <Link
          href="/dashboard"
          className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-slate-200 text-[10px] font-medium py-1 px-3 transition-colors"
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
          className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-slate-200 text-[10px] font-medium py-1 px-3 transition-colors"
        >
          <BookMarked className="w-5 h-5" />
          <span>Notebook</span>
        </Link>
        <Link
          href="/leaderboard"
          className="flex flex-col items-center gap-0.5 text-rose-400 text-[10px] font-bold py-1 px-3"
        >
          <Trophy className="w-5 h-5" />
          <span>Ranks</span>
        </Link>
      </nav>
    </div>
  );
}

export default function LeaderboardPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
          Loading Leaderboard...
        </div>
      }
    >
      <LeaderboardPageContent />
    </React.Suspense>
  );
}
