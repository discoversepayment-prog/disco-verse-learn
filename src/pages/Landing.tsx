import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Compass, ArrowRight, Sparkles, Bot, BookOpen, Zap, Brain, Globe, ChevronRight } from "lucide-react";

const FEATURES = [
  { icon: Bot, title: "AI Agents", desc: "Specialized agents built by creators — from thumbnail design to deep research." },
  { icon: BookOpen, title: "3D Simulations", desc: "Real 3D models with step-by-step AI narration. Understand in seconds." },
  { icon: Brain, title: "Personalized Learning", desc: "Every agent has unique personality, knowledge base & voice." },
  { icon: Zap, title: "Instant Understanding", desc: "Point-to-point explanations. No fluff. Learn in a second." },
];

const AGENTS_PREVIEW = [
  { name: "Saathi", role: "Science Guide", color: "hsl(17,62%,60%)", emoji: "🔬" },
  { name: "Thumbnail Pro", role: "YouTube Designer", color: "hsl(262,52%,55%)", emoji: "🎨" },
  { name: "Research Buddy", role: "Paper Analyst", color: "hsl(200,62%,50%)", emoji: "📚" },
  { name: "Code Sensei", role: "Dev Helper", color: "hsl(150,52%,45%)", emoji: "💻" },
];

function useInView(threshold = 0.2) {
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

function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) blur(0)" : "translateY(18px)",
        filter: visible ? "blur(0px)" : "blur(4px)",
        transition: `opacity 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, filter 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => { requestAnimationFrame(() => setHeroVisible(true)); }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border-subtle">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-14 px-5">
          <div className="flex items-center gap-2">
            <Compass size={20} strokeWidth={1.5} className="text-accent" />
            <span className="text-[16px] font-semibold text-primary-custom tracking-tight">Discoverse</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/auth")} className="text-[13px] text-secondary-custom hover:text-primary-custom transition-colors font-medium">
              Sign in
            </button>
            <button
              onClick={() => navigate("/auth")}
              className="bg-primary text-primary-foreground text-[13px] font-medium px-4 py-2 rounded-xl hover:opacity-90 active:scale-[0.97] transition-all"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-20 px-5 relative">
        <div className="max-w-3xl mx-auto text-center">
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
            Learn anything with
            <br />
            <span className="text-accent">specialized AI agents</span>
          </h1>

          <p
            className="text-[clamp(0.9rem,2vw,1.1rem)] text-secondary-custom leading-relaxed max-w-lg mx-auto mb-8"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(14px)",
              transition: "all 700ms cubic-bezier(0.16,1,0.3,1) 350ms",
            }}
          >
            Creator-built AI agents with unique personalities, 3D simulations with voice narration, and instant understanding. All in one place.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(12px)",
              transition: "all 700ms cubic-bezier(0.16,1,0.3,1) 500ms",
            }}
          >
            <button
              onClick={() => navigate("/auth")}
              className="w-full sm:w-auto bg-accent text-accent-foreground text-[14px] font-medium px-7 py-3 rounded-xl hover:opacity-90 active:scale-[0.97] transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent/20"
            >
              Start Learning <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate("/auth")}
              className="w-full sm:w-auto bg-card border border-border text-[14px] font-medium text-primary-custom px-7 py-3 rounded-xl hover:bg-background-secondary active:scale-[0.97] transition-all"
            >
              Explore Agents
            </button>
          </div>
        </div>

        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-accent/3 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Agent Cards Preview */}
      <section className="py-16 px-5">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="text-center mb-10">
            <p className="label-text text-accent mb-2">Meet the Agents</p>
            <h2 className="text-[clamp(1.4rem,4vw,2rem)] font-semibold text-primary-custom">
              Specialized AI, not generic chatbots
            </h2>
          </RevealSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {AGENTS_PREVIEW.map((agent, i) => (
              <RevealSection key={agent.name} delay={i * 80}>
                <div className="bg-card border border-border rounded-2xl p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3"
                    style={{ backgroundColor: `${agent.color}15` }}
                  >
                    {agent.emoji}
                  </div>
                  <h3 className="text-[14px] font-semibold text-primary-custom">{agent.name}</h3>
                  <p className="text-[11px] text-tertiary-custom mt-0.5">{agent.role}</p>
                  <div className="mt-3 flex items-center gap-1 text-[11px] text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    Chat now <ChevronRight size={12} />
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-5 bg-background-secondary">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="text-center mb-12">
            <p className="label-text text-accent mb-2">Why Discoverse</p>
            <h2 className="text-[clamp(1.4rem,4vw,2rem)] font-semibold text-primary-custom">
              Built for instant understanding
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FEATURES.map((f, i) => (
              <RevealSection key={f.title} delay={i * 100}>
                <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-accent/8 flex items-center justify-center mb-4">
                    <f.icon size={20} strokeWidth={1.5} className="text-accent" />
                  </div>
                  <h3 className="text-[16px] font-semibold text-primary-custom mb-1.5">{f.title}</h3>
                  <p className="text-[13px] text-secondary-custom leading-relaxed">{f.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Section */}
      <section className="py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <RevealSection className="text-center">
            <div className="bg-canvas border border-border rounded-3xl p-8 md:p-12">
              <Globe size={48} strokeWidth={0.8} className="text-accent mx-auto mb-5" />
              <h2 className="text-[clamp(1.4rem,4vw,2rem)] font-semibold text-primary-custom mb-3">
                Interactive 3D simulations
              </h2>
              <p className="text-[14px] text-secondary-custom max-w-md mx-auto mb-6 leading-relaxed">
                Real 3D models with AI-generated step-by-step narration in Hindi, English & Romanized Nepali. Understand complex topics in seconds.
              </p>
              <button
                onClick={() => navigate("/auth")}
                className="bg-primary text-primary-foreground text-[13px] font-medium px-6 py-2.5 rounded-xl hover:opacity-90 active:scale-[0.97] transition-all"
              >
                Try a Simulation
              </button>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-5 bg-background-secondary">
        <RevealSection className="max-w-2xl mx-auto text-center">
          <h2 className="text-[clamp(1.5rem,5vw,2.2rem)] font-semibold text-primary-custom mb-3">
            Ready to learn differently?
          </h2>
          <p className="text-[14px] text-secondary-custom mb-6">
            Join thousands of students using AI agents to understand complex topics instantly.
          </p>
          <button
            onClick={() => navigate("/auth")}
            className="bg-accent text-accent-foreground text-[14px] font-medium px-8 py-3 rounded-xl hover:opacity-90 active:scale-[0.97] transition-all shadow-lg shadow-accent/20"
          >
            Get Started Free
          </button>
        </RevealSection>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Compass size={16} className="text-accent" />
            <span className="text-[13px] font-medium text-primary-custom">Discoverse</span>
          </div>
          <p className="text-[12px] text-tertiary-custom">
            © {new Date().getFullYear()} Discoverse. Built with Lovable Cloud.
          </p>
        </div>
      </footer>
    </div>
  );
}
