import React from "react";

// Utility to produce a darker shade for gradient stops
const darkenHex = (hex, amount = 0.15) => {
  if (!hex) return hex;
  const c = hex.replace("#", "");
  const num = parseInt(c, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.round(r * (1 - amount))));
  g = Math.max(0, Math.min(255, Math.round(g * (1 - amount))));
  b = Math.max(0, Math.min(255, Math.round(b * (1 - amount))));
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, "0")}`;
};

export default function SvgClothing({ type = "coat", color = "#1a1a1a", pattern = "solid", width = "100%", height = "100%" }) {
  const darker = darkenHex(color, 0.22);

  const patternDefs = (
    <defs>
      <filter id="f_drop" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000" floodOpacity="0.18" />
      </filter>

      <linearGradient id="grad_main" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity="0.96" />
        <stop offset="100%" stopColor={darker} stopOpacity="0.98" />
      </linearGradient>

      <pattern id="p_stripes" patternUnits="userSpaceOnUse" width="12" height="12">
        <rect width="12" height="12" fill="transparent" />
        <path d="M0 0 L12 0" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
      </pattern>

      <pattern id="p_checked" patternUnits="userSpaceOnUse" width="14" height="14">
        <rect width="14" height="14" fill="transparent" />
        <path d="M0 0 L0 14" stroke="rgba(255,255,255,0.04)" strokeWidth="2" />
        <path d="M0 0 L14 0" stroke="rgba(255,255,255,0.04)" strokeWidth="2" />
      </pattern>

      <pattern id="p_floral" patternUnits="userSpaceOnUse" width="30" height="30">
        <rect width="30" height="30" fill="transparent" />
        <circle cx="7" cy="7" r="2.5" fill="rgba(255,255,255,0.08)" />
        <circle cx="22" cy="22" r="2.5" fill="rgba(255,255,255,0.08)" />
      </pattern>
    </defs>
  );

  const patternFill = pattern === "stripes" ? "url(#p_stripes)" : pattern === "checked" ? "url(#p_checked)" : pattern === "floral" ? "url(#p_floral)" : "none";

  // Smoother, slightly more detailed shapes with gradients and drop shadow
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" width={width} height={height} preserveAspectRatio="xMidYMid meet" role="img" aria-label={type}>
      {patternDefs}

      {/* soft background */}
      <rect x="0" y="0" width="400" height="600" rx="12" fill="#fafafa" />

      {/* clothing shapes */}
      {type === "coat" && (
        <g filter="url(#f_drop)" id="coat-group">
          <path d="M100 140 C110 120 140 110 200 110 C260 110 290 120 300 140 L320 320 L300 520 L100 520 L80 320 Z" fill="url(#grad_main)" stroke="#222" strokeWidth="1.6" />
          <path d="M200 130 L160 220 L200 300" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" strokeLinecap="round" />
          <g fill="#333">
            <circle cx="200" cy="200" r="5" />
            <circle cx="200" cy="260" r="5" />
            <circle cx="200" cy="320" r="5" />
            <circle cx="200" cy="380" r="5" />
            <circle cx="200" cy="440" r="5" />
          </g>
          <path d="M100 160 L40 200 L60 340 L120 320 Z" fill="url(#grad_main)" stroke="#222" strokeWidth="1.2" />
          <path d="M300 160 L360 200 L340 340 L280 320 Z" fill="url(#grad_main)" stroke="#222" strokeWidth="1.2" />
          {pattern !== "solid" && <rect x="80" y="100" width="240" height="430" fill={patternFill} opacity="0.98" />}
        </g>
      )}

      {type === "barong" && (
        <g filter="url(#f_drop)" id="barong-group">
          <path d="M110 140 C120 120 140 110 200 110 C260 110 280 120 290 140 L310 320 L290 520 L110 520 L90 320 Z" fill="url(#grad_main)" stroke="#222" strokeWidth="1.1" />
          <g stroke="rgba(200,160,0,0.28)" strokeWidth="0.9">
            <path d="M160 170 Q200 190 240 170" fill="none" />
            <path d="M150 210 Q200 240 250 210" fill="none" />
            <path d="M160 260 Q200 285 240 260" fill="none" />
          </g>
          <g fill="#C0A060">
            <circle cx="200" cy="200" r="4" />
            <circle cx="200" cy="270" r="4" />
            <circle cx="200" cy="340" r="4" />
          </g>
          <path d="M110 160 C60 140 60 220 110 260 L150 240 Z" fill="url(#grad_main)" stroke="#222" strokeWidth="1.1" />
          <path d="M290 160 C340 140 340 220 290 260 L250 240 Z" fill="url(#grad_main)" stroke="#222" strokeWidth="1.1" />
          {pattern !== "solid" && <rect x="95" y="110" width="210" height="420" fill={patternFill} opacity="0.95" />}
        </g>
      )}

      {type === "tshirt" && (
        <g filter="url(#f_drop)" id="tshirt-group">
          <path d="M80 160 C110 120 140 110 200 110 C260 110 290 120 320 160 L320 320 L280 320 L260 180 L140 180 L120 320 L80 320 Z" fill="url(#grad_main)" stroke="#222" strokeWidth="0.9" />
          <path d="M80 160 L30 190 L50 240 L120 220 Z" fill="url(#grad_main)" stroke="#222" strokeWidth="0.9" />
          <path d="M320 160 L370 190 L350 240 L280 220 Z" fill="url(#grad_main)" stroke="#222" strokeWidth="0.9" />
          <path d="M160 120 C180 100 220 100 240 120" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="6" strokeLinecap="round" />
          {pattern !== "solid" && <rect x="60" y="110" width="280" height="230" fill={patternFill} opacity="0.95" />}
        </g>
      )}

      {type === "suit" && (
        <g filter="url(#f_drop)" id="suit-group">
          <path d="M100 140 C120 110 160 100 200 100 C240 100 280 110 300 140 L320 320 L300 520 L100 520 L80 320 Z" fill="url(#grad_main)" stroke="#222" strokeWidth="1.5" />
          <path d="M200 120 L160 220 L200 300" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
          <path d="M200 170 L190 260 L200 300 L210 260 Z" fill="#7a2222" />
          <rect x="120" y="420" width="60" height="100" fill={darker} />
          <rect x="220" y="420" width="60" height="100" fill={darker} />
          {pattern !== "solid" && <rect x="90" y="110" width="220" height="320" fill={patternFill} opacity="0.95" />}
        </g>
      )}

      {type === "pants" && (
        <g filter="url(#f_drop)" id="pants-group">
          <path d="M140 140 L120 320 L140 520 L180 520 L200 320 L220 520 L260 520 L240 320 L220 140 Z" fill="url(#grad_main)" stroke="#222" strokeWidth="1.1" />
          <rect x="120" y="120" width="160" height="20" rx="4" fill={darker} />
          {pattern !== "solid" && <rect x="125" y="140" width="150" height="360" fill={patternFill} opacity="0.95" />}
        </g>
      )}

    </svg>
  );
}
