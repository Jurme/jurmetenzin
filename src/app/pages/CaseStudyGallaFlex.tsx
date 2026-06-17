import { useEffect } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  Target,
  Smile,
  Frown,
  Palette,
  Image as ImageIcon,
} from "lucide-react";

// ─── PALETTE (shared tokens, identical to Home & NewRentals) ──────────────────
const INK = "#0F172A";
const TEXT = "#334155";
const MUTED = "#64748B";
const SUBTLE = "#94A3B8";
const HAIR = "#E2E8F0";
const SOFT = "#F8FAFC";
const PINK = "#E11D48";

const FONT = "'Inter', system-ui, -apple-system, sans-serif";
const SERIF = "'Instrument Serif', Georgia, serif";

// ─── SHARED PRIMITIVES ────────────────────────────────────────────────────────

function Eyebrow({ children }: { children: string }) {
  return (
    <p
      className="uppercase tracking-[0.18em]"
      style={{ color: MUTED, fontSize: "11px", fontWeight: 600 }}
    >
      {children}
    </p>
  );
}

function ScoreBadge({ score }: { score: 1 | 2 | 3 }) {
  const styles = {
    1: { background: INK, color: "white", border: "none" },
    2: { background: HAIR, color: INK, border: "none" },
    3: { background: "white", color: SUBTLE, border: `1px solid ${HAIR}` },
  } as const;
  return (
    <span
      style={{
        ...styles[score],
        padding: "3px 9px",
        borderRadius: 6,
        fontSize: "11px",
        fontWeight: 600,
        display: "inline-block",
        minWidth: 24,
        textAlign: "center",
      }}
    >
      {score}
    </span>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function CaseStudyGallaFlex() {
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
            to="/case-studies/newrentals"
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
        <section className="pt-32 pb-16 px-6 max-w-6xl mx-auto">
          <div className="mb-12">
            <div
              className="inline-flex items-center gap-2 mb-7"
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
              UX Case Study
            </div>

            <h1
              className="mb-6"
              style={{
                color: INK,
                fontSize: "64px",
                fontWeight: 600,
                letterSpacing: "-0.045em",
                lineHeight: 1.05,
              }}
            >
              Reimagining the<br />
              <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, color: PINK }}>
                Art Gallery
              </span>{" "}
              experience.
            </h1>

            <p
              className="max-w-2xl"
              style={{ color: MUTED, fontSize: "16px", fontWeight: 400, lineHeight: 1.6 }}
            >
              GallaFlex streamlines exhibition discovery and check-ins — helping art enthusiasts immerse
              themselves without the logistical hassle.
            </p>
          </div>

          {/* Metadata grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
            {[
              { label: "Role", value: "Product Designer" },
              { label: "Timeline", value: "4-week sprint" },
              { label: "Platform", value: "iOS & Android" },
              { label: "Tools", value: "Figma, Miro" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="p-6"
                style={{ background: SOFT, border: `1px solid ${HAIR}`, borderRadius: 18 }}
              >
                <p
                  className="uppercase tracking-wider mb-2"
                  style={{ color: MUTED, fontSize: "10.5px", fontWeight: 600 }}
                >
                  {label}
                </p>
                <p style={{ color: INK, fontSize: "15px", fontWeight: 600, letterSpacing: "-0.01em" }}>
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Hero cover placeholder */}
          <div
            className="aspect-video flex items-center justify-center relative overflow-hidden"
            style={{ background: SOFT, border: `1px solid ${HAIR}`, borderRadius: 28 }}
          >
            <div className="text-center">
              <div
                className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl"
                style={{ background: "white", border: `1px solid ${HAIR}` }}
              >
                <ImageIcon size={28} style={{ color: INK }} />
              </div>
              <p style={{ color: MUTED, fontSize: "13px", fontWeight: 500 }}>
                GallaFlex · Cover mockup
              </p>
            </div>
          </div>
        </section>

        {/* ── THE CHALLENGE ───────────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2
              className="mb-6"
              style={{
                color: INK,
                fontSize: "40px",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              The{" "}
              <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}>challenge</span>.
            </h2>
            <p
              className="mb-10"
              style={{ color: TEXT, fontSize: "16px", fontWeight: 400, lineHeight: 1.65 }}
            >
              Art enthusiasts often struggle to discover nearby galleries when exploring new cities. On top
              of discovery, the physical check-in process involves queuing and paper tickets — taking time
              away from the actual experience.
            </p>

            {/* Our Goal callout */}
            <div
              className="p-10 flex flex-col md:flex-row items-start gap-6"
              style={{ background: SOFT, border: `1px solid ${HAIR}`, borderRadius: 24 }}
            >
              <div
                className="hidden md:flex w-12 h-12 items-center justify-center flex-shrink-0"
                style={{ background: "white", border: `1px solid ${HAIR}`, borderRadius: 14, color: INK }}
              >
                <Target size={20} />
              </div>
              <div>
                <Eyebrow>Our goal</Eyebrow>
                <p
                  className="mt-3"
                  style={{ color: TEXT, fontSize: "16px", fontWeight: 400, lineHeight: 1.7 }}
                >
                  Design a unified platform that lets users{" "}
                  <span
                    style={{
                      background: HAIR,
                      color: INK,
                      padding: "1px 6px",
                      borderRadius: 4,
                      fontWeight: 500,
                    }}
                  >
                    discover
                  </span>{" "}
                  exhibitions based on taste,{" "}
                  <span
                    style={{
                      background: HAIR,
                      color: INK,
                      padding: "1px 6px",
                      borderRadius: 4,
                      fontWeight: 500,
                    }}
                  >
                    schedule
                  </span>{" "}
                  visits instantly, and access curation details to deepen their understanding of the art.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 01. RESEARCH ───────────────────────────────────────────────── */}
        <section
          className="py-24 px-6"
          style={{ background: SOFT, borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
        >
          <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <div className="md:sticky md:top-28">
                <p
                  className="uppercase tracking-[0.18em] mb-4"
                  style={{ color: MUTED, fontSize: "11px", fontWeight: 600 }}
                >
                  01 · Research
                </p>
                <h2
                  className="mb-5"
                  style={{
                    color: INK,
                    fontSize: "40px",
                    fontWeight: 600,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.05,
                  }}
                >
                  Understanding the{" "}
                  <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}>user</span>.
                </h2>
                <p
                  className="mb-8"
                  style={{ color: MUTED, fontSize: "16px", fontWeight: 400, lineHeight: 1.6 }}
                >
                  Interviews with art lovers helped identify friction points in the current gallery-visiting
                  experience.
                </p>

                <div
                  className="p-6"
                  style={{ background: "white", border: `1px solid ${HAIR}`, borderRadius: 18 }}
                >
                  <h4
                    className="mb-4 pb-3"
                    style={{
                      color: INK,
                      fontSize: "13px",
                      fontWeight: 600,
                      letterSpacing: "-0.005em",
                      borderBottom: `1px solid ${HAIR}`,
                    }}
                  >
                    Participant criteria
                  </h4>
                  <ul className="space-y-3">
                    {["Art enthusiasts", "Frequent travelers", "Age 18–45"].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3"
                        style={{ color: TEXT, fontSize: "14px", fontWeight: 400 }}
                      >
                        <span
                          className="block w-1.5 h-1.5 rounded-full"
                          style={{ background: INK }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 space-y-5">
              {[
                {
                  n: "1",
                  title: "Discovery is fragmented",
                  desc:
                    "Users rely on multiple disjointed sources (Google Maps, Instagram, blogs) to find galleries, leading to decision fatigue.",
                },
                {
                  n: "2",
                  title: "Logistics kill the vibe",
                  desc:
                    "Long queues and physical ticketing break the immersion before the user even sees the art.",
                },
                {
                  n: "3",
                  title: "Missing context",
                  desc:
                    "Visitors want more context about the artwork but find gallery plaques insufficient or crowded.",
                },
              ].map(({ n, title, desc }) => (
                <div
                  key={n}
                  className="p-8 transition-shadow hover:shadow-md"
                  style={{ background: "white", border: `1px solid ${HAIR}`, borderRadius: 20 }}
                >
                  <div
                    className="w-11 h-11 flex items-center justify-center mb-5"
                    style={{
                      background: INK,
                      color: "white",
                      borderRadius: 12,
                      fontSize: "15px",
                      fontWeight: 600,
                    }}
                  >
                    {n}
                  </div>
                  <h3
                    className="mb-2"
                    style={{ color: INK, fontSize: "18px", fontWeight: 600, letterSpacing: "-0.01em" }}
                  >
                    {title}
                  </h3>
                  <p style={{ color: MUTED, fontSize: "14.5px", fontWeight: 400, lineHeight: 1.6 }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 02. PERSONA ─────────────────────────────────────────────────── */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p
                className="uppercase tracking-[0.18em] mb-4"
                style={{ color: MUTED, fontSize: "11px", fontWeight: 600 }}
              >
                02 · Persona
              </p>
              <h2
                className="mb-4"
                style={{
                  color: INK,
                  fontSize: "40px",
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                }}
              >
                Meet{" "}
                <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}>Olivia</span>.
              </h2>
              <p style={{ color: MUTED, fontSize: "16px", fontWeight: 400, lineHeight: 1.6 }}>
                Findings synthesized into a primary persona to guide design decisions.
              </p>
            </div>

            <div
              className="p-8 md:p-14"
              style={{ background: SOFT, border: `1px solid ${HAIR}`, borderRadius: 28 }}
            >
              <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-start">
                {/* Left — avatar + identity */}
                <div className="md:w-1/3 flex flex-col items-center text-center">
                  <div
                    className="w-32 h-32 rounded-full flex items-center justify-center mb-6"
                    style={{
                      background: "white",
                      border: `1px solid ${HAIR}`,
                      color: INK,
                      fontFamily: SERIF,
                      fontStyle: "italic",
                      fontSize: "44px",
                      fontWeight: 400,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    O
                  </div>
                  <h3
                    className="mb-3"
                    style={{ color: INK, fontSize: "20px", fontWeight: 600, letterSpacing: "-0.02em" }}
                  >
                    Olivia, 28
                  </h3>
                  <span
                    className="mb-5"
                    style={{
                      background: INK,
                      color: "white",
                      padding: "5px 14px",
                      borderRadius: 999,
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                    }}
                  >
                    The Creative Explorer
                  </span>
                  <p
                    className="pl-4"
                    style={{
                      color: INK,
                      fontFamily: SERIF,
                      fontStyle: "italic",
                      fontSize: "17px",
                      fontWeight: 400,
                      lineHeight: 1.45,
                      borderLeft: `2px solid ${PINK}`,
                      textAlign: "left",
                    }}
                  >
                    &ldquo;I want to immerse myself in the art world without the hassle of logistics.&rdquo;
                  </p>
                </div>

                {/* Right — goals/frustrations + empathy strip */}
                <div className="md:w-2/3 grid md:grid-cols-2 gap-5">
                  <div
                    className="p-6"
                    style={{ background: "white", border: `1px solid ${HAIR}`, borderRadius: 18 }}
                  >
                    <h4
                      className="mb-4 flex items-center gap-2"
                      style={{ color: INK, fontSize: "14px", fontWeight: 600 }}
                    >
                      <Smile size={15} style={{ color: MUTED }} /> Goals
                    </h4>
                    <ul className="space-y-2.5">
                      {[
                        "Understand art history instantly.",
                        "Check in seamlessly via mobile.",
                        "Find hidden gems nearby.",
                      ].map((g) => (
                        <li
                          key={g}
                          className="flex gap-3"
                          style={{ color: TEXT, fontSize: "14px", fontWeight: 400, lineHeight: 1.55 }}
                        >
                          <span
                            className="block w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                            style={{ background: SUBTLE }}
                          />
                          {g}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className="p-6"
                    style={{ background: "white", border: `1px solid ${HAIR}`, borderRadius: 18 }}
                  >
                    <h4
                      className="mb-4 flex items-center gap-2"
                      style={{ color: INK, fontSize: "14px", fontWeight: 600 }}
                    >
                      <Frown size={15} style={{ color: PINK }} /> Frustrations
                    </h4>
                    <ul className="space-y-2.5">
                      {[
                        "Galleries closed unexpectedly.",
                        "Paper tickets and long lines.",
                        "Overcrowded spaces.",
                      ].map((f) => (
                        <li
                          key={f}
                          className="flex gap-3"
                          style={{ color: TEXT, fontSize: "14px", fontWeight: 400, lineHeight: 1.55 }}
                        >
                          <span
                            className="block w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                            style={{ background: PINK }}
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Mini empathy strip */}
                  <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { label: "Says", quote: "I want connection." },
                      { label: "Thinks", quote: "Needs convenience." },
                      { label: "Does", quote: "Shares on social." },
                      { label: "Feels", quote: "Inspired yet annoyed." },
                    ].map(({ label, quote }) => (
                      <div
                        key={label}
                        className="p-4 text-center"
                        style={{ background: "white", border: `1px solid ${HAIR}`, borderRadius: 14 }}
                      >
                        <p
                          className="uppercase mb-1.5 tracking-wider"
                          style={{ color: MUTED, fontSize: "10px", fontWeight: 600 }}
                        >
                          {label}
                        </p>
                        <p
                          style={{
                            color: INK,
                            fontFamily: SERIF,
                            fontStyle: "italic",
                            fontSize: "13px",
                            fontWeight: 400,
                            lineHeight: 1.4,
                          }}
                        >
                          &ldquo;{quote}&rdquo;
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 03. USABILITY TESTING ───────────────────────────────────────── */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <div className="md:sticky md:top-28">
                <p
                  className="uppercase tracking-[0.18em] mb-4"
                  style={{ color: MUTED, fontSize: "11px", fontWeight: 600 }}
                >
                  03 · Testing
                </p>
                <h2
                  className="mb-5"
                  style={{
                    color: INK,
                    fontSize: "40px",
                    fontWeight: 600,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.05,
                  }}
                >
                  Usability{" "}
                  <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}>sessions</span>.
                </h2>
                <p
                  className="mb-8"
                  style={{ color: MUTED, fontSize: "16px", fontWeight: 400, lineHeight: 1.6 }}
                >
                  Detailed observations from session notes, scored per task.
                </p>

                <div
                  className="p-6"
                  style={{ background: SOFT, border: `1px solid ${HAIR}`, borderRadius: 18 }}
                >
                  <Eyebrow>Score legend</Eyebrow>
                  <div className="space-y-3 mt-4">
                    {[
                      { label: "Easy to complete", score: 1 as const },
                      { label: "Completed with difficulty", score: 2 as const },
                      { label: "Not completed", score: 3 as const },
                    ].map(({ label, score }) => (
                      <div key={score} className="flex items-center justify-between">
                        <span style={{ color: TEXT, fontSize: "13px", fontWeight: 400 }}>{label}</span>
                        <ScoreBadge score={score} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-8 space-y-8">
              {[
                {
                  name: "Nina",
                  initials: "N",
                  rows: [
                    {
                      prompt: "Open the app and search for art galleries in your area.",
                      path: "Home → Search by name → scroll listing",
                      notes: [
                        "Looking for list-view switch.",
                        "Ignored “current location” feature.",
                      ],
                      quote: "Oh, this is map view. I need list view like Airbnb.",
                      score: 1 as const,
                    },
                    {
                      prompt: "See the details of a specific art gallery.",
                      path: "Home → Search → scroll → filters → click card",
                      notes: ["Took time to scroll.", "Struggled with filters."],
                      quote: "Hmm, I can scroll, but it took time to figure out.",
                      score: 2 as const,
                    },
                    {
                      prompt: "Schedule a visit with an art gallery owner.",
                      path: "… → Detail page → Schedule",
                      notes: [
                        "Confused by button label.",
                        "Didn't scroll details.",
                        "Wanted to return home.",
                      ],
                      quote: "This button seems confusing. What do I schedule?",
                      score: 2 as const,
                    },
                    {
                      prompt: "Confirm your booking.",
                      path: "… → Schedule → Confirmation",
                      notes: [],
                      quote: "Finally, I'm here. Yes, I confirm.",
                      score: 1 as const,
                    },
                  ],
                  footer:
                    "Found the map view initially confusing but liked the scheduling confirmation screen.",
                },
                {
                  name: "Sangay Wangdi",
                  initials: "S",
                  rows: [
                    {
                      prompt: "Search for art galleries in your area.",
                      path: "Home → current location → scroll listing",
                      notes: ["Didn't use search.", "Didn't use filters."],
                      quote: "Yes, on current location.",
                      score: 2 as const,
                    },
                    {
                      prompt: "See the details of a specific art gallery.",
                      path: "Home → Search → scroll → click card",
                      notes: ["Couldn't figure out how to click card initially."],
                      quote:
                        "Where do I click? Is there a button… Oh, I can click on the cards, cool.",
                      score: 2 as const,
                    },
                    {
                      prompt: "Schedule a visit with an art gallery owner.",
                      path: "… → Detail page → Schedule",
                      notes: [
                        "Took time to understand “Schedule”.",
                        "Slow to fill details.",
                      ],
                      quote: "Schedule, let's see where it leads. Okay, that's a lot of details.",
                      score: 2 as const,
                    },
                  ],
                },
              ].map(({ name, initials, rows, footer }) => (
                <div
                  key={name}
                  className="overflow-hidden"
                  style={{ background: "white", border: `1px solid ${HAIR}`, borderRadius: 24 }}
                >
                  <div
                    className="px-6 py-5 flex justify-between items-center"
                    style={{ background: SOFT, borderBottom: `1px solid ${HAIR}` }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{
                          background: "white",
                          border: `1px solid ${HAIR}`,
                          color: INK,
                          fontSize: "14px",
                          fontWeight: 600,
                        }}
                      >
                        {initials}
                      </div>
                      <div>
                        <p style={{ color: INK, fontSize: "14px", fontWeight: 600 }}>
                          Participant: {name}
                        </p>
                        <p style={{ color: MUTED, fontSize: "11.5px", fontWeight: 500 }}>
                          Full session log
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto w-full">
                    <table className="w-full text-left" style={{ minWidth: 640 }}>
                      <thead>
                        <tr style={{ borderBottom: `1px solid ${HAIR}` }}>
                          <th
                            className="px-6 py-4 uppercase tracking-wider"
                            style={{ color: MUTED, fontSize: "10.5px", fontWeight: 600, width: "26%" }}
                          >
                            Task / Prompt
                          </th>
                          <th
                            className="px-6 py-4 uppercase tracking-wider"
                            style={{ color: MUTED, fontSize: "10.5px", fontWeight: 600, width: "24%" }}
                          >
                            Click path
                          </th>
                          <th
                            className="px-6 py-4 uppercase tracking-wider"
                            style={{ color: MUTED, fontSize: "10.5px", fontWeight: 600 }}
                          >
                            Observations & quotes
                          </th>
                          <th
                            className="px-6 py-4 text-right uppercase tracking-wider"
                            style={{ color: MUTED, fontSize: "10.5px", fontWeight: 600, width: 80 }}
                          >
                            Score
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((r, i) => (
                          <tr
                            key={i}
                            style={{ borderBottom: i < rows.length - 1 ? `1px solid ${HAIR}` : "none" }}
                          >
                            <td className="px-6 py-5 align-top">
                              <p
                                className="mb-1"
                                style={{ color: INK, fontSize: "13px", fontWeight: 600 }}
                              >
                                Prompt {i + 1}
                              </p>
                              <p
                                style={{
                                  color: TEXT,
                                  fontSize: "13px",
                                  fontWeight: 400,
                                  lineHeight: 1.5,
                                }}
                              >
                                {r.prompt}
                              </p>
                            </td>
                            <td
                              className="px-6 py-5 align-top"
                              style={{
                                color: MUTED,
                                fontSize: "12px",
                                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                                lineHeight: 1.5,
                              }}
                            >
                              {r.path}
                            </td>
                            <td className="px-6 py-5 align-top">
                              {r.notes.length > 0 && (
                                <ul className="mb-2 space-y-1">
                                  {r.notes.map((n) => (
                                    <li
                                      key={n}
                                      style={{
                                        color: MUTED,
                                        fontSize: "12.5px",
                                        fontWeight: 400,
                                        lineHeight: 1.45,
                                      }}
                                    >
                                      • {n}
                                    </li>
                                  ))}
                                </ul>
                              )}
                              <p
                                className="p-3"
                                style={{
                                  background: SOFT,
                                  borderRadius: 10,
                                  color: INK,
                                  fontFamily: SERIF,
                                  fontStyle: "italic",
                                  fontSize: "13.5px",
                                  lineHeight: 1.45,
                                }}
                              >
                                &ldquo;{r.quote}&rdquo;
                              </p>
                            </td>
                            <td className="px-6 py-5 align-top text-right">
                              <ScoreBadge score={r.score} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {footer && (
                    <div
                      className="px-6 py-4"
                      style={{ background: SOFT, borderTop: `1px solid ${HAIR}` }}
                    >
                      <p style={{ color: TEXT, fontSize: "13px", fontWeight: 400 }}>
                        <strong style={{ color: INK, fontWeight: 600 }}>Additional notes:</strong>{" "}
                        {footer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 04. DESIGN SYSTEM (dark) ───────────────────────────────────── */}
        <section
          className="py-24 px-6 mx-2 md:mx-6 text-white"
          style={{ background: INK, borderRadius: 32 }}
        >
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 md:gap-14 items-center">
            <div>
              <p
                className="uppercase tracking-[0.18em] mb-4"
                style={{ color: "#94A3B8", fontSize: "11px", fontWeight: 600 }}
              >
                04 · Visuals
              </p>
              <h2
                className="mb-5"
                style={{
                  color: "white",
                  fontSize: "40px",
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                }}
              >
                The design{" "}
                <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}>system</span>.
              </h2>
              <p style={{ color: "#94A3B8", fontSize: "15px", fontWeight: 400, lineHeight: 1.6 }}>
                A clean, minimalist aesthetic that lets the art take center stage. Plenty of whitespace and a
                sophisticated neutral palette for the app UI.
              </p>
            </div>

            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Typography */}
              <div
                className="p-8"
                style={{
                  background: "#1E293B",
                  border: "1px solid #334155",
                  borderRadius: 20,
                }}
              >
                <p
                  className="uppercase mb-6"
                  style={{ color: "#94A3B8", fontSize: "11px", fontWeight: 600, letterSpacing: "0.16em" }}
                >
                  Typography
                </p>
                <span
                  className="block mb-3"
                  style={{
                    color: "white",
                    fontSize: "56px",
                    fontWeight: 600,
                    letterSpacing: "-0.04em",
                    lineHeight: 0.9,
                  }}
                >
                  Aa
                </span>
                <span style={{ color: "#E2E8F0", fontSize: "16px", fontWeight: 600 }}>Raleway</span>
                <p
                  className="mt-3"
                  style={{ color: "#64748B", fontSize: "13px", fontWeight: 400, lineHeight: 1.5 }}
                >
                  Chosen for its elegant, artistic feel.
                </p>
              </div>

              {/* Palette */}
              <div
                className="p-8"
                style={{
                  background: "#1E293B",
                  border: "1px solid #334155",
                  borderRadius: 20,
                }}
              >
                <p
                  className="uppercase mb-6 flex items-center gap-2"
                  style={{ color: "#94A3B8", fontSize: "11px", fontWeight: 600, letterSpacing: "0.16em" }}
                >
                  <Palette size={12} /> Palette
                </p>
                <div className="flex gap-3 justify-start">
                  {[
                    { hex: "#2D3748" },
                    { hex: "#8571FC" },
                    { hex: "#F7FAFC" },
                  ].map(({ hex }) => (
                    <div key={hex} className="text-center space-y-2">
                      <div
                        className="w-14 h-14 rounded-full mx-auto"
                        style={{
                          background: hex,
                          boxShadow: "0 0 0 4px #334155",
                        }}
                      />
                      <span
                        style={{ color: "#64748B", fontSize: "10.5px", fontWeight: 500, display: "block" }}
                      >
                        {hex}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FINAL DESIGNS ───────────────────────────────────────────────── */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Eyebrow>Visual design</Eyebrow>
            <h2
              className="mt-4 mb-4"
              style={{
                color: INK,
                fontSize: "40px",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
              }}
            >
              Final{" "}
              <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}>designs</span>.
            </h2>
            <p
              className="mx-auto max-w-xl"
              style={{ color: MUTED, fontSize: "16px", fontWeight: 400, lineHeight: 1.6 }}
            >
              High-fidelity screens demonstrating the core discovery and booking flows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {[
              { title: "Discovery" },
              { title: "Exhibition details", offset: true },
              { title: "Instant booking" },
            ].map(({ title, offset }) => (
              <div key={title} className={`group ${offset ? "md:mt-16" : ""}`}>
                <div
                  className="p-4 transition-transform duration-500 group-hover:-translate-y-2"
                  style={{ background: SOFT, border: `1px solid ${HAIR}`, borderRadius: 28 }}
                >
                  <div
                    className="overflow-hidden flex items-center justify-center aspect-[9/16]"
                    style={{
                      background: "white",
                      border: `4px solid white`,
                      borderRadius: 22,
                      boxShadow: "0 10px 40px -10px rgba(15, 23, 42, 0.15)",
                    }}
                  >
                    <div className="text-center">
                      <div
                        className="inline-flex items-center justify-center w-12 h-12 mb-3 rounded-2xl"
                        style={{ background: SOFT, border: `1px solid ${HAIR}` }}
                      >
                        <ImageIcon size={20} style={{ color: MUTED }} />
                      </div>
                      <p style={{ color: SUBTLE, fontSize: "12px", fontWeight: 500 }}>
                        {title} mockup
                      </p>
                    </div>
                  </div>
                </div>
                <p
                  className="text-center mt-5"
                  style={{ color: INK, fontSize: "15px", fontWeight: 600, letterSpacing: "-0.01em" }}
                >
                  {title}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── KEY TAKEAWAYS ───────────────────────────────────────────────── */}
        <section
          className="py-24 px-6"
          style={{ background: SOFT, borderTop: `1px solid ${HAIR}` }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <Eyebrow>Conclusion</Eyebrow>
            <h2
              className="mt-4 mb-7"
              style={{
                color: INK,
                fontSize: "40px",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Key{" "}
              <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}>takeaways</span>.
            </h2>
            <p
              className="mb-12 mx-auto"
              style={{
                color: TEXT,
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: 1.7,
                maxWidth: "60ch",
              }}
            >
              GallaFlex improved the experience for art enthusiasts visiting galleries by uniting discovery,
              scheduling, and curation context in a single mobile flow. Next steps include a rewards system,
              gallery itineraries, and a review feature — alongside continued usability feedback and data
              monitoring to keep refining the experience.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {["Behance", "Dribbble", "LinkedIn"].map((l) => (
                <a
                  key={l}
                  href="#"
                  style={{
                    padding: "10px 18px",
                    background: "white",
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
              className="inline-flex items-center gap-1.5 hover:opacity-70 transition-opacity"
              style={{ color: INK, fontSize: "13px", fontWeight: 600 }}
            >
              <ArrowLeft size={14} /> Back to portfolio
            </Link>
          </div>
        </section>
      </main>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="py-10 px-6" style={{ borderTop: `1px solid ${HAIR}`, background: "white" }}>
        <div className="max-w-6xl mx-auto text-center">
          <p style={{ color: SUBTLE, fontSize: "12px", fontWeight: 500 }}>
            © 2024 · GallaFlex case study · Jurme Tenzin
          </p>
        </div>
      </footer>
    </div>
  );
}
