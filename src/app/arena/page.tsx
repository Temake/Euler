"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Trophy,
  ArrowRight,
  ArrowLeft,
  ShieldAlert,
  Send,
  Zap,
  RotateCcw,
  BookOpen,
  Star,
  BookMarked,
  Info,
  ChevronDown,
  ChevronUp,
  Layers,
  Crown,
  Medal,
  X,
  Sparkles,
} from "lucide-react";

interface Option {
  id: string;
  optionKey: string;
  optionText: string;
  isCorrect?: boolean;
}

interface Question {
  id: string;
  domain: string;
  topic: string;
  questionType: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "TRUE_FALSE";
  questionText: string;
  options: Option[];
}

interface GradedResultItem {
  questionId: string;
  questionText?: string;
  questionType?: string;
  domain?: string;
  topic?: string;
  options?: Option[];
  isCorrect: boolean;
  correctKeys: string[];
  selectedKeys: string[];
  explanation: string;
}

function ArenaPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const weekParam = searchParams.get("week") || "1";
  const weekNumber = parseInt(weekParam, 10);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string[]>>({});
  const [selectedOptionIds, setSelectedOptionIds] = useState<Record<string, string[]>>({});
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(30 * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [alreadyCompletedNotice, setAlreadyCompletedNotice] = useState<any>(null);

  // Anti-Cheating & Focus Detection (Phase 6)
  const [tabSwitchCount, setTabSwitchCount] = useState<number>(0);
  const [blurWarning, setBlurWarning] = useState<string | null>(null);
  const [copyWarning, setCopyWarning] = useState<string | null>(null);

  // Mobile Question Palette Drawer (Phase 6)
  const [showMobilePalette, setShowMobilePalette] = useState(false);

  // Review & Bookmarks
  const [bookmarkedKeys, setBookmarkedKeys] = useState<Record<string, boolean>>({});
  const [showReviewList, setShowReviewList] = useState(false);
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});

  const startTimeRef = useRef<number>(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Initialize Arena Attempt & Questions
  useEffect(() => {
    async function initArena() {
      try {
        // Start or resume attempt
        const startRes = await fetch("/api/quiz/start", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            weekNumber,
            attemptType: weekNumber === 6 ? "MOCK_EXAM" : "WEEKLY_ARENA",
          }),
        });

        const startData = await startRes.json();

        if (startData.alreadyCompleted) {
          setAlreadyCompletedNotice(startData);
          setLoading(false);
          return;
        }

        if (!startRes.ok || !startData.success) {
          setError(startData.error || "Failed to initialize arena attempt.");
          setLoading(false);
          return;
        }

        setAttemptId(startData.attemptId);
        setRemainingSeconds(startData.remainingSeconds);

        // Preload saved answers if resuming from another device (Mobile -> PC handover)
        if (startData.savedAnswers && startData.savedAnswers.length > 0) {
          const preloaded: Record<string, string[]> = {};
          startData.savedAnswers.forEach((ans: any) => {
            preloaded[ans.questionId] = ans.selectedOptionKeys;
          });
          setSelectedAnswers(preloaded);
        }

        // Fetch questions (with option and question randomization per Phase 6)
        const qRes = await fetch(
          `/api/curriculum/questions?weekNumber=${weekNumber}&mode=ARENA&randomize=true`
        );
        const qData = await qRes.json();

        if (qRes.ok && qData.success) {
          setQuestions(qData.questions);
        } else {
          setError("Failed to load questions for this week.");
        }
      } catch (err) {
        console.error("Arena initialization error:", err);
        setError("Error connecting to arena server.");
      } finally {
        setLoading(false);
      }
    }

    initArena();
  }, [weekNumber]);

  // 2. Timer Countdown
  useEffect(() => {
    if (loading || isCompleted || alreadyCompletedNotice) return;

    timerRef.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [loading, isCompleted, alreadyCompletedNotice]);

  // 3. Proctor Anti-Cheating: Multi-Level Blur & Tab Switch Detection (Phase 6)
  useEffect(() => {
    if (loading || isCompleted || alreadyCompletedNotice) return;

    const recordViolation = () => {
      if (isCompleted) return;
      setTabSwitchCount((prev) => {
        const count = prev + 1;
        if (count === 1) {
          setBlurWarning(
            "Tab switch / window focus loss detected! (Warning 1/3) In official Huawei ICT competitions, leaving the examination window is flagged on proctor audit logs."
          );
        } else if (count === 2) {
          setBlurWarning(
            "Multiple window focus departures recorded! (Warning 2/3) Continued focus departures may invalidate your official competition ranking."
          );
        } else {
          setBlurWarning(
            `Critical Security Alert (${count} departures recorded)! Proctor audit telemetry will report excessive focus loss for this session.`
          );
        }
        return count;
      });
    };

    const handleVisibility = () => {
      if (document.hidden) recordViolation();
    };

    const handleWindowBlur = () => {
      recordViolation();
    };

    // Clipboard copy deterrence
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      setCopyWarning("Copying question text is prohibited under Huawei ICT competition regulations.");
      setTimeout(() => setCopyWarning(null), 3500);
    };

    // Context menu deterrence
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("blur", handleWindowBlur);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("blur", handleWindowBlur);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [loading, isCompleted, alreadyCompletedNotice]);

  // 4. Toggle Option Selection & Real-Time Background Auto-Save
  const handleSelectOption = async (optionKey: string, optionId?: string) => {
    const currentQ = questions[currentIndex];
    if (!currentQ || isSubmitting || isCompleted) return;

    let updatedKeys: string[] = [];
    const existing = selectedAnswers[currentQ.id] || [];

    let updatedIds: string[] = [];
    const existingIds = selectedOptionIds[currentQ.id] || [];

    if (currentQ.questionType === "MULTIPLE_CHOICE") {
      if (existing.includes(optionKey)) {
        updatedKeys = existing.filter((k) => k !== optionKey);
        if (optionId) updatedIds = existingIds.filter((id) => id !== optionId);
      } else {
        updatedKeys = [...existing, optionKey];
        if (optionId) updatedIds = [...existingIds, optionId];
      }
    } else {
      // Single choice or True/False
      updatedKeys = [optionKey];
      if (optionId) updatedIds = [optionId];
    }

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: updatedKeys,
    }));

    if (optionId) {
      setSelectedOptionIds((prev) => ({
        ...prev,
        [currentQ.id]: updatedIds,
      }));
    }

    // Real-Time Background Auto-Save to PostgreSQL for zero data loss
    try {
      await fetch("/api/quiz/save-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          attemptId,
          questionId: currentQ.id,
          selectedOptionKeys: updatedKeys,
          selectedOptionIds: updatedIds,
        }),
      });
    } catch (e) {
      console.warn("Background auto-save ping failed", e);
    }
  };

  // 5. Final Submission & Multi-Tier Confetti Celebration (Phase 6)
  const handleAutoSubmit = () => {
    handleSubmitQuiz();
  };

  const handleSubmitQuiz = async () => {
    if (!attemptId || isSubmitting || isCompleted) return;

    setIsSubmitting(true);
    const timeTaken = Math.round((Date.now() - startTimeRef.current) / 1000);

    const answersPayload = Object.entries(selectedAnswers).map(
      ([qId, keys]) => ({
        questionId: qId,
        selectedOptionKeys: keys,
        selectedOptionIds: selectedOptionIds[qId] || [],
      })
    );

    try {
      const res = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          attemptId,
          weekNumber,
          answers: answersPayload,
          timeTakenSeconds: timeTaken,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmissionResult(data);
        setIsCompleted(true);

        // Phase 6 Multi-Tier Confetti Celebration
        if (data.score >= 900) {
          // Distinction Tier: Multi-stage fireworks cascade
          confetti({ particleCount: 90, spread: 60, origin: { x: 0.2, y: 0.6 } });
          setTimeout(() => confetti({ particleCount: 110, spread: 80, origin: { x: 0.8, y: 0.6 } }), 250);
          setTimeout(() => confetti({ particleCount: 160, spread: 100, origin: { x: 0.5, y: 0.5 } }), 500);
        } else if (data.score >= 600) {
          // Qualifier Tier: Standard celebratory confetti burst
          confetti({ particleCount: 130, spread: 75, origin: { y: 0.6 } });
        }
      } else {
        setError(data.error || "Failed to submit exam.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setError("Network error while submitting answers.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Bookmark toggle for post-exam review
  const handleToggleBookmark = async (qId: string) => {
    const next = !bookmarkedKeys[qId];
    setBookmarkedKeys((prev) => ({ ...prev, [qId]: next }));

    try {
      await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: qId }),
      });
    } catch {
      setBookmarkedKeys((prev) => ({ ...prev, [qId]: !next }));
    }
  };

  // Toggle question accordion
  const toggleAccordion = (qId: string) => {
    setExpandedQuestions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  // Format Timer Display
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const timeFormatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4 text-slate-400 p-4">
        <div className="w-9 h-9 border-3 border-rose-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium text-center">
          Synchronizing Competitive Arena & Randomizing Question Pool...
        </p>
      </div>
    );
  }

  // Already Completed Screen (Strict Single Attempt Guard)
  if (alreadyCompletedNotice) {
    const attempt = alreadyCompletedNotice.attempt;
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
            <Trophy className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-black text-white">
              Official Attempt Already Recorded
            </h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              In accordance with Huawei ICT Competition Arena regulations, contestants are granted exactly 1 official attempt per weekly round.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-slate-400">Official Score</div>
              <div className="text-2xl font-black text-rose-400">{attempt.score} / 1000</div>
            </div>
            <div>
              <div className="text-xs text-slate-400">Time Taken</div>
              <div className="text-2xl font-black text-white">{Math.round(attempt.timeTakenSeconds / 60)} mins</div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href={`/leaderboard?week=${weekNumber}`}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center gap-2 transition-colors shadow-lg shadow-rose-950/40"
            >
              <Trophy className="w-4 h-4" />
              <span>View Track Leaderboard</span>
            </Link>

            <Link
              href="/mistakes"
              className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center gap-2 transition-colors"
            >
              <BookMarked className="w-4 h-4 text-rose-400" />
              <span>Open Mistake Notebook</span>
            </Link>

            <Link
              href="/dashboard"
              className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-slate-900 hover:bg-slate-800 text-slate-400 flex items-center justify-center gap-2 transition-colors"
            >
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Phase 6 Completed Screen: Multi-Tier Confetti Celebration & In-Depth Diagnostic Cards
  if (isCompleted && submissionResult) {
    const isMock = weekNumber === 6;
    const gradedResults: GradedResultItem[] = submissionResult.results || [];
    const score = submissionResult.score;
    const isDistinction = score >= 900;
    const isQualified = score >= 600;

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Main Confetti Celebration Card */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border text-center space-y-6 shadow-2xl relative overflow-hidden ${
              isDistinction
                ? "bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-900 border-amber-500/50 shadow-amber-950/30"
                : isQualified
                ? "bg-gradient-to-b from-emerald-950/40 via-slate-900 to-slate-900 border-emerald-500/50 shadow-emerald-950/30"
                : "bg-slate-900 border-slate-800"
            }`}
          >
            {/* Celebration Icon */}
            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto border shadow-xl ${
                isDistinction
                  ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                  : isQualified
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                  : "bg-rose-500/20 text-rose-400 border-rose-500/40"
              }`}
            >
              {isDistinction ? (
                <Crown className="w-9 h-9 sm:w-10 sm:h-10 animate-bounce" />
              ) : isQualified ? (
                <CheckCircle2 className="w-9 h-9 sm:w-10 sm:h-10" />
              ) : (
                <AlertTriangle className="w-9 h-9 sm:w-10 sm:h-10" />
              )}
            </div>

            <div className="space-y-1.5">
              <span
                className={`text-xs font-black px-3 py-1 rounded-full border inline-block ${
                  isDistinction
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                    : isQualified
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                    : "bg-rose-500/20 text-rose-400 border-rose-500/40"
                }`}
              >
                {isDistinction
                  ? "🏆 TOP REGIONAL CONTENDER — DISTINCTION"
                  : isQualified
                  ? "⭐ OFFICIAL PRELIMINARY QUALIFIER"
                  : "ARENA ROUND COMPLETED"}
              </span>

              <h1 className="text-2xl sm:text-3xl font-black text-white pt-1">
                {isDistinction
                  ? "Masterful Performance!"
                  : isQualified
                  ? "Qualifier Benchmark Achieved!"
                  : "Keep Drilling to Reach 600 Pts!"}
              </h1>

              <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
                {isMock
                  ? "Huawei ICT Competition 2026–2027 Preliminary Stage Full Mock Simulation"
                  : "Official Southern Africa Regional Arena Competitive Score Logged"}
              </p>
            </div>

            {/* Score Metric Grid */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/60 border border-slate-800 grid grid-cols-3 gap-3 sm:gap-4">
              <div>
                <div className="text-[11px] text-slate-400 font-medium">Final Score</div>
                <div
                  className={`text-2xl sm:text-4xl font-black ${
                    isDistinction
                      ? "text-amber-400"
                      : isQualified
                      ? "text-emerald-400"
                      : "text-rose-400"
                  }`}
                >
                  {submissionResult.score}
                </div>
                <div className="text-[10px] text-slate-500">out of 1000</div>
              </div>

              <div>
                <div className="text-[11px] text-slate-400 font-medium">Correct Questions</div>
                <div className="text-2xl sm:text-4xl font-black text-white">
                  {submissionResult.correctCount}/{submissionResult.totalQuestions}
                </div>
                <div className="text-[10px] text-slate-500">
                  {Math.round((submissionResult.correctCount / submissionResult.totalQuestions) * 100)}% Accuracy
                </div>
              </div>

              <div>
                <div className="text-[11px] text-slate-400 font-medium">Time Elapsed</div>
                <div className="text-2xl sm:text-4xl font-black text-white">
                  {Math.round(submissionResult.timeTakenSeconds / 60)}m
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  {submissionResult.timeTakenSeconds}s
                </div>
              </div>
            </div>

            {/* Proctor Integrity Telemetry Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs font-semibold text-slate-300">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span>
                {tabSwitchCount === 0
                  ? "Proctor Integrity: 100% Clean Session (0 Focus Departures)"
                  : `Proctor Telemetry: ${tabSwitchCount} Window Focus Departure(s) Recorded`}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <Link
                href={`/leaderboard?week=${weekNumber}`}
                className="py-3 px-4 rounded-xl font-bold text-xs bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center gap-2 transition-colors shadow-lg shadow-rose-950/40"
              >
                <Trophy className="w-4 h-4" />
                <span>View Leaderboard</span>
              </Link>

              <Link
                href="/mistakes"
                className="py-3 px-4 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-2 transition-colors"
              >
                <BookMarked className="w-4 h-4 text-rose-400" />
                <span>Mistake Notebook</span>
              </Link>

              <Link
                href="/dashboard"
                className="py-3 px-4 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center justify-center gap-2 transition-colors"
              >
                <span>Dashboard</span>
              </Link>
            </div>
          </div>

          {/* Detailed Question Review Accordion */}
          {gradedResults.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-sky-400" />
                    <span>Detailed Breakdown & Technical Explanations</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Review each question, check official solutions, and star questions for your revision notebook.
                  </p>
                </div>

                <button
                  onClick={() => setShowReviewList(!showReviewList)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
                >
                  {showReviewList ? "Collapse All" : "Expand All"}
                </button>
              </div>

              <div className="space-y-3">
                {gradedResults.map((item, idx) => {
                  const isExpanded = showReviewList || expandedQuestions[item.questionId];

                  return (
                    <div
                      key={item.questionId}
                      className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2 flex-wrap text-xs">
                          <span
                            className={`px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                              item.isCorrect
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                            }`}
                          >
                            {item.isCorrect ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Correct</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3.5 h-3.5" />
                                <span>Incorrect</span>
                              </>
                            )}
                          </span>

                          <span className="font-semibold text-slate-400">
                            Q{idx + 1}
                          </span>

                          {item.domain && (
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium text-[11px]">
                              {item.domain}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleBookmark(item.questionId)}
                            title="Star / Bookmark"
                            className="p-1 rounded-lg text-slate-400 hover:text-amber-400 transition-colors"
                          >
                            <Star
                              className={`w-4 h-4 ${
                                bookmarkedKeys[item.questionId] ? "fill-amber-400 text-amber-400" : ""
                              }`}
                            />
                          </button>

                          <button
                            onClick={() => toggleAccordion(item.questionId)}
                            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <h3 className="text-sm font-semibold text-white leading-relaxed">
                        {item.questionText || `Question #${idx + 1}`}
                      </h3>

                      {isExpanded && (
                        <div className="space-y-3 pt-2 text-xs border-t border-slate-800/80">
                          {item.options && item.options.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                              {item.options.map((opt) => {
                                const isCorrectOpt = opt.isCorrect;
                                const isUserSelected = item.selectedKeys?.includes(opt.optionKey);

                                let optBg = "bg-slate-950/60 border-slate-800/80 text-slate-400";
                                if (isCorrectOpt) {
                                  optBg = "bg-emerald-950/40 border-emerald-500/60 text-emerald-300 font-semibold";
                                } else if (isUserSelected) {
                                  optBg = "bg-rose-950/40 border-rose-500/60 text-rose-300";
                                }

                                return (
                                  <div
                                    key={opt.id}
                                    className={`p-2.5 rounded-xl border flex items-start gap-2 ${optBg}`}
                                  >
                                    <span className="font-bold shrink-0">{opt.optionKey}.</span>
                                    <span className="leading-snug">{opt.optionText}</span>
                                  </div>
                                );
                              })}
                            </div>
                          )}

                          <div className="flex items-center justify-between text-[11px] text-slate-400">
                            <div>
                              Your Selection: <span className="font-bold text-white">{item.selectedKeys.join(", ") || "(None)"}</span>
                            </div>
                            <div>
                              Correct Key(s): <span className="font-bold text-emerald-400">{item.correctKeys.join(", ")}</span>
                            </div>
                          </div>

                          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                            <div className="text-slate-300 font-semibold flex items-center gap-1.5">
                              <Info className="w-3.5 h-3.5 text-sky-400" />
                              <span>Official Technical Explanation:</span>
                            </div>
                            <p className="pl-5 text-slate-400 font-mono text-[11px] leading-relaxed">
                              {item.explanation}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const currentSelected = (currentQ && selectedAnswers[currentQ.id]) || [];
  const answeredCount = Object.keys(selectedAnswers).filter(
    (k) => (selectedAnswers[k] || []).length > 0
  ).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-transparent">
      {/* Top Examination HUD */}
      <header className="border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between gap-1.5 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="text-[11px] sm:text-xs font-black px-2 sm:px-2.5 py-1 rounded-md bg-rose-500/20 text-rose-400 border border-rose-500/30 whitespace-nowrap">
              {weekNumber === 6 ? (
                <>
                  <span className="sm:hidden">MOCK</span>
                  <span className="hidden sm:inline">PRELIMINARY MOCK (60 Qs)</span>
                </>
              ) : (
                <>
                  <span className="sm:hidden">W0{weekNumber}</span>
                  <span className="hidden sm:inline">ARENA &bull; WEEK 0{weekNumber}</span>
                </>
              )}
            </span>
            <span className="text-xs text-slate-400 font-semibold hidden md:inline-block truncate max-w-xs">
              {currentQ?.domain} &bull; {currentQ?.topic}
            </span>
          </div>

          {/* Center: Mobile Question Palette Trigger Button */}
          <button
            onClick={() => setShowMobilePalette(true)}
            className="sm:hidden px-2 py-1 rounded-lg bg-slate-800/80 border border-slate-700/80 text-[11px] font-bold text-slate-300 flex items-center gap-1 hover:bg-slate-700 transition-colors shrink-0"
          >
            <Layers className="w-3 h-3 text-rose-400" />
            <span>
              {currentIndex + 1}/{questions.length}
            </span>
          </button>

          {/* Right Controls: Timer & Submit */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <div
              className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border font-mono font-bold text-xs sm:text-sm ${
                remainingSeconds < 300
                  ? "bg-rose-950/50 border-rose-500/60 text-rose-400 animate-pulse"
                  : "bg-slate-800/80 border-slate-700 text-slate-200"
              }`}
            >
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />
              <span>{timeFormatted}</span>
            </div>

            <button
              onClick={handleSubmitQuiz}
              disabled={isSubmitting}
              className="py-1 sm:py-2 px-2.5 sm:px-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white text-xs font-bold flex items-center gap-1 sm:gap-1.5 transition-all shadow-md shadow-rose-950/40 disabled:opacity-50 whitespace-nowrap"
            >
              <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">Submit Exam</span>
              <span className="sm:hidden">Submit</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Examination Area */}
      <main className="max-w-4xl mx-auto w-full px-3 sm:px-4 py-4 sm:py-8 flex-1 flex flex-col justify-between space-y-5 sm:space-y-8">
        {/* Anti-Cheating Tab Switch Alert Banner */}
        {blurWarning && (
          <div className="p-4 rounded-2xl bg-amber-950/50 border border-amber-500/40 text-amber-200 text-xs flex items-center justify-between gap-3 animate-in fade-in shadow-lg">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
              <span className="leading-relaxed">{blurWarning}</span>
            </div>
            <button
              onClick={() => setBlurWarning(null)}
              className="text-xs text-amber-400 hover:text-white px-2 py-1 rounded bg-amber-900/40 shrink-0 font-bold"
            >
              Acknowledge
            </button>
          </div>
        )}

        {/* Anti-Cheating Clipboard Copy Warning */}
        {copyWarning && (
          <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
            <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{copyWarning}</span>
          </div>
        )}

        {/* Question Content Box */}
        {currentQ ? (
          <div className="space-y-6 select-none">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-300">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold text-[11px]">
                    {currentQ.questionType.replace("_", " ")}
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-sky-950/30 text-sky-400 border border-sky-800/40 text-[11px] font-semibold">
                    {currentQ.domain}
                  </span>
                </div>
              </div>

              <h2 className="text-lg sm:text-2xl font-bold text-white leading-relaxed tracking-tight">
                {currentQ.questionText}
              </h2>
            </div>

            {/* Randomized Options List (Phase 6 Option Randomization) */}
            <div className="space-y-3">
              {currentQ.options.map((opt) => {
                const isSelected = currentSelected.includes(opt.optionKey);
                const displayLetter = opt.optionKey; // Display position label A, B, C, D

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.optionKey, opt.id)}
                    className={`w-full text-left p-4 sm:p-4.5 rounded-2xl border transition-all duration-200 flex items-start gap-4 min-h-[58px] ${
                      isSelected
                        ? "bg-rose-950/30 border-rose-500 text-white shadow-lg shadow-rose-950/30 ring-1 ring-rose-500/50"
                        : "bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700 active:scale-[0.99]"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected
                          ? "bg-rose-500 text-white shadow-md shadow-rose-900/40"
                          : "bg-slate-800 text-slate-400 border border-slate-700"
                      }`}
                    >
                      {displayLetter}
                    </div>
                    <span className="text-sm sm:text-base leading-snug pt-0.5 font-medium flex-1">
                      {opt.optionText}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center text-slate-400 py-12">
            No questions available for this module.
          </div>
        )}

        {/* Question Navigation Bar (Desktop Jump Dots & Mobile Navigation) */}
        <div className="pt-4 sm:pt-6 border-t border-slate-800/80 flex items-center justify-between gap-2 sm:gap-3">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="py-2 px-3 sm:py-2.5 sm:px-4 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-bold flex items-center gap-1.5 sm:gap-2 disabled:opacity-30 transition-colors shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden xs:inline sm:inline">Previous</span>
          </button>

          {/* Desktop Quick Jump Dots */}
          <div className="hidden sm:flex items-center gap-1.5 max-w-sm overflow-x-auto py-1">
            {questions.map((q, idx) => {
              const answered = (selectedAnswers[q.id] || []).length > 0;
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-7 h-7 rounded-lg text-[11px] font-bold transition-all ${
                    isCurrent
                      ? "bg-rose-600 text-white shadow-md shadow-rose-900/50 scale-110"
                      : answered
                      ? "bg-emerald-950/40 text-emerald-300 border border-emerald-500/50"
                      : "bg-slate-950 text-slate-600 border border-slate-900 hover:border-slate-800"
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Mobile Sheet Trigger */}
          <button
            onClick={() => setShowMobilePalette(true)}
            className="sm:hidden py-1.5 px-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 flex items-center gap-1.5 shrink-0"
          >
            <Layers className="w-3.5 h-3.5 text-rose-400" />
            <span>{currentIndex + 1} / {questions.length}</span>
          </button>

          <button
            onClick={() =>
              setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))
            }
            disabled={currentIndex === questions.length - 1}
            className="py-2 px-3 sm:py-2.5 sm:px-4 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-bold flex items-center gap-1.5 sm:gap-2 disabled:opacity-30 transition-colors shrink-0"
          >
            <span className="hidden xs:inline sm:inline">Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* Phase 6 Mobile Question Navigator Drawer / Sheet */}
      {showMobilePalette && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:hidden">
          <div className="w-full bg-slate-900 border-t border-slate-800 rounded-t-3xl p-5 space-y-4 max-h-[80vh] flex flex-col animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-rose-400" />
                <h3 className="text-sm font-bold text-white">Question Navigator</h3>
                <span className="text-[11px] text-slate-400 font-mono">
                  ({answeredCount}/{questions.length} Answered)
                </span>
              </div>
              <button
                onClick={() => setShowMobilePalette(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Questions Grid */}
            <div className="grid grid-cols-6 gap-2 overflow-y-auto py-2 flex-1">
              {questions.map((q, idx) => {
                const answered = (selectedAnswers[q.id] || []).length > 0;
                const isCurrent = idx === currentIndex;
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowMobilePalette(false);
                    }}
                    className={`h-10 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center ${
                      isCurrent
                        ? "bg-rose-600 text-white shadow-lg shadow-rose-900/50 ring-2 ring-white"
                        : answered
                        ? "bg-emerald-950/60 text-emerald-300 border border-emerald-500/50"
                        : "bg-slate-950 text-slate-500 border border-slate-800"
                    }`}
                  >
                    <span>{idx + 1}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                <span>Current</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                <span>Pending</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ArenaPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
          Loading Arena...
        </div>
      }
    >
      <ArenaPageContent />
    </React.Suspense>
  );
}
