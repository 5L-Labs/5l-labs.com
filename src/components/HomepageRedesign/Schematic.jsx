import React from 'react';
import { Nav, Footer, Note } from './shared';

export default function Schematic() {
  return (
    <div className="wf wf-browser" data-screen-label="04 Schematic">
      <div className="chrome">
        <div className="dot" /><div className="dot" /><div className="dot" />
        <div className="url">5l-labs.com</div>
      </div>
      <div className="page">
        <Nav active="Research" />

        {/* HERO headline + schematic */}
        <div style={{ marginBottom: 20 }}>
          <div className="mono muted" style={{ fontSize: 12, letterSpacing: '0.14em', marginBottom: 8 }}>
            FIG. 01 — HOW 5L LABS WORKS
          </div>
          <h1 style={{
            fontFamily: 'var(--hand)', fontSize: 52, lineHeight: 1.0, margin: 0,
            maxWidth: '18ch',
          }}>
            One lab, three outputs,<br />
            <span className="u-sketch">one rule:</span> <span className="accent">privacy first.</span>
          </h1>
        </div>

        {/* THE SCHEMATIC DIAGRAM */}
        <div className="box" style={{ padding: 28, background: 'var(--paper-2)', position: 'relative', marginBottom: 40 }}>
          <svg viewBox="0 0 900 420" style={{ width: '100%', height: 420 }}>
            <defs>
              <pattern id="wf-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="900" height="420" fill="url(#wf-grid)" />

            {/* Center node — the lab */}
            <g>
              <ellipse cx="450" cy="210" rx="110" ry="56" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
              <text x="450" y="200" textAnchor="middle" fontFamily="Kalam, cursive" fontSize="22" fill="var(--ink)">5L Labs</text>
              <text x="450" y="224" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="var(--ink-3)">NYC · 2023–</text>
            </g>

            {/* INPUT node */}
            <g>
              <rect x="30" y="170" width="180" height="80" fill="var(--paper)" stroke="var(--ink-3)" strokeWidth="1.5" strokeDasharray="5 4" />
              <text x="120" y="200" textAnchor="middle" fontFamily="Kalam" fontSize="18" fill="var(--ink)">sensitive</text>
              <text x="120" y="222" textAnchor="middle" fontFamily="Kalam" fontSize="18" fill="var(--ink)">data</text>
              <text x="120" y="242" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--ink-3)">INPUT</text>
            </g>
            <path d="M 215 210 Q 280 195 338 208" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
            <path d="M 338 208 L 328 203 M 338 208 L 330 214" fill="none" stroke="var(--ink)" strokeWidth="1.5" />

            {/* top — research */}
            <g>
              <rect x="640" y="40" width="220" height="90" fill="var(--paper)" stroke="var(--accent)" strokeWidth="2" />
              <text x="750" y="68" textAnchor="middle" fontFamily="Kalam" fontSize="20" fill="var(--accent)">research &amp; writing</text>
              <text x="750" y="90" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--ink-3)">frontier · applied · iot</text>
              <text x="750" y="112" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--ink-3)">free, open, archival</text>
            </g>
            <path d="M 555 185 Q 610 140 640 110" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
            <path d="M 640 110 L 636 120 M 640 110 L 650 114" fill="none" stroke="var(--accent)" strokeWidth="1.5" />

            {/* middle — products */}
            <g>
              <rect x="640" y="170" width="220" height="80" fill="var(--paper)" stroke="var(--accent)" strokeWidth="2" />
              <text x="750" y="200" textAnchor="middle" fontFamily="Kalam" fontSize="20" fill="var(--accent)">open-source products</text>
              <text x="750" y="224" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--ink-3)">open-embeddings · overlord · …</text>
            </g>
            <path d="M 560 210 L 640 210" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
            <path d="M 640 210 L 632 205 M 640 210 L 632 215" fill="none" stroke="var(--accent)" strokeWidth="1.5" />

            {/* bottom — consulting */}
            <g>
              <rect x="640" y="290" width="220" height="90" fill="var(--accent)" stroke="var(--ink)" strokeWidth="2" />
              <text x="750" y="320" textAnchor="middle" fontFamily="Kalam" fontSize="20" fill="white">consulting $</text>
              <text x="750" y="342" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="rgba(255,255,255,0.8)">this pays for everything else</text>
              <text x="750" y="362" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="rgba(255,255,255,0.8)">1–2 engagements / quarter</text>
            </g>
            <path d="M 555 238 Q 610 280 640 310" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
            <path d="M 640 310 L 632 304 M 640 310 L 636 316" fill="none" stroke="var(--ink)" strokeWidth="1.5" />

            {/* Loop arrow: consulting → research */}
            <path d="M 640 340 Q 540 390 380 360 Q 300 340 270 280" fill="none" stroke="var(--ink-3)" strokeWidth="1.2" strokeDasharray="4 4" />
            <text x="420" y="395" fontFamily="Kalam" fontSize="13" fill="var(--ink-3)">funds the research →</text>
          </svg>

          <Note top={-20} right={-10} arrow={{
            style: { top: 30, left: -70 },
            d: 'M 80 10 Q 40 30 10 50',
            head: 'M 10 50 L 18 44 M 10 50 L 16 56',
          }}>
            the diagram IS<br />the hero. shows<br />the whole thing<br />at a glance.
          </Note>
        </div>

        {/* The three output areas expanded */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          <div>
            <div className="mono accent" style={{ fontSize: 11, letterSpacing: '0.14em', marginBottom: 10 }}>FIG. 02 — RESEARCH</div>
            <div style={{ fontFamily: 'var(--hand)', fontSize: 22, lineHeight: 1.1, marginBottom: 10 }}>Four beats, published openly.</div>
            {['Frontier Research', 'Applied AI Engineering', 'Self-Hosted IoT', 'Applied Home ML IoT'].map(x => (
              <div key={x} style={{ padding: '8px 0', borderBottom: '1px dashed var(--ink-4)', fontSize: 14 }}>
                {x} <span className="arrow">→</span>
              </div>
            ))}
          </div>
          <div>
            <div className="mono accent" style={{ fontSize: 11, letterSpacing: '0.14em', marginBottom: 10 }}>FIG. 03 — PRODUCTS</div>
            <div style={{ fontFamily: 'var(--hand)', fontSize: 22, lineHeight: 1.1, marginBottom: 10 }}>Free, open, self-hostable.</div>
            {[
              ['Open Embeddings', 'embeddings registry'],
              ['Recruiter Rankings', 'verified perf data'],
              ['Overlord Kill Switch', 'hardware isolation'],
            ].map(([n, d]) => (
              <div key={n} style={{ padding: '8px 0', borderBottom: '1px dashed var(--ink-4)' }}>
                <div style={{ fontSize: 14 }}>{n} <span className="arrow">↗</span></div>
                <div className="muted" style={{ fontSize: 12 }}>{d}</div>
              </div>
            ))}
          </div>
          <div className="box box-accent" style={{ padding: 18 }}>
            <div className="mono accent" style={{ fontSize: 11, letterSpacing: '0.14em', marginBottom: 10 }}>FIG. 04 — CONSULTING</div>
            <div style={{ fontFamily: 'var(--hand)', fontSize: 22, lineHeight: 1.1, marginBottom: 10 }}>
              Work with us.
            </div>
            <div className="muted" style={{ fontSize: 13, marginBottom: 14 }}>
              We take <span className="hi">1–2 engagements per quarter</span>. Private ML, on-device inference, IoT audits.
            </div>
            <a className="btn btn-accent" style={{ width: '100%', justifyContent: 'center' }}>Start an inquiry →</a>
            <div className="muted mono" style={{ fontSize: 10, marginTop: 10, textAlign: 'center' }}>
              NEXT AVAILABILITY — Q3 2026
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
