import { useEffect } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  Briefcase,
  Clock,
  Layers,
  Home as HomeIcon,
  Users,
  Search as SearchIcon,
  MapPin,
  GraduationCap,
  Heart,
} from "lucide-react";

// ─── PALETTE (same tokens as Home) ────────────────────────────────────────────
const INK = "#0F172A";
const TEXT = "#334155";
const MUTED = "#64748B";
const SUBTLE = "#94A3B8";
const HAIR = "#E2E8F0";
const SOFT = "#F8FAFC";
const PINK = "#E11D48";
const PINK_SOFT = "#FFF1F2";

const FONT = "'Inter', system-ui, -apple-system, sans-serif";
const SERIF = "'Instrument Serif', Georgia, serif";

// ─── Small building blocks ────────────────────────────────────────────────────

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="uppercase tracking-[0.18em]" style={{ color: MUTED, fontSize: "11px", fontWeight: 600 }}>
      {children}
    </p>
  );
}

function SectionTitle({
  eyebrow,
  title,
  accent,
  trailing,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  trailing?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center max-w-3xl mx-auto" : "max-w-3xl"}>
      {eyebrow && <div className="mb-4"><Eyebrow>{eyebrow}</Eyebrow></div>}
      <h2
        style={{
          color: INK,
          fontSize: "40px",
          fontWeight: 600,
          letterSpacing: "-0.03em",
          lineHeight: 1.08,
        }}
      >
        {title}
        {accent && (
          <>
            {" "}
            <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}>{accent}</span>
          </>
        )}
        {trailing ?? "."}
      </h2>
    </div>
  );
}

