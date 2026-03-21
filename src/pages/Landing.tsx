import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import {
  ArrowRight, Sparkles, Bot, BookOpen, Zap, Brain, Globe,
  ChevronRight, Users, TrendingUp, Award, Check, X, Mail,
  Shield, Handshake, FileText, MessageSquare, Menu, ExternalLink
} from "lucide-react";

/* ── Reveal hook ── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        filter: visible ? "blur(0)" : "blur(4px)",
        transition: `all 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Counter({ target, duration = 2200 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useInView(0.3);
  useEffect(() => {
    if (!visible) return;
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible, target, duration]);
  return <span ref={ref}>{count.toLocaleString()}+</span>;
}

/* ── Data ── */
const AGENTS = [
  { name: "Saathi", role: "Science Guide", emoji: "🔬", color: "hsl(17,62%,60%)" },
  { name: "Thumbnail Pro", role: "YouTube Designer", emoji: "🎨", color: "hsl(262,52%,55%)" },
  { name: "Research Buddy", role: "Paper Analyst", emoji: "📚", color: "hsl(200,62%,50%)" },
  { name: "Code Sensei", role: "Dev Helper", emoji: "💻", color: "hsl(150,52%,45%)" },
];

const COMPARE = [
  { feature: "Specialized AI Agents", us: true, them: false },
  { feature: "Creator-built personalities", us: true, them: false },
  { feature: "3D interactive simulations", us: true, them: false },
  { feature: "Voice narration (Hindi/EN)", us: true, them: false },
  { feature: "Step-by-step learning", us: true, them: false },
  { feature: "Generic chat responses", us: false, them: true },
  { feature: "Text-only output", us: false, them: true },
  { feature: "One-size-fits-all", us: false, them: true },
];

const STATS = [
  { label: "Active Learners", target: 2847, icon: Users },
  { label: "Simulations Run", target: 14523, icon: TrendingUp },
  { label: "AI Agents", target: 36, icon: Award },
];

const FEATURES = [
  { icon: Bot, title: "Creator-Built AI Agents", desc: "Not generic chatbots — real personalities with deep knowledge, built by creators who care." },
  { icon: BookOpen, title: "3D Simulations", desc: "Real 3D models with step-by-step AI narration. Understand in seconds, not hours." },
  { icon: Brain, title: "Personalized Learning", desc: "Every agent has unique personality, knowledge base & voice. Like having your own tutor." },
  { icon: Zap, title: "Point-to-Point", desc: "No fluff. No essays. Direct explanations that make you go 'ohh, that's how it works!'" },
];

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Agents", href: "#agents" },
  { label: "Compare", href: "#compare" },
  { label: "Contact", href: "#contact" },
];

