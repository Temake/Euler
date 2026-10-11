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
  Send,
  BookOpen,
  Star,
  BookMarked,
  Info,
  ChevronDown,
  ChevronUp,
  X,
  Heart,
} from "lucide-react";
import { EulerSigma } from "@/components/EulerSigma";

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

  // Anti-Cheating & Focus Detection
  const [tabSwitchCount, setTabSwitchCount] = useState<number>(0);
  const [blurWarning, setBlurWarning] = useState<string | null>(null);
  const [copyWarning, setCopyWarning] = useState<string | null>(null);

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

        if (startData.savedAnswers && startData.savedAnswers.length > 0) {
          const preloaded: Record<string, string[]> = {};
          startData.savedAnswers.forEach((ans: any) => {
            preloaded[ans.questionId] = ans.selectedOptionKeys;
          });
          setSelectedAnswers(preloaded);
        }

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

  // 3. Anti-Cheating
  useEffect(() => {
    if (loading || isCompleted || alreadyCompletedNotice) return;

    const recordViolation = () => {
      if (isCompleted) return;
      setTabSwitchCount((prev) => {
        const count = prev + 1;
        if (count === 1) {
          setBlurWarning("Window focus loss detected! (Warning 1/3) Please remain in the examination tab.");
        } else if (count === 2) {
          setBlurWarning("Multiple window departures recorded! (Warning 2/3) Continued departures will be logged.");
        } else {
          setBlurWarning(`Security Alert (${count} departures recorded)! Proctor audit telemetry will report excessive focus loss.`);
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

    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      setCopyWarning("Copying question text is disabled during official rounds.");
      setTimeout(() => setCopyWarning(null), 3500);
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("blur", handleWindowBlur);
    document.addEventListener("copy", handleCopy);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("blur", handleWindowBlur);
      document.removeEventListener("copy", handleCopy);
    };
  }, [loading, isCompleted, alreadyCompletedNotice]);

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
      console.warn("Background auto-save failed", e);
    }
  };

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

        if (data.score >= 900) {
          confetti({ particleCount: 90, spread: 60, origin: { x: 0.2, y: 0.6 } });
          setTimeout(() => confetti({ particleCount: 110, spread: 80, origin: { x: 0.8, y: 0.6 } }), 250);
          setTimeout(() => confetti({ particleCount: 160, spread: 100, origin: { x: 0.5, y: 0.5 } }), 500);
        } else if (data.score >= 600) {
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

  const toggleAccordion = (qId: string) => {
    setExpandedQuestions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const timeFormatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 text-[#777777] p-4">
        <EulerSigma mood="thinking" size={80} />
        <div className="w-8 h-8 border-4 border-[#7c3aed] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-bold text-[#100f3e]">
          Preparing your quiz arena challenge...
        </p>
      </div>
    );
  }

  // Already Completed Screen
  if (alreadyCompletedNotice) {
    const attempt = alreadyCompletedNotice.attempt;
    return (
      <div className="min-h-screen bg-[#fcfaff] flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-white border-2 border-[#e5e5e5] text-center space-y-6 shadow-[0_6px_0_#e5e5e5]">
          <EulerSigma mood="celebrating" size={100} className="mx-auto" />

          <div className="space-y-2">
            <h1 className="text-2xl font-black text-[#100f3e]">
              Official Attempt Recorded!
            </h1>
            <p className="text-sm font-bold text-[#777777] leading-relaxed">
              Contestants are granted exactly 1 official attempt per weekly round. You can continue practicing in the Practice Pool!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#f3e8ff] border-2 border-[#7c3aed]/20 grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-black uppercase text-[#7c3aed]">Your Score</div>
              <div className="text-3xl font-black text-[#7c3aed]">{attempt.score} / 1000</div>
            </div>
            <div>
              <div className="text-xs font-black uppercase text-[#7c3aed]">Time Taken</div>
              <div className="text-3xl font-black text-[#100f3e]">{Math.round(attempt.timeTakenSeconds / 60)}m</div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href={`/leaderboard?week=${weekNumber}`}
              className="btn-tactile-primary py-3.5 px-4 text-xs font-black tracking-wider w-full"
            >
              <Trophy className="w-4 h-4 mr-2" />
              <span>View Leaderboard</span>
            </Link>

            <Link
              href="/mistakes"
              className="btn-tactile-secondary py-3 px-4 text-xs font-black tracking-wider w-full"
            >
              <BookMarked className="w-4 h-4 mr-2" />
              <span>Open Mistake Notebook</span>
            </Link>

            <Link
              href="/dashboard"
              className="text-xs font-bold text-[#777777] hover:text-[#100f3e] uppercase py-2"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Completed Screen
  if (isCompleted && submissionResult) {
    const isMock = weekNumber === 6;
    const gradedResults: GradedResultItem[] = submissionResult.results || [];
    const score = submissionResult.score;
    const isDistinction = score >= 900;
    const isQualified = score >= 600;

    return (
      <div className="min-h-screen bg-[#ffffff] text-[#100f3e] py-10 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Main Victory Card */}
          <div className="p-8 rounded-3xl bg-white border-2 border-[#e5e5e5] shadow-[0_6px_0_#e5e5e5] text-center space-y-6">
            <EulerSigma
              mood={isQualified ? "celebrating" : "encouraging"}
              size={120}
              className="mx-auto"
            />

            <div className="space-y-2">
              <span
                className={`text-xs font-black px-3.5 py-1 rounded-full uppercase inline-block ${
                  isDistinction
                    ? "bg-[#fff2d6] text-[#ff9600]"
                    : isQualified
                    ? "bg-[#f3e8ff] text-[#7c3aed]"
                    : "bg-[#ffdfe0] text-[#ff4b4b]"
                }`}
              >
                {isDistinction
                  ? "🏆 DISTINCTION TIER"
                  : isQualified
                  ? "⭐ PRELIMINARY QUALIFIER"
                  : "DRILL COMPLETED"}
              </span>

              <h1 className="text-3xl sm:text-4xl font-black text-[#100f3e]">
                {isDistinction
                  ? "Incredible Job!"
                  : isQualified
                  ? "Benchmark Reached!"
                  : "Keep Practicing!"}
              </h1>

              <p className="text-sm font-bold text-[#777777]">
                {isMock
                  ? "Huawei ICT Competition Preliminary Stage Mock Simulation"
                  : "Your official score has been posted to the Southern Africa Leaderboard."}
              </p>
            </div>

            {/* Score Grid */}
            <div className="p-6 rounded-2xl bg-[#f3e8ff] border-2 border-[#7c3aed]/20 grid grid-cols-3 gap-4">
              <div>
                <div className="text-xs font-black uppercase text-[#7c3aed]">Final Score</div>
                <div className="text-3xl sm:text-4xl font-black text-[#7c3aed]">
                  {submissionResult.score}
                </div>
                <div className="text-[11px] font-bold text-[#777777]">out of 1000</div>
              </div>

              <div>
                <div className="text-xs font-black uppercase text-[#7c3aed]">Accuracy</div>
                <div className="text-3xl sm:text-4xl font-black text-[#100f3e]">
                  {Math.round((submissionResult.correctCount / submissionResult.totalQuestions) * 100)}%
                </div>
                <div className="text-[11px] font-bold text-[#777777]">
                  {submissionResult.correctCount}/{submissionResult.totalQuestions} Correct
                </div>
              </div>

              <div>
                <div className="text-xs font-black uppercase text-[#7c3aed]">Time</div>
                <div className="text-3xl sm:text-4xl font-black text-[#100f3e]">
                  {Math.round(submissionResult.timeTakenSeconds / 60)}m
                </div>
                <div className="text-[11px] font-bold text-[#777777]">
                  {submissionResult.timeTakenSeconds}s
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <Link
                href={`/leaderboard?week=${weekNumber}`}
                className="btn-tactile-primary py-3.5 px-4 text-xs font-black tracking-wider"
              >
                <Trophy className="w-4 h-4 mr-2" />
                <span>Leaderboard</span>
              </Link>

              <Link
                href="/mistakes"
                className="btn-tactile-secondary py-3 px-4 text-xs font-black tracking-wider"
              >
                <BookMarked className="w-4 h-4 mr-2" />
                <span>Mistakes ({submissionResult.totalQuestions - submissionResult.correctCount})</span>
              </Link>

              <Link
                href="/dashboard"
                className="btn-tactile-blue py-3.5 px-4 text-xs font-black tracking-wider"
              >
                <span>Dashboard</span>
              </Link>
            </div>
          </div>

          {/* Breakdown Review List */}
          {gradedResults.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-[#100f3e] flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#7c3aed]" />
                  <span>Question Breakdown</span>
                </h2>

                <button
                  onClick={() => setShowReviewList(!showReviewList)}
                  className="px-3 py-1.5 rounded-xl border-2 border-[#e5e5e5] text-xs font-black text-[#777777] hover:text-[#100f3e]"
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
                      className="p-5 rounded-2xl bg-white border-2 border-[#e5e5e5] shadow-[0_3px_0_#e5e5e5] space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2 flex-wrap text-xs">
                          <span
                            className={`px-2.5 py-0.5 rounded-full font-black text-[11px] flex items-center gap-1 ${
                              item.isCorrect
                                ? "bg-[#f3e8ff] text-[#7c3aed]"
                                : "bg-[#ffdfe0] text-[#ff4b4b]"
                            }`}
                          >
                            {item.isCorrect ? "CORRECT" : "INCORRECT"}
                          </span>
                          <span className="font-extrabold text-[#777777]">
                            Q{idx + 1}
                          </span>
                          {item.domain && (
                            <span className="px-2 py-0.5 rounded-md bg-[#f7f7f7] text-[#100f3e] font-bold text-[11px]">
                              {item.domain}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleBookmark(item.questionId)}
                            className="p-1 rounded-lg text-[#777777] hover:text-[#ff9600]"
                          >
                            <Star
                              className={`w-4 h-4 ${
                                bookmarkedKeys[item.questionId] ? "fill-[#ff9600] text-[#ff9600]" : ""
                              }`}
                            />
                          </button>
                          <button
                            onClick={() => toggleAccordion(item.questionId)}
                            className="p-1 rounded-lg text-[#777777] hover:text-[#100f3e]"
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <h3 className="text-sm font-extrabold text-[#100f3e] leading-snug">
                        {item.questionText || `Question #${idx + 1}`}
                      </h3>

                      {isExpanded && (
                        <div className="space-y-3 pt-2 text-xs border-t-2 border-[#f1f1f1]">
                          <div className="flex items-center justify-between text-xs font-bold text-[#777777]">
                            <div>
                              Your Selection: <strong className="text-[#100f3e]">{item.selectedKeys.join(", ") || "(None)"}</strong>
                            </div>
                            <div>
                              Correct Key: <strong className="text-[#7c3aed]">{item.correctKeys.join(", ")}</strong>
                            </div>
                          </div>

                          <div className="p-3.5 rounded-xl bg-[#f3e8ff] border-2 border-[#7c3aed]/20 space-y-1">
                            <div className="text-[#100f3e] font-black flex items-center gap-1.5">
                              <Info className="w-4 h-4 text-[#7c3aed]" />
                              <span>Technical Explanation:</span>
                            </div>
                            <p className="text-xs font-bold text-[#777777] leading-relaxed">
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
  const progressPercent = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-white text-[#100f3e] flex flex-col justify-between selection:bg-transparent">
      {/* Top Quiz Header */}
      <header className="border-b-2 border-[#e5e5e5] bg-white sticky top-0 z-40 px-4 sm:px-8 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/dashboard"
            className="p-2 rounded-xl text-[#777777] hover:text-[#100f3e] hover:bg-[#f7f7f7] transition-colors"
            title="Exit Arena"
          >
            <X className="w-6 h-6 stroke-[2.5]" />
          </Link>

          {/* Center: Tactile Glossy Progress Bar */}
          <div className="flex-1 max-w-lg">
            <div className="tactile-progress-track">
              <div
                className="tactile-progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Right: Timer & Hearts */}
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border-2 font-mono font-black text-xs sm:text-sm ${
                remainingSeconds < 300
                  ? "bg-[#ffdfe0] border-[#ff4b4b] text-[#ff4b4b] animate-pulse"
                  : "bg-white border-[#e5e5e5] text-[#7c3aed]"
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{timeFormatted}</span>
            </div>

            <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-2xl bg-white border-2 border-[#e5e5e5] text-[#ff4b4b] font-black text-xs sm:text-sm">
              <Heart className="w-4 h-4 fill-[#ff4b4b]" />
              <span>5</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Question Area */}
      <main className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-8 flex-1 flex flex-col justify-between">
        {blurWarning && (
          <div className="mb-6 p-4 rounded-2xl bg-[#fff2d6] border-2 border-[#ff9600] text-[#100f3e] text-xs font-bold flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#ff9600] shrink-0" />
              <span>{blurWarning}</span>
            </div>
            <button
              onClick={() => setBlurWarning(null)}
              className="text-xs font-black text-[#ff9600] hover:underline shrink-0"
            >
              OK
            </button>
          </div>
        )}

        {currentQ ? (
          <div className="space-y-8 select-none">
            {/* Sigma Prompt */}
            <div className="flex items-start gap-4">
              <EulerSigma mood="thinking" size={64} className="shrink-0" />
              <div className="flex-1 bg-white border-2 border-[#e5e5e5] rounded-3xl p-5 shadow-[0_4px_0_#e5e5e5] relative">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-black text-[#7c3aed] uppercase tracking-wider">
                    {currentQ.questionType === "MULTIPLE_CHOICE"
                      ? "Select all correct options"
                      : "Choose the correct answer"}
                  </span>
                  <span className="text-xs font-bold text-[#777777]">•</span>
                  <span className="text-xs font-bold text-[#777777]">{currentQ.domain}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#100f3e] leading-snug">
                  {currentQ.questionText}
                </h2>
              </div>
            </div>

            {/* Answer Options */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt) => {
                const isSelected = currentSelected.includes(opt.optionKey);

                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.optionKey, opt.id)}
                    className={`quiz-option-card p-4 sm:p-5 flex items-center gap-4 ${
                      isSelected ? "selected" : ""
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl font-black text-sm flex items-center justify-center shrink-0 border-2 transition-colors ${
                        isSelected
                          ? "bg-[#7c3aed] border-[#7c3aed] text-white"
                          : "bg-[#f7f7f7] border-[#e5e5e5] text-[#777777]"
                      }`}
                    >
                      {opt.optionKey}
                    </div>

                    <span className="text-base sm:text-lg font-bold text-[#100f3e] leading-snug flex-1">
                      {opt.optionText}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-[#777777] font-bold">
            No questions available for this module.
          </div>
        )}
      </main>

      {/* Sticky Bottom Action Footer */}
      <footer className="border-t-2 border-[#e5e5e5] bg-white py-4 px-4 sm:px-8 sticky bottom-0 z-40">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="btn-tactile-secondary py-3.5 px-5 text-xs font-black uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            <span>Back</span>
          </button>

          {/* Quick Question Dots */}
          <div className="hidden sm:flex items-center gap-1.5 max-w-xs overflow-x-auto py-1">
            {questions.map((q, idx) => {
              const answered = (selectedAnswers[q.id] || []).length > 0;
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-7 h-7 rounded-xl text-xs font-black transition-all ${
                    isCurrent
                      ? "bg-[#7c3aed] text-white shadow-[0_2px_0_#5b21b6]"
                      : answered
                      ? "bg-[#f3e8ff] text-[#7c3aed] border-2 border-[#7c3aed]"
                      : "bg-[#f7f7f7] text-[#777777] border-2 border-[#e5e5e5]"
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Next / Submit Button */}
          {currentIndex === questions.length - 1 ? (
            <button
              onClick={handleSubmitQuiz}
              disabled={isSubmitting}
              className="btn-tactile-primary py-3.5 px-8 text-sm font-black uppercase tracking-wider"
            >
              <Send className="w-4 h-4 mr-2" />
              <span>Submit Arena</span>
            </button>
          ) : (
            <button
              onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
              className="btn-tactile-primary py-3.5 px-8 text-sm font-black uppercase tracking-wider"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}

export default function ArenaPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center font-bold text-[#777777]">
          Loading Arena...
        </div>
      }
    >
      <ArenaPageContent />
    </React.Suspense>
  );
}
