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
  const bg = isCafe ? '#F5F0E8' : '#FF3300';
  const fg = '#131313'; // Deep black/brown
  const borderColor = isCafe ? '#FF3300' : '#131313';
  const headerBg = isCafe ? '#FF3300' : '#131313';
  const headerFg = '#FFFFFF';
  const catBg = isCafe ? '#E8E0D0' : '#F5F0E8';
  const catFg = '#131313';
  const rowLine = isCafe ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.2)';

  const filteredCats = categories.filter(
    c => c.type === theme || c.type === 'both'
  );

  return (
    <div
      id={id}
      style={{
        width: '1080px',
        height: '1920px',
        backgroundColor: bg,
        fontFamily: "'Jost', 'Arial', sans-serif",
        border: `8px solid ${borderColor}`,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* ── FLOATING ELEMENTS ─────────────────────────────── */}
      <InvertibleImage
        src="/menu.png"
        alt="MENU"
        invert={!isCafe}
        style={{
          position: 'absolute',
          top: '30px',
          left: '50px',
          width: '350px',
          height: 'auto',
          zIndex: 1000,
          display: 'block',
        }}
      />

      <InvertibleImage
        src="/cato-nobg.png"
        alt="Cato Logo"
        invert={!isCafe}
        style={{
          position: 'absolute',
          top: '35px',
          right: '50px',
          height: '50px',
          width: 'auto',
          zIndex: 1000,
          display: 'block',
        }}
      />

      {/* ── HEADER AREA ────────────────────────────────────── */}
      <div style={{
        padding: '30px 60px 10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        flexShrink: 0,
        height: '160px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            paddingTop: '55px',
          }}>
            {isCafe
              ? <CoffeeIcon size={50} color={fg} />
              : <CocktailIcon size={50} color="#FFFFFF" />
            }
          </div>
        </div>
      </div>

      {/* ── COLUMN HEADERS ─────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 2fr 1fr',
        backgroundColor: headerBg,
        color: headerFg,
        flexShrink: 0,
      }}>
        <div style={{ padding: '10px 40px', fontSize: '30px', fontWeight: 800 }}>
          Item
        </div>
        <div style={{ padding: '10px 40px', fontSize: '30px', fontWeight: 800 }}>
          Tipo
        </div>
        <div style={{ padding: '10px 40px', fontSize: '30px', fontWeight: 800, textAlign: 'right' }}>
          Precio
        </div>
      </div>

      {/* ── TABLE BODY ─────────────────────────────────────── */}
      <div style={{ flex: 1 }}>
        {filteredCats.map((cat) => {
          const prods = products.filter(
            p => p.category_id === cat.id && p.available !== false
          );
          if (prods.length === 0) return null;

          return (
            <React.Fragment key={cat.id}>
              {/* Category row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 2fr 1fr',
                backgroundColor: catBg,
                borderTop: `1px solid ${rowLine}`,
                borderBottom: `2.5px solid ${rowLine}`,
              }}>
                <div style={{
                  padding: '6px 40px',
                  fontSize: '38px',
                  fontWeight: 900,
                  color: catFg,
                }}>
                  {cat.name}
                </div>
                <div /><div />
              </div>

              {/* Product rows */}
              {prods.map((prod) => (
                <div
                  key={prod.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 2fr 1fr',
                    borderBottom: `1px solid ${rowLine}`,
                  }}
                >
                  <div style={{ padding: '4px 40px' }} />
                  <div style={{
                    padding: '4px 40px',
                    fontSize: '34px',
                    fontWeight: 600,
                    color: isCafe ? fg : '#FFFFFF',
                    lineHeight: 1.1,
                  }}>
                    {prod.name}
                  </div>
                  <div style={{
                    padding: '4px 40px',
                    fontSize: '34px',
                    fontWeight: 800,
                    color: isCafe ? fg : '#FFFFFF',
                    textAlign: 'right',
                  }}>
                    ${prod.price?.toLocaleString?.() ?? prod.price}
                  </div>
                </div>
              ))}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
