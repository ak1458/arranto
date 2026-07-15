import { ImageResponse } from 'next/og';

// Cascades to every nested route (about, work, contact, tools/*, legal/*) that doesn't
// define its own opengraph-image — one on-brand card instead of the stale pre-D9
// navy/gold public/og.png that was left unwired (flagged, not fixed, in MASTER-CONTEXT N5).
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000000',
        }}
      >
        <div style={{ display: 'flex', fontSize: 26, letterSpacing: 12, color: '#8e8f94' }}>
          ARRANTO
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 36,
            fontSize: 58,
            fontWeight: 700,
            color: '#f0efec',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'flex' }}>Start to running.</div>
          <div style={{ display: 'flex', color: '#d8d9dc' }}>Nothing left undone.</div>
        </div>
        <div style={{ display: 'flex', marginTop: 40, fontSize: 20, letterSpacing: 3, color: '#8e8f94' }}>
          FOUNDER-LED SOFTWARE STUDIO — EST. 2017
        </div>
      </div>
    ),
    { ...size }
  );
}
