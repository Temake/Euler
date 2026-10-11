import Link from "next/link";
import {
  Trophy,
  ShieldCheck,
  Cpu,
  Cloud,
  Network,
  ArrowRight,
  Flame,
  Zap,
  Timer,
  Smartphone,
  Laptop,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { EulerSigma } from "@/components/EulerSigma";

export default function HomePage() {
  return (
    <div className="flex flex-col flex-1 bg-white">
      {/* Top Header */}
      <header className="border-b-2 border-[#e5e5e5] bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <EulerSigma mood="happy" size={44} />
            <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#7c3aed]">
              euler
            </span>
            <span className="hidden sm:inline-flex text-xs font-black px-2.5 py-1 rounded-full bg-[#f3e8ff] text-[#7c3aed]">
              2026–2027 ARENA
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs sm:text-sm font-black text-[#7c3aed] hover:bg-[#f3e8ff]/50 px-4 py-2.5 rounded-xl border-2 border-[#e5e5e5] shadow-[0_2px_0_#e5e5e5] active:translate-y-0.5 uppercase tracking-wider transition-all"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="btn-tactile-primary text-xs sm:text-sm py-2.5 px-5 flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Section 1: Hero Band */}
        <section className="px-4 sm:px-8 py-16 sm:py-24 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Sigma Emblem Centerpiece */}
          <div className="flex-1 flex justify-center order-1 md:order-2">
            <div className="relative">
              <EulerSigma mood="celebrating" size={260} className="drop-shadow-sm" />
              <div className="absolute -top-6 -right-6 sm:-right-10 bg-white border-2 border-[#e5e5e5] rounded-2xl p-3 sm:p-4 shadow-[0_4px_0_#e5e5e5] flex items-center gap-2.5">
                <Flame className="w-5 h-5 text-[#ff9600] fill-[#ff9600]" />
                <span className="text-xs sm:text-sm font-extrabold text-[#100f3e]">
                  Ready for a quiz streak?
                </span>
              </div>
            </div>
          </div>

          {/* Hero Copy & CTAs */}
          <div className="flex-1 text-center md:text-left order-2 md:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f3e8ff] text-[#7c3aed] text-xs font-black mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Official Competition Prep Arena</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-[#100f3e] tracking-tight leading-[1.1] mb-6">
              The fun, gamified way to ace the exam.
            </h1>

            <p className="text-lg sm:text-xl text-[#777777] font-semibold leading-relaxed mb-8 max-w-xl">
              Learn faster through bite-sized practice drills, weekly timed arenas, and competitive leaderboards across Cloud, Computing, and Network tracks.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/register"
                className="btn-tactile-primary px-8 py-4 text-base flex items-center justify-center gap-2"
              >
                <span>Join The Arena</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/login"
                className="px-8 py-4 rounded-2xl bg-white hover:bg-[#f3e8ff]/40 text-[#7c3aed] border-2 border-[#e5e5e5] font-black text-base uppercase tracking-wider shadow-[0_2px_0_#e5e5e5] active:translate-y-0.5 transition-all text-center"
              >
                I already have an account
              </Link>
            </div>

            {/* Sync Badge */}
            <div className="mt-8 flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-[#777777]">
              <Smartphone className="w-4 h-4 text-[#7c3aed]" />
              <span>Mobile Phone</span>
              <span>⇄</span>
              <Laptop className="w-4 h-4 text-[#1cb0f6]" />
              <span>PC Handover</span>
              <span>•</span>
              <span className="text-[#7c3aed]">Live sync during quizzes</span>
            </div>
          </div>
        </section>

        {/* Section 2: Tracks Band */}
        <section className="bg-[#fcfaff] border-y-2 border-[#e5e5e5] py-20 px-4 sm:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-black uppercase tracking-widest text-[#7c3aed] bg-white px-3 py-1 rounded-full border border-[#7c3aed]/20">
                Choose Your Specialization
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#100f3e] tracking-tight mt-3">
                Three High-Octane Learning Tracks
              </h2>
              <p className="text-base sm:text-lg text-[#777777] font-semibold mt-3">
                Curated with official syllabi, weekly unlocking modules, and real mock exam simulations.
              </p>
            </div>

            {/* Track Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Cloud Track */}
              <div className="bg-white rounded-3xl p-6 border-2 border-[#e5e5e5] shadow-[0_6px_0_#e5e5e5] hover:-translate-y-1 hover:shadow-[0_8px_0_#1cb0f6] hover:border-[#1cb0f6] transition-all flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#ddf4ff] text-[#1cb0f6] flex items-center justify-center mb-6 shadow-[0_2px_0_#bde6ff]">
                    <Cloud className="w-7 h-7" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-black text-[#100f3e]">Cloud Track</h3>
                    <span className="text-xs font-black px-2 py-0.5 rounded-full bg-[#ddf4ff] text-[#1cb0f6]">
                      60% Cloud / 40% AI
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-[#777777] leading-relaxed mb-6">
                    Master Huawei ECS, OBS, RDS, VPC networking, CCE Kubernetes, and ModelArts enterprise AI.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-4 border-t-2 border-[#f1f1f1]">
                  <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-[#f7f7f7] text-[#100f3e]">Huawei Cloud</span>
                  <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-[#f7f7f7] text-[#100f3e]">ModelArts</span>
                  <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-[#f7f7f7] text-[#100f3e]">LLM & RAG</span>
                </div>
              </div>

              {/* Computing Track */}
              <div className="bg-white rounded-3xl p-6 border-2 border-[#e5e5e5] shadow-[0_6px_0_#e5e5e5] hover:-translate-y-1 hover:shadow-[0_8px_0_#ff9600] hover:border-[#ff9600] transition-all flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#fff2d6] text-[#ff9600] flex items-center justify-center mb-6 shadow-[0_2px_0_#ffe0a3]">
                    <Cpu className="w-7 h-7" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-black text-[#100f3e]">Computing Track</h3>
                    <span className="text-xs font-black px-2 py-0.5 rounded-full bg-[#fff2d6] text-[#ff9600]">
                      openEuler & openGauss
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-[#777777] leading-relaxed mb-6">
                    Drill openEuler OS administration, openGauss enterprise DB architecture, and Kunpeng processor tuning.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-4 border-t-2 border-[#f1f1f1]">
                  <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-[#f7f7f7] text-[#100f3e]">openEuler CLI</span>
                  <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-[#f7f7f7] text-[#100f3e]">openGauss DB</span>
                  <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-[#f7f7f7] text-[#100f3e]">Kunpeng DevKit</span>
                </div>
              </div>

              {/* Network Track */}
              <div className="bg-white rounded-3xl p-6 border-2 border-[#e5e5e5] shadow-[0_6px_0_#e5e5e5] hover:-translate-y-1 hover:shadow-[0_8px_0_#7c3aed] hover:border-[#7c3aed] transition-all flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#f3e8ff] text-[#7c3aed] flex items-center justify-center mb-6 shadow-[0_2px_0_#e9d5ff]">
                    <Network className="w-7 h-7" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-black text-[#100f3e]">Network Track</h3>
                    <span className="text-xs font-black px-2 py-0.5 rounded-full bg-[#f3e8ff] text-[#7c3aed]">
                      Datacom & Security
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-[#777777] leading-relaxed mb-6">
                    Master Huawei VRP routing, OSPF, IPv6 Enhanced, next-generation Firewalls, and WLAN wireless networks.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-4 border-t-2 border-[#f1f1f1]">
                  <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-[#f7f7f7] text-[#100f3e]">HCIA-Datacom</span>
                  <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-[#f7f7f7] text-[#100f3e]">OSPF & IPv6</span>
                  <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-[#f7f7f7] text-[#100f3e]">WLAN Campus</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Features Band */}
        <section className="py-20 px-4 sm:px-8 max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-5xl font-black text-[#100f3e] tracking-tight">
              Why Contestants Love Euler
            </h2>
            <p className="text-base sm:text-lg text-[#777777] font-semibold mt-3">
              Built to turn stressful exam revision into an engaging, daily habit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white border-2 border-[#e5e5e5] shadow-[0_4px_0_#e5e5e5] text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-[#fff2d6] text-[#ff9600] flex items-center justify-center mb-4">
                <Flame className="w-7 h-7 fill-[#ff9600]" />
              </div>
              <h4 className="text-lg font-black text-[#100f3e] mb-2">Daily Streak Engine</h4>
              <p className="text-sm font-semibold text-[#777777] leading-relaxed">
                Build momentum with daily 5-minute drills and keep your fire burning every single day.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border-2 border-[#e5e5e5] shadow-[0_4px_0_#e5e5e5] text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-[#ddf4ff] text-[#1cb0f6] flex items-center justify-center mb-4">
                <Timer className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-black text-[#100f3e] mb-2">Weekly Timed Arena</h4>
              <p className="text-sm font-semibold text-[#777777] leading-relaxed">
                Simulate high-pressure arena rounds with strict server countdown and single attempts.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border-2 border-[#e5e5e5] shadow-[0_4px_0_#e5e5e5] text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-[#f3e8ff] text-[#7c3aed] flex items-center justify-center mb-4">
                <Trophy className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-black text-[#100f3e] mb-2">League Leaderboards</h4>
              <p className="text-sm font-semibold text-[#777777] leading-relaxed">
                Climb the ranks, earn promotion medals, and compare your accuracy with peer contestants.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border-2 border-[#e5e5e5] shadow-[0_4px_0_#e5e5e5] text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-[#ffdfe0] text-[#ff4b4b] flex items-center justify-center mb-4">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-black text-[#100f3e] mb-2">Mock Exam Replica</h4>
              <p className="text-sm font-semibold text-[#777777] leading-relaxed">
                Experience the 60-question, 60-minute, 1,000-point full simulation before exam day.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Final Bottom Callout */}
        <section className="bg-[#fcfaff] border-t-2 border-[#e5e5e5] py-20 px-4 sm:px-8 text-center">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <EulerSigma mood="encouraging" size={120} className="mb-4" />
            <h2 className="text-3xl sm:text-5xl font-black text-[#100f3e] tracking-tight mb-4">
              Ready to claim your spot on the podium?
            </h2>
            <p className="text-base sm:text-lg text-[#777777] font-semibold mb-8 max-w-xl">
              Start practicing in under 30 seconds. 100% free for competition students.
            </p>
            <Link
              href="/register"
              className="btn-tactile-primary px-10 py-5 text-lg"
            >
              Start Learning Now
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-[#e5e5e5] bg-white py-10 px-4 text-center">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <EulerSigma mood="happy" size={32} />
            <span className="font-extrabold text-[#7c3aed] text-lg">euler</span>
            <span className="text-xs text-[#777777] font-bold">© 2026–2027 Competition Arena</span>
          </div>
          <div className="flex items-center gap-6 text-xs font-black uppercase tracking-wider text-[#777777]">
            <Link href="/login" className="hover:text-[#7c3aed] transition-colors">Contestant Login</Link>
            <Link href="/register" className="hover:text-[#7c3aed] transition-colors">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
