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
  Play,
  ArrowRight,
  ChevronLeft,
  Filter,
  Info,
  Award,
  BookOpen,
  Check,
  X,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { EulerSigma } from "@/components/EulerSigma";

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

      const [mRes, bRes] = await Promise.all([
        fetch("/api/mistakes"),
        fetch("/api/bookmarks"),
      ]);
      const mData = await mRes.json();
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

  const handleToggleBookmark = async (qId: string) => {
    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: qId }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(data.isBookmarked ? "Starred for revision!" : "Removed from starred list.");
        loadData();
      }
    } catch {
      showToast("Error toggling bookmark.");
    }
  };

  const handleResolveMistake = async (qId: string) => {
    try {
      const res = await fetch(`/api/mistakes?questionId=${qId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Marked as Mastered!");
        loadData();
      }
    } catch {
      showToast("Error clearing mistake.");
    }
  };

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
        showToast("Correct! Marked as Mastered.");
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
      if (drillScore.correct > 0) {
        confetti({ particleCount: 100, spread: 60 });
      }
    }
  };

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

  const allDomains = Array.from(
    new Set([
      ...activeMistakes.map((m) => m.question.domain),
      ...resolvedMistakes.map((m) => m.question.domain),
      ...bookmarks.map((b) => b.question.domain),
    ])
  ).sort();

  if (loading && !isDrillMode) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 text-[#777777]">
        <EulerSigma mood="thinking" size={90} />
        <div className="w-8 h-8 border-4 border-[#7c3aed] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-bold text-[#100f3e]">Loading mistake notebook...</p>
      </div>
    );
  }

  // RETEST DRILL VIEW
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
      <div className="min-h-screen bg-white text-[#100f3e] flex flex-col justify-between selection:bg-transparent">
        {toastMessage && (
          <div className="fixed bottom-24 right-6 z-50 px-4 py-3 rounded-2xl bg-[#100f3e] text-white text-xs font-black shadow-2xl animate-in fade-in">
            {toastMessage}
          </div>
        )}

        <header className="border-b-2 border-[#e5e5e5] bg-white sticky top-0 z-40 px-4 sm:px-8 py-3">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <button
              onClick={() => {
                setIsDrillMode(false);
                loadData();
              }}
              className="p-2 rounded-xl text-[#777777] hover:text-[#100f3e] hover:bg-[#f7f7f7]"
            >
              <X className="w-6 h-6 stroke-[2.5]" />
            </button>

            <span className="text-xs font-black uppercase tracking-wider text-[#ff4b4b] bg-[#ffdfe0] px-3 py-1 rounded-full">
              RETEST DRILL &bull; {drillIndex + 1} OF {drillQuestions.length}
            </span>

            <div className="text-xs font-black text-[#7c3aed] bg-[#f3e8ff] px-3 py-1 rounded-full">
              Score: {drillScore.correct} / {drillScore.total}
            </div>
          </div>
        </header>

        <main className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-8 flex-1 flex flex-col justify-between">
          {isFinished ? (
            <div className="max-w-md mx-auto my-auto p-8 rounded-3xl bg-white border-2 border-[#e5e5e5] shadow-[0_6px_0_#e5e5e5] text-center space-y-6">
              <EulerSigma mood="celebrating" size={120} className="mx-auto" />
              <h2 className="text-3xl font-black text-[#100f3e]">Drill Completed!</h2>
              <p className="text-sm font-bold text-[#777777]">
                You correctly answered {drillScore.correct} of {drillQuestions.length} questions and cleared them from your mistake deck!
              </p>
              <button
                onClick={() => {
                  setIsDrillMode(false);
                  loadData();
                }}
                className="btn-tactile-primary py-4 px-8 text-sm font-black w-full"
              >
                Return to Notebook
              </button>
            </div>
          ) : currentQ ? (
            <div className="space-y-6 select-none">
              <div className="flex items-start gap-4">
                <EulerSigma
                  mood={drillRevealed ? (isCurrentCorrect ? "celebrating" : "encouraging") : "thinking"}
                  size={70}
                  className="shrink-0"
                />
                <div className="flex-1 bg-white border-2 border-[#e5e5e5] rounded-3xl p-5 shadow-[0_4px_0_#e5e5e5]">
                  <span className="text-xs font-black uppercase text-[#ff4b4b]">
                    Week {currentQ.weekNumber} &bull; {currentQ.domain}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-[#100f3e] leading-snug mt-1">
                    {currentQ.questionText}
                  </h2>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                {currentQ.options.map((opt) => {
                  const isSelected = drillAnswers.includes(opt.optionKey);
                  const isOptionCorrect = opt.isCorrect;

                  let cardClass = "quiz-option-card";
                  if (drillRevealed) {
                    if (isOptionCorrect) cardClass += " correct";
                    else if (isSelected) cardClass += " incorrect";
                  } else if (isSelected) {
                    cardClass += " selected";
                  }

                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleSelectDrillOption(opt.optionKey)}
                      className={`${cardClass} p-4 sm:p-5 flex items-center gap-4`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl font-black text-sm flex items-center justify-center shrink-0 border-2 ${
                          drillRevealed && isOptionCorrect
                            ? "bg-[#7c3aed] border-[#7c3aed] text-white"
                            : drillRevealed && isSelected && !isOptionCorrect
                            ? "bg-[#ff4b4b] border-[#ff4b4b] text-white"
                            : isSelected
                            ? "bg-[#7c3aed] border-[#7c3aed] text-white"
                            : "bg-[#f7f7f7] border-[#e5e5e5] text-[#777777]"
                        }`}
                      >
                        {opt.optionKey}
                      </div>
                      <span className="text-base sm:text-lg font-bold leading-snug flex-1">
                        {opt.optionText}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </main>

        {/* Footer feedback */}
        {!isFinished && (
          <footer
            className={`border-t-2 py-4 px-4 sm:px-8 sticky bottom-0 z-40 ${
              drillRevealed
                ? isCurrentCorrect
                  ? "bg-[#f3e8ff] border-[#7c3aed]"
                  : "bg-[#ffdfe0] border-[#ff4b4b]"
                : "bg-white border-[#e5e5e5]"
            }`}
          >
            <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
              {drillRevealed ? (
                <div>
                  <h4
                    className={`text-base font-black ${
                      isCurrentCorrect ? "text-[#7c3aed]" : "text-[#ff4b4b]"
                    }`}
                  >
                    {isCurrentCorrect ? "Mastered!" : "Still Missed"}
                  </h4>
                  <p className="text-xs font-bold text-[#100f3e] max-w-md mt-0.5">
                    {currentQ?.explanation}
                  </p>
                </div>
              ) : (
                <span className="text-xs font-bold text-[#777777]">
                  Select an answer to verify
                </span>
              )}

              <div>
                {!drillRevealed ? (
                  <button
                    onClick={handleCheckDrillAnswer}
                    disabled={drillAnswers.length === 0}
                    className="btn-tactile-primary py-3.5 px-8 text-xs font-black"
                  >
                    Verify Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextDrillQuestion}
                    className="btn-tactile-primary py-3.5 px-8 text-xs font-black"
                  >
                    Next Question
                  </button>
                )}
              </div>
            </div>
          </footer>
        )}
      </div>
    );
  }

  // MAIN NOTEBOOK VIEW
  return (
    <div className="min-h-screen bg-white text-[#100f3e] flex flex-col justify-between selection:bg-transparent">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-[#100f3e] text-white text-xs font-black shadow-2xl animate-in fade-in">
          {toastMessage}
        </div>
      )}

      {/* Gamified Header */}
      <Navbar />

      <main className="max-w-5xl mx-auto w-full px-4 sm:px-8 py-8 flex-1 space-y-8">
        {/* Banner with Mascot */}
        <div className="bg-[#fff2d6] rounded-3xl p-6 sm:p-8 border-2 border-[#ff9600]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <span className="text-xs font-black uppercase tracking-wider text-[#ff9600] bg-white px-3 py-1 rounded-full border border-[#ff9600]/20">
              Personalized Review Chest
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#100f3e] tracking-tight mt-2">
              Mistakes Notebook &amp; Starred
            </h1>
            <p className="text-sm font-bold text-[#777777] mt-1 max-w-md">
              Drilling your past mistakes is the fastest way to turn weak areas into guaranteed points.
            </p>
          </div>
          <EulerSigma mood="thinking" size={100} className="shrink-0" />
        </div>

        {/* Action Header & Tabs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b-2 border-[#e5e5e5] pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("MISTAKES")}
              className={`py-3 px-5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "MISTAKES"
                  ? "bg-[#ff4b4b] text-white shadow-[0_3px_0_#ea2b2b]"
                  : "bg-white text-[#777777] hover:text-[#100f3e] border-2 border-[#e5e5e5]"
              }`}
            >
              Mistakes ({activeMistakes.length})
            </button>
            <button
              onClick={() => setActiveTab("BOOKMARKS")}
              className={`py-3 px-5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "BOOKMARKS"
                  ? "bg-[#ff9600] text-white shadow-[0_3px_0_#e58500]"
                  : "bg-white text-[#777777] hover:text-[#100f3e] border-2 border-[#e5e5e5]"
              }`}
            >
              Starred ({bookmarks.length})
            </button>
          </div>

          <div className="flex items-center gap-2">
            {activeTab === "MISTAKES" && filteredMistakes.length > 0 && (
              <button
                onClick={() => startRetestDrill(filteredMistakes.map((m) => m.question))}
                className="btn-tactile-primary py-3 px-6 text-xs font-black"
              >
                <Play className="w-4 h-4 fill-white mr-1.5" />
                <span>Drill All ({filteredMistakes.length})</span>
              </button>
            )}

            {activeTab === "BOOKMARKS" && filteredBookmarks.length > 0 && (
              <button
                onClick={() => startRetestDrill(filteredBookmarks.map((b) => b.question))}
                className="btn-tactile-primary py-3 px-6 text-xs font-black"
              >
                <Play className="w-4 h-4 fill-white mr-1.5" />
                <span>Drill Starred ({filteredBookmarks.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab 1: Mistakes List */}
        {activeTab === "MISTAKES" && (
          <div className="space-y-4">
            {filteredMistakes.length === 0 ? (
              <div className="text-center py-16 p-8 rounded-3xl bg-[#f7f7f7] border-2 border-[#e5e5e5] space-y-4">
                <EulerSigma mood="celebrating" size={90} className="mx-auto" />
                <h3 className="text-xl font-black text-[#100f3e]">No Unresolved Mistakes!</h3>
                <p className="text-sm font-bold text-[#777777] max-w-sm mx-auto">
                  Your mistake chest is completely clean. Keep taking practice drills and arena rounds!
                </p>
                <Link
                  href="/practice"
                  className="btn-tactile-primary py-3 px-6 text-xs inline-block"
                >
                  Start Practice Drill
                </Link>
              </div>
            ) : (
              filteredMistakes.map((item) => {
                const q = item.question;
                return (
                  <div
                    key={q.id}
                    className="p-6 rounded-3xl bg-white border-2 border-[#e5e5e5] shadow-[0_4px_0_#e5e5e5] space-y-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#ffdfe0] text-[#ff4b4b] font-black">
                          Week {q.weekNumber}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#f7f7f7] text-[#100f3e] font-bold">
                          {q.domain} &bull; {q.topic}
                        </span>
                        {item.mistakeCount > 1 && (
                          <span className="px-2 py-0.5 rounded-full bg-[#fff2d6] text-[#ff9600] font-black">
                            Missed {item.mistakeCount}x
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleBookmark(q.id)}
                          className="p-2 rounded-xl border-2 border-[#e5e5e5] text-[#777777] hover:text-[#ff9600]"
                        >
                          <Star className={`w-4 h-4 ${q.isBookmarked ? "fill-[#ff9600] text-[#ff9600]" : ""}`} />
                        </button>
                        <button
                          onClick={() => handleResolveMistake(q.id)}
                          className="btn-tactile-secondary py-2 px-3 text-xs"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                          <span>Mark Mastered</span>
                        </button>
                      </div>
                    </div>

                    <h3 className="text-base font-black text-[#100f3e]">
                      {q.questionText}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt) => (
                        <div
                          key={opt.id}
                          className={`p-3 rounded-2xl border-2 font-bold flex items-start gap-2 ${
                            opt.isCorrect
                              ? "bg-[#f3e8ff] border-[#7c3aed] text-[#100f3e]"
                              : item.lastSelectedOptions?.includes(opt.optionKey)
                              ? "bg-[#ffdfe0] border-[#ff4b4b] text-[#100f3e]"
                              : "bg-[#f7f7f7] border-[#e5e5e5] text-[#777777]"
                          }`}
                        >
                          <span className="font-black shrink-0">{opt.optionKey}.</span>
                          <span>{opt.optionText}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-2xl bg-[#ddf4ff] border-2 border-[#1cb0f6]/20 text-xs space-y-1">
                      <div className="text-[#100f3e] font-black flex items-center gap-1.5">
                        <Info className="w-4 h-4 text-[#1cb0f6]" />
                        <span>Technical Explanation:</span>
                      </div>
                      <p className="text-xs font-bold text-[#777777] leading-relaxed">
                        {q.explanation}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Tab 2: Bookmarks List */}
        {activeTab === "BOOKMARKS" && (
          <div className="space-y-4">
            {filteredBookmarks.length === 0 ? (
              <div className="text-center py-16 p-8 rounded-3xl bg-[#f7f7f7] border-2 border-[#e5e5e5] space-y-4">
                <Star className="w-12 h-12 text-[#ff9600] mx-auto" />
                <h3 className="text-xl font-black text-[#100f3e]">No Starred Questions</h3>
                <p className="text-sm font-bold text-[#777777] max-w-sm mx-auto">
                  Star challenging questions during practice to build your revision deck!
                </p>
              </div>
            ) : (
              filteredBookmarks.map((item) => {
                const q = item.question;
                return (
                  <div
                    key={q.id}
                    className="p-6 rounded-3xl bg-white border-2 border-[#e5e5e5] shadow-[0_4px_0_#e5e5e5] space-y-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#fff2d6] text-[#ff9600] font-black">
                          Week {q.weekNumber}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#f7f7f7] text-[#100f3e] font-bold">
                          {q.domain} &bull; {q.topic}
                        </span>
                      </div>

                      <button
                        onClick={() => handleToggleBookmark(q.id)}
                        className="p-2 rounded-xl bg-[#fff2d6] text-[#ff9600] border-2 border-[#ff9600]/30"
                      >
                        <Star className="w-4 h-4 fill-[#ff9600]" />
                      </button>
                    </div>

                    <h3 className="text-base font-black text-[#100f3e]">
                      {q.questionText}
                    </h3>

                    <div className="p-4 rounded-2xl bg-[#ddf4ff] border-2 border-[#1cb0f6]/20 text-xs space-y-1">
                      <div className="text-[#100f3e] font-black flex items-center gap-1.5">
                        <Info className="w-4 h-4 text-[#1cb0f6]" />
                        <span>Explanation:</span>
                      </div>
                      <p className="text-xs font-bold text-[#777777] leading-relaxed">
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
    </div>
  );
}
