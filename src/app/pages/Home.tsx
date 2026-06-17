import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { ArrowRight, Mail, Menu, X, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";

// ─── PALETTE (minimal, neutral, premium) ───────────────────────────────────────
// Brand:  one restrained pink used sparingly for CTAs and tiny accents
// Neutrals: slate scale — text, borders, panels
const INK = "#0F172A";       // slate-900 — primary text
const TEXT = "#334155";      // slate-700 — body
const MUTED = "#64748B";     // slate-500 — meta/labels
const SUBTLE = "#94A3B8";    // slate-400 — disabled / quietest
const HAIR = "#E2E8F0";      // slate-200 — borders
const SOFT = "#F8FAFC";      // slate-50  — section bg
const PINK = "#E11D48";      // brand accent (use sparingly)
const PINK_SOFT = "#FFF1F2"; // brand accent surface

const FONT = "'Inter', system-ui, -apple-system, sans-serif";
const SERIF = "'Instrument Serif', Georgia, serif";

// ─── ILLUSTRATIONS — all neutral grays with one tiny pink accent ──────────────

function DesktopIllustration() {
  const L = "#E2E8F0";
  const L2 = "#CBD5E1";
  const L3 = "#94A3B8";
  const A = INK;
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const root = ref.current;
    const ctx = gsap.context(() => {
      // cursor: gentle float around the canvas
      gsap.to(".desk-cursor", {
        x: 20,
        y: -12,
        duration: 3.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        transformOrigin: "center",
      });
      // status bullet pulse
      gsap.to(".desk-bullet", {
        opacity: 0.35,
        duration: 1.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      // steam: rising fade
      gsap.fromTo(
        ".desk-steam",
        { opacity: 0, y: 6 },
        { opacity: 1, y: -4, duration: 2.4, ease: "sine.inOut", repeat: -1, yoyo: true, stagger: 0.3 }
      );
      // plant: gentle sway
      gsap.to(".desk-plant", {
        rotation: 2,
        transformOrigin: "180px 420px",
        duration: 3.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      // "100%" text: subtle scale breathing
      gsap.to(".desk-stat", {
        scale: 1.04,
        transformOrigin: "center",
        duration: 2.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <svg ref={ref} viewBox="0 0 1440 460" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
      {/* faint dot grid */}
      {Array.from({ length: 16 }).map((_, r) =>
        Array.from({ length: 60 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={120 + c * 20} cy={80 + r * 18} r="0.8" fill={L} opacity="0.5" />
        ))
      )}

      {/* distant wireframe — hero card with side blobs */}
      <g opacity="0.7" stroke={L} strokeWidth="1.3" fill="none">
        <rect x="380" y="120" width="680" height="160" rx="8" />
        <rect x="410" y="148" width="220" height="14" rx="4" />
        <rect x="410" y="170" width="160" height="6" rx="3" />
        <rect x="410" y="182" width="180" height="6" rx="3" />
        <rect x="410" y="218" width="90" height="26" rx="13" />
        <ellipse cx="940" cy="200" rx="80" ry="55" />
        <ellipse cx="940" cy="200" rx="44" ry="30" />
      </g>
      <g opacity="0.65" stroke={L} strokeWidth="1.3" fill="none">
        <rect x="180" y="200" width="180" height="100" rx="8" />
        <rect x="196" y="218" width="80" height="9" rx="3" />
        <rect x="196" y="234" width="120" height="5" rx="2" />
        <rect x="196" y="244" width="100" height="5" rx="2" />
        <rect x="196" y="270" width="56" height="18" rx="9" />
        <rect x="1080" y="200" width="180" height="100" rx="8" />
        <rect x="1096" y="218" width="80" height="9" rx="3" />
        <rect x="1096" y="234" width="120" height="5" rx="2" />
        <rect x="1096" y="244" width="100" height="5" rx="2" />
        <rect x="1096" y="270" width="56" height="18" rx="9" />
      </g>

      {/* tree icons */}
      <g opacity="0.6" stroke={L} strokeWidth="1.3" fill="none">
        <circle cx="80" cy="280" r="22" />
        <line x1="80" y1="302" x2="80" y2="320" />
        <circle cx="1360" cy="270" r="26" />
        <line x1="1360" y1="296" x2="1360" y2="318" />
        <circle cx="1300" cy="300" r="14" />
        <line x1="1300" y1="314" x2="1300" y2="324" />
      </g>

      {/* desk horizon */}
      <line x1="0" y1="330" x2="1440" y2="330" stroke={L2} strokeWidth="1.5" />
      <rect x="0" y="330" width="1440" height="130" fill="white" />
      <line x1="0" y1="350" x2="1440" y2="350" stroke={L} strokeWidth="0.6" opacity="0.6" />
      <line x1="0" y1="378" x2="1440" y2="378" stroke={L} strokeWidth="0.6" opacity="0.5" />

      {/* monitor */}
      <rect x="540" y="60" width="360" height="252" rx="10" stroke={L2} strokeWidth="2" fill="white" />
      <rect x="552" y="72" width="336" height="228" rx="4" stroke={L} strokeWidth="1.2" fill="none" />
      <circle cx="720" cy="68" r="2" fill={L3} />

      {/* on-screen mini ui */}
      <rect x="560" y="80" width="320" height="20" rx="3" stroke={L} strokeWidth="1" fill="none" />
      <circle className="desk-bullet" cx="570" cy="90" r="2.5" fill={A} />
      <circle cx="580" cy="90" r="2.5" fill={L3} opacity="0.6" />
      <circle cx="590" cy="90" r="2.5" fill={L3} opacity="0.35" />
      <rect x="800" y="86" width="40" height="8" rx="4" fill={L3} opacity="0.5" />

      <text className="desk-stat" x="720" y="160" textAnchor="middle" fill={L3} style={{ fontFamily: "Inter, sans-serif", fontSize: "24px", fontWeight: 700, letterSpacing: "-0.02em" }}>
        100%
      </text>
      <text x="720" y="180" textAnchor="middle" fill={L3} style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "2.5px", fontWeight: 600 }}>
        DELIVERY
      </text>

      <rect x="570" y="200" width="92" height="68" rx="5" stroke={L} strokeWidth="1" fill="none" />
      <rect x="580" y="212" width="50" height="6" rx="2" fill={L3} opacity="0.55" />
      <rect x="580" y="224" width="64" height="3" rx="1.5" fill={L} />
      <rect x="580" y="232" width="50" height="3" rx="1.5" fill={L} />
      <rect x="580" y="248" width="34" height="12" rx="6" fill={L3} opacity="0.45" />

      <rect x="674" y="200" width="92" height="68" rx="5" stroke={L} strokeWidth="1" fill="none" />
      <rect x="684" y="212" width="50" height="6" rx="2" fill={L3} opacity="0.55" />
      <rect x="684" y="224" width="64" height="3" rx="1.5" fill={L} />
      <rect x="684" y="232" width="50" height="3" rx="1.5" fill={L} />
      <rect x="684" y="248" width="34" height="12" rx="6" stroke={L3} strokeWidth="1" fill="none" />

      <rect x="778" y="200" width="92" height="68" rx="5" stroke={L} strokeWidth="1" fill="none" />
      <rect x="788" y="212" width="50" height="6" rx="2" fill={L3} opacity="0.55" />
      <rect x="788" y="224" width="64" height="3" rx="1.5" fill={L} />
      <rect x="788" y="232" width="50" height="3" rx="1.5" fill={L} />
      <rect x="788" y="248" width="34" height="12" rx="6" stroke={L3} strokeWidth="1" fill="none" />

      <path className="desk-cursor" d="M860 240 L867 254 L863 253 L861 258 L858 252 L854 254 Z" fill={A} />

      {/* stand */}
      <rect x="704" y="312" width="32" height="18" stroke={L2} strokeWidth="1.5" fill="white" />
      <ellipse cx="720" cy="332" rx="68" ry="6" stroke={L2} strokeWidth="1.5" fill="white" />

      {/* dashboard curve */}
      <path
        d="M -20 460 L -20 408 Q 200 350 720 360 Q 1240 350 1460 408 L 1460 460 Z"
        fill="white"
        stroke={L2}
        strokeWidth="1.5"
      />
      <path
        d="M 60 400 Q 400 358 720 366 Q 1040 358 1380 400"
        stroke={L}
        strokeWidth="1"
        fill="none"
        opacity="0.8"
      />

      {/* keyboard */}
      <g>
        <path
          d="M 470 408 L 970 408 L 1010 452 L 430 452 Z"
          fill="white"
          stroke={L2}
          strokeWidth="1.8"
        />
        {Array.from({ length: 14 }).map((_, i) => (
          <rect
            key={`k1-${i}`}
            x={490 + i * 33}
            y={416}
            width="26"
            height="9"
            rx="2"
            stroke={L}
            strokeWidth="1"
            fill="none"
          />
        ))}
        {Array.from({ length: 13 }).map((_, i) => (
          <rect
            key={`k2-${i}`}
            x={494 + i * 35}
            y={430}
            width="28"
            height="9"
            rx="2"
            stroke={L}
            strokeWidth="1"
            fill="none"
          />
        ))}
        <rect x="600" y="443" width="240" height="8" rx="3" stroke={L2} strokeWidth="1" fill="none" />
      </g>

      {/* hands */}
      <g stroke={L2} strokeWidth="1.5" fill="white" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 500 460 L 500 430 Q 504 410 530 408 L 575 408 Q 590 410 588 425 L 580 442 L 588 460 Z" />
        <line x1="540" y1="408" x2="540" y2="418" />
        <line x1="554" y1="408" x2="554" y2="418" />
        <line x1="568" y1="408" x2="568" y2="418" />
        <path d="M 580 442 Q 596 444 598 432" fill="none" />
      </g>
      <g stroke={L2} strokeWidth="1.5" fill="white" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 940 460 L 940 425 Q 936 410 910 408 L 865 408 Q 850 410 852 425 L 860 442 L 852 460 Z" />
        <line x1="900" y1="408" x2="900" y2="418" />
        <line x1="886" y1="408" x2="886" y2="418" />
        <line x1="872" y1="408" x2="872" y2="418" />
        <path d="M 860 442 Q 844 444 842 432" fill="none" />
      </g>

      {/* coffee */}
      <g stroke={L2} strokeWidth="1.5" fill="white" strokeLinecap="round">
        <path d="M 240 350 L 246 408 Q 248 415 256 415 L 290 415 Q 298 415 300 408 L 306 350 Z" />
        <line x1="240" y1="358" x2="306" y2="358" stroke={L} strokeWidth="1" />
        <path d="M 306 368 Q 322 370 322 386 Q 322 400 306 400" fill="none" />
        <path className="desk-steam" d="M 258 340 Q 262 332 258 324 Q 254 316 258 308" stroke={L} strokeWidth="1" fill="none" />
        <path className="desk-steam" d="M 275 340 Q 279 332 275 324" stroke={L} strokeWidth="1" fill="none" />
        <path className="desk-steam" d="M 292 340 Q 296 332 292 324 Q 288 316 292 308" stroke={L} strokeWidth="1" fill="none" />
      </g>

      {/* plant */}
      <g className="desk-plant" stroke={L2} strokeWidth="1.5" fill="white" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 1140 380 L 1148 415 Q 1149 420 1154 420 L 1206 420 Q 1211 420 1212 415 L 1220 380 Z" />
        <line x1="1140" y1="380" x2="1220" y2="380" />
        <path d="M 1180 380 L 1180 340" />
        <path d="M 1180 360 Q 1158 348 1148 322 Q 1170 326 1180 354" fill="white" />
        <path d="M 1180 348 Q 1204 338 1216 314 Q 1192 318 1180 342" fill="white" />
        <path d="M 1180 336 Q 1170 320 1172 296 Q 1186 308 1184 332" fill="white" />
      </g>

      {/* fade frame */}
      <path d="M 0 0 L 180 0 L 60 460 L 0 460 Z" fill="white" opacity="0.85" />
      <path d="M 1440 0 L 1260 0 L 1380 460 L 1440 460 Z" fill="white" opacity="0.85" />
    </svg>
  );
}

// ── tiny section illustrations — neutral line art ─────────────────────────────
function ResearchIllustration() {
  const L = HAIR, L3 = SUBTLE, A = INK;
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".rsch-node", {
        scale: 1.18,
        transformOrigin: "48px 88px",
        duration: 1.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      const path = ref.current?.querySelector(".rsch-path") as SVGPathElement | null;
      if (path) {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, { strokeDashoffset: 0, duration: 2.4, ease: "power1.inOut", repeat: -1, yoyo: true });
      }
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <svg ref={ref} viewBox="0 0 200 170" fill="none" className="w-full h-full">
      <rect x="24" y="44" width="152" height="92" rx="8" stroke={L} strokeWidth="1.2" fill="white" />
      <line x1="24" y1="62" x2="176" y2="62" stroke={L} strokeWidth="1" />
      <circle cx="32" cy="53" r="1.8" fill={L3} />
      <circle cx="38" cy="53" r="1.8" fill={L3} />
      <circle cx="44" cy="53" r="1.8" fill={L3} />
      {[48, 84, 120, 156].map((cx, i) => (
        <g key={cx} className={i === 0 ? "rsch-node" : undefined}>
          <circle cx={cx} cy="88" r="8" fill={i === 0 ? A : "none"} stroke={i === 0 ? A : L3} strokeWidth="1.2" />
          <circle cx={cx} cy="88" r="3" fill={i === 0 ? "white" : L3} />
          {i < 3 && <line x1={cx + 8} y1="88" x2={cx + 28} y2="88" stroke={L3} strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />}
        </g>
      ))}
      <rect x="38" y="104" width="22" height="3" rx="1.5" fill={L3} opacity="0.6" />
      <rect x="74" y="104" width="22" height="3" rx="1.5" fill={L} />
      <rect x="110" y="104" width="22" height="3" rx="1.5" fill={L} />
      <rect x="146" y="104" width="22" height="3" rx="1.5" fill={L} />
      <path className="rsch-path" d="M48 122 Q70 114 84 118 Q105 124 120 110 Q140 96 156 110" stroke={L3} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

function PrototypeIllustration() {
  const L = HAIR, L3 = SUBTLE, A = INK;
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".proto-arrow", {
        x: 4,
        duration: 1,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.fromTo(
        ".proto-btn",
        { opacity: 0.75 },
        { opacity: 1, duration: 1.2, ease: "sine.inOut", repeat: -1, yoyo: true }
      );
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <svg ref={ref} viewBox="0 0 200 170" fill="none" className="w-full h-full">
      <rect x="32" y="20" width="136" height="144" rx="10" stroke={L} strokeWidth="1.2" fill="white" />
      <line x1="32" y1="44" x2="168" y2="44" stroke={L} strokeWidth="1" />
      <circle cx="42" cy="32" r="1.8" fill={L3} />
      <circle cx="48" cy="32" r="1.8" fill={L3} />
      <circle cx="54" cy="32" r="1.8" fill={L3} />
      <rect x="40" y="56" width="120" height="10" rx="3" fill="#F1F5F9" />
      <rect x="40" y="74" width="54" height="40" rx="6" stroke={L3} strokeWidth="1" fill="white" />
      <rect x="47" y="82" width="32" height="6" rx="3" fill={L3} opacity="0.7" />
      <rect x="47" y="93" width="40" height="3" rx="1.5" fill={L} />
      <rect className="proto-btn" x="47" y="100" width="28" height="8" rx="4" fill={A} opacity="0.85" />
      <rect x="106" y="74" width="54" height="40" rx="6" stroke={L} strokeWidth="1" fill="white" />
      <rect x="113" y="82" width="32" height="6" rx="3" fill={L} />
      <rect x="113" y="93" width="40" height="3" rx="1.5" fill={L} />
      <rect x="113" y="100" width="28" height="8" rx="4" stroke={L3} strokeWidth="1" fill="none" />
      <g className="proto-arrow">
        <line x1="94" y1="94" x2="105" y2="94" stroke={L3} strokeWidth="1.2" />
        <polygon points="103,91 107,94 103,97" fill={L3} />
      </g>
      <rect x="40" y="122" width="120" height="32" rx="6" stroke={L} strokeWidth="1" fill="white" />
      <rect x="47" y="130" width="52" height="6" rx="3" fill={L3} opacity="0.5" />
      <rect x="47" y="142" width="106" height="3" rx="1.5" fill={L} />
    </svg>
  );
}

function UIIllustration() {
  const L = HAIR, L3 = SUBTLE, A = INK;
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ui-check",
        { scale: 0.85, transformOrigin: "93px 71px" },
        { scale: 1, duration: 1.6, ease: "sine.inOut", repeat: -1, yoyo: true }
      );
      gsap.to(".ui-dot", {
        scale: 1.4,
        transformOrigin: "72px 156px",
        duration: 1,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <svg ref={ref} viewBox="0 0 200 170" fill="none" className="w-full h-full">
      <rect x="128" y="36" width="54" height="102" rx="10" stroke={L} strokeWidth="1.2" fill="white" />
      <rect x="136" y="50" width="38" height="5" rx="2.5" fill={L} />
      <rect x="136" y="62" width="28" height="5" rx="2.5" fill={L} />
      <rect x="52" y="18" width="82" height="152" rx="14" stroke={L3} strokeWidth="1.5" fill="white" />
      <rect x="58" y="28" width="70" height="132" rx="8" fill="#F8FAFC" />
      <rect x="80" y="21" width="22" height="3.5" rx="1.5" fill={L3} />
      <rect x="58" y="28" width="70" height="22" rx="8" fill="white" />
      <rect x="64" y="36" width="42" height="5" rx="2.5" fill={L} />
      <rect x="58" y="52" width="70" height="40" fill="white" />
      <g className="ui-check">
        <circle cx="93" cy="71" r="10" stroke={A} strokeWidth="1.5" fill="none" />
        <path d="M88 70 L91 73 L99 65" stroke={A} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
      <rect x="64" y="98" width="30" height="6" rx="3" fill={L3} opacity="0.7" />
      <rect x="64" y="110" width="60" height="4" rx="2" fill={L} />
      <rect x="64" y="119" width="44" height="4" rx="2" fill={L} />
      <rect x="64" y="132" width="30" height="16" rx="8" fill={INK} />
      <rect x="100" y="132" width="24" height="16" rx="8" stroke={L3} strokeWidth="1" fill="none" />
      <circle className="ui-dot" cx="72" cy="156" r="2" fill={A} />
      <circle cx="85" cy="156" r="2" fill={L3} opacity="0.5" />
      <circle cx="98" cy="156" r="2" fill={L3} opacity="0.5" />
      <circle cx="111" cy="156" r="2" fill={L3} opacity="0.5" />
    </svg>
  );
}

function NewRentalsIllustration() {
  const L = HAIR, L3 = SUBTLE, L4 = MUTED, A = INK;
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".rent-pin", {
        y: -6,
        duration: 1.1,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.fromTo(
        ".rent-pill",
        { opacity: 0.6 },
        { opacity: 1, duration: 1.4, ease: "sine.inOut", repeat: -1, yoyo: true }
      );
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <svg ref={ref} viewBox="0 0 360 230" fill="none" className="w-full h-full">
      <rect x="118" y="10" width="110" height="210" rx="16" stroke={L3} strokeWidth="1.5" fill="white" />
      <rect x="124" y="20" width="98" height="190" rx="9" fill="#F8FAFC" />
      <rect x="160" y="13" width="26" height="3.5" rx="1.75" fill={L3} />
      <rect x="124" y="20" width="98" height="22" rx="9" fill="white" />
      <rect x="131" y="28" width="50" height="6" rx="3" fill={L} />
      <rect x="130" y="48" width="86" height="72" rx="8" fill="white" stroke={L} strokeWidth="1" />
      <rect x="130" y="48" width="86" height="36" rx="8" fill="#F1F5F9" />
      <path d="M173 51 L188 62 L158 62 Z" stroke={L4} strokeWidth="1.2" fill="none" />
      <rect x="161" y="62" width="10" height="14" rx="1.5" stroke={L4} strokeWidth="1.2" fill="none" />
      <rect x="176" y="57" width="16" height="19" rx="1.5" stroke={L4} strokeWidth="1.2" fill="none" />
      <rect x="136" y="92" width="36" height="6" rx="3" fill={L3} opacity="0.7" />
      <rect x="136" y="104" width="72" height="3" rx="1.5" fill={L} />
      <rect x="130" y="128" width="86" height="64" rx="8" fill="white" stroke={L} strokeWidth="1" />
      <rect x="130" y="128" width="86" height="30" rx="8" fill="#F1F5F9" />
      <rect x="136" y="166" width="36" height="6" rx="3" fill={L3} opacity="0.5" />
      <rect x="136" y="178" width="72" height="3" rx="1.5" fill={L} />
      <rect x="16" y="50" width="82" height="26" rx="13" stroke={L3} strokeWidth="1" fill="white" />
      <rect x="24" y="60" width="60" height="5" rx="2.5" fill={L3} opacity="0.6" />
      <rect x="16" y="90" width="82" height="26" rx="13" stroke={L} strokeWidth="1" fill="white" />
      <rect x="24" y="100" width="60" height="5" rx="2.5" fill={L} />
      <g className="rent-pill">
        <rect x="16" y="130" width="82" height="26" rx="13" stroke={A} strokeWidth="1.2" fill={SOFT} />
        <rect x="24" y="140" width="60" height="5" rx="2.5" fill={A} opacity="0.6" />
      </g>
      <g className="rent-pin">
        <circle cx="234" cy="74" r="13" stroke={L4} strokeWidth="1.2" fill="white" />
        <circle cx="234" cy="72" r="4" fill={A} />
        <line x1="234" y1="77" x2="234" y2="88" stroke={L4} strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function GallaFlexIllustration() {
  const L = HAIR, L3 = SUBTLE, L4 = MUTED, A = INK;
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".gf-minute", {
        rotation: 360,
        transformOrigin: "260px 78px",
        duration: 8,
        ease: "none",
        repeat: -1,
      });
      gsap.fromTo(
        ".gf-check",
        { scale: 0.85, transformOrigin: "208px 62px" },
        { scale: 1.05, duration: 1.4, ease: "sine.inOut", repeat: -1, yoyo: true }
      );
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <svg ref={ref} viewBox="0 0 360 230" fill="none" className="w-full h-full">
      <rect x="118" y="10" width="110" height="210" rx="16" stroke={L3} strokeWidth="1.5" fill="white" />
      <rect x="124" y="20" width="98" height="190" rx="9" fill="#F8FAFC" />
      <rect x="160" y="13" width="26" height="3.5" rx="1.75" fill={L3} />
      <rect x="124" y="20" width="98" height="22" rx="9" fill="white" />
      <rect x="131" y="28" width="58" height="6" rx="3" fill={L} />
      <rect x="130" y="48" width="86" height="72" rx="8" fill="white" stroke={L} strokeWidth="1" />
      <rect x="137" y="54" width="54" height="46" rx="3" stroke={L} strokeWidth="1" fill="#F8FAFC" />
      <circle cx="155" cy="72" r="9" stroke={L4} strokeWidth="1.2" fill="none" />
      <circle cx="170" cy="68" r="7" stroke={L} strokeWidth="1.2" fill="none" />
      <path d="M143 88 Q158 82 183 88" stroke={L4} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
      <g className="gf-check">
        <circle cx="208" cy="62" r="9" fill={A} />
        <path d="M203 62 L206 65 L213 58" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
      <rect x="130" y="128" width="86" height="72" rx="8" fill="white" stroke={L} strokeWidth="1" />
      <rect x="137" y="136" width="48" height="5" rx="2.5" fill={L3} opacity="0.6" />
      <rect x="137" y="148" width="36" height="18" rx="5" fill={INK} />
      <rect x="142" y="155" width="26" height="4" rx="2" fill="white" opacity="0.9" />
      <rect x="180" y="148" width="28" height="18" rx="5" stroke={L} strokeWidth="1" fill="white" />
      <rect x="183" y="155" width="18" height="4" rx="2" fill={L3} opacity="0.5" />
      <rect x="137" y="172" width="28" height="18" rx="5" stroke={L} strokeWidth="1" fill="white" />
      <rect x="140" y="179" width="18" height="4" rx="2" fill={L3} opacity="0.5" />
      <rect x="180" y="172" width="28" height="18" rx="5" stroke={L} strokeWidth="1" fill="white" />
      <rect x="183" y="179" width="18" height="4" rx="2" fill={L3} opacity="0.5" />
      <rect x="18" y="46" width="60" height="62" rx="10" stroke={L3} strokeWidth="1.2" fill="white" />
      <rect x="18" y="46" width="60" height="18" rx="10" fill={INK} />
      <rect x="27" y="74" width="11" height="11" rx="2" stroke={L3} strokeWidth="1" fill="white" />
      <rect x="45" y="74" width="11" height="11" rx="2" stroke={L3} strokeWidth="1" fill="white" />
      <rect x="27" y="90" width="11" height="11" rx="2" stroke={L3} strokeWidth="1" fill="white" />
      <rect x="45" y="90" width="11" height="11" rx="2" fill={A} />
      <circle cx="260" cy="78" r="26" stroke={L3} strokeWidth="1.5" fill="white" />
      <circle cx="260" cy="78" r="2" fill={INK} />
      <line x1="260" y1="78" x2="260" y2="62" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
      <line className="gf-minute" x1="260" y1="78" x2="272" y2="84" stroke={A} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ─── UI PRIMITIVES ────────────────────────────────────────────────────────────

function Eyebrow({ children }: { children: string }) {
  return (
    <p
      className="uppercase tracking-[0.18em] mb-4"
      style={{ color: MUTED, fontSize: "11px", fontWeight: 600 }}
    >
      {children}
    </p>
  );
}

function Tag({ children }: { children: string }) {
  return (
    <span
      className="inline-flex items-center px-3 py-1.5 rounded-full text-xs transition-colors cursor-default select-none"
      style={{
        background: SOFT,
        color: TEXT,
        border: `1px solid ${HAIR}`,
        fontWeight: 500,
      }}
    >
      {children}
    </span>
  );
}

function StatBlock({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div
        className="mb-1.5"
        style={{ color: INK, fontSize: "2.5rem", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1 }}
      >
        {number}
      </div>
      <div
        className="uppercase tracking-[0.15em]"
        style={{ color: MUTED, fontSize: "11px", fontWeight: 600 }}
      >
        {label}
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="min-h-screen overflow-x-hidden antialiased"
      style={{ background: "white", color: INK, fontFamily: FONT, fontFeatureSettings: '"cv11", "ss01", "ss03"' }}
    >

      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-16">
          <div className="hidden md:flex items-center gap-7 flex-1">
            {["Work", "Services", "About"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="transition-colors hover:opacity-70"
                style={{ color: TEXT, fontSize: "13px", fontWeight: 500 }}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex-1 flex justify-center">
            <span
              className="tracking-tight"
              style={{ color: INK, fontFamily: SERIF, fontSize: "1.7rem", fontWeight: 400, fontStyle: "italic" }}
            >
              jurme
            </span>
          </div>

          <div className="hidden md:flex items-center justify-end gap-6 flex-1">
            <a
              href="#contact"
              className="transition-colors hover:opacity-70"
              style={{ color: TEXT, fontSize: "13px", fontWeight: 500 }}
            >
              Contact
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2"
            style={{ color: INK }}
            aria-label="menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div
            className="md:hidden bg-white px-8 py-6 flex flex-col gap-5"
            style={{ borderTop: `1px solid ${HAIR}` }}
          >
            {["Work", "Services", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                style={{ color: INK, fontSize: "18px", fontWeight: 600 }}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="bg-white pt-20 relative overflow-hidden min-h-screen flex flex-col">
        <div className="relative z-20 flex flex-col items-center text-center px-6 pt-20 max-w-3xl mx-auto" style={{ paddingBottom: "40px" }}>
          <h1
            className="mb-6"
            style={{
              color: INK,
              fontSize: "64px",
              fontWeight: 600,
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
            }}
          >
            UX design that just{" "}
            <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}>
              feels right
            </span>{" "}
            for your users.
          </h1>

          <p
            className="mb-9 max-w-md"
            style={{
              color: MUTED,
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: 1.55,
            }}
          >
            Senior UX/UI Designer crafting digital products with clear thinking, clean interfaces, and 5-star delivery.
          </p>

          <a
            href="#work"
            className="transition-all hover:scale-[1.02]"
            style={{
              background: PINK,
              color: "white",
              padding: "14px 32px",
              borderRadius: "999px",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              boxShadow: "0 8px 24px -8px rgba(225, 29, 72, 0.4)",
            }}
          >
            View My Work
          </a>

        </div>

        <div className="relative z-10 mt-auto w-full pointer-events-none select-none">
          <DesktopIllustration />
        </div>
      </section>

      {/* ── STATS ───────────────────────────────────────────────────────── */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {[
            { number: "5+", label: "Years experience" },
            { number: "50+", label: "Projects shipped" },
            { number: "5.0", label: "Rating on Upwork & Freelancer" },
            { number: "100%", label: "Delivery rate" },
          ].map(({ number, label }, i) => (
            <div
              key={label}
              className="text-center px-6 py-4"
              style={{
                borderLeft: i > 0 ? `1px solid ${HAIR}` : "none",
              }}
            >
              <div
                style={{
                  color: INK,
                  fontSize: "56px",
                  fontWeight: 600,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  fontFamily: SERIF,
                  fontStyle: "italic",
                }}
              >
                {number}
              </div>
              <div
                className="mt-3 uppercase tracking-[0.18em]"
                style={{ color: MUTED, fontSize: "11px", fontWeight: 600 }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ────────────────────────────────────────────────────── */}
      <section id="services" className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14 text-center max-w-2xl mx-auto">
            <Eyebrow>What I do</Eyebrow>
            <h2
              style={{
                color: INK,
                fontSize: "56px",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              End-to-end design,{" "}
              <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}>
                from zero to launch
              </span>
              .
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "Strategic Rethinking",
                desc: "Going beyond aesthetics — rethinking flows, architecture, and the core product experience from first principles.",
                illustration: <ResearchIllustration />,
              },
              {
                num: "02",
                title: "Concepts & Prototyping",
                desc: "Journey mapping, user stories, and SaaS-focused concepts. From rough sketch to an interactive prototype stakeholders can test.",
                illustration: <PrototypeIllustration />,
              },
              {
                num: "03",
                title: "UX & UI Design",
                desc: "Full product design from MVP through market-ready. Accessible, scalable, and beautiful — built for real users.",
                illustration: <UIIllustration />,
              },
            ].map(({ num, title, desc, illustration }) => (
              <div
                key={num}
                className="group transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "white",
                  border: `1px solid ${HAIR}`,
                  borderRadius: "16px",
                  padding: "28px",
                  boxShadow: "0 1px 3px rgba(15, 23, 42, 0.03)",
                }}
              >
                <div
                  className="rounded-xl overflow-hidden mb-6 h-44 flex items-center justify-center"
                  style={{ background: SOFT }}
                >
                  {illustration}
                </div>
                <div
                  className="uppercase tracking-[0.15em] mb-2"
                  style={{ color: MUTED, fontSize: "11px", fontWeight: 600 }}
                >
                  {num}
                </div>
                <h3
                  className="mb-2.5"
                  style={{ color: INK, fontSize: "1.125rem", fontWeight: 600, letterSpacing: "-0.01em" }}
                >
                  {title}
                </h3>
                <p style={{ color: MUTED, fontSize: "14px", fontWeight: 400, lineHeight: 1.6 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ────────────────────────────────────────────────── */}
      <section id="work" className="py-24 px-6" style={{ background: SOFT }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-14 text-center max-w-2xl mx-auto">
            <Eyebrow>Case studies</Eyebrow>
            <h2
              style={{
                color: INK,
                fontSize: "56px",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Work that speaks{" "}
              <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}>
                for itself
              </span>
              .
            </h2>
          </div>

          {/* NewRentals */}
          <div
            className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden mb-6 transition-all duration-300 hover:shadow-md"
            style={{
              background: "white",
              border: `1px solid ${HAIR}`,
              borderRadius: "20px",
            }}
          >
            <div className="p-10 lg:p-12 flex flex-col justify-center gap-5">
              <div className="flex flex-wrap gap-2">
                <Tag>Property Platform</Tag>
                <Tag>UX + UI</Tag>
              </div>
              <h3
                style={{
                  color: INK,
                  fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                }}
              >
                NewRentals
              </h3>
              <p
                style={{ color: TEXT, fontSize: "15px", fontWeight: 400, lineHeight: 1.65, maxWidth: "32ch" }}
              >
                A full-scale property platform for finding and listing rental homes — designed for landlords and tenants, from search to booking.
              </p>
              <div className="flex flex-wrap gap-2">
                <Tag>User Research</Tag>
                <Tag>Architecture</Tag>
                <Tag>Figma</Tag>
              </div>
              <Link
                to="/case-studies/newrentals"
                className="inline-flex items-center gap-1.5 mt-2 transition-colors hover:opacity-70 w-fit"
                style={{ color: INK, fontSize: "13px", fontWeight: 600 }}
              >
                View case study <ArrowUpRight size={14} />
              </Link>
            </div>
            <div
              className="p-10 flex items-center justify-center"
              style={{ background: SOFT, borderLeft: `1px solid ${HAIR}` }}
            >
              <div className="w-full max-w-[280px] h-44">
                <NewRentalsIllustration />
              </div>
            </div>
          </div>

          {/* GallaFlex */}
          <div
            className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden transition-all duration-300 hover:shadow-md"
            style={{
              background: "white",
              border: `1px solid ${HAIR}`,
              borderRadius: "20px",
            }}
          >
            <div
              className="p-10 flex items-center justify-center order-2 lg:order-1"
              style={{ background: SOFT, borderRight: `1px solid ${HAIR}` }}
            >
              <div className="w-full max-w-[280px] h-44">
                <GallaFlexIllustration />
              </div>
            </div>
            <div className="p-10 lg:p-12 flex flex-col justify-center gap-5 order-1 lg:order-2">
              <div className="flex flex-wrap gap-2">
                <Tag>Gallery App</Tag>
                <Tag>Mobile UX</Tag>
              </div>
              <h3
                style={{
                  color: INK,
                  fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                }}
              >
                GallaFlex
              </h3>
              <p
                style={{ color: TEXT, fontSize: "15px", fontWeight: 400, lineHeight: 1.65, maxWidth: "32ch" }}
              >
                An art gallery check-in app helping visitors skip queues and schedule time slots — reducing friction without breaking the atmosphere.
              </p>
              <div className="flex flex-wrap gap-2">
                <Tag>Interaction</Tag>
                <Tag>Prototyping</Tag>
                <Tag>Accessibility</Tag>
              </div>
              <Link
                to="/case-studies/gallaflex"
                className="inline-flex items-center gap-1.5 mt-2 transition-colors hover:opacity-70 w-fit"
                style={{ color: INK, fontSize: "13px", fontWeight: 600 }}
              >
                View case study <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────────────────────────────── */}
      <section id="about" className="bg-white py-24 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Centered editorial header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Eyebrow>About me</Eyebrow>
            <h2
              className="mb-8"
              style={{
                color: INK,
                fontSize: "56px",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Design is a{" "}
              <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}>
                quiet superpower
              </span>
              .
            </h2>
            <p
              className="mx-auto"
              style={{
                color: TEXT,
                fontFamily: SERIF,
                fontStyle: "italic",
                fontSize: "22px",
                fontWeight: 400,
                lineHeight: 1.45,
                maxWidth: "36ch",
              }}
            >
              Senior UX/UI Designer from Bhutan — shaping digital products that work for real people.
            </p>
          </div>

          {/* Two-column: bio + skills list */}
          <div
            className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-16 items-start pt-12"
            style={{ borderTop: `1px solid ${HAIR}` }}
          >

            {/* Left — short bio */}
            <div>
              <Eyebrow>Bio</Eyebrow>
              <div
                className="space-y-5"
                style={{ color: TEXT, fontSize: "15px", fontWeight: 400, lineHeight: 1.75 }}
              >
                <p>
                I am UX/UI engineer based in Bhutan, working at the intersection of design, business needs, and technology, turning ideas 
                  into seamless digital experiences. Whether it’s building intuitive interfaces, refining user journeys, or creating engaging
                  visuals, I focus on making things clear, effective, and scalable for the users. 
                 
                </p>
                <p style={{ color: MUTED }}>
                   With over 6+ years of experience, I’ve designed impactful products, delivering solutions that simplify
                  complexity and drive engagement. My background in UX research, interaction design, and visual storytelling lets 
                  me balance practical execution with strategic vision to achieve results. Always open to tackling exciting design challenges—let’s connect!
                </p>
              </div>

             <div className="flex flex-wrap items-center gap-2 mt-8">
  {[
    { name: "Behance", link: "https://www.behance.net/jurme" },
    { name: "Dribbble", link: "https://dribbble.com/Jurme" },
    { name: "LinkedIn", link: "https://www.linkedin.com/in/jurme-tenzin-299892137/" },
  ].map((item) => (
    <a
      key={item.name}
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="transition-colors hover:bg-slate-50"
      style={{
        padding: "8px 14px",
        border: `1px solid ${HAIR}`,
        borderRadius: "999px",
        color: TEXT,
        fontSize: "12px",
        fontWeight: 500,
      }}
    >
      {item.name}
    </a>
  ))}
</div>
              <a
                href="mailto:gyurmey195@gmail.com"
                className="inline-flex items-center gap-1.5 mt-5 transition-colors hover:opacity-70"
                style={{ color: MUTED, fontSize: "13px", fontWeight: 500 }}
              >
                <Mail size={13} /> gyurmey195@gmail.com
              </a>
            </div>

            {/* Right — skills as an editorial list */}
            <div>
              <Eyebrow>Skills & toolkit</Eyebrow>
              <div className="grid grid-cols-2 gap-x-8">
                {[
                  "User Research",
                  "Figma",
                  "Information Architecture",
                  "Prototyping",
                  "Interaction Design",
                  "Design Systems",
                  "Visual Design",
                  "Journey Mapping",
                  "Accessibility",
                  "Usability Testing",
                  "Content Strategy",
                  "UX Writing",
                ].map((skill) => (
                  <div
                    key={skill}
                    className="py-3"
                    style={{ borderBottom: `1px solid ${HAIR}` }}
                  >
                    <span style={{ color: INK, fontSize: "13.5px", fontWeight: 500 }}>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: SOFT }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Eyebrow>Testimonials</Eyebrow>
            <h2
              style={{
                color: INK,
                fontSize: "56px",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Trusted by founders,{" "}
              <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}>
                loved by users
              </span>
              .
            </h2>
            <p
              className="mt-5 mx-auto max-w-lg"
              style={{ color: MUTED, fontSize: "15px", fontWeight: 400, lineHeight: 1.6 }}
            >
              5.0 stars on Freelancer.com — and a 100% delivery rate across 50+ shipped products.
            </p>
          </div>

          {/* Star row */}
          <div className="flex justify-center items-center gap-3 mb-14">
            {[0, 1, 2, 3, 4].map((i) => (
              <svg
                key={i}
                viewBox="0 0 32 32"
                className="w-12 h-12 md:w-16 md:h-16"
                fill={PINK}
                aria-hidden
              >
                <path d="M16 2 L19.8 12.2 L30.5 12.8 L22.2 19.6 L25 30 L16 24 L7 30 L9.8 19.6 L1.5 12.8 L12.2 12.2 Z" />
              </svg>
            ))}
          </div>

          {/* Testimonial cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                name: "Tanya Gray",
                handle: "Product Manager, eMedialinks",
                initials: "TG",
                quote: "Jurme is incredibly efficient! I'm impressed with his work and plan to return with more milestone projects. Looking forward to continuing our successful collaboration!",
              },
              {
                name: "Robert Mejia",
                handle: "CEO, Experily",
                initials: "RM",
                quote: "Jurme was great! He has a great eye for design, was very responsive, and delivered every ask.",
              },
              {
                name: "Chin Hoong Y.",
                handle: "CEO, Proatoz",
                initials: "CH",
                quote: "Jurme is a very professional UI designer who can deliver the project in Figma with very detailed design covering all scenarios.",
              },
            ].map(({ name, handle, initials, quote }) => (
              <div
                key={name}
                className="transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                style={{
                  background: "white",
                  border: `1px solid ${HAIR}`,
                  borderRadius: "16px",
                  padding: "22px",
                  boxShadow: "0 1px 3px rgba(15, 23, 42, 0.03)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: SOFT, border: `1px solid ${HAIR}`, color: MUTED, fontSize: "12px", fontWeight: 600 }}
                  >
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <div
                      className="truncate"
                      style={{ color: INK, fontSize: "14px", fontWeight: 600 }}
                    >
                      {name}
                    </div>
                    <div
                      className="truncate"
                      style={{ color: MUTED, fontSize: "12px", fontWeight: 500 }}
                    >
                      {handle}
                    </div>
                  </div>
                </div>
                <p style={{ color: TEXT, fontSize: "13.5px", fontWeight: 400, lineHeight: 1.6 }}>
                  {quote}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <Eyebrow>Get in touch</Eyebrow>
          <h2
            className="mb-5"
            style={{
              color: INK,
              fontSize: "56px",
              fontWeight: 600,
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
            }}
          >
            Got a project idea?{" "}
            <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}>
              Let&apos;s make it real
            </span>
            .
          </h2>
          <p
            className="mx-auto mb-9 max-w-md"
            style={{ color: MUTED, fontSize: "16px", fontWeight: 400, lineHeight: 1.6 }}
          >
            Open to freelance, full-time, and exciting collaborations. I&apos;d love to hear what you&apos;re building.
          </p>
          <a
            href="mailto:gyurmey195@gmail.com"
            className="inline-flex items-center gap-2 transition-all hover:scale-[1.02]"
            style={{
              background: PINK,
              color: "white",
              padding: "14px 28px",
              borderRadius: "999px",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.04em",
              boxShadow: "0 8px 24px -8px rgba(225, 29, 72, 0.4)",
            }}
          >
            <Mail size={14} />
            gyurmey195@gmail.com
            <ArrowRight size={14} />
          </a>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="py-10 px-6" style={{ borderTop: `1px solid ${HAIR}`, background: "white" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span
            style={{ color: INK, fontFamily: SERIF, fontSize: "1.2rem", fontWeight: 400, fontStyle: "italic" }}
          >
            jurme
          </span>
          <p style={{ color: SUBTLE, fontSize: "12px", fontWeight: 500 }}>
            © 2026 Jurme Tenzin · Senior UX/UI Designer · Bhutan
          </p>
        <div className="flex items-center gap-5">
  {[
    { name: "Behance", link: "https://www.behance.net/jurme" },
    { name: "Dribbble", link: "https://dribbble.com/Jurme" },
    { name: "LinkedIn", link: "https://www.linkedin.com/in/jurme-tenzin-299892137/" },
  ].map((item) => (
    <a
      key={item.name}
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="transition-colors hover:opacity-70"
      style={{
        color: MUTED,
        fontSize: "12px",
        fontWeight: 500,
      }}
    >
      {item.name}
    </a>
  ))}
</div>
        </div>
      </footer>
    </div>
  );
}
