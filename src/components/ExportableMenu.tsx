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

export default function ExportableMenu({ theme, categories, products, id }: ExportableMenuProps) {
  const isCafe = theme === 'cafe';

  // ── Palette ────────────────────────────────────────────────────
  const bg = isCafe ? '#DDD6CE' : '#FF3C00'; // Cream Bright vs Red
  const fg = '#222222'; // Brutalist Black
  const accents = isCafe ? '#FF3C00' : '#FFFFFF';
  const secondaryFg = isCafe ? 'rgba(34, 34, 34, 0.7)' : 'rgba(255, 255, 255, 0.8)';

  const filteredCats = categories.filter(c => c.type === theme || c.type === 'both');

  let activeCatsCount = 0;
  let unscaledHeight = 0;

  filteredCats.forEach(cat => {
    const prods = products.filter(p => p.category_id === cat.id && p.available !== false);
    if (prods.length > 0) {
      activeCatsCount++;

      unscaledHeight += 40; // Cat title 
      unscaledHeight += 20; // catGap
      unscaledHeight += 30; // Extra category padding

      prods.forEach(prod => {
        unscaledHeight += 28; // Prod title
        unscaledHeight += 4; // gap between title and desc
        unscaledHeight += 8; // marginBottom of dotted line
        if (prod.description) {
          const lines = Math.ceil(prod.description.length / 45);
          unscaledHeight += (20 * lines); // desc lines
        }
        unscaledHeight += 16; // prodGap
      });
    }
  });

  // Decide if we need 1 or 2 columns based on total content height.
  // 1300 is roughly the available height for content in 1080x1920
  const useTwoColumns = unscaledHeight > 1300;
  const columnCount = useTwoColumns ? 2 : 1;

  // We add a tiny bit of scale down if it overflows even 2 columns
  let scale = 1;
  const maxAvailableHeight = 1300 * columnCount;
  if (unscaledHeight > maxAvailableHeight) {
    scale = maxAvailableHeight / unscaledHeight;
  }
  if (scale > 1) scale = 1;
  if (scale < 0.65) scale = 0.65; // Prevent becoming unreadable

  const catFontSize = (useTwoColumns ? 36 : 46) * scale + 'px';
  const prodFontSize = (useTwoColumns ? 24 : 32) * scale + 'px';
  const priceFontSize = (useTwoColumns ? 24 : 32) * scale + 'px';
  const descFontSize = (useTwoColumns ? 15 : 20) * scale + 'px';
  const catGap = (useTwoColumns ? 20 : 30) * scale + 'px';
  const prodGap = (useTwoColumns ? 16 : 20) * scale + 'px';
  const innerGap = (useTwoColumns ? 4 : 6) * scale + 'px';
  const lineMargin = (useTwoColumns ? 6 : 10) * scale + 'px';
  const categorySpacing = (useTwoColumns ? 40 : 60) * scale + 'px';

  return (
    <div
      id={id}
      className="export-page-node"
      style={{
        width: '1080px',
        height: '1920px',
        backgroundColor: bg,
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
            fontFamily: "var(--font-momo, 'Momo Trust Display')",
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
            fontFamily: "'Helvetica', 'Arial', sans-serif",
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
        zIndex: 10,
        position: 'relative',
        columnCount: columnCount,
        columnGap: '60px',
        columnFill: 'auto',
        height: '1400px'
      }}>
        {filteredCats.map((cat) => {
          const prods = products.filter(
            p => p.category_id === cat.id && p.available !== false
          );
          if (prods.length === 0) return null;

          return (
            <div key={cat.id} style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: catGap, 
              marginBottom: categorySpacing,
              breakInside: 'avoid',
              pageBreakInside: 'avoid'
            }}>
              {/* Category Heading */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <h2 style={{
                  fontFamily: "var(--font-momo, 'Momo Trust Display')",
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
                  <div key={prod.id} style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: innerGap,
                    breakInside: 'avoid',
                    pageBreakInside: 'avoid'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '10px'
                    }}>
                      <span style={{
                        fontFamily: "'Helvetica', 'Arial', sans-serif",
                        fontSize: prodFontSize,
                        fontWeight: 700,
                        color: fg,
                        lineHeight: 1,
                      }}>
                        {prod.name}
                      </span>
                      <div style={{
                        flex: 1,
                        borderBottom: `3px dotted ${secondaryFg}`,
                        marginBottom: lineMargin,
                        opacity: 0.4
                      }} />
                      <span style={{
                        fontFamily: "'Helvetica', 'Arial', sans-serif",
                        fontSize: priceFontSize,
                        fontWeight: 900,
                        color: accents,
                      }}>
                        ${prod.price?.toLocaleString?.() ?? prod.price}
                      </span>
                    </div>
                    {prod.description && (
                      <p style={{
                        fontFamily: "'Helvetica', 'Arial', sans-serif",
                        margin: 0,
                        fontSize: descFontSize,
                        color: secondaryFg,
                        fontWeight: 500,
                        maxWidth: '90%',
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
