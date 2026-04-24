"use client";

import React, { useState, useEffect } from 'react';

type ExportableMenuProps = {
  theme: 'cafe' | 'bar';
  categories: any[];
  products: any[];
  id: string;
};

// Custom component to handle image inversion for html2canvas compatibility
function InvertibleImage({ src, invert, style, alt }: { src: string; invert: boolean; style: React.CSSProperties; alt?: string }) {
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    if (!invert) {
      setCurrentSrc(src);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          data[i] = 255 - data[i];     // Red
          data[i + 1] = 255 - data[i + 1]; // Green
          data[i + 2] = 255 - data[i + 2]; // Blue
        }
        ctx.putImageData(imageData, 0, 0);
        setCurrentSrc(canvas.toDataURL());
      }
    };
    img.src = src;
  }, [src, invert]);

  return <img src={currentSrc} style={style} alt={alt} />;
}

function CoffeeIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 9h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V9z" />
      <path d="M18 9h1a3 3 0 0 1 0 6h-1" />
      <path d="M6 2 Q7 4 6 6" />
      <path d="M10 2 Q11 4 10 6" />
      <path d="M14 2 Q15 4 14 6" />
    </svg>
  );
}

function CocktailIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 2 21 2 12 13" />
      <line x1="12" y1="13" x2="12" y2="20" />
      <line x1="7" y1="20" x2="17" y2="20" />
      <circle cx="16.5" cy="5" r="1.5" fill={color} />
      <line x1="16.5" y1="2" x2="16.5" y2="5" />
    </svg>
  );
}

