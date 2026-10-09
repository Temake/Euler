"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  Cpu,
  Cloud,
  Network,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  Laptop,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  Lock,
  User,
  Layers,
} from "lucide-react";

type Track = "CLOUD" | "COMPUTING" | "NETWORK";

interface TrackOption {
  id: Track;
  name: string;
  badge: string;
  icon: typeof Cloud;
  description: string;
  focus: string[];
  gradient: string;
  borderActive: string;
  bgActive: string;
  iconColor: string;
}

const TRACKS: TrackOption[] = [
  {
    id: "CLOUD",
    name: "Cloud Track",
    badge: "Cloud & Artificial Intelligence",
    icon: Cloud,
    description: "Cloud Architecture, Distributed Systems & Enterprise AI",
    focus: ["Huawei Cloud AZs & IAM", "ECS, BMS & OBS Storage", "CCE & K8s Cloud Native", "ModelArts & Pangu LLMs"],
    gradient: "from-sky-500/20 via-blue-500/10 to-transparent",
    borderActive: "border-sky-500 shadow-sky-500/20 shadow-lg",
    bgActive: "bg-sky-950/40",
    iconColor: "text-sky-400",
  },
  {
    id: "COMPUTING",
    name: "Computing Track",
    badge: "openEuler, openGauss & Kunpeng",
    icon: Cpu,
    description: "Operating Systems, High-Performance DBs & Processor Tuning",
    focus: ["openEuler CLI, Bash & Vim", "System Management & LVM", "openGauss Deployment & SQL", "Kunpeng DevKit & BoostKit"],
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    borderActive: "border-amber-500 shadow-amber-500/20 shadow-lg",
    bgActive: "bg-amber-950/40",
    iconColor: "text-amber-400",
  },
  {
    id: "NETWORK",
    name: "Network Track",
    badge: "Datacom, DCN, Security & WLAN",
    icon: Network,
    description: "Enterprise Routing, Next-Gen Security & Wireless Campus",
    focus: ["Huawei VRP & Ethernet Switching", "OSPF Routing & IPv6", "Firewalls, AAA & IPsec VPN", "WLAN CAPWAP & DCN VXLAN"],
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    borderActive: "border-emerald-500 shadow-emerald-500/20 shadow-lg",
    bgActive: "bg-emerald-950/40",
    iconColor: "text-emerald-400",
  },
];

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("from") || "/dashboard";

  const initialMode = searchParams.get("mode") === "register" ? "register" : "login";
  const [mode, setMode] = useState<"login" | "register">(initialMode);

  useEffect(() => {
    if (searchParams.get("mode") === "register") {
      setMode("register");
    } else if (searchParams.get("mode") === "login") {
      setMode("login");
    }
  }, [searchParams]);
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<Track>("CLOUD");
  const [deviceUuid, setDeviceUuid] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // Initialize or retrieve persistent client device UUID
  useEffect(() => {
    let storedUuid = localStorage.getItem("euler_device_uuid");
    if (!storedUuid) {
      if (typeof crypto !== "undefined" && crypto.randomUUID) {
        storedUuid = crypto.randomUUID();
      } else {
        storedUuid = "dev-" + Math.random().toString(36).substring(2, 12) + "-" + Date.now();
      }
      localStorage.setItem("euler_device_uuid", storedUuid);
    }
    setDeviceUuid(storedUuid);
  }, []);

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 6);
    setPin(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessNotice(null);

    if (!username.trim()) {
      setError("Please enter a username.");
      return;
    }

    if (pin.length !== 6) {
      setError("PIN must be exactly 6 digits.");
      return;
    }

    if (!deviceUuid) {
      setError("Generating device fingerprint, please wait...");
      return;
    }

    setLoading(true);

    try {
      if (mode === "login") {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: username.trim(),
            pin: pin.trim(),
            deviceUuid,
          }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          setError(data.error || "Login failed. Please verify your username and PIN.");
          setLoading(false);
          return;
        }

        if (data.transferredDevice) {
          setSuccessNotice(
            "Device handover active! Your previous active session was transferred to this device."
          );
          setTimeout(() => {
            router.push(returnTo);
          }, 1200);
        } else {
          router.push(returnTo);
        }
      } else {
        // Register mode
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: username.trim(),
            pin: pin.trim(),
            track: selectedTrack,
            deviceUuid,
          }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          setError(data.error || "Registration failed. Please try again.");
          setLoading(false);
          return;
        }

        setSuccessNotice(`Registration successful! Welcome to the ${selectedTrack} track arena.`);
        setTimeout(() => {
          router.push(returnTo);
        }, 1000);
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError("Unable to connect to authentication server. Please check your network.");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main card */}
      <div className="relative z-10 w-full max-w-xl">
        {/* Euler & Huawei ICT Competition Branding Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300 font-mono tracking-wider mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            HUAWEI ICT COMPETITION 2026–2027
          </div>

          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-600 to-red-700 flex items-center justify-center text-white font-bold text-2xl shadow-xl shadow-rose-900/40 ring-1 ring-rose-400/30">
              ∑
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
              EULER
            </h1>
          </div>
          <p className="text-sm text-slate-400 max-w-sm mx-auto">
            Competitive Quiz & Exam Preparation Arena for Southern Africa Contestants
          </p>
        </div>

        {/* Auth Box */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-2xl p-6 sm:p-8">
          {/* Tab Switcher */}
          <div className="grid grid-cols-2 p-1 bg-slate-950/70 rounded-xl border border-slate-800 mb-6">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError(null);
                setSuccessNotice(null);
              }}
              className={`py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                mode === "login"
                  ? "bg-slate-800 text-white shadow-sm border border-slate-700"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <User className="w-4 h-4" />
              Contestant Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setError(null);
                setSuccessNotice(null);
              }}
              className={`py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                mode === "register"
                  ? "bg-rose-600 text-white shadow-sm border border-rose-500"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              New Registration
            </button>
          </div>

          {/* Handover Notice */}
          {successNotice && (
            <div className="mb-5 p-4 rounded-xl bg-emerald-950/50 border border-emerald-700/60 text-emerald-200 text-xs sm:text-sm flex items-start gap-3 animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>{successNotice}</span>
            </div>
          )}

          {/* Error Notice */}
          {error && (
            <div className="mb-5 p-4 rounded-xl bg-rose-950/50 border border-rose-700/60 text-rose-200 text-xs sm:text-sm flex items-start gap-3 animate-shake">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Contestant Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  autoComplete="username"
                  placeholder="e.g. jordan_ict or contestant2026"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                Letters, numbers, and underscores (3–20 characters)
              </p>
            </div>

            {/* 6-Digit PIN Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  6-Digit Security PIN
                </label>
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors"
                >
                  {showPin ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" /> Hide PIN
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" /> Reveal PIN
                    </>
                  )}
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPin ? "text" : "password"}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  required
                  placeholder="••••••"
                  value={pin}
                  onChange={handlePinChange}
                  className="w-full pl-10 pr-12 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 text-base font-mono tracking-widest focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                />
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-xs font-mono text-slate-500">
                  {pin.length}/6
                </div>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                Simple numeric PIN for quick sign-in on smartphones and lab PCs
              </p>
            </div>

            {/* Track Selector (Only for Register) */}
            {mode === "register" && (
              <div className="pt-2 border-t border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-rose-500" />
                    Select Competition Track
                  </label>
                  <span className="text-[11px] text-rose-400 font-medium">
                    Permanent Lock
                  </span>
                </div>

                <div className="space-y-2.5">
                  {TRACKS.map((track) => {
                    const isSelected = selectedTrack === track.id;
                    const Icon = track.icon;
                    return (
                      <div
                        key={track.id}
                        onClick={() => setSelectedTrack(track.id)}
                        className={`cursor-pointer relative rounded-xl border p-3.5 transition-all duration-200 ${
                          isSelected
                            ? `${track.borderActive} ${track.bgActive}`
                            : "border-slate-800/80 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-950/70"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`p-2 rounded-lg bg-slate-900 border border-slate-800 ${track.iconColor} shrink-0 mt-0.5`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                              <h3 className="text-sm font-semibold text-white truncate">
                                {track.name}
                              </h3>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 w-fit">
                                {track.badge}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5">
                              {track.description}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {track.focus.map((f, i) => (
                                <span
                                  key={i}
                                  className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900/90 text-slate-400 border border-slate-800/60"
                                >
                                  {f}
                                </span>
                              ))}
                            </div>
                          </div>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-rose-600 flex items-center justify-center shrink-0">
                              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-900/50 text-[11px] text-amber-300/90 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    Your track selection cannot be changed later. Leaderboards and official quizzes will be personalized to this track.
                  </span>
                </div>
              </div>
            )}

            {/* Device Handover Architecture Indicator */}
            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-800/80">
              <span className="flex items-center gap-1.5">
                <Laptop className="w-3.5 h-3.5 text-slate-400" />
                <Smartphone className="w-3.5 h-3.5 text-slate-400" />
                Single Device Session Binding
              </span>
              <span className="font-mono text-[10px] text-slate-600">
                {deviceUuid ? `ID: ${deviceUuid.slice(0, 8)}...` : "Detecting..."}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 shadow-lg ${
                mode === "register"
                  ? "bg-rose-600 hover:bg-rose-500 shadow-rose-900/30 ring-1 ring-rose-400/40"
                  : "bg-slate-100 text-slate-950 hover:bg-white shadow-slate-900/30"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : mode === "login" ? (
                <>
                  <span>Sign In & Enter Arena</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Register & Lock Track</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Admin Link */}
        <div className="mt-6 text-center text-xs text-slate-500">
          Huawei ICT Exam Proctor or Administrator?{" "}
          <Link
            href="/admin/login"
            className="text-rose-400 hover:text-rose-300 underline font-medium transition-colors"
          >
            Access Admin Master Portal
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
          Loading Euler Contestant Portal...
        </div>
      }
    >
      <LoginPageContent />
    </React.Suspense>
  );
}

