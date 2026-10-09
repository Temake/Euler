import Link from "next/link";
import {
  Trophy,
  ShieldCheck,
  Cpu,
  Cloud,
  Network,
  ArrowRight,
  Lock,
  Flame,
  Zap,
  Timer,
  BarChart3,
  Smartphone,
  Laptop,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col flex-1">
      {/* Top Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-red-500 flex items-center justify-center font-black text-lg sm:text-xl text-white shadow-lg shadow-rose-900/40 shrink-0">
              E
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white">Euler</span>
              <span className="hidden sm:inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                2026–2027
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              href="/admin"
              className="hidden md:flex text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span>Admin</span>
            </Link>
            <Link
              href="/login"
              className="text-xs sm:text-sm font-medium text-slate-300 hover:text-white px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-slate-900 transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="text-xs sm:text-sm font-semibold bg-rose-600 hover:bg-rose-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-lg shadow-rose-900/30 transition-all flex items-center gap-1.5"
            >
              <span>Join Arena</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative px-3 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-16 sm:pb-24 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[11px] sm:text-xs font-medium mb-6 max-w-[90vw] truncate">
            <Flame className="w-3.5 h-3.5 text-rose-500 animate-pulse shrink-0" />
            <span className="truncate">Huawei ICT Competition Southern Africa Official Arena</span>
          </div>

          <h1 className="text-3xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15] sm:leading-[1.1]">
            Master the Exam. <br />
            <span className="bg-gradient-to-r from-rose-500 via-red-400 to-amber-400 bg-clip-text text-transparent">
              Dominate the Leaderboard.
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 text-base sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed px-2">
            Euler is the high-velocity quiz platform designed specifically for contestants in the Cloud, Computing, and Network tracks. Structured 5-week curriculum, timed weekly arena drills, and full Preliminary exam simulation.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto px-4 sm:px-0">
            <Link
              href="/register"
              className="px-6 sm:px-8 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-semibold shadow-xl shadow-rose-950/50 hover:shadow-rose-900/50 transition-all flex items-center justify-center gap-2 group text-sm sm:text-base"
            >
              <span>Enter Competition</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/login"
              className="px-6 sm:px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold transition-all text-sm sm:text-base flex items-center justify-center"
            >
              Existing Contestant Login
            </Link>
          </div>

          {/* Device Handover Badge */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-2 text-[11px] sm:text-xs text-slate-400 bg-slate-900/60 border border-slate-800/80 rounded-2xl sm:rounded-full px-3.5 py-1.5 max-w-md mx-auto">
            <div className="flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-rose-400" />
              <span>Mobile</span>
              <span className="text-slate-600">⇄</span>
              <Laptop className="w-3.5 h-3.5 text-emerald-400" />
              <span>PC Handover</span>
            </div>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-300">Seamless real-time quiz synchronization</span>
          </div>

          {/* Three Tracks Grid */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* Cloud Track */}
            <div className="relative group p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-sky-500/40 hover:bg-slate-900 transition-all shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-4">
                <Cloud className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white group-hover:text-sky-400 transition-colors">
                  Cloud Track
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 font-mono">
                  60% Cloud / 40% AI
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                ECS, BMS, VPC, OBS, RDS, GeminiDB, CCE/K8s, and ModelArts all-scenario AI platform.
              </p>
              <div className="mt-6 flex flex-wrap gap-1.5">
                <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300 font-medium">Huawei Cloud</span>
                <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300 font-medium">ModelArts</span>
                <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300 font-medium">LLM & RAG</span>
              </div>
            </div>

            {/* Computing Track */}
            <div className="relative group p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 hover:bg-slate-900 transition-all shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                <Cpu className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                  Computing Track
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono">
                  openEuler & openGauss
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                openEuler CLI & kernel management, openGauss SQL architecture, and Kunpeng DevKit & BoostKit tuning.
              </p>
              <div className="mt-6 flex flex-wrap gap-1.5">
                <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300 font-medium">openEuler</span>
                <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300 font-medium">openGauss</span>
                <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300 font-medium">Kunpeng DevKit</span>
              </div>
            </div>

            {/* Network Track */}
            <div className="relative group p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/40 hover:bg-slate-900 transition-all shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <Network className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                  Network Track
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">
                  Datacom & Security
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                VRP switching, VLAN, STP, OSPF, IPv6 Enhanced, Firewall security zones, IPsec VPN, and WLAN CAPWAP.
              </p>
              <div className="mt-6 flex flex-wrap gap-1.5">
                <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300 font-medium">HCIA-Datacom</span>
                <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300 font-medium">Firewalls</span>
                <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300 font-medium">WLAN & DCN</span>
              </div>
            </div>
          </div>

          {/* Platform Pillars */}
          <div className="mt-20 border-t border-slate-800/80 pt-16">
            <h2 className="text-2xl font-bold text-white mb-12">Engineered for Competitive Excellence</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/60">
                <Zap className="w-6 h-6 text-rose-400 mb-3" />
                <h4 className="font-semibold text-white mb-1">Instant Drill Feedback</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Practice questions reveal detailed official Huawei technical explanations immediately.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/60">
                <Timer className="w-6 h-6 text-amber-400 mb-3" />
                <h4 className="font-semibold text-white mb-1">Weekly Timed Arena</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  30 questions in 30 minutes with strict single-attempt submission and server-verified countdown.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/60">
                <Trophy className="w-6 h-6 text-yellow-400 mb-3" />
                <h4 className="font-semibold text-white mb-1">Live Track Leaderboard</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Weekly and cumulative season standings ranked by score and tie-broken by time taken.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/60">
                <ShieldCheck className="w-6 h-6 text-emerald-400 mb-3" />
                <h4 className="font-semibold text-white mb-1">Week 6 Mock Simulator</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Exact replica of Huawei Preliminary rules: 60 questions, 60 minutes, 1,000 points.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/60 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026–2027 Euler. Built for Huawei ICT Competition Prep.</p>
          <div className="flex items-center gap-6">
            <Link href="/login" className="hover:text-slate-300 transition-colors">Contestant Login</Link>
            <Link href="/register" className="hover:text-slate-300 transition-colors">Register</Link>
            <Link href="/admin" className="hover:text-slate-300 transition-colors">Admin Portal</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
