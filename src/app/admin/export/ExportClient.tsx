'use client'

import html2canvas from 'html2canvas';

export default function ExportClient() {
  const exportImage = async (id: string, filename: string) => {
    const element = document.getElementById(id);
    if (!element) {
      alert('No se encontró el elemento. Recargá la página e intentá de nuevo.');
      return;
    }

    // ── Key fix: move element to (0,0) before capture ──────────────────────
    // Overriding cssText wipes ALL inline styles (including backgroundColor).
    // Instead, save and restore individual properties only.
    const savedPosition = element.style.position;
    const savedTop = element.style.top;
    const savedLeft = element.style.left;
    const savedVisibility = element.style.visibility;
    const savedZIndex = element.style.zIndex;
    const savedWidth = element.style.width;
    const savedHeight = element.style.height;

    element.style.position = 'fixed';
    element.style.top = '0';
    element.style.left = '0';
    element.style.visibility = 'visible';
    element.style.zIndex = '99999';
    element.style.width = '1080px';
    element.style.height = '1920px';

    // Ensure fonts are loaded + reflow
    await document.fonts.ready;
    await new Promise(r => setTimeout(r, 150));

    const sourceCanvas = await html2canvas(element, {
      scale: 1,
      useCORS: true,
      allowTaint: true,
      logging: false,
      scrollX: 0,
      scrollY: 0,
      width: 1080,
      height: 1920,
      windowWidth: 1080,
    });

    // Restore original position
    element.style.position = savedPosition;
    element.style.top = savedTop;
    element.style.left = savedLeft;
    element.style.visibility = savedVisibility;
    element.style.zIndex = savedZIndex;
    element.style.width = savedWidth;
    element.style.height = savedHeight;

    const srcW = sourceCanvas.width;
    const srcH = sourceCanvas.height;

    // Target: 1080×1920 (9:16 Instagram Story)
    const TARGET_W = 1080;
    const TARGET_H = 1920;

    const out = document.createElement('canvas');
    out.width = TARGET_W;
    out.height = TARGET_H;
    const ctx = out.getContext('2d')!;

    // Fill background matching the theme
    ctx.fillStyle = id.includes('cafe') ? '#F5F0E8' : '#FF3300';
    ctx.fillRect(0, 0, TARGET_W, TARGET_H);

    // Scale-to-fit, centered
    const scale = Math.min(TARGET_W / srcW, TARGET_H / srcH);
    const drawW = Math.round(srcW * scale);
    const drawH = Math.round(srcH * scale);
    const offsetX = Math.round((TARGET_W - drawW) / 2);
    const offsetY = Math.round((TARGET_H - drawH) / 2);

    ctx.drawImage(sourceCanvas, offsetX, offsetY, drawW, drawH);

    const dataUrl = out.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <button
          className="btn btn-secondary"
          onClick={() => exportImage('export-cafe', 'menu-cafe.png')}
        >
          ↓ Descargar Menú Café (PNG 9:16)
        </button>
        <button
          className="btn btn-primary"
          onClick={() => exportImage('export-bar', 'menu-bar.png')}
        >
          ↓ Descargar Menú Bar (PNG 9:16)
        </button>
      </div>

      {/* Placeholder previews */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '135px', height: '240px',
            backgroundColor: '#F5F0E8', border: '4px solid #FF3300',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center', gap: '8px',
          }}>
            <div style={{ fontSize: '24px', fontWeight: 900, color: '#131313', letterSpacing: '-1px' }}>MENU</div>
            <div style={{ width: '80%', height: '2px', backgroundColor: '#FF3300' }} />
            <div style={{ fontSize: '9px', color: '#131313', opacity: 0.6 }}>Cafetería</div>
          </div>
          <p style={{ fontSize: '12px', marginTop: '8px', opacity: 0.6 }}>Café</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '135px', height: '240px',
            backgroundColor: '#FF3300', border: '4px solid #131313',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center', gap: '8px',
          }}>
            <div style={{ fontSize: '24px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-1px' }}>MENU</div>
            <div style={{ width: '80%', height: '2px', backgroundColor: '#131313' }} />
            <div style={{ fontSize: '9px', color: '#FFFFFF', opacity: 0.7 }}>Bar</div>
          </div>
          <p style={{ fontSize: '12px', marginTop: '8px', opacity: 0.6 }}>Bar</p>
        </div>
      </div>

      <p style={{ marginTop: '1.5rem', fontSize: '13px', opacity: 0.5 }}>
        La descarga genera un PNG de 1080×1920 px listo para Instagram Stories.
      </p>
    </div>
  );
}
