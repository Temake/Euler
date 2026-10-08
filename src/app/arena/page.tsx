"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  Clock,
  AlertTriangle,
  CheckCircle2,
  Trophy,
  ArrowRight,
  ArrowLeft,
  ShieldAlert,
  Send,
  Zap,
  RotateCcw,
  BookOpen,
} from "lucide-react";

interface Option {
  id: string;
  optionKey: string;
  optionText: string;
}

interface Question {
  id: string;
  domain: string;
  topic: string;
  questionType: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "TRUE_FALSE";
  questionText: string;
  options: Option[];
}

function ArenaPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const weekParam = searchParams.get("week") || "1";
  const weekNumber = parseInt(weekParam, 10);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string[]>>({});
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(30 * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [alreadyCompletedNotice, setAlreadyCompletedNotice] = useState<any>(null);
  const [blurWarning, setBlurWarning] = useState<string | null>(null);

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

        // Preload saved answers if resuming from another device!
        if (startData.savedAnswers && startData.savedAnswers.length > 0) {
          const preloaded: Record<string, string[]> = {};
          startData.savedAnswers.forEach((ans: any) => {
            preloaded[ans.questionId] = ans.selectedOptionKeys;
          });
          setSelectedAnswers(preloaded);
        }

        // Fetch questions
        const qRes = await fetch(
          `/api/curriculum/questions?weekNumber=${weekNumber}&mode=ARENA`
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

  // 3. Anti-Cheating Tab Switch Warning
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !isCompleted) {
        setBlurWarning(
          "Tab switch detected! In official competitions, leaving the examination window is logged by proctors."
        );
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isCompleted]);

  // 4. Toggle Option Selection & Real-Time Auto-Save
  const handleSelectOption = async (optionKey: string) => {
    const currentQ = questions[currentIndex];
    if (!currentQ || isSubmitting || isCompleted) return;

    let updatedKeys: string[] = [];
    const existing = selectedAnswers[currentQ.id] || [];

    if (currentQ.questionType === "MULTIPLE_CHOICE") {
      if (existing.includes(optionKey)) {
        updatedKeys = existing.filter((k) => k !== optionKey);
      } else {
        updatedKeys = [...existing, optionKey];
      }
    } else {
      // Single choice or True/False
      updatedKeys = [optionKey];
    }

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: updatedKeys,
    }));

    // Real-Time Background Auto-Save to PostgreSQL
    try {
      await fetch("/api/quiz/save-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          attemptId,
          questionId: currentQ.id,
          selectedOptionKeys: updatedKeys,
        }),
      });
    } catch (e) {
      console.warn("Background auto-save ping failed", e);
    }
  };

  // 5. Final Submission
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
        if (data.score >= 600) {
          confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
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

  // Format Timer Display
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const timeFormatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4 text-slate-400">
        <div className="w-8 h-8 border-3 border-rose-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium">Entering Competitive Arena...</p>
      </div>
    );
  }

  // Already Completed Screen (Strict Single Attempt Guard)
  if (alreadyCompletedNotice) {
    const attempt = alreadyCompletedNotice.attempt;
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
            <Trophy className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-black text-white">
              Official Attempt Already Recorded
            </h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              In accordance with Huawei ICT Competition Arena regulations, contestants are granted exactly 1 official attempt per weekly round.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-slate-400">Your Score</div>
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
              href="/dashboard"
              className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center gap-2 transition-colors"
            >
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Completed Score Review Screen
  if (isCompleted && submissionResult) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-lg w-full p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-black text-white">
              Exam Submitted Successfully!
            </h1>
            <p className="text-xs text-slate-400">
              Your official score has been recorded on the regional leaderboard.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 grid grid-cols-3 gap-4">
            <div>
              <div className="text-[11px] text-slate-400 font-medium">Final Score</div>
              <div className="text-2xl font-black text-rose-400">
                {submissionResult.score}
              </div>
              <div className="text-[10px] text-slate-500">out of 1000</div>
            </div>

            <div>
              <div className="text-[11px] text-slate-400 font-medium">Accuracy</div>
              <div className="text-2xl font-black text-white">
                {submissionResult.correctCount} / {submissionResult.totalQuestions}
              </div>
              <div className="text-[10px] text-slate-500">Questions</div>
            </div>

            <div>
              <div className="text-[11px] text-slate-400 font-medium">Status</div>
              <div
                className={`text-sm font-black mt-1 px-2 py-0.5 rounded-full inline-block ${
                  submissionResult.passed
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                }`}
              >
                {submissionResult.passed ? "QUALIFIED" : "ATTEMPTED"}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href={`/leaderboard?week=${weekNumber}`}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center gap-2 transition-colors shadow-lg shadow-rose-950/40"
            >
              <Trophy className="w-4 h-4" />
              <span>See Your Position on Leaderboard</span>
            </Link>

            <Link
              href="/dashboard"
              className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center gap-2 transition-colors"
            >
              <span>Return to Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const currentSelected = (currentQ && selectedAnswers[currentQ.id]) || [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      {/* Top Examination HUD */}
      <header className="border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-black px-2.5 py-1 rounded-md bg-rose-500/20 text-rose-400 border border-rose-500/30">
              {weekNumber === 6 ? "PRELIMINARY MOCK" : `ARENA &bull; WEEK 0${weekNumber}`}
            </span>
            <span className="text-xs text-slate-400 font-semibold hidden sm:inline-block">
              {currentQ?.domain} &bull; {currentQ?.topic}
            </span>
          </div>

          {/* Live Synchronized Timer */}
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono font-bold text-sm ${
                remainingSeconds < 300
                  ? "bg-rose-950/50 border-rose-500/60 text-rose-400 animate-pulse"
                  : "bg-slate-800/80 border-slate-700 text-slate-200"
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{timeFormatted}</span>
            </div>

            <button
              onClick={handleSubmitQuiz}
              disabled={isSubmitting}
              className="py-1.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-rose-950/40 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Exam</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Examination Area */}
      <main className="max-w-4xl mx-auto w-full px-4 py-8 flex-1 flex flex-col justify-between space-y-8">
        {blurWarning && (
          <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-300 text-xs flex items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
              <span>{blurWarning}</span>
            </div>
            <button
              onClick={() => setBlurWarning(null)}
              className="text-xs text-amber-400 hover:underline shrink-0"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Question Content Box */}
        {currentQ ? (
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold text-[11px]">
                  {currentQ.questionType.replace("_", " ")}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                {currentQ.questionText}
              </h2>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map((opt) => {
                const isSelected = currentSelected.includes(opt.optionKey);
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.optionKey)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-start gap-4 ${
                      isSelected
                        ? "bg-rose-950/30 border-rose-500 text-white shadow-lg shadow-rose-950/30"
                        : "bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected
                          ? "bg-rose-500 text-white"
                          : "bg-slate-800 text-slate-400 border border-slate-700"
                      }`}
                    >
                      {opt.optionKey}
                    </div>
                    <span className="text-sm leading-snug pt-0.5 font-medium">
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

        {/* Question Navigation Bar */}
        <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-bold flex items-center gap-2 disabled:opacity-30 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Quick Jump Dots */}
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
                      ? "bg-slate-800 text-slate-300 border border-slate-700"
                      : "bg-slate-950 text-slate-600 border border-slate-900 hover:border-slate-800"
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <button
            onClick={() =>
              setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))
            }
            disabled={currentIndex === questions.length - 1}
            className="py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-bold flex items-center gap-2 disabled:opacity-30 transition-colors"
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>
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
