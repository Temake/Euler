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
import { EulerSigma } from "@/components/EulerSigma";

type Track = "CLOUD" | "COMPUTING" | "NETWORK";

interface TrackOption {
  id: Track;
  name: string;
  badge: string;
  icon: typeof Cloud;
  description: string;
  focus: string[];
  themeColor: string;
}

const TRACKS: TrackOption[] = [
  {
    id: "CLOUD",
    name: "Cloud Track",
    badge: "Cloud & Artificial Intelligence",
    icon: Cloud,
    description: "Cloud Architecture, Distributed Systems & Enterprise AI",
    focus: ["Huawei Cloud AZs", "ECS & OBS Storage", "CCE Kubernetes", "ModelArts AI"],
    themeColor: "text-[#1cb0f6]",
  },
  {
    id: "COMPUTING",
    name: "Computing Track",
    badge: "openEuler, openGauss & Kunpeng",
    icon: Cpu,
    description: "Operating Systems, High-Performance DBs & Processor Tuning",
    focus: ["openEuler CLI & Bash", "System LVM", "openGauss SQL", "Kunpeng DevKit"],
    themeColor: "text-[#ff9600]",
  },
  {
    id: "NETWORK",
    name: "Network Track",
    badge: "Datacom, DCN, Security & WLAN",
    icon: Network,
    description: "Enterprise Routing, Next-Gen Security & Wireless Campus",
    focus: ["Huawei VRP & VLAN", "OSPF & IPv6", "Firewalls & IPsec", "WLAN CAPWAP"],
    themeColor: "text-[#7c3aed]",
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
    <div className="min-h-screen bg-[#fcfaff] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Container */}
      <div className="w-full max-w-xl">
        {/* Brand & Mascot Header */}
        <div className="text-center mb-6 flex flex-col items-center">
          <Link href="/" className="inline-block hover:scale-105 transition-transform mb-2">
            <EulerSigma mood="happy" size={76} />
          </Link>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#7c3aed]">
            euler
          </h1>
          <p className="text-sm font-bold text-[#777777] mt-1">
            {mode === "login" ? "Welcome back! Ready for today's drill?" : "Create your profile & choose your track"}
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white border-2 border-[#e5e5e5] rounded-3xl shadow-[0_6px_0_#e5e5e5] p-6 sm:p-8">
          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 p-1 bg-[#f7f7f7] rounded-2xl border-2 border-[#e5e5e5] mb-6">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError(null);
                setSuccessNotice(null);
              }}
              className={`py-3 text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl transition-all duration-150 flex items-center justify-center gap-2 ${
                mode === "login"
                  ? "bg-white text-[#7c3aed] border-2 border-[#7c3aed] shadow-[0_2px_0_#7c3aed]"
                  : "text-[#777777] hover:text-[#100f3e]"
              }`}
            >
              <User className="w-4 h-4" />
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setError(null);
                setSuccessNotice(null);
              }}
              className={`py-3 text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl transition-all duration-150 flex items-center justify-center gap-2 ${
                mode === "register"
                  ? "bg-[#7c3aed] text-white shadow-[0_2px_0_#5b21b6]"
                  : "text-[#777777] hover:text-[#100f3e]"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Register
            </button>
          </div>

          {/* Success Notification */}
          {successNotice && (
            <div className="mb-5 p-4 rounded-2xl bg-[#f5f3ff] border-2 border-[#7c3aed] text-[#100f3e] text-xs sm:text-sm font-bold flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#7c3aed] shrink-0 mt-0.5" />
              <span>{successNotice}</span>
            </div>
          )}

          {/* Error Notification */}
          {error && (
            <div className="mb-5 p-4 rounded-2xl bg-[#ffdfe0] border-2 border-[#ff4b4b] text-[#100f3e] text-xs sm:text-sm font-bold flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#ff4b4b] shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-xs font-black text-[#100f3e] uppercase tracking-wider mb-2">
                Contestant Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#777777]">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  autoComplete="username"
                  placeholder="e.g. jordan_ict or contestant2026"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-[#e5e5e5] rounded-2xl text-[#100f3e] font-bold placeholder-[#afafaf] text-sm focus:outline-none focus:border-[#7c3aed] focus:shadow-[0_2px_0_#7c3aed] transition-all"
                />
              </div>
            </div>

            {/* 6-Digit PIN */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-black text-[#100f3e] uppercase tracking-wider">
                  6-Digit Security PIN
                </label>
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="text-xs font-bold text-[#7c3aed] hover:underline flex items-center gap-1"
                >
                  {showPin ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" /> Hide PIN
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" /> Show PIN
                    </>
                  )}
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#777777]">
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
                  className="w-full pl-10 pr-12 py-3 bg-white border-2 border-[#e5e5e5] rounded-2xl text-[#100f3e] font-mono font-bold tracking-widest text-base focus:outline-none focus:border-[#7c3aed] focus:shadow-[0_2px_0_#7c3aed] transition-all"
                />
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-xs font-mono font-bold text-[#777777]">
                  {pin.length}/6
                </div>
              </div>
            </div>

            {/* Track Selector (Only for Register) */}
            {mode === "register" && (
              <div className="pt-2 border-t-2 border-[#f1f1f1] space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-[#100f3e] uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-[#7c3aed]" />
                    Select Your Track
                  </label>
                  <span className="text-[11px] font-bold text-[#ff9600]">
                    Permanent
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
                        className={`cursor-pointer rounded-2xl border-2 p-3.5 transition-all select-none ${
                          isSelected
                            ? "bg-[#f3e8ff] border-[#7c3aed] shadow-[0_4px_0_#7c3aed]"
                            : "bg-white border-[#e5e5e5] shadow-[0_3px_0_#e5e5e5] hover:border-[#7c3aed]"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`p-2.5 rounded-xl bg-white border-2 border-[#e5e5e5] ${track.themeColor} shrink-0`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <h3 className="text-sm font-black text-[#100f3e]">
                                {track.name}
                              </h3>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-[#e5e5e5] text-[#777777]">
                                {track.badge}
                              </span>
                            </div>
                            <p className="text-xs font-semibold text-[#777777] mt-0.5">
                              {track.description}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {track.focus.map((f, i) => (
                                <span
                                  key={i}
                                  className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-white border border-[#e5e5e5] text-[#100f3e]"
                                >
                                  {f}
                                </span>
                              ))}
                            </div>
                          </div>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-[#7c3aed] flex items-center justify-center shrink-0">
                              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Handover Notice */}
            <div className="pt-2 flex items-center justify-between text-xs font-bold text-[#777777]">
              <span className="flex items-center gap-1.5">
                <Laptop className="w-3.5 h-3.5" />
                <Smartphone className="w-3.5 h-3.5" />
                Session Sync Active
              </span>
              <span className="font-mono text-[11px] text-[#afafaf]">
                {deviceUuid ? `ID: ${deviceUuid.slice(0, 8)}...` : ""}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 px-6 rounded-2xl font-black text-sm uppercase tracking-wider text-white flex items-center justify-center gap-2 transition-all cursor-pointer ${
                mode === "register"
                  ? "bg-[#7c3aed] hover:bg-[#8b5cf6] shadow-[0_4px_0_#5b21b6] active:translate-y-1 active:shadow-[0_1px_0_#5b21b6]"
                  : "bg-[#7c3aed] hover:bg-[#8b5cf6] shadow-[0_4px_0_#5b21b6] active:translate-y-1 active:shadow-[0_1px_0_#5b21b6]"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Loading...</span>
                </>
              ) : mode === "login" ? (
                <>
                  <span>Sign In &amp; Enter Arena</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Complete Registration</span>
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

export default function LoginPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center font-bold text-[#777777]">
          Loading Euler Contestant Portal...
        </div>
      }
    >
      <LoginPageContent />
    </React.Suspense>
  );
}