export default function Landing() {
  const navigate = useNavigate();
  const [heroVisible, setHeroVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => { requestAnimationFrame(() => setHeroVisible(true)); }, []);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenu(false);
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <style>{`
        @keyframes float-y { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
        @keyframes rotate-slow { from{transform:rotate(0)} to{transform:rotate(360deg)} }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes pulse-glow { 0%,100%{box-shadow:0 0 0 0 hsla(17,62%,60%,0.3)} 50%{box-shadow:0 0 0 12px hsla(17,62%,60%,0)} }
      `}</style>

      {/* ═══ NAV ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-xl border-b border-subtle">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-14 px-5">
          <div className="flex items-center gap-2">
            <Logo size={28} />
            <span className="text-[16px] font-semibold text-primary-custom tracking-tight">Discoverse</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(l => (
              <button key={l.label} onClick={() => scrollTo(l.href)} className="text-[13px] text-secondary-custom hover:text-primary-custom transition-colors font-medium">
                {l.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/auth")} className="hidden sm:block text-[13px] text-secondary-custom hover:text-primary-custom transition-colors font-medium">
              Sign in
            </button>
            <button
              onClick={() => navigate("/auth")}
              className="bg-primary text-primary-foreground text-[13px] font-medium px-4 py-2 rounded-xl hover:opacity-90 active:scale-[0.97] transition-all"
            >
              Get Started
            </button>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-1">
              <Menu size={20} className="text-primary-custom" />
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenu && (
          <div className="md:hidden bg-card border-t border-border px-5 py-3 space-y-2 animate-fade-in">
            {NAV_LINKS.map(l => (
              <button key={l.label} onClick={() => scrollTo(l.href)} className="block w-full text-left text-[14px] text-secondary-custom py-2 hover:text-accent">
                {l.label}
              </button>
            ))}
            <button onClick={() => { setMobileMenu(false); navigate("/auth"); }} className="block w-full text-left text-[14px] text-accent font-medium py-2">
              Sign in →
            </button>
          </div>
        )}
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="pt-28 pb-16 px-5 relative overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-16 left-8 w-48 h-48 bg-accent/5 rounded-full blur-3xl pointer-events-none" style={{ animation: "float-y 8s ease-in-out infinite" }} />
        <div className="absolute top-32 right-12 w-64 h-64 bg-accent/3 rounded-full blur-3xl pointer-events-none" style={{ animation: "float-y 10s ease-in-out infinite 2s" }} />

        {/* 3D preview card */}
        <div
          className="absolute right-4 top-24 w-[240px] h-[240px] hidden lg:block"
          style={{ transform: `translateY(${scrollY * -0.12}px)` }}
        >
          <div className="relative w-full h-full" style={{ animation: "float-y 6s ease-in-out infinite" }}>
            <div className="absolute inset-0 rounded-3xl bg-card border border-border shadow-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-2 border-accent/20" style={{ animation: "rotate-slow 12s linear infinite" }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2.5 h-2.5 rounded-full bg-accent" />
                  </div>
                  <div className="absolute inset-3 rounded-full border border-accent/10" style={{ animation: "rotate-slow 8s linear infinite reverse" }}>
                    <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-accent/60" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Globe size={24} strokeWidth={0.8} className="text-accent/40" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-3 left-3 right-3 bg-card/90 backdrop-blur-sm rounded-xl px-3 py-2 border border-subtle">
                <p className="text-[10px] font-medium text-primary-custom">Human Heart</p>
                <p className="text-[8px] text-tertiary-custom">Step 3 of 6 · Playing</p>
                <div className="flex gap-0.5 mt-1">
                  {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="flex-1 h-0.5 rounded-full" style={{ backgroundColor: i <= 3 ? "hsl(var(--accent))" : "hsl(var(--border))" }} />
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -inset-4 rounded-3xl border border-accent/10" style={{ animation: "pulse-glow 3s ease-in-out infinite" }} />
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center lg:text-left">
          <div
            className="inline-flex items-center gap-2 bg-accent/8 border border-accent/20 rounded-full px-4 py-1.5 mb-6"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(12px)",
              transition: "all 600ms cubic-bezier(0.16,1,0.3,1) 100ms",
            }}
          >
            <Sparkles size={13} className="text-accent" />
            <span className="text-[12px] font-medium text-accent">AI-Powered Learning Platform</span>
          </div>

          <h1
            className="text-[clamp(2rem,6vw,3.5rem)] font-semibold text-primary-custom leading-[1.08] tracking-tight mb-5"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "all 700ms cubic-bezier(0.16,1,0.3,1) 200ms",
            }}
          >
            Not another chatbot.
            <br />
            <span className="text-accent">Your AI learning partner.</span>
          </h1>

          <p
            className="text-[clamp(0.9rem,2vw,1.1rem)] text-secondary-custom leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(14px)",
              transition: "all 700ms cubic-bezier(0.16,1,0.3,1) 350ms",
            }}
          >
            Creator-built AI agents with real personalities. 3D simulations with voice narration. Understand anything in seconds — not hours.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-3"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(12px)",
              transition: "all 700ms cubic-bezier(0.16,1,0.3,1) 500ms",
            }}
          >
            <button
              onClick={() => navigate("/auth")}
              className="w-full sm:w-auto bg-accent text-accent-foreground text-[14px] font-medium px-7 py-3 rounded-xl hover:opacity-90 active:scale-[0.97] transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent/20"
              style={{ animation: "pulse-glow 3s ease-in-out infinite" }}
            >
              Start Learning Free <ArrowRight size={16} />
            </button>
            <button
              onClick={() => scrollTo("#agents")}
              className="w-full sm:w-auto bg-card border border-border text-[14px] font-medium text-primary-custom px-7 py-3 rounded-xl hover:bg-background-secondary active:scale-[0.97] transition-all"
            >
              Explore Agents
            </button>
          </div>

          {/* Social proof */}
          <div
            className="mt-8 flex items-center gap-3 justify-center lg:justify-start"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "all 700ms cubic-bezier(0.16,1,0.3,1) 700ms",
            }}
          >
            <div className="flex -space-x-2">
              {["R","A","S","M"].map((l, i) => (
                <div key={l} className="w-7 h-7 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-semibold text-white" style={{ backgroundColor: ["hsl(17,62%,60%)","hsl(262,52%,55%)","hsl(200,62%,50%)","hsl(150,52%,45%)"][i] }}>
                  {l}
                </div>
              ))}
            </div>
            <p className="text-[12px] text-tertiary-custom">
              <span className="text-primary-custom font-medium">2,847</span> learners already exploring
            </p>
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="py-10 px-5">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-3 md:gap-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 100} className="text-center">
              <div className="bg-card border border-border rounded-2xl p-4 md:p-6">
                <stat.icon size={20} strokeWidth={1.5} className="text-accent mx-auto mb-2" />
                <p className="text-[clamp(1.2rem,3vw,1.8rem)] font-semibold text-primary-custom tabular-nums">
                  <Counter target={stat.target} />
                </p>
                <p className="text-[10px] md:text-[12px] text-tertiary-custom mt-0.5">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ AGENTS ═══ */}
      <section id="agents" className="py-14 px-5">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-10">
            <p className="label-text text-accent mb-2">Meet the Agents</p>
            <h2 className="text-[clamp(1.4rem,4vw,2rem)] font-semibold text-primary-custom">
              Specialized AI, not generic chatbots
            </h2>
            <p className="text-[14px] text-secondary-custom mt-2 max-w-md mx-auto">Every agent is built by a creator with real expertise — not scraped from the internet.</p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {AGENTS.map((agent, i) => (
              <Reveal key={agent.name} delay={i * 80}>
                <div className="bg-card border border-border rounded-2xl p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3" style={{ backgroundColor: `${agent.color}15` }}>
                    {agent.emoji}
                  </div>
                  <h3 className="text-[14px] font-semibold text-primary-custom">{agent.name}</h3>
                  <p className="text-[11px] text-tertiary-custom mt-0.5">{agent.role}</p>
                  <div className="mt-3 flex items-center gap-1 text-[11px] text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    Chat now <ChevronRight size={12} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-6 text-center" delay={400}>
            <button
              onClick={() => navigate("/auth")}
              className="inline-flex items-center gap-2 bg-accent/8 border border-accent/20 text-accent text-[13px] font-medium px-5 py-2.5 rounded-xl hover:bg-accent/12 active:scale-[0.97] transition-all"
            >
              <Sparkles size={14} /> Create Your Own Agent
            </button>
          </Reveal>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" className="py-14 px-5 bg-background-secondary">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-12">
            <p className="label-text text-accent mb-2">Why Discoverse</p>
            <h2 className="text-[clamp(1.4rem,4vw,2rem)] font-semibold text-primary-custom">
              Built for instant understanding
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 100}>
                <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-accent/8 flex items-center justify-center mb-4">
                    <f.icon size={20} strokeWidth={1.5} className="text-accent" />
                  </div>
                  <h3 className="text-[16px] font-semibold text-primary-custom mb-1.5">{f.title}</h3>
                  <p className="text-[13px] text-secondary-custom leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COMPARISON ═══ */}
      <section id="compare" className="py-14 px-5">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-10">
            <p className="label-text text-accent mb-2">The Difference</p>
            <h2 className="text-[clamp(1.4rem,4vw,2rem)] font-semibold text-primary-custom">
              Discoverse vs Generic AI
            </h2>
            <p className="text-[14px] text-secondary-custom mt-2">ChatGPT, Gemini, Claude — they're great at text. We're built for <span className="text-accent font-medium">understanding</span>.</p>
          </Reveal>

          <Reveal>
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-3 border-b border-border bg-background-secondary">
                <div className="p-4 text-[12px] font-medium text-tertiary-custom">Feature</div>
                <div className="p-4 text-center">
                  <div className="inline-flex items-center gap-1.5">
                    <Logo size={16} />
                    <span className="text-[12px] font-semibold text-accent">Discoverse</span>
                  </div>
                </div>
                <div className="p-4 text-center text-[12px] font-medium text-tertiary-custom">Others</div>
              </div>
              {/* Rows */}
              {COMPARE.map((row, i) => (
                <Reveal key={row.feature} delay={i * 60}>
                  <div className={`grid grid-cols-3 ${i < COMPARE.length - 1 ? "border-b border-border" : ""}`}>
                    <div className="p-3 md:p-4 text-[12px] md:text-[13px] text-primary-custom flex items-center">{row.feature}</div>
                    <div className="p-3 md:p-4 flex items-center justify-center">
                      {row.us ? (
                        <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center">
                          <Check size={14} className="text-accent" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-background-secondary flex items-center justify-center">
                          <X size={14} className="text-tertiary-custom" />
                        </div>
                      )}
                    </div>
                    <div className="p-3 md:p-4 flex items-center justify-center">
                      {row.them ? (
                        <div className="w-6 h-6 rounded-full bg-background-secondary flex items-center justify-center">
                          <Check size={14} className="text-tertiary-custom" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-background-secondary flex items-center justify-center">
                          <X size={14} className="text-tertiary-custom" />
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 3D SECTION ═══ */}
      <section className="py-14 px-5 bg-background-secondary relative overflow-hidden">
        <div className="absolute -top-10 right-0 w-48 h-48 bg-accent/3 rounded-full blur-3xl pointer-events-none" style={{ transform: `translateY(${scrollY * -0.08}px)` }} />
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center">
            <div className="bg-card border border-border rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-6 right-8 opacity-20" style={{ animation: "float-y 5s ease-in-out infinite 1s" }}>
                <Globe size={24} strokeWidth={0.8} className="text-accent" />
              </div>
              <Globe size={48} strokeWidth={0.8} className="text-accent mx-auto mb-5" />
              <h2 className="text-[clamp(1.4rem,4vw,2rem)] font-semibold text-primary-custom mb-3">
                Interactive 3D simulations
              </h2>
              <p className="text-[14px] text-secondary-custom max-w-md mx-auto mb-6 leading-relaxed">
                Real 3D models with AI step-by-step narration. Not animations — actual interactive models you can rotate, zoom, and explore.
              </p>
              <button
                onClick={() => navigate("/auth")}
                className="bg-primary text-primary-foreground text-[13px] font-medium px-6 py-2.5 rounded-xl hover:opacity-90 active:scale-[0.97] transition-all"
              >
                Try a Simulation
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-14 px-5">
        <Reveal className="max-w-2xl mx-auto text-center">
          <h2 className="text-[clamp(1.5rem,5vw,2.2rem)] font-semibold text-primary-custom mb-3">
            Ready to learn differently?
          </h2>
          <p className="text-[14px] text-secondary-custom mb-6">
            Join thousands of students using specialized AI agents to understand complex topics instantly.
          </p>
          <button
            onClick={() => navigate("/auth")}
            className="bg-accent text-accent-foreground text-[14px] font-medium px-8 py-3 rounded-xl hover:opacity-90 active:scale-[0.97] transition-all shadow-lg shadow-accent/20"
            style={{ animation: "pulse-glow 3s ease-in-out infinite" }}
          >
            Get Started Free
          </button>
        </Reveal>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer id="contact" className="border-t border-border bg-background-secondary">
        <div className="max-w-6xl mx-auto px-5 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <Logo size={24} />
                <span className="text-[15px] font-semibold text-primary-custom">Discoverse</span>
              </div>
              <p className="text-[12px] text-tertiary-custom leading-relaxed">
                AI-powered learning platform with specialized agents and 3D simulations.
              </p>
            </div>
            {/* Product */}
            <div>
              <p className="text-[11px] font-medium text-primary-custom uppercase tracking-wider mb-3">Product</p>
              <div className="space-y-2">
                {["AI Agents", "3D Simulations", "Learn Mode", "Create Agent"].map(l => (
                  <button key={l} onClick={() => navigate("/auth")} className="block text-[13px] text-secondary-custom hover:text-accent transition-colors">{l}</button>
                ))}
              </div>
            </div>
            {/* Company */}
            <div>
              <p className="text-[11px] font-medium text-primary-custom uppercase tracking-wider mb-3">Company</p>
              <div className="space-y-2">
                {[
                  { label: "About Us", href: "#" },
                  { label: "Contact", href: "mailto:iscillatechnologies@gmail.com" },
                  { label: "Become Affiliate", href: "mailto:iscillatechnologies@gmail.com?subject=Affiliate%20Partnership" },
                ].map(l => (
                  <a key={l.label} href={l.href} className="block text-[13px] text-secondary-custom hover:text-accent transition-colors">{l.label}</a>
                ))}
              </div>
            </div>
            {/* Legal */}
            <div>
              <p className="text-[11px] font-medium text-primary-custom uppercase tracking-wider mb-3">Legal</p>
              <div className="space-y-2">
                <button onClick={() => navigate("/privacy")} className="block text-[13px] text-secondary-custom hover:text-accent transition-colors">Privacy Policy</button>
                <button onClick={() => navigate("/terms")} className="block text-[13px] text-secondary-custom hover:text-accent transition-colors">Terms of Service</button>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-[12px] text-tertiary-custom">
              © {new Date().getFullYear()} Discoverse by Iscilla Technologies. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="mailto:iscillatechnologies@gmail.com" className="text-tertiary-custom hover:text-accent transition-colors">
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
