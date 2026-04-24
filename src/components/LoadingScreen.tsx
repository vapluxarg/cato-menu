
import React from 'react';

export default function LoadingScreen() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100dvh',
      backgroundColor: 'var(--surface)',
      color: 'var(--on-surface)',
      overflow: 'hidden'
    }}>
      <div className="cup-container">
        <svg
          width="120"
          height="100"
          viewBox="0 0 120 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Steam - Enhanced but on-brand */}
          <path className="steam" d="M40 25 Q 45 15, 40 5" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
          <path className="steam" d="M60 25 Q 65 15, 60 5" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" style={{ animationDelay: '0.3s' }} />
          <path className="steam" d="M80 25 Q 85 15, 80 5" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" style={{ animationDelay: '0.6s' }} />

          {/* Cup Body - Using var(--primary) for accents */}
          <path
            className="cup-outline"
            d="M30 35 H90 V85 Q90 95, 80 95 H40 Q30 95, 30 85 Z"
            stroke="var(--on-surface)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            className="cup-handle"
            d="M90 45 H105 Q115 45, 115 60 Q115 75, 105 75 H90"
            stroke="var(--on-surface)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Liquid Fill - Using var(--primary) */}
          <mask id="cup-mask-v3">
            <path d="M30 35 H90 V85 Q90 95, 80 95 H40 Q30 95, 30 85 Z" fill="white" />
          </mask>
          
          <rect
            className="coffee-liquid-v3"
            x="30"
            y="95"
            width="60"
            height="70"
            fill="var(--primary)"
            mask="url(#cup-mask-v3)"
            style={{ opacity: 0.9 }}
          />
        </svg>
      </div>
      
      <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
        <p style={{
          fontFamily: 'var(--font-label)',
          letterSpacing: '0.25em',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          color: 'var(--on-surface)',
          opacity: 0.8
        }}>
          Preparando Cato...
        </p>
        <div className="loading-dots">
          <span></span><span></span><span></span>
        </div>
      </div>

      <style>{`
        .cup-container { position: relative; }
        
        .steam {
          animation: steam-rise 2s ease-in-out infinite;
        }

        @keyframes steam-rise {
          0% { transform: translateY(5px); opacity: 0; }
          50% { opacity: 0.4; }
          100% { transform: translateY(-25px); opacity: 0; }
        }

        .coffee-liquid-v3 {
          animation: fill-up-v3 3s ease-in-out infinite alternate;
        }

        @keyframes fill-up-v3 {
          0% { transform: translateY(0); }
          100% { transform: translateY(-55px); }
        }

        .loading-dots {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-top: 0.75rem;
        }

        .loading-dots span {
          width: 5px;
          height: 5px;
          background-color: var(--primary);
          border-radius: 50%;
          animation: dot-pulse 1.4s infinite ease-in-out both;
        }

        .loading-dots span:nth-child(1) { animation-delay: -0.32s; }
        .loading-dots span:nth-child(2) { animation-delay: -0.16s; }

        @keyframes dot-pulse {
          0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
          40% { transform: scale(1.0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}


