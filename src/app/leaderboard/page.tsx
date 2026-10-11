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
  Crown,
  Zap,
  Home,
  BookOpen,
  BookMarked,
  ArrowUp,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { EulerSigma } from "@/components/EulerSigma";

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

  return (
    <div className="min-h-screen bg-white text-[#100f3e] flex flex-col justify-between selection:bg-transparent">
      {/* Top Gamified Nav */}
      <Navbar userTrack={track} />

      {/* Main Leaderboard Body */}
      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 flex-1 space-y-8">
        {/* League Header Card */}
        <div className="bg-[#ddf4ff] rounded-3xl p-6 sm:p-8 border-2 border-[#1cb0f6]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <span className="text-xs font-black uppercase tracking-wider text-[#1cb0f6] bg-white px-3 py-1 rounded-full border border-[#1cb0f6]/20">
              {track} Track League
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#100f3e] tracking-tight mt-2">
              Emerald League
            </h1>
            <p className="text-sm font-bold text-[#777777] mt-1 max-w-md">
              Top 10 contestants at the end of the round advance to the Regional Qualifier finals!
            </p>
          </div>
          <EulerSigma mood="celebrating" size={100} className="shrink-0" />
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#e5e5e5] pb-4">
          <div className="flex flex-wrap gap-2">
            {[
              { id: "season", label: "🏆 Season Cumulative" },
              { id: "1", label: "Week 01" },
              { id: "2", label: "Week 02" },
              { id: "3", label: "Week 03" },
              { id: "4", label: "Week 04" },
              { id: "5", label: "Week 05" },
              { id: "6", label: "⚡ Mock Exam" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedWeek(tab.id)}
                className={`py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  selectedWeek === tab.id
                    ? "bg-[#7c3aed] text-white shadow-[0_3px_0_#5b21b6]"
                    : "bg-white text-[#777777] hover:text-[#100f3e] border-2 border-[#e5e5e5]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-xs font-bold text-[#777777] flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Tie-break: Fastest Time</span>
          </div>
        </div>

        {/* Current User Standing Banner */}
        {myRank !== null && (
          <div className="p-4 sm:p-5 rounded-2xl bg-[#f3e8ff] border-2 border-[#7c3aed] shadow-[0_4px_0_#5b21b6] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white text-[#7c3aed] flex items-center justify-center font-black text-lg border-2 border-[#7c3aed]">
                #{myRank}
              </div>
              <div>
                <span className="text-xs font-black uppercase text-[#7c3aed] flex items-center gap-1">
                  <ArrowUp className="w-3.5 h-3.5" />
                  Promotion Zone Active
                </span>
                <div className="text-base font-black text-[#100f3e]">
                  Rank #{myRank} of {standings.length} Contestants in {track}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs font-black uppercase text-[#7c3aed]">Score</div>
              <div className="text-2xl font-black text-[#100f3e]">{myScore} pts</div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4 text-[#777777]">
            <EulerSigma mood="thinking" size={80} />
            <div className="w-8 h-8 border-4 border-[#7c3aed] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-bold text-[#100f3e]">Calculating league rankings...</p>
          </div>
        ) : standings.length === 0 ? (
          <div className="p-12 rounded-3xl bg-[#f7f7f7] border-2 border-[#e5e5e5] text-center space-y-4">
            <Trophy className="w-12 h-12 text-[#ffc700] mx-auto" />
            <h3 className="text-xl font-black text-[#100f3e]">No Submissions Yet!</h3>
            <p className="text-sm font-bold text-[#777777] max-w-sm mx-auto">
              Be the first contestant to take the arena round and claim the #1 spot on the podium!
            </p>
            <Link
              href={`/arena?week=${selectedWeek === "season" ? 1 : selectedWeek}`}
              className="btn-tactile-primary py-3.5 px-6 text-xs inline-block"
            >
              Start Arena Now
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Top 3 Podium */}
            {standings.length >= 3 && !searchQuery && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 items-end">
                {/* 2nd Place Silver */}
                <div className="order-2 sm:order-1 p-5 rounded-3xl bg-white border-2 border-[#e5e5e5] shadow-[0_4px_0_#e5e5e5] text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-[#f7f7f7] border-2 border-[#d0d0d0] text-[#777777] font-black text-lg flex items-center justify-center mx-auto">
                    🥈
                  </div>
                  <div className="font-black text-[#100f3e] text-base truncate">
                    @{standings[1].username}
                  </div>
                  <div className="text-2xl font-black text-[#1cb0f6]">
                    {standings[1].score ?? standings[1].totalScore} pts
                  </div>
                  <div className="text-xs font-bold text-[#777777]">
                    {Math.round((standings[1].timeTakenSeconds ?? standings[1].totalTimeSeconds ?? 0) / 60)} mins
                  </div>
                </div>

                {/* 1st Place Gold */}
                <div className="order-1 sm:order-2 p-6 rounded-3xl bg-[#fff2d6] border-2 border-[#ff9600] shadow-[0_6px_0_#e58500] text-center space-y-2 sm:-translate-y-2">
                  <div className="w-14 h-14 rounded-2xl bg-[#ff9600] text-white font-black text-xl flex items-center justify-center mx-auto shadow-[0_2px_0_#d97700]">
                    👑
                  </div>
                  <div className="font-black text-[#100f3e] text-lg truncate">
                    @{standings[0].username}
                  </div>
                  <div className="text-3xl font-black text-[#ff9600]">
                    {standings[0].score ?? standings[0].totalScore} pts
                  </div>
                  <div className="text-xs font-bold text-[#777777]">
                    {Math.round((standings[0].timeTakenSeconds ?? standings[0].totalTimeSeconds ?? 0) / 60)} mins
                  </div>
                </div>

                {/* 3rd Place Bronze */}
                <div className="order-3 sm:order-3 p-5 rounded-3xl bg-white border-2 border-[#e5e5e5] shadow-[0_4px_0_#e5e5e5] text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-[#f7f7f7] border-2 border-[#e5e5e5] text-[#af623c] font-black text-lg flex items-center justify-center mx-auto">
                    🥉
                  </div>
                  <div className="font-black text-[#100f3e] text-base truncate">
                    @{standings[2].username}
                  </div>
                  <div className="text-2xl font-black text-[#af623c]">
                    {standings[2].score ?? standings[2].totalScore} pts
                  </div>
                  <div className="text-xs font-bold text-[#777777]">
                    {Math.round((standings[2].timeTakenSeconds ?? standings[2].totalTimeSeconds ?? 0) / 60)} mins
                  </div>
                </div>
              </div>
            )}

            {/* Standings Table */}
            <div className="rounded-3xl border-2 border-[#e5e5e5] bg-white shadow-[0_6px_0_#e5e5e5] overflow-hidden">
              {/* Search bar */}
              <div className="p-4 border-b-2 border-[#e5e5e5] flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 text-[#777777] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search contestant..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#f7f7f7] border-2 border-[#e5e5e5] rounded-xl pl-10 pr-3 py-2 text-xs font-bold text-[#100f3e] focus:outline-none focus:border-[#1cb0f6]"
                  />
                </div>
                <span className="text-xs font-bold text-[#777777]">
                  {filteredStandings.length} contestants
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b-2 border-[#e5e5e5] bg-[#f7f7f7] text-[#777777] font-black uppercase tracking-wider text-[11px]">
                      <th className="py-3.5 px-4 w-16 text-center">Rank</th>
                      <th className="py-3.5 px-4">Contestant</th>
                      <th className="py-3.5 px-4 text-right">Score</th>
                      <th className="hidden sm:table-cell py-3.5 px-4 text-right">Time</th>
                      <th className="py-3.5 px-4 text-right">League Zone</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-[#f1f1f1] font-bold">
                    {filteredStandings.map((row) => {
                      const scoreValue = row.score ?? row.totalScore ?? 0;
                      const isTop10 = row.rank <= 10;

                      return (
                        <tr
                          key={row.userId}
                          className={`transition-colors ${
                            row.isCurrentUser
                              ? "bg-[#ddf4ff] border-l-4 border-[#1cb0f6]"
                              : "hover:bg-[#f7fbff]"
                          }`}
                        >
                          <td className="py-4 px-4 text-center">
                            <span
                              className={`w-7 h-7 rounded-xl font-black text-xs inline-flex items-center justify-center ${
                                row.rank === 1
                                  ? "bg-[#ff9600] text-white"
                                  : row.rank === 2
                                  ? "bg-[#d0d0d0] text-white"
                                  : row.rank === 3
                                  ? "bg-[#af623c] text-white"
                                  : "text-[#777777]"
                              }`}
                            >
                              {row.rank}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-[#100f3e] font-black flex items-center gap-2">
                            <span>@{row.username}</span>
                            {row.isCurrentUser && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#1cb0f6] text-white">
                                YOU
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-4 text-right font-black text-base text-[#7c3aed]">
                            {scoreValue} pts
                          </td>
                          <td className="hidden sm:table-cell py-4 px-4 text-right text-[#777777]">
                            {Math.round(
                              (row.timeTakenSeconds ?? row.totalTimeSeconds ?? 0) / 60
                            )}{" "}
                            mins
                          </td>
                          <td className="py-4 px-4 text-right">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                                isTop10
                                  ? "bg-[#f3e8ff] text-[#7c3aed]"
                                  : "bg-[#f7f7f7] text-[#777777]"
                              }`}
                            >
                              {isTop10 ? "Promotion" : "Safe Zone"}
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
    </div>
  );
}

export default function LeaderboardPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center font-bold text-[#777777]">
          Loading Leaderboard...
        </div>
      }
    >
      <LeaderboardPageContent />
    </React.Suspense>
  );
}
