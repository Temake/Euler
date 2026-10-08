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
} from "lucide-react";

interface Standing {
  rank: number;
  userId: string;
  username: string;
  track: string;
  weekNumber?: number;
  score?: number;
  totalScore?: number;
  timeTakenSeconds?: number;
  totalTimeSeconds?: number;
  completedWeeks?: number;
}

function LeaderboardPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultWeek = searchParams.get("week") || "1";

  const [selectedWeek, setSelectedWeek] = useState<string>(defaultWeek);
  const [standings, setStandings] = useState<Standing[]>([]);
  const [track, setTrack] = useState<string>("NETWORK");
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-slate-700/60"
            >
              <ChevronLeft className="w-4 h-4" />
            </Link>

            <span className="font-extrabold text-lg text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span>{track} Track Arena Standings</span>
            </span>
          </div>

          <Link
            href="/dashboard"
            className="text-xs font-bold text-slate-400 hover:text-white transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </header>

      {/* Main Leaderboard Body */}
      <main className="max-w-5xl mx-auto w-full px-4 py-8 flex-1 space-y-8">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {[
              { id: "1", label: "Week 01" },
              { id: "2", label: "Week 02" },
              { id: "3", label: "Week 03" },
              { id: "4", label: "Week 04" },
              { id: "5", label: "Week 05" },
              { id: "6", label: "Mock Exam" },
              { id: "season", label: "Season Overall" },
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

          <div className="text-xs text-slate-400 font-medium">
            Tie-Breaker: <span className="text-slate-300 font-bold">Fastest Completion Time</span>
          </div>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4 text-slate-400">
            <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm">Calculating Regional Standings...</p>
          </div>
        ) : standings.length === 0 ? (
          <div className="p-12 rounded-3xl bg-slate-900/50 border border-slate-800 text-center space-y-3">
            <Trophy className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No Official Attempts Yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              Be the first contestant from the {track} track to complete this week&apos;s Arena quiz and claim the #1 spot!
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
            {standings.length >= 3 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {/* 2nd Place */}
                <div className="order-2 sm:order-1 p-6 rounded-2xl bg-gradient-to-b from-slate-800/80 to-slate-900 border border-slate-700/80 text-center space-y-2 shadow-lg">
                  <div className="w-10 h-10 rounded-full bg-slate-400/20 text-slate-300 font-black text-sm flex items-center justify-center mx-auto border border-slate-400/40">
                    2
                  </div>
                  <div className="font-bold text-white text-base truncate">
                    @{standings[1].username}
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

                {/* 1st Place (Gold) */}
                <div className="order-1 sm:order-2 p-6 rounded-2xl bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/50 text-center space-y-2 shadow-xl shadow-amber-950/20 sm:-translate-y-2">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 font-black text-base flex items-center justify-center mx-auto border border-amber-500/40">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div className="font-bold text-white text-lg truncate">
                    @{standings[0].username}
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

                {/* 3rd Place */}
                <div className="order-3 sm:order-3 p-6 rounded-2xl bg-gradient-to-b from-slate-800/80 to-slate-900 border border-slate-700/80 text-center space-y-2 shadow-lg">
                  <div className="w-10 h-10 rounded-full bg-amber-700/20 text-amber-600 font-black text-sm flex items-center justify-center mx-auto border border-amber-700/40">
                    3
                  </div>
                  <div className="font-bold text-white text-base truncate">
                    @{standings[2].username}
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

            {/* Standings Table */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-lg">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="py-3.5 px-4 w-16 text-center">Rank</th>
                    <th className="py-3.5 px-4">Contestant</th>
                    <th className="py-3.5 px-4 text-right">Score</th>
                    <th className="py-3.5 px-4 text-right">Time Taken</th>
                    {selectedWeek === "season" && (
                      <th className="py-3.5 px-4 text-right">Completed</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {standings.map((row) => (
                    <tr
                      key={row.userId}
                      className="hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-3.5 px-4 text-center font-bold">
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
                      <td className="py-3.5 px-4 text-white font-bold">
                        @{row.username}
                      </td>
                      <td className="py-3.5 px-4 text-right font-black text-rose-400">
                        {row.score ?? row.totalScore} pts
                      </td>
                      <td className="py-3.5 px-4 text-right text-slate-400 font-mono">
                        {Math.round(
                          (row.timeTakenSeconds ?? row.totalTimeSeconds ?? 0) / 60
                        )}{" "}
                        mins
                      </td>
                      {selectedWeek === "season" && (
                        <td className="py-3.5 px-4 text-right text-slate-300">
                          {row.completedWeeks} / 6 weeks
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
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
