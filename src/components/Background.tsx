"use client";

import { useEffect, useState } from "react";

/**
 * 青绿山水动态背景
 * 多层 SVG 山峦 + 流云 + 漂浮光点，纯 CSS 动画驱动，性能友好
 */
export default function Background() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* 底色渐变：深青墨夜山 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(165_40%_12%)_0%,hsl(168_46%_6%)_55%,hsl(170_50%_4%)_100%)]" />

      {/* 鎏金光晕 */}
      <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,hsl(41_66%_60%/0.18)_0%,transparent_60%)] blur-3xl animate-glow" />

      {/* 远山 SVG */}
      <svg
        className="absolute bottom-0 left-0 w-full opacity-50"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        style={{ height: "55%" }}
      >
        <defs>
          <linearGradient id="mtn-far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(160 30% 16%)" />
            <stop offset="100%" stopColor="hsl(166 40% 8%)" />
          </linearGradient>
          <linearGradient id="mtn-mid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(162 36% 22%)" />
            <stop offset="100%" stopColor="hsl(166 42% 10%)" />
          </linearGradient>
          <linearGradient id="mtn-near" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(164 40% 12%)" />
            <stop offset="100%" stopColor="hsl(168 48% 5%)" />
          </linearGradient>
        </defs>
        {/* 最远山 */}
        <path
          d="M0,280 L120,220 L260,250 L380,180 L520,230 L640,170 L780,210 L900,160 L1040,200 L1180,150 L1320,190 L1440,160 L1440,400 L0,400 Z"
          fill="url(#mtn-far)"
          className="animate-[mistMove_18s_ease-in-out_infinite]"
        />
        {/* 中山 */}
        <path
          d="M0,320 L140,260 L280,300 L420,230 L560,280 L700,220 L840,270 L980,210 L1120,260 L1260,200 L1440,250 L1440,400 L0,400 Z"
          fill="url(#mtn-mid)"
          className="animate-[mistMove_26s_ease-in-out_infinite_reverse]"
        />
        {/* 近山 */}
        <path
          d="M0,360 L160,310 L320,340 L480,290 L640,330 L800,280 L960,320 L1120,270 L1280,310 L1440,290 L1440,400 L0,400 Z"
          fill="url(#mtn-near)"
        />
      </svg>

      {/* 流云 */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-[12%] left-[5%] h-40 w-96 rounded-full bg-[radial-gradient(ellipse,hsl(40_40%_90%/0.12),transparent_70%)] blur-2xl animate-[mistMove_30s_ease-in-out_infinite]" />
        <div className="absolute top-[22%] right-[8%] h-52 w-[28rem] rounded-full bg-[radial-gradient(ellipse,hsl(158_50%_70%/0.1),transparent_70%)] blur-2xl animate-[mistMove_38s_ease-in-out_infinite_reverse]" />
        <div className="absolute top-[40%] left-[30%] h-32 w-80 rounded-full bg-[radial-gradient(ellipse,hsl(41_60%_70%/0.08),transparent_70%)] blur-2xl animate-[mistMove_44s_ease-in-out_infinite]" />
      </div>

      {/* 漂浮光点（萤火） */}
      {mounted && (
        <div className="absolute inset-0">
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="absolute block h-1 w-1 rounded-full bg-gold/70"
              style={{
                left: `${(i * 53) % 100}%`,
                top: `${(i * 37) % 100}%`,
                animation: `drift ${8 + (i % 5) * 2}s ease-in ${i * 0.7}s infinite`,
              }}
            />
          ))}
        </div>
      )}

      {/* 顶部暗角 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,hsl(168_50%_4%/0.5)_100%)]" />
    </div>
  );
}
