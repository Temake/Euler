import React from "react";

interface EulerSigmaProps {
  mood?: "happy" | "thinking" | "celebrating" | "encouraging" | "neutral";
  size?: number;
  className?: string;
}

export function EulerSigma({ mood = "happy", size = 100, className = "" }: EulerSigmaProps) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-block select-none ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={`sigma-shadow-${mood}`} x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="0" floodColor="#5b21b6" floodOpacity="1" />
          </filter>
        </defs>

        {/* 3D Tactile Rounded Container */}
        <rect
          x="10"
          y="12"
          width="80"
          height="76"
          rx="26"
          fill="#7c3aed"
          filter={`url(#sigma-shadow-${mood})`}
        />

        {/* Top Gloss Highlight */}
        <rect x="14" y="16" width="72" height="30" rx="18" fill="#8b5cf6" opacity="0.45" />

        {/* Sigma Symbol (∑) */}
        <text
          x="50"
          y="62"
          fontFamily="'Nunito', 'Segoe UI', system-ui, sans-serif"
          fontWeight="900"
          fontSize="52"
          fill="#ffffff"
          textAnchor="middle"
          dominantBaseline="central"
        >
          ∑
        </text>

        {/* Celebrating State: Gold Crown on Top */}
        {mood === "celebrating" && (
          <g transform="translate(38, 2)">
            <polygon points="12,0 3,12 21,12" fill="#ffc700" />
            <circle cx="12" cy="1" r="2.5" fill="#1cb0f6" />
          </g>
        )}

        {/* Thinking State: Sparkle Stars */}
        {mood === "thinking" && (
          <g transform="translate(72, 8)">
            <path
              d="M8 0L9.5 5.5L15 7L9.5 8.5L8 14L6.5 8.5L1 7L6.5 5.5L8 0Z"
              fill="#ffc700"
            />
          </g>
        )}

        {/* Encouraging State: Flame / Star */}
        {mood === "encouraging" && (
          <g transform="translate(74, 10)">
            <circle cx="8" cy="8" r="6" fill="#ff9600" />
            <polygon points="8,4 10,8 14,8 11,11 12,15 8,12 4,15 5,11 2,8 6,8" fill="#ffffff" />
          </g>
        )}
      </svg>
    </div>
  );
}
