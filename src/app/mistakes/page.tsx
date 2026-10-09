"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  BookMarked,
  Star,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Play,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  Filter,
  Trash2,
  Sparkles,
  Info,
  Layers,
  Award,
  Home,
  BookOpen,
  Zap,
  Trophy,
} from "lucide-react";

interface Option {
  id: string;
  optionKey: string;
  optionText: string;
  isCorrect?: boolean;
}

interface Question {
  id: string;
  track: string;
  weekNumber: number;
  domain: string;
  topic: string;
  questionType: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "TRUE_FALSE";
  questionText: string;
  explanation: string;
  options: Option[];
  isBookmarked?: boolean;
}

interface MistakeItem {
  questionId: string;
  question: Question;
  mistakeCount: number;
  isResolved: boolean;
  lastSelectedOptions: string[];
}

interface BookmarkItem {
  bookmarkId: string;
  createdAt: string;
  question: Question;
}

export default function MistakesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"MISTAKES" | "BOOKMARKS">("MISTAKES");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeMistakes, setActiveMistakes] = useState<MistakeItem[]>([]);
  const [resolvedMistakes, setResolvedMistakes] = useState<MistakeItem[]>([]);
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);

  // Filter States
  const [selectedWeek, setSelectedWeek] = useState<string>("");
  const [selectedDomain, setSelectedDomain] = useState<string>("");
  const [showResolved, setShowResolved] = useState(false);

  // Retest Drill Mode State
  const [isDrillMode, setIsDrillMode] = useState(false);
  const [drillQuestions, setDrillQuestions] = useState<Question[]>([]);
  const [drillIndex, setDrillIndex] = useState(0);
  const [drillAnswers, setDrillAnswers] = useState<string[]>([]);
  const [drillRevealed, setDrillRevealed] = useState(false);
  const [drillScore, setDrillScore] = useState({ correct: 0, total: 0 });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Fetch Mistakes
      const mRes = await fetch("/api/mistakes");
      const mData = await mRes.json();

      // 2. Fetch Bookmarks
      const bRes = await fetch("/api/bookmarks");
      const bData = await bRes.json();

      if (mRes.ok && mData.success) {
        setActiveMistakes(mData.activeMistakes || []);
        setResolvedMistakes(mData.resolvedMistakes || []);
      } else {
        setError(mData.error || "Failed to load mistake notebook.");
      }

      if (bRes.ok && bData.success) {
        setBookmarks(bData.bookmarks || []);
      }
    } catch (err) {
      console.error("Error loading notebook data:", err);
      setError("Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Toggle Bookmark
  const handleToggleBookmark = async (qId: string) => {
    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: qId }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(data.isBookmarked ? "Question added to Starred Bookmarks." : "Question removed from bookmarks.");
        loadData();
      }
    } catch {
      showToast("Error toggling bookmark.");
    }
  };

  // Mark mistake as resolved / cleared
  const handleResolveMistake = async (qId: string) => {
    try {
      const res = await fetch(`/api/mistakes?questionId=${qId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Mistake marked as Mastered!");
        loadData();
      }
    } catch {
      showToast("Error clearing mistake.");
    }
  };

  // Start Retest Drill
  const startRetestDrill = (questionsToDrill: Question[]) => {
    if (questionsToDrill.length === 0) return;

    const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
    const preparedQuestions = questionsToDrill.map((q) => {
      const shuffledOpts = [...q.options];
      for (let i = shuffledOpts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledOpts[i], shuffledOpts[j]] = [shuffledOpts[j], shuffledOpts[i]];
      }
      return {
        ...q,
        options: shuffledOpts.map((opt, idx) => ({
          ...opt,
          optionKey: OPTION_LETTERS[idx] || String.fromCharCode(65 + idx),
        })),
      };
    });

    // Shuffle drill questions sequence too
    for (let i = preparedQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [preparedQuestions[i], preparedQuestions[j]] = [preparedQuestions[j], preparedQuestions[i]];
    }

    setDrillQuestions(preparedQuestions);
    setDrillIndex(0);
    setDrillAnswers([]);
    setDrillRevealed(false);
    setDrillScore({ correct: 0, total: 0 });
    setIsDrillMode(true);
  };

  // Handle Answer in Drill Mode
  const handleSelectDrillOption = (key: string) => {
    if (drillRevealed) return;
    const currentQ = drillQuestions[drillIndex];
    if (!currentQ) return;

    if (currentQ.questionType === "MULTIPLE_CHOICE") {
      if (drillAnswers.includes(key)) {
        setDrillAnswers(drillAnswers.filter((k) => k !== key));
      } else {
        setDrillAnswers([...drillAnswers, key]);
      }
    } else {
      setDrillAnswers([key]);
    }
  };

  const handleCheckDrillAnswer = async () => {
    if (drillAnswers.length === 0) return;
    setDrillRevealed(true);

    const currentQ = drillQuestions[drillIndex];
    if (!currentQ) return;

    const correctKeys = currentQ.options
      .filter((o) => o.isCorrect)
      .map((o) => o.optionKey)
      .sort();
    const sortedSelected = [...drillAnswers].sort();

    const isCorrect =
      sortedSelected.length === correctKeys.length &&
      sortedSelected.every((k, idx) => k === correctKeys[idx]);

    setDrillScore((prev) => ({
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      total: prev.total + 1,
    }));

    // Record answer in PostgreSQL
    try {
      const selectedOptionIds = currentQ.options
        .filter((o) => sortedSelected.includes(o.optionKey))
        .map((o) => o.id);

      await fetch("/api/mistakes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: currentQ.id,
          selectedOptionKeys: sortedSelected,
          selectedOptionIds,
          isCorrect,
        }),
      });

      if (isCorrect) {
        showToast("Correct! Question resolved and mastered.");
      }
    } catch (err) {
      console.warn("Failed to record drill result:", err);
    }
  };

  const handleNextDrillQuestion = () => {
    if (drillIndex < drillQuestions.length - 1) {
      setDrillIndex((prev) => prev + 1);
      setDrillAnswers([]);
      setDrillRevealed(false);
    } else {
      // Completed drill!
      if (drillScore.correct > 0) {
        confetti({ particleCount: 100, spread: 60 });
      }
    }
  };

  // Filtered lists
  const currentMistakesList = showResolved ? resolvedMistakes : activeMistakes;
  const filteredMistakes = currentMistakesList.filter((m) => {
    if (selectedWeek && m.question.weekNumber.toString() !== selectedWeek) return false;
    if (selectedDomain && m.question.domain !== selectedDomain) return false;
    return true;
  });

  const filteredBookmarks = bookmarks.filter((b) => {
    if (selectedWeek && b.question.weekNumber.toString() !== selectedWeek) return false;
    if (selectedDomain && b.question.domain !== selectedDomain) return false;
    return true;
  });

  // Unique domains for filters
  const allDomains = Array.from(
    new Set([
      ...activeMistakes.map((m) => m.question.domain),
      ...resolvedMistakes.map((m) => m.question.domain),
      ...bookmarks.map((b) => b.question.domain),
    ])
  ).sort();

  if (loading && !isDrillMode) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4 text-slate-400">
        <div className="w-8 h-8 border-3 border-rose-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium">Loading Mistake Notebook & Starred Questions...</p>
      </div>
    );
  }

  // DRILL MODE VIEW
  if (isDrillMode) {
    const isFinished = drillIndex >= drillQuestions.length;
    const currentQ = drillQuestions[drillIndex];
    const correctKeys = (currentQ?.options || [])
      .filter((o) => o.isCorrect)
      .map((o) => o.optionKey)
      .sort();

    const isCurrentCorrect =
      drillRevealed &&
      drillAnswers.length === correctKeys.length &&
      [...drillAnswers].sort().every((k, idx) => k === correctKeys[idx]);

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-rose-300 shadow-2xl animate-in fade-in">
            {toastMessage}
          </div>
        )}

        <header className="border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setIsDrillMode(false);
                  loadData();
                }}
                className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-slate-700/60"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-black px-2.5 py-1 rounded-md bg-rose-500/20 text-rose-400 border border-rose-500/30">
                RETEST DRILL &bull; QUESTION {drillIndex + 1} OF {drillQuestions.length}
              </span>
            </div>

            <div className="text-xs font-bold text-slate-300">
              Score: <span className="text-emerald-400">{drillScore.correct}</span> / {drillScore.total}
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto w-full px-4 py-8 flex-1 flex flex-col justify-between space-y-6">
          {isFinished ? (
            <div className="max-w-md mx-auto my-auto p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-6 shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <Award className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black text-white">Retest Drill Completed!</h2>
              <p className="text-xs text-slate-400">
                You successfully answered {drillScore.correct} out of {drillQuestions.length} questions correctly.
              </p>
              <button
                onClick={() => {
                  setIsDrillMode(false);
                  loadData();
                }}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-rose-600 hover:bg-rose-500 text-white transition-colors"
              >
                Return to Notebook
              </button>
            </div>
          ) : currentQ ? (
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>
                    Week {currentQ.weekNumber} &bull; {currentQ.domain}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold text-[11px]">
                    {currentQ.questionType.replace("_", " ")}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                  {currentQ.questionText}
                </h2>
              </div>

              <div className="space-y-3">
                {currentQ.options.map((opt) => {
                  const isSelected = drillAnswers.includes(opt.optionKey);
                  const isOptionCorrect = opt.isCorrect;
                  const displayLetter = opt.optionKey;

                  let cardStyle =
                    "bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700";
                  let badgeStyle = "bg-slate-800 text-slate-400 border border-slate-700";

                  if (drillRevealed) {
                    if (isOptionCorrect) {
                      cardStyle = "bg-emerald-950/40 border-emerald-500/80 text-emerald-200";
                      badgeStyle = "bg-emerald-500 text-white font-bold";
                    } else if (isSelected && !isOptionCorrect) {
                      cardStyle = "bg-rose-950/40 border-rose-500/80 text-rose-200";
                      badgeStyle = "bg-rose-500 text-white font-bold";
                    }
                  } else if (isSelected) {
                    cardStyle = "bg-rose-950/40 border-rose-500 text-white";
                    badgeStyle = "bg-rose-500 text-white font-bold";
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectDrillOption(opt.optionKey)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-4 ${cardStyle}`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${badgeStyle}`}>
                        {displayLetter}
                      </div>
                      <span className="text-sm font-medium pt-0.5 flex-1">{opt.optionText}</span>
                      {drillRevealed && isOptionCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                      {drillRevealed && isSelected && !isOptionCorrect && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {!drillRevealed ? (
                <button
                  onClick={handleCheckDrillAnswer}
                  disabled={drillAnswers.length === 0}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-xs bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center gap-2 transition-all disabled:opacity-40"
                >
                  <span>Check Answer & Verify Resolution</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${isCurrentCorrect ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"}`}>
                      {isCurrentCorrect ? "Mastered! Mistake Resolved" : "Still Missed"}
                    </span>
                    <span className="text-xs text-slate-400 font-bold">
                      Correct Key(s): {correctKeys.join(", ")}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 font-mono leading-relaxed pl-2 border-l-2 border-rose-500">
                    {currentQ.explanation}
                  </div>
                </div>
              )}
            </div>
          ) : null}

          {/* Drill Navigation */}
          {!isFinished && (
            <div className="pt-6 border-t border-slate-800 flex justify-end">
              {drillRevealed && (
                <button
                  onClick={handleNextDrillQuestion}
                  className="py-2.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-2"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </main>
      </div>
    );
  }

  // MAIN NOTEBOOK VIEW
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-rose-500 selection:text-white">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-rose-300 shadow-2xl animate-in fade-in">
          {toastMessage}
        </div>
      )}

      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              href="/dashboard"
              className="p-1.5 sm:p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-slate-700/60"
            >
              <ChevronLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center font-black text-white italic text-xs sm:text-sm shrink-0">
                N
              </div>
              <div>
                <h1 className="font-extrabold text-sm sm:text-base tracking-tight text-white leading-tight">
                  <span className="sm:hidden">Mistake Notebook</span>
                  <span className="hidden sm:inline">Mistake Notebook & Starred Bank</span>
                </h1>
                <p className="text-[10px] sm:text-[11px] text-slate-400 hidden sm:block">Targeted Weakness Remediation</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {activeTab === "MISTAKES" && filteredMistakes.length > 0 && (
              <button
                onClick={() => startRetestDrill(filteredMistakes.map((m) => m.question))}
                className="py-1.5 px-2.5 sm:px-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-rose-950/40 transition-all shrink-0"
              >
                <Play className="w-3.5 h-3.5 fill-white shrink-0" />
                <span>
                  <span className="hidden sm:inline">Retest Mistakes </span>
                  <span className="sm:hidden">Retest </span>
                  ({filteredMistakes.length})
                </span>
              </button>
            )}

            {activeTab === "BOOKMARKS" && filteredBookmarks.length > 0 && (
              <button
                onClick={() => startRetestDrill(filteredBookmarks.map((b) => b.question))}
                className="py-1.5 px-2.5 sm:px-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-amber-950/40 transition-all shrink-0"
              >
                <Play className="w-3.5 h-3.5 fill-white shrink-0" />
                <span>
                  <span className="hidden sm:inline">Drill Bookmarks </span>
                  <span className="sm:hidden">Drill </span>
                  ({filteredBookmarks.length})
                </span>
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 pb-24 md:pb-8">
        {/* KPI Metric Summary Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3.5 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30 shrink-0">
              <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-rose-400">{activeMistakes.length}</div>
              <div className="text-[11px] sm:text-xs text-slate-400 font-medium">Unresolved Weaknesses</div>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3.5 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shrink-0">
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-emerald-400">{resolvedMistakes.length}</div>
              <div className="text-[11px] sm:text-xs text-slate-400 font-medium">Mastered / Retested</div>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3.5 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 shrink-0">
              <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-amber-400/20" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-amber-400">{bookmarks.length}</div>
              <div className="text-[11px] sm:text-xs text-slate-400 font-medium">Starred Questions</div>
            </div>
          </div>
        </div>

        {/* Tab & Filter Header */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-1 sm:gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("MISTAKES")}
              className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${
                activeTab === "MISTAKES"
                  ? "bg-rose-600 text-white shadow-md shadow-rose-950/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <BookMarked className="w-3.5 h-3.5 shrink-0" />
              <span>Mistakes ({activeMistakes.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("BOOKMARKS")}
              className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${
                activeTab === "BOOKMARKS"
                  ? "bg-amber-600 text-white shadow-md shadow-amber-950/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Star className="w-3.5 h-3.5 shrink-0" />
              <span>Starred ({bookmarks.length})</span>
            </button>
          </div>

          {/* Drill Filters */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            {/* Week Filter */}
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-rose-500"
            >
              <option value="">All Weeks</option>
              {[1, 2, 3, 4, 5, 6].map((w) => (
                <option key={w} value={w.toString()}>
                  Week {w}
                </option>
              ))}
            </select>

            {/* Domain Filter */}
            {allDomains.length > 0 && (
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="bg-slate-900 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-rose-500 max-w-xs"
              >
                <option value="">All Domains</option>
                {allDomains.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            )}

            {/* Show Mastered Toggle for Mistakes */}
            {activeTab === "MISTAKES" && (
              <button
                onClick={() => setShowResolved(!showResolved)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                  showResolved
                    ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                {showResolved ? "Showing Mastered" : "View Mastered"}
              </button>
            )}
          </div>
        </div>

        {/* Tab 1: Mistake Notebook Content */}
        {activeTab === "MISTAKES" && (
          <div className="space-y-4">
            {filteredMistakes.length === 0 ? (
              <div className="text-center py-16 p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-base font-bold text-white">No Unresolved Mistakes!</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  Excellent work! You either haven&apos;t recorded any mistakes in this filter range, or you have mastered them all through practice.
                </p>
                <Link
                  href="/practice"
                  className="inline-block mt-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
                >
                  Start Practice Drill
                </Link>
              </div>
            ) : (
              filteredMistakes.map((item) => {
                const q = item.question;
                const correctKeys = q.options
                  .filter((o) => o.isCorrect)
                  .map((o) => o.optionKey);

                return (
                  <div
                    key={q.id}
                    className="p-4 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 space-y-4 transition-all shadow-md"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="px-2.5 py-0.5 rounded-md bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold">
                          Week {q.weekNumber}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 font-semibold">
                          {q.domain} &bull; {q.topic}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-800/60 text-slate-400 text-[11px]">
                          {q.questionType.replace("_", " ")}
                        </span>
                        {item.mistakeCount > 1 && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 font-bold text-[11px]">
                            Missed {item.mistakeCount}x
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleToggleBookmark(q.id)}
                          title="Star / Bookmark"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-amber-400 transition-colors"
                        >
                          <Star className={`w-4 h-4 ${q.isBookmarked ? "fill-amber-400 text-amber-400" : ""}`} />
                        </button>
                        <button
                          onClick={() => handleResolveMistake(q.id)}
                          title="Mark as Mastered / Resolve"
                          className="p-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-400 border border-emerald-500/30 transition-colors text-xs font-semibold flex items-center gap-1 px-2.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Mark Mastered</span>
                        </button>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white leading-relaxed">
                      {q.questionText}
                    </h3>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt) => {
                        const isCorrectOpt = opt.isCorrect;
                        const wasSelected = item.lastSelectedOptions?.includes(opt.optionKey);

                        let optBg = "bg-slate-950/60 border-slate-800/80 text-slate-300";
                        if (isCorrectOpt) {
                          optBg = "bg-emerald-950/30 border-emerald-500/60 text-emerald-300";
                        } else if (wasSelected) {
                          optBg = "bg-rose-950/30 border-rose-500/60 text-rose-300";
                        }

                        return (
                          <div
                            key={opt.id}
                            className={`p-3 rounded-xl border flex items-start gap-2.5 ${optBg}`}
                          >
                            <span className="font-bold shrink-0">{opt.optionKey}.</span>
                            <span className="leading-snug">{opt.optionText}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Huawei Official Explanation */}
                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1">
                      <div className="text-slate-400 font-semibold flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5 text-sky-400" />
                        <span>Official Explanation & Reference:</span>
                      </div>
                      <p className="pl-5 text-slate-400 font-mono text-[12px] leading-relaxed">
                        {q.explanation}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Tab 2: Starred Bookmarks Content */}
        {activeTab === "BOOKMARKS" && (
          <div className="space-y-4">
            {filteredBookmarks.length === 0 ? (
              <div className="text-center py-16 p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 space-y-3">
                <Star className="w-12 h-12 text-amber-400 mx-auto" />
                <h3 className="text-base font-bold text-white">No Starred Questions Found</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  You can star challenging questions at any time during Practice Drills or Post-Exam Reviews to build your personal high-yield revision deck.
                </p>
                <Link
                  href="/practice"
                  className="inline-block mt-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
                >
                  Browse Practice Questions
                </Link>
              </div>
            ) : (
              filteredBookmarks.map((item) => {
                const q = item.question;
                return (
                  <div
                    key={q.id}
                    className="p-4 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 space-y-4 transition-all shadow-md"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold">
                          Week {q.weekNumber}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 font-semibold">
                          {q.domain} &bull; {q.topic}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-800/60 text-slate-400 text-[11px]">
                          {q.questionType.replace("_", " ")}
                        </span>
                      </div>

                      <button
                        onClick={() => handleToggleBookmark(q.id)}
                        title="Remove bookmark"
                        className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-rose-500/20 hover:text-rose-400 transition-colors"
                      >
                        <Star className="w-4 h-4 fill-amber-400" />
                      </button>
                    </div>

                    <h3 className="text-base font-bold text-white leading-relaxed">
                      {q.questionText}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt) => (
                        <div
                          key={opt.id}
                          className={`p-3 rounded-xl border flex items-start gap-2.5 ${
                            opt.isCorrect
                              ? "bg-emerald-950/30 border-emerald-500/60 text-emerald-300 font-semibold"
                              : "bg-slate-950/60 border-slate-800/80 text-slate-300"
                          }`}
                        >
                          <span className="font-bold shrink-0">{opt.optionKey}.</span>
                          <span className="leading-snug">{opt.optionText}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1">
                      <div className="text-slate-400 font-semibold flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5 text-amber-400" />
                        <span>Huawei Technical Explanation:</span>
                      </div>
                      <p className="pl-5 text-slate-400 font-mono text-[12px] leading-relaxed">
                        {q.explanation}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
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
          className="flex flex-col items-center gap-0.5 text-rose-400 text-[10px] font-bold py-1 px-3"
        >
          <BookMarked className="w-5 h-5" />
          <span>Notebook</span>
          {activeMistakes.length > 0 && (
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