function StickyTwoCol({
  title,
  accent,
  children,
}: {
  title: string;
  accent?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <h2
              style={{
                color: INK,
                fontSize: "40px",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                marginBottom: "20px",
              }}
            >
              {title}
              {accent && (
                <>
                  {" "}
                  <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}>{accent}</span>
                </>
              )}
              .
            </h2>
            <div style={{ height: 2, width: 56, background: INK, borderRadius: 999 }} />
          </div>
        </div>
        <div className="md:col-span-7">
          <div
            className="space-y-6"
            style={{ color: TEXT, fontSize: "16px", fontWeight: 400, lineHeight: 1.65 }}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

function Donut({
  segments,
}: {
  segments: { value: number; color: string }[];
}) {
  // Build conic-gradient string from segments
  let acc = 0;
  const gradient = segments
    .map((s) => {
      const from = acc;
      acc += s.value;
      return `${s.color} ${from}% ${acc}%`;
    })
    .join(", ");
  return (
    <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
      <div className="w-full h-full rounded-full" style={{ background: `conic-gradient(${gradient})` }} />
      <div className="absolute inset-7 md:inset-10 bg-white rounded-full" />
    </div>
  );
}

function ChartCard({
  question,
  rows,
  reverse = false,
}: {
  question: string;
  rows: { label: string; value: string; color: string }[];
  reverse?: boolean;
}) {
  return (
    <div
      className="p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-14"
      style={{ background: "white", border: `1px solid ${HAIR}`, borderRadius: 20 }}
    >
      <div className={`flex-1 w-full ${reverse ? "md:order-2" : "md:order-1"}`}>
        <h4
          className="mb-6"
          style={{ color: INK, fontSize: "16px", fontWeight: 600, lineHeight: 1.4 }}
        >
          {question}
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-5 gap-x-4">
          {rows.map((r) => (
            <div key={r.label} className="flex gap-3">
              <div className="w-1 h-10 rounded-full flex-shrink-0" style={{ background: r.color }} />
              <div className="flex flex-col py-0.5">
                <span className="uppercase tracking-wide leading-none mb-1.5" style={{ color: MUTED, fontSize: "10.5px", fontWeight: 600 }}>
                  {r.label}
                </span>
                <span className="leading-none" style={{ color: INK, fontSize: "18px", fontWeight: 700, letterSpacing: "-0.02em" }}>
                  {r.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={`flex-shrink-0 ${reverse ? "md:order-1" : "md:order-2"}`}>
        <Donut
          segments={rows.map((r) => ({
            value: parseFloat(r.value),
            color: r.color,
          }))}
        />
      </div>
    </div>
  );
}

function TreeNode({ label, root, branches }: { label: string; root?: boolean; branches: string[] }) {
  return (
    <div className="flex-1 min-w-[140px] flex flex-col items-center px-2">
      <div
        className="w-full text-center mb-3 px-3 py-2.5"
        style={{
          background: root ? PINK : PINK_SOFT,
          color: root ? "white" : PINK,
          border: root ? "none" : `1px solid ${PINK}33`,
          borderRadius: 8,
          fontSize: "12.5px",
          fontWeight: 600,
        }}
      >
        {label}
      </div>
      {branches.map((b) => (
        <div key={b} className="w-full text-center mb-1.5 px-3 py-2.5" style={{ background: SOFT, color: TEXT, borderRadius: 8, fontSize: "12px", fontWeight: 500 }}>
          {b}
        </div>
      ))}
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function CaseStudyNewRentals() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <div
      className="min-h-screen bg-white overflow-x-hidden antialiased"
      style={{ color: INK, fontFamily: FONT, fontFeatureSettings: '"cv11", "ss01", "ss03"' }}
    >
      {/* ── TOP BAR ─────────────────────────────────────────────────────── */}
      <nav className="fixed top-6 left-0 w-full z-50 px-6 pointer-events-none">
        <div className="max-w-6xl mx-auto flex justify-between items-center pointer-events-auto">
          <Link
            to="/"
            className="bg-white/90 backdrop-blur-xl flex items-center gap-2 hover:bg-white transition-colors"
            style={{
              border: `1px solid ${HAIR}`,
              borderRadius: 999,
              padding: "10px 18px",
              color: INK,
              fontSize: "13px",
              fontWeight: 600,
              boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
            }}
          >
            <ArrowLeft size={14} />
            <span>Back</span>
          </Link>

          <Link
            to="/case-studies/gallaflex"
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
            style={{
              background: INK,
              color: "white",
              borderRadius: 999,
              padding: "10px 18px",
              fontSize: "13px",
              fontWeight: 600,
              boxShadow: "0 4px 14px rgba(15, 23, 42, 0.15)",
            }}
          >
            <span>Next project</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </nav>

      <main>
        {/* ── HERO ────────────────────────────────────────────────────────── */}
        <section className="pt-32 pb-16 px-6 max-w-6xl mx-auto flex flex-col items-center text-center">
          <div className="flex flex-col items-center gap-7 mb-14">
            <div
              className="inline-flex items-center gap-2"
              style={{
                background: SOFT,
                border: `1px solid ${HAIR}`,
                color: MUTED,
                fontSize: "11px",
                fontWeight: 600,
                padding: "6px 14px",
                borderRadius: 999,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              UX Case Study · 2024
            </div>

            <h1
              style={{
                color: INK,
                fontSize: "64px",
                fontWeight: 600,
                letterSpacing: "-0.045em",
                lineHeight: 0.95,
              }}
            >
              NewRentals
              <span style={{ color: SUBTLE }}>.</span>
            </h1>

            <p
              className="max-w-2xl"
              style={{
                color: MUTED,
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: 1.5,
              }}
            >
              An all-in-one ecosystem designed to{" "}
              <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, color: INK }}>
                automate the rental lifecycle
              </span>{" "}
              for owners and tenants.
            </p>
          </div>

          {/* Cover image placeholder */}
          <div
            className="w-full aspect-[16/9] md:aspect-[21/9] flex items-center justify-center relative overflow-hidden"
            style={{
              background: SOFT,
              border: `1px solid ${HAIR}`,
              borderRadius: 28,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div
                  className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl"
                  style={{ background: "white", border: `1px solid ${HAIR}` }}
                >
                  <HomeIcon size={28} style={{ color: INK }} />
                </div>
                <p style={{ color: MUTED, fontSize: "13px", fontWeight: 500 }}>NewRentals · Cover mockup</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROJECT META (Role / Duration / Toolkit) ────────────────────── */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Role */}
            <div
              className="p-8 flex flex-col justify-between h-52"
              style={{ background: SOFT, border: `1px solid ${HAIR}`, borderRadius: 24 }}
            >
              <div
                className="w-11 h-11 flex items-center justify-center"
                style={{ background: "white", border: `1px solid ${HAIR}`, borderRadius: 14 }}
              >
                <Briefcase size={18} style={{ color: INK }} />
              </div>
              <div>
                <Eyebrow>Role</Eyebrow>
                <p className="mt-2" style={{ color: INK, fontSize: "24px", fontWeight: 600, letterSpacing: "-0.02em" }}>
                  Product Designer
                </p>
              </div>
            </div>

            {/* Duration */}
            <div
              className="p-8 flex flex-col justify-between h-52"
              style={{ background: SOFT, border: `1px solid ${HAIR}`, borderRadius: 24 }}
            >
              <div
                className="w-11 h-11 flex items-center justify-center"
                style={{ background: "white", border: `1px solid ${HAIR}`, borderRadius: 14 }}
              >
                <Clock size={18} style={{ color: INK }} />
              </div>
              <div>
                <Eyebrow>Duration</Eyebrow>
                <p className="mt-2" style={{ color: INK, fontSize: "24px", fontWeight: 600, letterSpacing: "-0.02em" }}>
                  3-week sprint
                </p>
              </div>
            </div>

            {/* Toolkit */}
            <div
              className="p-8 flex flex-col justify-between h-52 relative overflow-hidden"
              style={{ background: INK, color: "white", borderRadius: 24 }}
            >
              <div
                className="w-11 h-11 flex items-center justify-center"
                style={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 14 }}
              >
                <Layers size={18} style={{ color: "white" }} />
              </div>
              <div>
                <p
                  className="uppercase tracking-[0.18em] mb-3"
                  style={{ color: "#94A3B8", fontSize: "11px", fontWeight: 600 }}
                >
                  Toolkit
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Figma", "Miro", "Trello", "Illustrator"].map((t) => (
                    <span
                      key={t}
                      style={{
                        background: "#1E293B",
                        border: "1px solid #334155",
                        borderRadius: 8,
                        padding: "5px 10px",
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "#E2E8F0",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── OVERVIEW ────────────────────────────────────────────────────── */}
        <StickyTwoCol title="Overview">
          <p>
            <strong style={{ color: INK, fontWeight: 600 }}>NewRentals</strong> is an all-in-one real estate ecosystem. It bridges the gap between disconnected manual processes and a seamless digital experience.
          </p>
          <p>
            It aims to automate the process of renting, onboarding people to properties, and managing tenants on behalf of property owners.
          </p>
        </StickyTwoCol>

        {/* ── PROBLEM ─────────────────────────────────────────────────────── */}
        <StickyTwoCol title="The" accent="problem">
          <p>
            In real estate, there&apos;s a need for a simple system that combines property rental management and a rental marketplace.
          </p>
          <p>
            Traditional methods involve a lot of{" "}
            <span style={{ background: PINK_SOFT, color: PINK, padding: "2px 8px", borderRadius: 6, fontWeight: 500 }}>
              manual work and inefficiencies
            </span>
            , causing delays and mistakes. This creates frustration for everyone involved.
          </p>
        </StickyTwoCol>

        {/* ── AUDIENCE ────────────────────────────────────────────────────── */}
        <section className="py-24 px-6" style={{ background: SOFT }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <Eyebrow>Audience</Eyebrow>
              <h2
                className="mt-4"
                style={{
                  color: INK,
                  fontSize: "40px",
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                }}
              >
                Two sides of the same{" "}
                <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}>
                  ecosystem
                </span>
                .
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  icon: <HomeIcon size={22} />,
                  title: "Property Owners",
                  desc: "Individuals who own rental properties and need effective ways to onboard tenants, manage properties, and resolve tenant-related challenges.",
                },
                {
                  icon: <Users size={22} />,
                  title: "Tenants & Seekers",
                  desc: "People searching for suitable homes to rent or currently renting. They need a streamlined way to find, apply for, and manage their rental life.",
                },
              ].map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="p-10 transition-shadow hover:shadow-md"
                  style={{ background: "white", border: `1px solid ${HAIR}`, borderRadius: 20 }}
                >
                  <div
                    className="w-14 h-14 flex items-center justify-center mb-7"
                    style={{ background: SOFT, border: `1px solid ${HAIR}`, borderRadius: 18, color: INK }}
                  >
                    {icon}
                  </div>
                  <h3 className="mb-3" style={{ color: INK, fontSize: "22px", fontWeight: 600, letterSpacing: "-0.02em" }}>
                    {title}
                  </h3>
                  <p style={{ color: TEXT, fontSize: "15px", fontWeight: 400, lineHeight: 1.65 }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ─────────────────────────────────────────────────────── */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-4 pb-8 mb-14" style={{ borderBottom: `1px solid ${HAIR}` }}>
            <h2
              style={{
                color: INK,
                fontSize: "40px",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              The{" "}
              <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}>process</span>.
            </h2>
            <p style={{ color: MUTED, fontSize: "15px", fontWeight: 400 }}>From chaos to clarity — a 3-week sprint.</p>
          </div>

          <div className="space-y-4">
            {[
              {
                num: "01",
                stage: "Discovery",
                title: "Research & empathy",
                desc: "Surveyed 50+ participants via Google Forms to understand the disconnect between property owners and tenants. Mapped pain points using Miro to visualize friction.",
                tags: ["Google Forms", "Miro"],
              },
              {
                num: "02",
                stage: "Definition",
                title: "Structure & flow",
                desc: "Synthesized research into user personas and mapped the ideal user journey. Trello was used to manage tasks and track sprint progress.",
                tags: ["Trello", "Miro"],
              },
              {
                num: "03",
                stage: "Execution",
                title: "Visual design",
                desc: "Developed a cohesive design system in Figma. Created high-fidelity mockups and interactive prototypes using Adobe Illustrator for assets.",
                tags: ["Figma", "Illustrator"],
              },
            ].map(({ num, stage, title, desc, tags }) => (
              <div
                key={num}
                className="group flex flex-col md:flex-row gap-6 md:gap-10 items-stretch p-8 transition-all hover:-translate-y-0.5"
                style={{ background: "white", border: `1px solid ${HAIR}`, borderRadius: 20 }}
              >
                <div className="md:w-24 flex-shrink-0">
                  <span
                    style={{
                      color: SUBTLE,
                      fontFamily: SERIF,
                      fontStyle: "italic",
                      fontSize: "44px",
                      lineHeight: 1,
                      fontWeight: 400,
                    }}
                  >
                    {num}
                  </span>
                </div>
                <div className="flex-1 flex flex-col md:flex-row gap-6 md:items-center">
                  <div className="flex-1">
                    <Eyebrow>{stage}</Eyebrow>
                    <h3
                      className="mt-2 mb-2"
                      style={{ color: INK, fontSize: "20px", fontWeight: 600, letterSpacing: "-0.01em" }}
                    >
                      {title}
                    </h3>
                    <p style={{ color: MUTED, fontSize: "14.5px", fontWeight: 400, lineHeight: 1.6 }}>{desc}</p>
                  </div>
                  <div className="flex md:flex-col gap-2 flex-shrink-0">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="text-center"
                        style={{
                          background: SOFT,
                          color: TEXT,
                          padding: "6px 14px",
                          borderRadius: 999,
                          fontSize: "11px",
                          fontWeight: 500,
                          border: `1px solid ${HAIR}`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── RESEARCH — INTERVIEWS ───────────────────────────────────────── */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
          <div className="max-w-3xl mb-16">
            <Eyebrow>Qualitative research</Eyebrow>
            <h2
              className="mt-4 mb-6"
              style={{
                color: INK,
                fontSize: "40px",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
              }}
            >
              User{" "}
              <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}>
                interviews
              </span>
              .
            </h2>
            <p style={{ color: TEXT, fontSize: "16px", fontWeight: 400, lineHeight: 1.6 }}>
              A screening survey helped recruit a diverse mix of property owners and tenants, leading to two sets of deep-dive interviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {[
              {
                title: "Property Owners",
                icon: <HomeIcon size={20} />,
                qs: [
                  "Most time-consuming steps in listing?",
                  "Pain points during tenant onboarding?",
                  "Tools used for communication?",
                ],
              },
              {
                title: "Tenants & Seekers",
                icon: <SearchIcon size={20} />,
                qs: [
                  "Process for finding and booking rentals?",
                  "Frustrations with searching online?",
                  "Communication methods with landlords?",
                ],
              },
            ].map(({ title, icon, qs }) => (
              <div
                key={title}
                className="p-10"
                style={{ background: SOFT, border: `1px solid ${HAIR}`, borderRadius: 20 }}
              >
                <div className="flex items-center gap-3 mb-7">
                  <div
                    className="w-11 h-11 flex items-center justify-center"
                    style={{ background: INK, color: "white", borderRadius: 14 }}
                  >
                    {icon}
                  </div>
                  <h3 style={{ color: INK, fontSize: "18px", fontWeight: 600, letterSpacing: "-0.01em" }}>{title}</h3>
                </div>
                <ul className="space-y-4">
                  {qs.map((q, i) => (
                    <li key={q} className="flex gap-4 items-start">
                      <span
                        className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: "white",
                          border: `1px solid ${HAIR}`,
                          borderRadius: 999,
                          color: MUTED,
                          fontSize: "11px",
                          fontWeight: 600,
                        }}
                      >
                        {i + 1}
                      </span>
                      <span style={{ color: TEXT, fontSize: "14.5px", fontWeight: 400, lineHeight: 1.5 }}>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Key insights dark block */}
          <div
            className="p-10 md:p-14 text-white relative overflow-hidden"
            style={{ background: INK, borderRadius: 24 }}
          >
            <h3
              className="mb-8"
              style={{ color: "white", fontSize: "24px", fontWeight: 600, letterSpacing: "-0.02em" }}
            >
              Key{" "}
              <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}>insights</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Social media is primary but messy for owners.",
                "Lack of tenant orientation leads to uncertainty.",
                "Maintenance requests are hard to track.",
                "Onboarding and move-out are manual chaos.",
                "Disjointed platforms for booking vs managing.",
              ].map((insight, i) => (
                <div
                  key={i}
                  className="p-5 flex gap-4"
                  style={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 14 }}
                >
                  <span style={{ color: "#64748B", fontSize: "13px", fontWeight: 600 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p style={{ color: "#E2E8F0", fontSize: "14.5px", fontWeight: 400, lineHeight: 1.55 }}>
                    {insight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── QUANTITATIVE RESEARCH ───────────────────────────────────────── */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
          <div className="max-w-3xl mb-16">
            <Eyebrow>Quantitative research</Eyebrow>
            <h2
              className="mt-4 mb-5"
              style={{
                color: INK,
                fontSize: "40px",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
              }}
            >
              Validating with{" "}
              <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}>
                survey data
              </span>
              .
            </h2>
            <p style={{ color: TEXT, fontSize: "16px", fontWeight: 400, lineHeight: 1.6 }}>
              An online survey via Google Forms helped surface patterns and confirm what users actually want.
            </p>
          </div>

          {/* Tenants block */}
          <div className="mb-16">
            <div className="flex items-baseline justify-between flex-wrap gap-3 mb-8 pb-4" style={{ borderBottom: `1px solid ${HAIR}` }}>
              <h3
                style={{
                  color: INK,
                  fontSize: "22px",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                }}
              >
                Tenants & home-seekers
              </h3>
              <span style={{ color: MUTED, fontSize: "13px", fontWeight: 500 }}>37 responses</span>
            </div>
            <div className="space-y-5">
              <ChartCard
                question="How satisfied are you with existing online platforms for finding rentals?"
                rows={[
                  { label: "Very Easy", value: "2 %", color: "#F4A261" },
                  { label: "Easy", value: "6 %", color: "#E9C46A" },
                  { label: "Difficult", value: "35 %", color: "#94A3B8" },
                  { label: "Very Difficult", value: "41 %", color: "#0F172A" },
                ]}
              />
              <ChartCard
                reverse
                question="How satisfied are you with current communication with landlords for maintenance?"
                rows={[
                  { label: "Very Satisfied", value: "4 %", color: "#F4A261" },
                  { label: "Satisfied", value: "8 %", color: "#E9C46A" },
                  { label: "Unsatisfied", value: "56 %", color: "#94A3B8" },
                  { label: "Very Unsatisfied", value: "32 %", color: "#0F172A" },
                ]}
              />
            </div>
          </div>

          {/* Owners block */}
          <div className="mb-12">
            <div className="flex items-baseline justify-between flex-wrap gap-3 mb-8 pb-4" style={{ borderBottom: `1px solid ${HAIR}` }}>
              <h3
                style={{
                  color: INK,
                  fontSize: "22px",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                }}
              >
                Property owners
              </h3>
              <span style={{ color: MUTED, fontSize: "13px", fontWeight: 500 }}>42 responses</span>
            </div>
            <div className="space-y-5">
              <ChartCard
                question="How challenging is the current process of listing properties and managing tenants?"
                rows={[
                  { label: "Very Easy", value: "2 %", color: "#F4A261" },
                  { label: "Easy", value: "6 %", color: "#E9C46A" },
                  { label: "Difficult", value: "35 %", color: "#94A3B8" },
                  { label: "Very Difficult", value: "41 %", color: "#0F172A" },
                ]}
              />
              <ChartCard
                reverse
                question="How satisfied are you with existing tools for onboarding tenants?"
                rows={[
                  { label: "Very Satisfied", value: "4 %", color: "#F4A261" },
                  { label: "Satisfied", value: "8 %", color: "#E9C46A" },
                  { label: "Unsatisfied", value: "56 %", color: "#94A3B8" },
                  { label: "Very Unsatisfied", value: "32 %", color: "#0F172A" },
                ]}
              />
            </div>
          </div>

          {/* Avg hours stat row */}
          <div
            className="p-8 flex flex-col md:flex-row items-center gap-8 mb-10"
            style={{ background: SOFT, border: `1px solid ${HAIR}`, borderRadius: 20 }}
          >
            <div className="flex-1">
              <h4 style={{ color: TEXT, fontSize: "16px", fontWeight: 500, lineHeight: 1.5 }}>
                Average time spent per week manually managing tenant tasks and property maintenance.
              </h4>
            </div>
            <div className="flex items-center gap-5 flex-shrink-0">
              <div className="w-1.5 h-16 rounded-full" style={{ background: PINK }} />
              <div>
                <p
                  className="uppercase tracking-wider"
                  style={{ color: MUTED, fontSize: "10.5px", fontWeight: 600 }}
                >
                  Avg. hours per week
                </p>
                <p
                  style={{ color: INK, fontSize: "44px", fontWeight: 600, fontFamily: SERIF, fontStyle: "italic", letterSpacing: "-0.03em", lineHeight: 1 }}
                >
                  4.1 hours
                </p>
              </div>
            </div>
          </div>

          {/* Survey insights dark block */}
          <div
            className="p-10 md:p-14 text-white"
            style={{ background: INK, borderRadius: 24 }}
          >
            <h3 className="mb-8" style={{ color: "white", fontSize: "26px", fontWeight: 600, letterSpacing: "-0.02em" }}>
              Survey{" "}
              <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}>
                takeaways
              </span>
            </h3>
            <div className="space-y-5 max-w-3xl">
              {[
                "There is a clear need for an all-in-one rental marketplace and management system.",
                "The booking process is manual and time-consuming.",
                "Tenants need a maintenance request system, online payments, and direct communication.",
                "Easy access to accurate information on properties and tenants is missing.",
              ].map((p, i) => (
                <div key={i} className="flex gap-5 items-start">
                  <span style={{ color: "#475569", fontSize: "20px", fontWeight: 600 }}>{i + 1}.</span>
                  <p style={{ color: "#E2E8F0", fontSize: "16px", fontWeight: 400, lineHeight: 1.6 }}>{p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── USER PERSONAS ───────────────────────────────────────────────── */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
          <div className="max-w-3xl mb-16">
            <Eyebrow>Personas</Eyebrow>
            <h2
              className="mt-4 mb-5"
              style={{
                color: INK,
                fontSize: "40px",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
              }}
            >
              Meet the{" "}
              <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}>
                people
              </span>
              .
            </h2>
            <p style={{ color: TEXT, fontSize: "16px", fontWeight: 400, lineHeight: 1.6 }}>
              Synthesized from interviews and surveys — two personas representing both sides of the platform.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                name: "Cynthia P. Cinnamon",
                initials: "CC",
                age: "40 Years",
                gender: "Female",
                status: "Married",
                edu: "Bachelor's Degree",
                loc: "Montclair, NJ",
                quote:
                  "I want a platform that makes it easy to connect with tenants, manage repairs smoothly, and handle properties more efficiently.",
                goals: [
                  "Simplify listing properties and managing tenants.",
                  "Reduce time spent on tenant inquiries and calls.",
                  "Minimize uncertainties during onboarding and move-out.",
                ],
                frustrations: [
                  "Influx of calls and inquiries, even after booking.",
                  "Tenant screening issues lead to disruptions.",
                  "Hard to manage property repair needs.",
                ],
                bio:
                  "A 40-year-old marketing professional who manages multiple rental properties. She uses social media to list rentals and is looking to streamline the entire process.",
              },
              {
                name: "John Cassius",
                initials: "JC",
                age: "28 Years",
                gender: "Male",
                status: "Married",
                edu: "Master's Degree",
                loc: "New York, NY",
                quote:
                  "As someone actively searching for a new rental, I value efficiency and convenience. I want an experience tailored to my needs.",
                goals: [
                  "Find a suitable rental quickly and easily.",
                  "Experience a transparent tenant onboarding process.",
                  "Report and manage property repairs efficiently.",
                ],
                frustrations: [
                  "Struggles to report and manage repairs promptly.",
                  "Manual onboarding and move-out feel challenging.",
                  "Disjointed platforms for booking properties.",
                ],
                bio:
                  "A 28-year-old IT professional, tech-savvy and actively searching for a new rental. He values efficiency and a seamless renting experience.",
              },
            ].map((p) => (
              <div
                key={p.name}
                className="p-8 md:p-12"
                style={{ background: SOFT, border: `1px solid ${HAIR}`, borderRadius: 28 }}
              >
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
                  <div className="lg:w-72 flex-shrink-0 flex flex-col items-center lg:items-start text-center lg:text-left">
                    <div
                      className="w-32 h-32 rounded-full flex items-center justify-center mb-6"
                      style={{
                        background: "white",
                        border: `1px solid ${HAIR}`,
                        color: INK,
                        fontFamily: SERIF,
                        fontStyle: "italic",
                        fontSize: "42px",
                        fontWeight: 400,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {p.initials}
                    </div>
                    <h3
                      className="mb-6"
                      style={{ color: INK, fontSize: "22px", fontWeight: 600, letterSpacing: "-0.02em" }}
                    >
                      {p.name}
                    </h3>
                    <div className="space-y-3 w-full">
                      {[
                        { Icon: Clock, label: `Age: ${p.age}` },
                        { Icon: Users, label: `Gender: ${p.gender}` },
                        { Icon: Heart, label: p.status },
                        { Icon: GraduationCap, label: p.edu },
                        { Icon: MapPin, label: p.loc },
                      ].map(({ Icon, label }) => (
                        <div key={label} className="flex items-center gap-3" style={{ color: TEXT, fontSize: "13px", fontWeight: 500 }}>
                          <div
                            className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                            style={{ background: "white", border: `1px solid ${HAIR}`, borderRadius: 999, color: PINK }}
                          >
                            <Icon size={13} />
                          </div>
                          <span>{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1">
                    <blockquote
                      className="mb-8 pl-5"
                      style={{
                        color: INK,
                        fontFamily: SERIF,
                        fontStyle: "italic",
                        fontSize: "22px",
                        lineHeight: 1.45,
                        fontWeight: 400,
                        borderLeft: `2px solid ${PINK}`,
                      }}
                    >
                      &ldquo;{p.quote}&rdquo;
                    </blockquote>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <Eyebrow>Goals</Eyebrow>
                        <ul className="mt-4 space-y-2.5">
                          {p.goals.map((g) => (
                            <li key={g} className="flex gap-3" style={{ color: TEXT, fontSize: "14px", fontWeight: 400, lineHeight: 1.55 }}>
                              <span className="block w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: SUBTLE }} />
                              {g}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <Eyebrow>Frustrations</Eyebrow>
                        <ul className="mt-4 space-y-2.5">
                          {p.frustrations.map((f) => (
                            <li key={f} className="flex gap-3" style={{ color: TEXT, fontSize: "14px", fontWeight: 400, lineHeight: 1.55 }}>
                              <span className="block w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: PINK }} />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div
                      className="p-5"
                      style={{ background: "white", border: `1px solid ${HAIR}`, borderRadius: 14 }}
                    >
                      <p style={{ color: MUTED, fontSize: "14px", fontWeight: 400, lineHeight: 1.6 }}>{p.bio}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── EMPATHY MAPPING ─────────────────────────────────────────────── */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
          <div className="max-w-3xl mb-16">
            <Eyebrow>Empathy</Eyebrow>
            <h2
              className="mt-4 mb-5"
              style={{
                color: INK,
                fontSize: "40px",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
              }}
            >
              Empathy{" "}
              <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}>mapping</span>.
            </h2>
            <p style={{ color: TEXT, fontSize: "16px", fontWeight: 400, lineHeight: 1.6 }}>
              Defined each audience clearly by capturing what they say, think, feel, and do — drawn from the interviews.
            </p>
          </div>

          {[
            {
              name: "Cynthia — Property Owner",
              initials: "CC",
              quadrants: [
                { label: "Says", items: ["Managing tenant inquiries is overwhelming.", "I wish there was a clear process to welcome tenants."] },
                { label: "Thinks", items: ["I need a solution to streamline property tasks.", "An integrated platform could simplify everything."] },
                { label: "Feels", items: ["Frustrated by the constant flow of calls.", "Uncertain about the tenant orientation process."] },
                { label: "Does", items: ["Uses social media to list properties.", "Spends time managing calls even after booking."] },
              ],
            },
            {
              name: "John — Tenant",
              initials: "JC",
              quadrants: [
                { label: "Says", items: ["I wish there was a clear process for moving in.", "I worry about unreliable screening and noisy neighbors."] },
                { label: "Thinks", items: ["I need a convenient way to find a rental quickly.", "A structured move-in would make me more comfortable."] },
                { label: "Feels", items: ["Overwhelmed by inquiries from landlords.", "Anxious about uncertainties moving into a new place."] },
                { label: "Does", items: ["Uses social media to search for rentals.", "Struggles to manage incoming calls from landlords."] },
              ],
            },
          ].map((p, idx) => (
            <div key={p.name} className={idx > 0 ? "mt-12" : ""}>
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: SOFT,
                    border: `1px solid ${HAIR}`,
                    color: INK,
                    fontFamily: SERIF,
                    fontStyle: "italic",
                    fontSize: "18px",
                  }}
                >
                  {p.initials}
                </div>
                <h3 style={{ color: INK, fontSize: "18px", fontWeight: 600, letterSpacing: "-0.01em" }}>{p.name}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {p.quadrants.map((q) => (
                  <div
                    key={q.label}
                    className="p-7"
                    style={{ background: SOFT, border: `1px solid ${HAIR}`, borderRadius: 20 }}
                  >
                    <h4 className="mb-4" style={{ color: INK, fontSize: "15px", fontWeight: 600 }}>
                      {q.label}
                    </h4>
                    <ul className="space-y-2.5">
                      {q.items.map((it) => (
                        <li
                          key={it}
                          className="flex gap-3"
                          style={{ color: TEXT, fontSize: "14px", fontWeight: 400, lineHeight: 1.55 }}
                        >
                          <span className="block w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: SUBTLE }} />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* ── INFORMATION ARCHITECTURE ────────────────────────────────────── */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
          <div className="max-w-3xl mb-16">
            <Eyebrow>Information architecture</Eyebrow>
            <h2
              className="mt-4 mb-5"
              style={{
                color: INK,
                fontSize: "40px",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
              }}
            >
              Mapping the{" "}
              <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}>
                structure
              </span>
              .
            </h2>
          </div>

          {/* Marketplace tree */}
          <div className="mb-16 overflow-x-auto -mx-6 px-6 md:overflow-visible md:mx-0 md:px-0">
            <div className="min-w-[820px] flex flex-col items-center">
              <div
                className="px-8 py-3 mb-8 relative z-10"
                style={{ background: PINK, color: "white", borderRadius: 10, fontSize: "14px", fontWeight: 600 }}
              >
                Marketplace
              </div>
              <div className="h-6 w-px" style={{ background: HAIR }} />
              <div className="flex justify-center w-full gap-2 pt-6 relative">
                <div className="absolute top-0 left-[8%] right-[8%] h-px" style={{ background: HAIR }} />
                {[
                  { label: "Home page", branches: ["Search", "Featured listing", "Benefits", "Contact Us"] },
                  { label: "Property listing", branches: ["Search", "Filter & sort", "Map view", "Property Details"] },
                  { label: "Rental solution", branches: ["About Us", "Pricing Plans", "Help & FAQs"] },
                  { label: "Manage Rental", branches: ["Pricing plans", "Purchase process"] },
                  { label: "Profile / login", branches: ["Create account", "Booking request", "Booking history"] },
                  { label: "Contact us", branches: [] },
                ].map((col) => (
                  <TreeNode key={col.label} label={col.label} branches={col.branches} />
                ))}
              </div>
            </div>
          </div>

          {/* Management tree */}
          <div className="overflow-x-auto -mx-6 px-6 md:overflow-visible md:mx-0 md:px-0">
            <div className="min-w-[820px] flex flex-col items-center">
              <div
                className="px-8 py-3 mb-8 relative z-10"
                style={{ background: PINK, color: "white", borderRadius: 10, fontSize: "14px", fontWeight: 600 }}
              >
                Tenant & Property Management
              </div>
              <div className="h-6 w-px" style={{ background: HAIR }} />
              <div className="flex justify-center w-full gap-2 pt-6 relative">
                <div className="absolute top-0 left-[8%] right-[8%] h-px" style={{ background: HAIR }} />
                {[
                  { label: "Dashboard", branches: ["Overview", "Income", "Vacancies"] },
                  { label: "Properties", branches: ["List view", "Add new", "Edit details"] },
                  { label: "Tenants", branches: ["Active list", "Onboarding", "Move-out"] },
                  { label: "Maintenance", branches: ["Open tickets", "History", "Schedule"] },
                  { label: "Payments", branches: ["Rent collection", "Invoices", "Reports"] },
                  { label: "Messages", branches: ["Inbox", "Templates"] },
                ].map((col) => (
                  <TreeNode key={col.label} label={col.label} branches={col.branches} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── DESIGN SYSTEM ───────────────────────────────────────────────── */}
        <section
          className="py-24 px-6 text-white"
          style={{ background: INK, borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-14 flex-wrap gap-4">
              <h2
                style={{
                  color: "white",
                  fontSize: "40px",
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                }}
              >
                Design{" "}
                <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}>system</span>.
              </h2>
              <span
                style={{
                  padding: "8px 16px",
                  borderRadius: 999,
                  border: "1px solid #334155",
                  background: "#1E293B",
                  color: "#E2E8F0",
                  fontSize: "12px",
                  fontWeight: 500,
                }}
              >
                Mini style guide
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Typography */}
              <div>
                <p className="uppercase tracking-[0.18em] mb-8" style={{ color: "#64748B", fontSize: "11px", fontWeight: 600 }}>
                  Typography
                </p>
                <div
                  className="p-10"
                  style={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 24 }}
                >
                  <span
                    className="block mb-4"
                    style={{ color: "white", fontSize: "96px", fontWeight: 600, letterSpacing: "-0.05em", lineHeight: 0.9 }}
                  >
                    Aa
                  </span>
                  <p style={{ color: "#E2E8F0", fontSize: "18px", fontWeight: 600 }}>Inter</p>
                  <p style={{ color: "#94A3B8", fontSize: "14px", fontWeight: 400, marginTop: 4 }}>
                    Regular · Medium · Semibold · Bold
                  </p>
                  <div className="mt-6 pt-6 flex items-baseline gap-4" style={{ borderTop: "1px solid #334155" }}>
                    <span style={{ color: "white", fontFamily: SERIF, fontStyle: "italic", fontSize: "44px", fontWeight: 400, letterSpacing: "-0.02em" }}>
                      Aa
                    </span>
                    <div>
                      <p style={{ color: "#E2E8F0", fontSize: "15px", fontWeight: 500 }}>Instrument Serif</p>
                      <p style={{ color: "#94A3B8", fontSize: "13px" }}>Italic for accents</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Colors */}
              <div>
                <p className="uppercase tracking-[0.18em] mb-8" style={{ color: "#64748B", fontSize: "11px", fontWeight: 600 }}>
                  Palette
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "Ink", hex: "#0F172A", bg: "#0F172A", border: "1px solid #334155" },
                    { name: "Surface", hex: "#FFFFFF", bg: "white", border: "none" },
                    { name: "Brand", hex: "#E11D48", bg: PINK, border: "none" },
                    { name: "Neutral", hex: "#64748B", bg: "#64748B", border: "1px solid #334155" },
                  ].map(({ name, hex, bg, border }) => (
                    <div key={name} className="space-y-3">
                      <div className="h-28 w-full" style={{ background: bg, border, borderRadius: 18 }} />
                      <div className="flex justify-between px-1" style={{ fontSize: "13px" }}>
                        <span style={{ color: "#E2E8F0", fontWeight: 600 }}>{name}</span>
                        <span style={{ color: "#64748B", fontWeight: 500 }}>{hex}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── VISUAL DESIGN ───────────────────────────────────────────────── */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Eyebrow>Visual design</Eyebrow>
            <h2
              className="mt-4 mb-4"
              style={{
                color: INK,
                fontSize: "40px",
                fontWeight: 600,
                letterSpacing: "-0.035em",
                lineHeight: 1.05,
              }}
            >
              From wireframes to{" "}
              <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}>
                polished pixels
              </span>
              .
            </h2>
            <p className="mx-auto max-w-xl" style={{ color: MUTED, fontSize: "16px", fontWeight: 400, lineHeight: 1.6 }}>
              High-fidelity screens incorporating the design system, ensuring accessibility and visual consistency across the web platform.
            </p>
          </div>

          <div className="space-y-10">
            {[
              {
                title: "Rental marketplace · search",
                desc: "Advanced search and filtering for prospective tenants.",
                url: "https://app.newrentals.com/dashboard/overview",
                light: true,
              },
              {
                title: "Admin · property overview",
                desc: "Comprehensive overview of properties, income, and tenant requests.",
                url: "https://newrentals.com/explore",
                light: false,
              },
            ].map(({ title, desc, url, light }) => (
              <div
                key={title}
                className="p-4 md:p-6"
                style={{ background: INK, borderRadius: 28 }}
              >
                <div
                  className="overflow-hidden aspect-[16/10] relative"
                  style={{
                    background: light ? "white" : "#1E293B",
                    border: `1px solid ${light ? HAIR : "#334155"}`,
                    borderRadius: 10,
                  }}
                >
                  <div
                    className="h-9 flex items-center px-4 gap-2"
                    style={{
                      background: light ? SOFT : "#0F172A",
                      borderBottom: `1px solid ${light ? HAIR : "#334155"}`,
                    }}
                  >
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: light ? "#E5E7EB" : "#475569" }} />
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: light ? "#E5E7EB" : "#475569" }} />
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: light ? "#E5E7EB" : "#475569" }} />
                    </div>
                    <div
                      className="flex-1 mx-3 h-5 rounded flex items-center px-2"
                      style={{
                        background: light ? "white" : "#0F172A",
                        border: `1px solid ${light ? HAIR : "#334155"}`,
                        color: light ? MUTED : "#64748B",
                        fontSize: "10px",
                        fontWeight: 500,
                      }}
                    >
                      {url}
                    </div>
                  </div>
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ color: light ? SUBTLE : "#475569", fontSize: "13px", fontWeight: 500 }}
                  >
                    [ Screen placeholder ]
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <h4 style={{ color: "white", fontSize: "20px", fontWeight: 600, letterSpacing: "-0.01em" }}>
                    {title}
                  </h4>
                  <p style={{ color: "#94A3B8", fontSize: "14px", fontWeight: 400, marginTop: 4 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CONCLUSION ──────────────────────────────────────────────────── */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
          <div
            className="p-10 md:p-16"
            style={{ background: SOFT, border: `1px solid ${HAIR}`, borderRadius: 28 }}
          >
            <h2
              className="mb-10"
              style={{
                color: INK,
                fontSize: "40px",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
              }}
            >
              In{" "}
              <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}>conclusion</span>.
            </h2>
            <div
              className="space-y-6 max-w-4xl"
              style={{ color: TEXT, fontSize: "17px", fontWeight: 400, lineHeight: 1.7 }}
            >
              <p>
                NewRentals set out to improve real estate property management and rentals by creating an all-in-one system — designed for people looking to rent homes and for property owners wanting to list rentals. The goal was to simplify the rental process and make it better for everyone involved.
              </p>
              <p>
                The platform combines an easy property marketplace, simple owner management, automated rental flows, smooth tenant onboarding, efficient management tools, and add-on features like online payments, background checks, and maintenance scheduling.
              </p>
              <p>
                Technical challenges around compatibility, scalability, and performance were balanced against constraints on time, budget, and team capacity. Data privacy, local regulation, and third-party integrations all shaped the final solution.
              </p>
              <p>
                The result: a rental experience that&apos;s more efficient, transparent, and satisfying for both property owners and renters.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="py-20 px-6" style={{ background: "white", borderTop: `1px solid ${HAIR}` }}>
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <h2
            className="mb-10"
            style={{
              color: INK,
              fontSize: "40px",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Thanks for{" "}
            <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}>scrolling</span>.
          </h2>
          <div className="flex flex-wrap gap-3 mb-10 justify-center">
            {["Behance", "Dribbble", "LinkedIn"].map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  padding: "10px 18px",
                  border: `1px solid ${HAIR}`,
                  borderRadius: 999,
                  color: TEXT,
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                {l}
              </a>
            ))}
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 mb-8 hover:opacity-70 transition-opacity"
            style={{ color: INK, fontSize: "13px", fontWeight: 600 }}
          >
            <ArrowLeft size={14} /> Back to portfolio
          </Link>
          <p style={{ color: SUBTLE, fontSize: "12px", fontWeight: 500 }}>
            © 2024 · NewRentals case study · Jurme Tenzin
          </p>
        </div>
      </footer>
    </div>
  );
}
