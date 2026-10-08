"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  Star,
  Sparkles,
  Info,
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
  explanation: string;
  options: Option[];
}

function PracticePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const weekParam = searchParams.get("week") || "1";
  const weekNumber = parseInt(weekParam, 10);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isRevealed, setIsRevealed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function fetchPracticeQuestions() {
      try {
        const res = await fetch(
          `/api/curriculum/questions?weekNumber=${weekNumber}&mode=PRACTICE`
        );
        const data = await res.json();

        if (res.ok && data.success) {
          setQuestions(data.questions);
        } else {
          setError(data.error || "Failed to load practice questions.");
        }
      } catch (err) {
        console.error("Practice fetch error:", err);
        setError("Error connecting to server.");
      } finally {
        setLoading(false);
      }
    }

    fetchPracticeQuestions();
  }, [weekNumber]);

  // Reset state on question change
  useEffect(() => {
    setSelectedAnswers([]);
    setIsRevealed(false);
  }, [currentIndex]);

  const handleSelectOption = (key: string) => {
    if (isRevealed) return; // Locked once revealed

    const currentQ = questions[currentIndex];
    if (!currentQ) return;

    if (currentQ.questionType === "MULTIPLE_CHOICE") {
      if (selectedAnswers.includes(key)) {
        setSelectedAnswers(selectedAnswers.filter((k) => k !== key));
      } else {
        setSelectedAnswers([...selectedAnswers, key]);
      }
    } else {
      setSelectedAnswers([key]);
    }
  };

  const handleCheckAnswer = () => {
    if (selectedAnswers.length === 0) return;
    setIsRevealed(true);
  };

  const toggleBookmark = (qId: string) => {
    setBookmarked((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4 text-slate-400">
        <div className="w-8 h-8 border-3 border-sky-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium">Loading Practice Drills...</p>
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-6">
          <p className="text-sm text-slate-400">{error || "No practice questions found."}</p>
          <Link
            href="/dashboard"
            className="inline-block py-2.5 px-4 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const correctKeys = currentQ.options
    .filter((o) => o.isCorrect)
    .map((o) => o.optionKey);

  const isUserCorrect =
    isRevealed &&
    selectedAnswers.length === correctKeys.length &&
    selectedAnswers.every((k) => correctKeys.includes(k));

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

            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-sky-500/20 text-sky-400 border border-sky-500/30">
              PRACTICE &bull; WEEK 0{weekNumber}
            </span>

            <span className="text-xs text-slate-400 font-semibold hidden sm:inline-block">
              {currentQ.domain} &bull; {currentQ.topic}
            </span>
          </div>

          <button
            onClick={() => toggleBookmark(currentQ.id)}
            title="Bookmark Question"
            className={`p-2 rounded-xl border transition-colors ${
              bookmarked[currentQ.id]
                ? "bg-amber-500/20 border-amber-500/40 text-amber-400"
                : "bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-amber-400"
            }`}
          >
            <Star
              className={`w-4 h-4 ${bookmarked[currentQ.id] ? "fill-amber-400" : ""}`}
            />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto w-full px-4 py-8 flex-1 flex flex-col justify-between space-y-6">
        <div className="space-y-6">
          {/* Question Header */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>
                Drill Question {currentIndex + 1} of {questions.length}
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold text-[11px]">
                {currentQ.questionType.replace("_", " ")}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
              {currentQ.questionText}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt) => {
              const isSelected = selectedAnswers.includes(opt.optionKey);
              const isOptionCorrect = opt.isCorrect;

              let cardStyle =
                "bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700";
              let badgeStyle = "bg-slate-800 text-slate-400 border border-slate-700";

              if (isRevealed) {
                if (isOptionCorrect) {
                  cardStyle =
                    "bg-emerald-950/40 border-emerald-500/80 text-emerald-200 shadow-md shadow-emerald-950/20";
                  badgeStyle = "bg-emerald-500 text-white font-bold";
                } else if (isSelected && !isOptionCorrect) {
                  cardStyle = "bg-rose-950/40 border-rose-500/80 text-rose-200";
                  badgeStyle = "bg-rose-500 text-white font-bold";
                }
              } else if (isSelected) {
                cardStyle = "bg-sky-950/40 border-sky-500 text-white shadow-md shadow-sky-950/30";
                badgeStyle = "bg-sky-500 text-white font-bold";
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.optionKey)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-start gap-4 ${cardStyle}`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${badgeStyle}`}
                  >
                    {opt.optionKey}
                  </div>
                  <span className="text-sm leading-snug pt-0.5 font-medium flex-1">
                    {opt.optionText}
                  </span>
                  {isRevealed && isOptionCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {isRevealed && isSelected && !isOptionCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Check Button */}
          {!isRevealed ? (
            <button
              onClick={handleCheckAnswer}
              disabled={selectedAnswers.length === 0}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-sky-600 hover:bg-sky-500 text-white flex items-center justify-center gap-2 transition-all disabled:opacity-40 shadow-lg shadow-sky-950/40"
            >
              <span>Check Answer & Reveal Explanation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            /* Detailed Explanation Card */
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700/80 space-y-3 animate-in fade-in">
              <div className="flex items-center gap-2">
                {isUserCorrect ? (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Correct Answer</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Incorrect Answer</span>
                  </span>
                )}
                <span className="text-xs font-semibold text-slate-400">
                  Correct Option(s): {correctKeys.join(", ")}
                </span>
              </div>

              <div className="text-xs text-slate-300 leading-relaxed space-y-1">
                <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-sky-400" />
                  <span>Huawei Official Explanation:</span>
                </div>
                <p className="pl-5 text-slate-400">{currentQ.explanation}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-bold flex items-center gap-2 disabled:opacity-30 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <span className="text-xs text-slate-500 font-medium">
            {currentIndex + 1} of {questions.length}
          </span>

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

export default function PracticePage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
          Loading Practice Mode...
        </div>
      }
    >
      <PracticePageContent />
    </React.Suspense>
  );
}
