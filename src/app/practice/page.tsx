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
  BookMarked,
  Layers,
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

  useEffect(() => {
    setSelectedAnswers([]);
    setIsRevealed(false);
  }, [currentIndex]);

  const handleSelectOption = (key: string) => {
    if (isRevealed) return;

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
    setBookmarked((prev) => ({ ...prev, [qId]: nextState }));

    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: qId }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(nextState ? "Starred for revision notebook!" : "Removed from starred list.");
      } else {
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
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 text-[#777777]">
        <EulerSigma mood="thinking" size={90} />
        <div className="w-8 h-8 border-4 border-[#7c3aed] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-bold text-[#100f3e]">Loading practice pool...</p>
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
    <div className="min-h-screen bg-white text-[#100f3e] flex flex-col justify-between selection:bg-transparent">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 px-4 py-3 rounded-2xl bg-[#100f3e] text-white text-xs font-black shadow-2xl animate-in fade-in">
          {toastMessage}
        </div>
      )}

      {/* Top Navigation */}
      <Navbar />

      {/* Filter / Subheader Bar */}
      <div className="border-b-2 border-[#e5e5e5] bg-[#f7f7f7] px-4 sm:px-8 py-3">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-1.5 rounded-xl border-2 border-[#e5e5e5] bg-white text-[#777777] hover:text-[#100f3e]"
            >
              <ChevronLeft className="w-4 h-4" />
            </Link>
            <span className="text-xs font-black uppercase tracking-wider text-[#7c3aed] bg-[#f3e8ff] px-2.5 py-1 rounded-full">
              PRACTICE DRILL • WEEK {weekNumber}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Domain Filter */}
            <select
              value={selectedDomain}
              onChange={(e) => handleFilterDomainChange(e.target.value)}
              className="bg-white border-2 border-[#e5e5e5] text-[#100f3e] font-bold rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-[#7c3aed]"
            >
              <option value="">All Domains ({availableDomains.length})</option>
              {availableDomains.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            {/* Shuffle */}
            <button
              onClick={handleToggleRandomize}
              className={`p-2 rounded-xl border-2 text-xs font-black flex items-center gap-1.5 ${
                isRandomized
                  ? "bg-[#f3e8ff] border-[#7c3aed] text-[#7c3aed]"
                  : "bg-white border-[#e5e5e5] text-[#777777]"
              }`}
            >
              <Shuffle className="w-3.5 h-3.5" />
            </button>

            {/* Bookmark */}
            {currentQ && (
              <button
                onClick={() => toggleBookmark(currentQ.id)}
                className={`p-2 rounded-xl border-2 transition-colors ${
                  bookmarked[currentQ.id]
                    ? "bg-[#fff2d6] border-[#ff9600] text-[#ff9600]"
                    : "bg-white border-[#e5e5e5] text-[#777777]"
                }`}
              >
                <Star className={`w-4 h-4 ${bookmarked[currentQ.id] ? "fill-[#ff9600]" : ""}`} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Practice Question */}
      <main className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-8 flex-1 flex flex-col justify-between">
        {currentQ ? (
          <div className="space-y-8 select-none">
            {/* Question speech prompt */}
            <div className="flex items-start gap-4">
              <EulerSigma
                mood={isRevealed ? (isUserCorrect ? "celebrating" : "encouraging") : "happy"}
                size={70}
                className="shrink-0"
              />
              <div className="flex-1 bg-white border-2 border-[#e5e5e5] rounded-3xl p-5 shadow-[0_4px_0_#e5e5e5]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-black text-[#7c3aed] uppercase tracking-wider">
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                  <span className="text-xs font-bold text-[#777777]">•</span>
                  <span className="text-xs font-bold text-[#777777]">{currentQ.domain}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#100f3e] leading-snug">
                  {currentQ.questionText}
                </h2>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt) => {
                const isSelected = selectedAnswers.includes(opt.optionKey);
                const isOptionCorrect = opt.isCorrect;

                let cardClass = "quiz-option-card";
                if (isRevealed) {
                  if (isOptionCorrect) cardClass += " correct";
                  else if (isSelected) cardClass += " incorrect";
                } else if (isSelected) {
                  cardClass += " selected";
                }

                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.optionKey)}
                    className={`${cardClass} p-4 sm:p-5 flex items-center gap-4`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl font-black text-sm flex items-center justify-center shrink-0 border-2 ${
                        isRevealed && isOptionCorrect
                          ? "bg-[#7c3aed] border-[#7c3aed] text-white"
                          : isRevealed && isSelected && !isOptionCorrect
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

                    {isRevealed && isOptionCorrect && (
                      <CheckCircle2 className="w-6 h-6 text-[#7c3aed] shrink-0" />
                    )}
                    {isRevealed && isSelected && !isOptionCorrect && (
                      <XCircle className="w-6 h-6 text-[#ff4b4b] shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 text-[#777777] font-bold">
            No practice questions matching current filter.
          </div>
        )}
      </main>

      {/* Tactile Bottom Feedback Footer */}
      <footer
        className={`border-t-2 transition-colors py-5 px-4 sm:px-8 sticky bottom-0 z-40 ${
          isRevealed
            ? isUserCorrect
              ? "bg-[#f3e8ff] border-[#7c3aed]"
              : "bg-[#ffdfe0] border-[#ff4b4b]"
            : "bg-white border-[#e5e5e5]"
        }`}
      >
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Feedback Info when checked */}
          {isRevealed ? (
            <div className="flex items-start gap-3 w-full sm:w-auto">
              {isUserCorrect ? (
                <div className="w-12 h-12 rounded-2xl bg-white text-[#7c3aed] flex items-center justify-center shrink-0 shadow-[0_2px_0_#7c3aed]">
                  <Check className="w-7 h-7 stroke-[3]" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-2xl bg-white text-[#ff4b4b] flex items-center justify-center shrink-0 shadow-[0_2px_0_#ff4b4b]">
                  <X className="w-7 h-7 stroke-[3]" />
                </div>
              )}

              <div>
                <h3
                  className={`text-lg font-black ${
                    isUserCorrect ? "text-[#7c3aed]" : "text-[#ff4b4b]"
                  }`}
                >
                  {isUserCorrect ? "Awesome!" : "Correct Solution:"}
                </h3>
                <p className="text-xs font-bold text-[#100f3e] max-w-lg mt-0.5">
                  {!isUserCorrect && (
                    <strong className="text-[#ff4b4b] mr-1">
                      {correctKeys.join(", ")} &bull;
                    </strong>
                  )}
                  {currentQ?.explanation}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="btn-tactile-secondary py-3 px-4 text-xs"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                <span>Back</span>
              </button>
              <span className="text-xs font-bold text-[#777777]">
                Question {currentIndex + 1} / {questions.length}
              </span>
            </div>
          )}

          {/* Action button */}
          <div className="w-full sm:w-auto flex justify-end">
            {!isRevealed ? (
              <button
                onClick={handleCheckAnswer}
                disabled={selectedAnswers.length === 0}
                className="btn-tactile-primary py-4 px-10 text-sm font-black w-full sm:w-auto"
              >
                <span>Check</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  if (currentIndex < questions.length - 1) {
                    setCurrentIndex((prev) => prev + 1);
                  } else {
                    router.push("/dashboard");
                  }
                }}
                className={`py-4 px-10 text-sm font-black uppercase tracking-wider rounded-2xl text-white transition-all w-full sm:w-auto cursor-pointer ${
                  isUserCorrect
                    ? "bg-[#7c3aed] shadow-[0_4px_0_#5b21b6] hover:bg-[#8b5cf6]"
                    : "bg-[#ff4b4b] shadow-[0_4px_0_#ea2b2b] hover:bg-[#ff5c5c]"
                }`}
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4 ml-2 inline-block" />
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function PracticePage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center font-bold text-[#777777]">
          Loading Practice Mode...
        </div>
      }
    >
      <PracticePageContent />
    </React.Suspense>
  );
}
