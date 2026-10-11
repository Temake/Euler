"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ShieldAlert,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { EulerSigma } from "@/components/EulerSigma";

function AdminLoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("from") || "/admin";

  const [adminPin, setAdminPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!adminPin.trim()) {
      setError("Please enter the Admin Master PIN.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminPin: adminPin.trim() }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Authentication failed. Invalid Admin Master PIN.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push(returnTo);
      }, 700);
    } catch (err) {
      console.error("Admin login error:", err);
      setError("Unable to connect to authorization service. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfaff] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md">
        {/* Navigation back */}
        <div className="mb-6">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#777777] hover:text-[#100f3e] transition-colors py-1.5 px-3 rounded-xl bg-white border-2 border-[#e5e5e5]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Contestant Arena
          </Link>
        </div>

        {/* Admin Header */}
        <div className="text-center mb-6 flex flex-col items-center">
          <EulerSigma mood="neutral" size={80} className="mb-2" />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffdfe0] text-xs text-[#ff4b4b] font-black uppercase tracking-wider mb-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            Restricted Control Plane
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#100f3e]">
            Admin Master Portal
          </h1>
          <p className="text-xs font-bold text-[#777777] mt-1 max-w-xs mx-auto">
            Authorized proctor access for track curriculum locks, module control, and contest monitoring.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border-2 border-[#e5e5e5] rounded-3xl shadow-[0_6px_0_#e5e5e5] p-6 sm:p-8 space-y-6">
          {success && (
            <div className="p-4 rounded-2xl bg-[#f3e8ff] border-2 border-[#7c3aed] text-[#100f3e] text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#7c3aed] shrink-0" />
              <span>Proctor Authorization Verified. Redirecting...</span>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-2xl bg-[#ffdfe0] border-2 border-[#ff4b4b] text-[#100f3e] text-xs font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#ff4b4b] shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-black text-[#100f3e] uppercase tracking-wider">
                  Admin Master PIN
                </label>
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="text-xs font-bold text-[#1cb0f6] hover:underline flex items-center gap-1"
                >
                  {showPin ? <><EyeOff className="w-3.5 h-3.5" /> Hide</> : <><Eye className="w-3.5 h-3.5" /> Show</>}
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#777777]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPin ? "text" : "password"}
                  required
                  placeholder="Master authorization PIN"
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-[#e5e5e5] rounded-2xl text-[#100f3e] font-mono text-sm font-bold focus:outline-none focus:border-[#7c3aed] focus:shadow-[0_2px_0_#7c3aed] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="w-full py-3.5 px-4 rounded-2xl font-black text-xs uppercase tracking-wider text-white bg-[#7c3aed] hover:bg-[#8b5cf6] shadow-[0_4px_0_#5b21b6] active:translate-y-1 active:shadow-[0_1px_0_#5b21b6] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Authenticate Master Session</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center font-bold text-[#777777]">
          Loading Proctor Console...
        </div>
      }
    >
      <AdminLoginPageContent />
    </React.Suspense>
  );
}
