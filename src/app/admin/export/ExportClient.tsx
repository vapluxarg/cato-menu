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
    <div className="export-page">
      <h2 className="title-lg" style={{ marginBottom: '0.5rem' }}>Exportar Menús</h2>
      <p style={{ color: 'var(--admin-text-secondary)', marginBottom: '2rem' }}>
        Descargá los menús diseñados para compartir en Instagram Stories.
      </p>

      {/* Clickable previews grid */}
      <div className="previews-grid">
        {/* Café Preview */}
        <div className="preview-wrapper">
          <div
            onClick={() => exportImage('export-cafe', 'menu-cafe.png')}
            className="menu-preview-card"
            style={{ backgroundColor: '#F5F0E8', borderColor: '#FF3300' }}
          >
            <div style={{ fontSize: '32px', fontWeight: 900, color: '#131313', letterSpacing: '-1.5px', textAlign: 'center' }}>MENU</div>
            <div style={{ width: '80%', height: '3px', backgroundColor: '#FF3300' }} />
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#131313', opacity: 0.6, textTransform: 'uppercase' }}>Cafetería</div>
          </div>
          <p className="preview-title">Descargar Café</p>
        </div>

        {/* Bar Preview */}
        <div className="preview-wrapper">
          <div
            onClick={() => exportImage('export-bar', 'menu-bar.png')}
            className="menu-preview-card"
            style={{ backgroundColor: '#FF3300', borderColor: '#131313' }}
          >
            <div style={{ fontSize: '32px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-1.5px', textAlign: 'center' }}>MENU</div>
            <div style={{ width: '80%', height: '3px', backgroundColor: '#131313' }} />
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#FFFFFF', opacity: 0.8, textTransform: 'uppercase' }}>Bar</div>
          </div>
          <p className="preview-title">Descargar Bar</p>
        </div>
      </div>

      <div style={{
        marginTop: '3rem',
        padding: '1rem',
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        borderRadius: '12px',
        border: '1px solid rgba(59, 130, 246, 0.1)',
        display: 'flex',
        gap: '0.75rem',
        alignItems: 'center'
      }}>
        <p style={{ fontSize: '13px', color: '#131313', opacity: 0.7, margin: 0 }}>
          La descarga genera un PNG de <strong>1080×1920 px</strong> de alta resolución, optimizado para Instagram.
        </p>
      </div>
    </div>
  );
}
