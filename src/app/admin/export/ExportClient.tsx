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
    ctx.fillStyle = id.includes('cafe') ? '#FCFAF5' : '#FF3300';
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


      {/* Clickable previews */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div 
          onClick={() => exportImage('export-cafe', 'menu-cafe.png')}
          style={{ textAlign: 'center', cursor: 'pointer' }}
          className="menu-preview-card"
        >
          <div style={{
            width: '180px', height: '320px',
            backgroundColor: '#F5F0E8', border: '4px solid #FF3300',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center', gap: '12px',
            transition: 'transform 0.2s',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{ fontSize: '32px', fontWeight: 900, color: '#131313', letterSpacing: '-1.5px' }}>MENU</div>
            <div style={{ width: '80%', height: '3px', backgroundColor: '#FF3300' }} />
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#131313', opacity: 0.6, textTransform: 'uppercase' }}>Cafetería</div>
          </div>
          <p style={{ fontSize: '14px', fontWeight: 600, marginTop: '12px', color: '#131313' }}>Descargar Café</p>
        </div>

        <div 
          onClick={() => exportImage('export-bar', 'menu-bar.png')}
          style={{ textAlign: 'center', cursor: 'pointer' }}
          className="menu-preview-card"
        >
          <div style={{
            width: '180px', height: '320px',
            backgroundColor: '#FF3300', border: '4px solid #131313',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center', gap: '12px',
            transition: 'transform 0.2s',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{ fontSize: '32px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-1.5px' }}>MENU</div>
            <div style={{ width: '80%', height: '3px', backgroundColor: '#131313' }} />
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#FFFFFF', opacity: 0.8, textTransform: 'uppercase' }}>Bar</div>
          </div>
          <p style={{ fontSize: '14px', fontWeight: 600, marginTop: '12px', color: '#131313' }}>Descargar Bar</p>
        </div>
      </div>

      <p style={{ marginTop: '1.5rem', fontSize: '13px', opacity: 0.5 }}>
        La descarga genera un PNG de 1080×1920 px listo para Instagram Stories.
      </p>
    </div>
  );
}
