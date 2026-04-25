import React from "react";

export default function BackgroundPattern({ showAnimation = true }: { showAnimation?: boolean }) {
  if (!showAnimation) return null;

  return (
    <div className="professional-bg-wrapper">
      <div className="professional-bg-pattern">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <style>
            {`
              @keyframes smoke-float {
                0% { transform: translateY(5px); opacity: 0; }
                40% { opacity: 1; }
                80% { opacity: 1; }
                100% { transform: translateY(-10px); opacity: 0; }
              }
              .smoke-anim-1 { animation: smoke-float 3s linear infinite; }
              .smoke-anim-2 { animation: smoke-float 4s linear infinite 1s; }
              .smoke-anim-3 { animation: smoke-float 2.5s linear infinite 0.5s; }
              
              .no-animation .smoke-anim-1,
              .no-animation .smoke-anim-2,
              .no-animation .smoke-anim-3,
              .no-animation .glass-l-anim,
              .no-animation .glass-r-anim,
              .no-animation .sparkle-anim {
                animation: none !important;
                opacity: 0.6;
              }
              
              @keyframes clink-left {
                0%, 100% { transform: translate(-15px, 5px) rotate(15deg); }
                50% { transform: translate(-5px, 0px) rotate(5deg); }
              }
              @keyframes clink-right {
                0%, 100% { transform: translate(35px, -5px) rotate(-15deg); }
                50% { transform: translate(25px, 0px) rotate(-5deg); }
              }
              @keyframes sparkle-pulse {
                0% { opacity: 0; transform: scale(0.3); }
                30%, 70% { opacity: 0.3; transform: scale(1); }
                100% { opacity: 0; transform: scale(0.3); }
              }

              .glass-l-anim { animation: clink-left 2s ease-in-out infinite; transform-origin: 25px 50px; }
              .glass-r-anim { animation: clink-right 2s ease-in-out infinite; transform-origin: 25px 50px; }
              .sparkle-anim { animation: sparkle-pulse 2s ease-in-out infinite; transform-origin: center; }
            `}
          </style>
          <defs>
            <pattern id="brutalist-pattern" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
              {/* Minimalist Coffee Cup with Brutalist Geometry */}
              <g transform="translate(20, 20) scale(0.8)" stroke="currentColor" fill="none" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
                {/* Cup Body */}
                <path d="M10,25 h40 l-5,25 h-30 Z" />
                {/* Cup Handle */}
                <path d="M50,30 h10 v15 h-15" />
                {/* Geometric Smoke */}
                <path className="smoke-anim-1" d="M20,15 v-15" strokeDasharray="5 5" />
                <path className="smoke-anim-2" d="M30,15 v-10" strokeDasharray="5 5" />
                <path className="smoke-anim-3" d="M40,15 v-15" strokeDasharray="5 5" />
              </g>

              {/* Minimalist Cheersing Martini Glasses */}
              <g transform="translate(100, 100) scale(0.6)" stroke="currentColor" fill="none" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
                {/* Left Glass tilted right */}
                <g className="glass-l-anim">
                  <polygon points="0,0 50,0 25,25" />
                  <line x1="25" y1="25" x2="25" y2="50" />
                  <line x1="10" y1="50" x2="40" y2="50" />
                </g>
                {/* Right Glass tilted left */}
                <g className="glass-r-anim">
                  <polygon points="0,0 50,0 25,25" />
                  <line x1="25" y1="25" x2="25" y2="50" />
                  <line x1="10" y1="50" x2="40" y2="50" />
                </g>
                {/* Star / Sparkle where they meet */}
                <path className="sparkle-anim" d="M42,5 l3,8 l8,3 l-8,3 l-3,8 l-3,-8 l-8,-3 l8,-3 Z" fill="currentColor" strokeWidth="1" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#brutalist-pattern)" />
        </svg>
      </div>
    </div>
  );
}
