import React from 'react';
import { Nav, Footer, Note } from './shared';

const entries = [
  ['2026-02-23', 'writing',  'frontier',   'learning about learning?',                           '14 min'],
  ['2026-02-10', 'release',  'applied-ai', 'open-embeddings v0.4.0',                            'changelog'],
  ['2026-01-28', 'writing',  'applied-ai', 'benchmarking private embeddings vs ada-002',         '8 min'],
  ['2026-01-14', 'project',  'iot',        'overlord-network-kill-switch v1.2',                  'hardware'],
  ['2025-12-30', 'writing',  'iot',        'flashing tasmota on a $4 zigbee hub',                '6 min'],
  ['2025-12-10', 'release',  'applied-ai', 'recruiter-rankings preview open',                    'preview'],
  ['2025-11-22', 'writing',  'frontier',   'differential privacy without the accuracy cliff',    '11 min'],
];

export default function Terminal() {
  return (
    <div className="wf wf-browser" data-screen-label="03 Terminal">
      <div className="chrome">
        <div className="dot" /><div className="dot" /><div className="dot" />
        <div className="url">5l-labs.com</div>
      </div>
      <div className="page" style={{ fontFamily: 'var(--mono)', fontSize: 13, padding: '28px 44px' }}>
        <Nav active="Research" compact />

        {/* Terminal banner */}
        <div className="box" style={{
          padding: 18, background: '#101010', color: '#e8e6df',
          marginBottom: 32, fontFamily: 'var(--mono)', fontSize: 13, lineHeight: 1.55,
          position: 'relative',
        }}>
          <div style={{ color: '#7bd27b' }}>$ whoami</div>
          <div>5L Labs — commercial privacy-first research, est. 2023 (NYC)</div>
          <div style={{ color: '#7bd27b', marginTop: 8 }}>$ cat mission.txt</div>
          <div>Advancing technology for humans and bots — with privacy in mind.</div>
          <div style={{ color: '#7bd27b', marginTop: 8 }}>$ ls areas/</div>
          <div>
            <span style={{ color: '#f0a060' }}>private-ai/</span>{' '}
            <span style={{ color: '#f0a060' }}>private-iot/</span>{' '}
            <span style={{ color: '#f0a060' }}>frontier/</span>{' '}
            <span style={{ color: '#f0a060' }}>applied-ai/</span>
          </div>
          <div style={{ color: '#7bd27b', marginTop: 8 }}>
            $ ./hire-us --consulting <span style={{ color: '#c84a1f' }}>▊</span>
          </div>
          <Note top={-28} right={10} arrow={{
            style: { top: 24, left: -40 },
            d: 'M 50 10 Q 20 30 10 50',
            head: 'M 10 50 L 18 44 M 10 50 L 16 56',
          }}>
            devs are<br />the audience.<br />speak their<br />language.
          </Note>
        </div>

        {/* INDEX */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--ink-3)' }}>
              INDEX OF /&nbsp;·&nbsp;SORT BY:
            </div>
            <span className="chip chip-accent">DATE ↓</span>
            <span className="chip">AREA</span>
            <span className="chip">TYPE</span>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--mono)', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1.5px solid var(--ink)', textAlign: 'left', color: 'var(--ink-3)' }}>
                {['DATE', 'TYPE', 'AREA', 'TITLE', '↗'].map((h, i) => (
                  <th key={h} style={{
                    padding: '8px 4px', fontWeight: 500, fontSize: 11, letterSpacing: '0.08em',
                    textAlign: i === 4 ? 'right' : 'left',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {entries.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px dashed var(--ink-4)' }}>
                  <td style={{ padding: '10px 4px', color: 'var(--ink-3)' }}>{row[0]}</td>
                  <td style={{ padding: '10px 4px' }}>
                    <span className={'chip ' + (row[1] === 'writing' ? 'chip-accent' : '')}>{row[1]}</span>
                  </td>
                  <td style={{ padding: '10px 4px', color: 'var(--ink-3)' }}>{row[2]}</td>
                  <td style={{ padding: '10px 4px', fontFamily: 'var(--hand-tight)', fontSize: 15 }}>{row[3]}</td>
                  <td style={{ padding: '10px 4px', textAlign: 'right', color: 'var(--ink-3)' }}>{row[4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ textAlign: 'center', marginTop: 14, color: 'var(--ink-3)', fontSize: 12 }}>
            — load 24 more —
          </div>
        </div>

        {/* Two-column sub-indexes */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
          <div className="box" style={{ padding: 18 }}>
            <div className="mono accent" style={{ fontSize: 11, letterSpacing: '0.14em', marginBottom: 10 }}>~/projects</div>
            {[
              ['open-embeddings',      '★ 1.2k', 'community registry for open vector embeddings'],
              ['recruiter-rankings',   'preview', 'industry rankings backed by verified data'],
              ['overlord-kill-switch', '★ 340',  'hardware network isolator for commercial envs'],
            ].map(([n, meta, d]) => (
              <div key={n} style={{ padding: '10px 0', borderBottom: '1px dashed var(--ink-4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span>{n}</span><span className="muted">{meta}</span>
                </div>
                <div className="muted" style={{ fontSize: 12 }}>{d}</div>
              </div>
            ))}
          </div>
          <div className="box" style={{ padding: 18 }}>
            <div className="mono accent" style={{ fontSize: 11, letterSpacing: '0.14em', marginBottom: 10 }}>~/consulting</div>
            <div style={{ fontFamily: 'var(--hand-tight)', fontSize: 18, lineHeight: 1.2, marginBottom: 10 }}>
              We take on a small number of engagements each quarter.
            </div>
            <div className="muted" style={{ fontSize: 13, marginBottom: 12 }}>
              Private ML systems, on-device inference, and IoT architecture audits.
            </div>
            <div className="muted mono" style={{ fontSize: 11, letterSpacing: '0.1em', marginBottom: 6 }}>
              CURRENT AVAILABILITY: <span className="accent">Q3 2026</span>
            </div>
            <a className="btn btn-accent">./inquire →</a>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