export default function ExportableMenu({ theme, categories, products, id }: ExportableMenuProps) {
  const isCafe = theme === 'cafe';

  // ── Palette ────────────────────────────────────────────────────
  const bg = isCafe ? '#FCFAF5' : '#FF3300'; // Cream Bright vs Red
  const fg = '#131313'; // Brutalist Black
  const accents = isCafe ? '#FF3300' : '#FFFFFF';
  const secondaryFg = isCafe ? 'rgba(19, 19, 19, 0.7)' : 'rgba(255, 255, 255, 0.8)';

  const filteredCats = categories.filter(
    c => c.type === theme || c.type === 'both'
  );

  let activeCatsCount = 0;
  let totalProdsCount = 0;
  let unscaledHeight = 0;

  filteredCats.forEach(cat => {
    const prods = products.filter(p => p.category_id === cat.id && p.available !== false);
    if (prods.length > 0) {
      activeCatsCount++;
      totalProdsCount += prods.length;

      unscaledHeight += 52; // Cat title 
      unscaledHeight += 30; // catGap
      unscaledHeight += 60; // menuGap

      prods.forEach(prod => {
        unscaledHeight += 42; // Prod title
        if (prod.description) {
          unscaledHeight += 6;
          unscaledHeight += 31; // desc lines
        }
        unscaledHeight += 20; // prodGap
      });
    }
  });

  if (activeCatsCount > 0) {
    unscaledHeight -= 60; // Remove last menuGap
  }

  // available height ~1350px (conservative)
  let scale = 1;
  if (unscaledHeight > 0) {
    scale = 1350 / unscaledHeight;
  }

  if (scale > 2.2) scale = 2.2;
  if (scale < 0.35) scale = 0.35;

  const menuGap = Math.max(10, 60 * scale) + 'px';
  const catGap = Math.max(10, 30 * scale) + 'px';
  const prodGap = Math.max(5, 20 * scale) + 'px';
  const catFontSize = Math.max(20, 52 * scale) + 'px';
  const prodFontSize = Math.max(16, 42 * scale) + 'px';
  const priceFontSize = Math.max(16, 42 * scale) + 'px';
  const descFontSize = Math.max(10, 24 * scale) + 'px';

  return (
    <div
      id={id}
      style={{
        width: '1080px',
        height: '1920px',
        backgroundColor: bg,
        fontFamily: "'Epilogue', 'Arial', sans-serif",
        color: fg,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        padding: '60px',
      }}
    >
      {/* ── BACKGROUND TEXTURE ────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, opacity: isCafe ? 0.05 : 0.1, pointerEvents: 'none' }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`pattern-${theme}`} x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
              <path d="M10 25h40l-5 25h-30zM50 30h10v15h-15" fill="none" stroke={fg} strokeWidth="3" />
              <path d="M100 100l25-25 25 25-25 25z" fill="none" stroke={fg} strokeWidth="3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#pattern-${theme})`} />
        </svg>
      </div>

      {/* ── TOP DECORATION ────────────────────────────────── */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '20px',
        background: `repeating-linear-gradient(45deg, ${accents}, ${accents} 10px, transparent 10px, transparent 20px)`,
        opacity: 0.8
      }} />

      {/* ── HEADER ────────────────────────────────────────── */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '5px',
        marginBottom: '40px',
        zIndex: 10,
        position: 'relative'
      }}>
        <InvertibleImage
          src="/cato-nobg.png"
          alt="Cato Logo"
          invert={!isCafe}
          style={{
            height: '60px',
            width: 'auto',
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 style={{
            fontSize: '90px',
            fontWeight: 900,
            color: isCafe ? fg : '#FFFFFF',
            margin: 0,
            lineHeight: 0.8,
            letterSpacing: '-4px',
            textTransform: 'uppercase',
          }}>
            MENÚ
          </h1>
          <div style={{
            width: '140px',
            height: '6px',
            background: accents,
            marginTop: '15px'
          }} />
          <p style={{
            fontSize: '22px',
            fontWeight: 700,
            letterSpacing: '8px',
            textTransform: 'uppercase',
            marginTop: '15px',
            color: accents,
          }}>
            {isCafe ? 'Cafetería' : 'Bar'}
          </p>
        </div>
      </div>

      {/* ── MENU CONTENT ──────────────────────────────────── */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: menuGap,
        zIndex: 10,
        position: 'relative'
      }}>
        {filteredCats.map((cat) => {
          const prods = products.filter(
            p => p.category_id === cat.id && p.available !== false
          );
          if (prods.length === 0) return null;

          return (
            <div key={cat.id} style={{ display: 'flex', flexDirection: 'column', gap: catGap }}>
              {/* Category Heading */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                <h2 style={{
                  fontSize: catFontSize,
                  fontWeight: 900,
                  color: accents,
                  margin: 0,
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap'
                }}>
                  {cat.name}
                </h2>
                <div style={{ flex: 1, height: '4px', background: accents, opacity: 0.3 }} />
              </div>

              {/* Product List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: prodGap }}>
                {prods.map((prod) => (
                  <div key={prod.id} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '15px'
                    }}>
                      <span style={{
                        fontSize: prodFontSize,
                        fontWeight: 700,
                        color: fg,
                        lineHeight: 1,
                      }}>
                        {prod.name}
                      </span>
                      <div style={{
                        flex: 1,
                        borderBottom: `4px dotted ${secondaryFg}`,
                        marginBottom: '10px',
                        opacity: 0.5
                      }} />
                      <span style={{
                        fontSize: priceFontSize,
                        fontWeight: 900,
                        color: accents,
                      }}>
                        ${prod.price?.toLocaleString?.() ?? prod.price}
                      </span>
                    </div>
                    {prod.description && (
                      <p style={{
                        margin: 0,
                        fontSize: descFontSize,
                        color: secondaryFg,
                        fontWeight: 500,
                        maxWidth: '85%',
                        lineHeight: 1.3
                      }}>
                        {prod.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>



      {/* ── BOTTOM DECORATION ─────────────────────────────── */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '20px',
        background: `repeating-linear-gradient(-45deg, ${accents}, ${accents} 10px, transparent 10px, transparent 20px)`,
        opacity: 0.8
      }} />
    </div>
  );
}
