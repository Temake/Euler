"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  Star,
  Sparkles,
  Info,
  Filter,
  Shuffle,
  RotateCcw,
  BookMarked,
  Layers,
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
  isBookmarked?: boolean;
}

function PracticePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const weekParam = searchParams.get("week") || "1";
  const weekNumber = parseInt(weekParam, 10);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [availableDomains, setAvailableDomains] = useState<string[]>([]);
  const [availableTopics, setAvailableTopics] = useState<string[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [isRandomized, setIsRandomized] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isRevealed, setIsRevealed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Fetch Practice Questions with optional filters
  const fetchPracticeQuestions = async (domain = selectedDomain, topic = selectedTopic, random = isRandomized) => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams({
        weekNumber: weekNumber.toString(),
        mode: "PRACTICE",
      });
      if (domain) params.set("domain", domain);
      if (topic) params.set("topic", topic);
      if (random) params.set("randomize", "true");

      const res = await fetch(`/api/curriculum/questions?${params.toString()}`);
      const data = await res.json();

      if (res.ok && data.success) {
        setQuestions(data.questions);
        if (data.availableDomains) setAvailableDomains(data.availableDomains);
        if (data.availableTopics) setAvailableTopics(data.availableTopics);

        // Preload bookmarks state
        const bmMap: Record<string, boolean> = {};
        data.questions.forEach((q: Question) => {
          if (q.isBookmarked) bmMap[q.id] = true;
        });
        setBookmarked((prev) => ({ ...prev, ...bmMap }));

        setCurrentIndex(0);
        setSelectedAnswers([]);
        setIsRevealed(false);
      } else {
        setError(data.error || "Failed to load practice questions.");
      }
    } catch (err) {
      console.error("Practice fetch error:", err);
      setError("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPracticeQuestions();
  }, [weekNumber]);

  // Reset answer when navigating to another question
  useEffect(() => {
    setSelectedAnswers([]);
    setIsRevealed(false);
  }, [currentIndex]);

  const handleSelectOption = (key: string) => {
    if (isRevealed) return; // Locked once checked

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

  const handleCheckAnswer = async () => {
    if (selectedAnswers.length === 0) return;
    setIsRevealed(true);

    const currentQ = questions[currentIndex];
    if (!currentQ) return;

    const correctKeys = currentQ.options
      .filter((o) => o.isCorrect)
      .map((o) => o.optionKey)
      .sort();
    const sortedSelected = [...selectedAnswers].sort();

    const isCorrect =
      sortedSelected.length === correctKeys.length &&
      sortedSelected.every((k, idx) => k === correctKeys[idx]);

    // Record answer in database (Mistake Notebook integration)
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
    } catch (err) {
      console.warn("Failed to log practice answer:", err);
    }
  };

  const toggleBookmark = async (qId: string) => {
    const nextState = !bookmarked[qId];
    // Optimistic UI update
    setBookmarked((prev) => ({ ...prev, [qId]: nextState }));

    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: qId }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(nextState ? "Question bookmarked! Added to Starred list." : "Question removed from bookmarks.");
      } else {
        // Revert on failure
        setBookmarked((prev) => ({ ...prev, [qId]: !nextState }));
      }
    } catch {
      setBookmarked((prev) => ({ ...prev, [qId]: !nextState }));
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleFilterDomainChange = (domain: string) => {
    setSelectedDomain(domain);
    setSelectedTopic("");
    fetchPracticeQuestions(domain, "", isRandomized);
  };

  const handleFilterTopicChange = (topic: string) => {
    setSelectedTopic(topic);
    fetchPracticeQuestions(selectedDomain, topic, isRandomized);
  };

  const handleToggleRandomize = () => {
    const next = !isRandomized;
    setIsRandomized(next);
    fetchPracticeQuestions(selectedDomain, selectedTopic, next);
  };

  if (loading && questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4 text-slate-400">
        <div className="w-8 h-8 border-3 border-sky-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium">Loading Practice Drills & Syllabus Bank...</p>
      </div>
    );
  }

  if (error && questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-6 shadow-2xl">
          <p className="text-sm text-slate-400">{error || "No practice questions found."}</p>
          <Link
            href="/dashboard"
            className="inline-block py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const correctKeys = (currentQ?.options || [])
    .filter((o) => o.isCorrect)
    .map((o) => o.optionKey);

  const sortedSelected = [...selectedAnswers].sort();
  const sortedCorrect = [...correctKeys].sort();
  const isUserCorrect =
    isRevealed &&
    sortedSelected.length === sortedCorrect.length &&
    sortedSelected.every((k, idx) => k === sortedCorrect[idx]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-sky-300 shadow-2xl animate-in fade-in slide-in-from-bottom-2">
          {toastMessage}
        </div>
      )}

      {/* Top Header & Filter Bar */}
      <header className="border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              href="/dashboard"
              className="p-1.5 sm:p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-slate-700/60"
            >
              <ChevronLeft className="w-4 h-4" />
            </Link>

            <span className="text-xs font-bold px-2 sm:px-2.5 py-1 rounded-md bg-sky-500/20 text-sky-400 border border-sky-500/30">
              PRACTICE &bull; W0{weekNumber}
            </span>

            <span className="text-xs text-slate-400 font-semibold hidden lg:inline-block max-w-xs truncate">
              {currentQ ? `${currentQ.domain} • ${currentQ.topic}` : "Practice Drills"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Randomize order toggle */}
            <button
              onClick={handleToggleRandomize}
              title="Shuffle question sequence"
              className={`p-1.5 sm:p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isRandomized
                  ? "bg-sky-500/20 border-sky-500/40 text-sky-400"
                  : "bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200"
              }`}
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Shuffle</span>
            </button>

            {/* Bookmark current question */}
            {currentQ && (
              <button
                onClick={() => toggleBookmark(currentQ.id)}
                title={bookmarked[currentQ.id] ? "Remove bookmark" : "Bookmark question"}
                className={`p-1.5 sm:p-2 rounded-xl border transition-colors ${
                  bookmarked[currentQ.id]
                    ? "bg-amber-500/20 border-amber-500/40 text-amber-400"
                    : "bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-amber-400"
                }`}
              >
                <Star
                  className={`w-4 h-4 ${bookmarked[currentQ.id] ? "fill-amber-400" : ""}`}
                />
              </button>
            )}

            <Link
              href="/mistakes"
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <BookMarked className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">Notebook</span>
            </Link>
          </div>
        </div>

        {/* Domain & Topic Drill Filters */}
        <div className="border-t border-slate-800/60 bg-slate-900/40 px-3 sm:px-4 py-2">
          <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-2 sm:gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <span className="text-slate-400 flex items-center gap-1 font-medium shrink-0">
                <Filter className="w-3 h-3 text-sky-400" />
                <span className="hidden sm:inline">Drill Filter:</span>
              </span>

              {/* Domain Filter */}
              <select
                value={selectedDomain}
                onChange={(e) => handleFilterDomainChange(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-sky-500 max-w-[130px] sm:max-w-xs truncate"
              >
                <option value="">All Domains ({availableDomains.length})</option>
                {availableDomains.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              {/* Topic Filter */}
              {availableTopics.length > 0 && (
                <select
                  value={selectedTopic}
                  onChange={(e) => handleFilterTopicChange(e.target.value)}
                  className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-sky-500 max-w-[130px] sm:max-w-xs truncate"
                >
                  <option value="">All Topics ({availableTopics.length})</option>
                  {availableTopics.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="text-slate-400 text-[11px] font-medium hidden sm:block">
              {questions.length} Question{questions.length !== 1 ? "s" : ""} Available
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto w-full px-3 sm:px-4 py-5 sm:py-8 flex-1 flex flex-col justify-between space-y-5 sm:space-y-6">
        {currentQ ? (
          <div className="space-y-6">
            {/* Question Header */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-300">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold text-[11px]">
                    {currentQ.questionType.replace("_", " ")}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-sky-950/40 border border-sky-800/40 text-sky-400 font-semibold text-[11px]">
                    {currentQ.domain}
                  </span>
                </div>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                {currentQ.questionText}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((opt, optIndex) => {
                const isSelected = selectedAnswers.includes(opt.optionKey);
                const isOptionCorrect = opt.isCorrect;
                const displayLetter = opt.optionKey;

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
                      {displayLetter}
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
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs bg-sky-600 hover:bg-sky-500 text-white flex items-center justify-center gap-2 transition-all disabled:opacity-40 shadow-lg shadow-sky-950/40"
              >
                <span>Check Answer & Reveal Explanation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              /* Detailed Explanation Card */
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700/80 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {isUserCorrect ? (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Correct Answer</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Incorrect &bull; Logged to Mistake Notebook</span>
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-bold text-slate-300">
                    Correct Option(s): {correctKeys.join(", ")}
                  </span>
                </div>

                <div className="text-xs text-slate-300 leading-relaxed space-y-2">
                  <div className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-sky-400" />
                    <span>Huawei Official Technical Explanation:</span>
                  </div>
                  <p className="pl-5 text-slate-400 font-mono text-[13px] leading-relaxed">
                    {currentQ.explanation}
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-slate-400 py-16 space-y-4">
            <Layers className="w-10 h-10 mx-auto text-slate-600" />
            <p className="text-sm">No questions found matching your filter selection.</p>
            <button
              onClick={() => {
                setSelectedDomain("");
                setSelectedTopic("");
                fetchPracticeQuestions("", "", isRandomized);
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Footer Navigation & Jump Palette */}
        <div className="pt-6 border-t border-slate-800/80 space-y-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-bold flex items-center gap-2 disabled:opacity-30 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {/* Quick jump pagination pills (Desktop) */}
            <div className="hidden sm:flex items-center gap-1 max-w-md overflow-x-auto py-1 px-2">
              {questions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-7 h-7 rounded-lg text-[11px] font-bold transition-all ${
                    idx === currentIndex
                      ? "bg-sky-600 text-white shadow-md shadow-sky-900/50 scale-110"
                      : "bg-slate-900 text-slate-500 border border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            {/* Mobile Question Indicator */}
            <div className="sm:hidden text-xs font-bold text-slate-400">
              Q {currentIndex + 1} / {questions.length}
            </div>

            <button
              onClick={() =>
                setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))
              }
              disabled={currentIndex === questions.length - 1 || questions.length === 0}
              className="py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-bold flex items-center gap-2 disabled:opacity-30 transition-colors"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
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
