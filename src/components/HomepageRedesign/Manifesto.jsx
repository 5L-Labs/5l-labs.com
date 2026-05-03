import React from 'react';
import { Nav, Footer, Note, PH, Lines } from './shared';

export default function Manifesto() {
  return (
    <div className="wf wf-browser" data-screen-label="01 Manifesto">
      <div className="chrome">
        <div className="dot" /><div className="dot" /><div className="dot" />
        <div className="url">5l-labs.com</div>
      </div>
      <div className="page">
        <Nav active="Research" />

        {/* HERO — big type statement */}
        <div style={{ position: 'relative', padding: '40px 0 60px' }}>
          <div className="mono muted" style={{ fontSize: 12, letterSpacing: '0.12em', marginBottom: 18 }}>
            EST. 2023 — NEW YORK — A PRIVATE RESEARCH LAB
          </div>
          <h1 style={{
            fontFamily: 'var(--hand)', fontWeight: 700,
            fontSize: 88, lineHeight: 0.95, letterSpacing: '-0.02em',
            margin: 0, maxWidth: '14ch',
          }}>
            Your data<br />
            should work <span className="hi">for you.</span><br />
            <span className="accent">Not against you.</span>
          </h1>

          <div style={{ maxWidth: 560, marginTop: 32, fontSize: 18, lineHeight: 1.5 }}>
            We build AI, ML, and IoT systems that learn from sensitive data
            <span className="u-sketch"> without ever seeing it</span>.
            Commercial-grade. Privacy-first. Shipped.
          </div>

          <div style={{ marginTop: 32, display: 'flex', gap: 14 }}>
            <a className="btn btn-accent">Hire us for consulting →</a>
            <a className="btn btn-ghost">See the research</a>
          </div>

          <Note top={44} right={20} arrow={{
            style: { top: 40, left: -60 },
            d: 'M 70 10 Q 30 30 10 50',
            head: 'M 10 50 L 18 44 M 10 50 L 16 56',
          }}>
            replace the vague<br />"Hello from 5L Labs"
          </Note>
          <Note top={250} right={-10} arrow={{
            style: { top: -10, left: -80 },
            d: 'M 80 40 Q 40 20 10 30',
            head: 'M 10 30 L 18 26 M 10 30 L 16 36',
          }}>
            ONE primary CTA.<br />consulting $ pays for<br />the research.
          </Note>
        </div>

        <hr className="scribble" />

        {/* PILLARS — three numbered beliefs */}
        <div style={{ padding: '40px 0' }}>
          <div className="mono muted" style={{ fontSize: 12, letterSpacing: '0.12em', marginBottom: 24 }}>
            03 — WHAT WE BELIEVE
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 36 }}>
            {[
              ['01', 'Privacy is a feature, not a tax.', 'Differential privacy, federated learning, on-device inference. Techniques, not promises.'],
              ['02', 'Own the silicon. Own the data.', 'Self-hosted IoT from the chip up. No cloud middleman between you and your home.'],
              ['03', 'Open source the boring parts.', 'Embeddings, templates, kill-switches. The plumbing should be free.'],
            ].map(([n, t, d]) => (
              <div key={n}>
                <div className="hand accent" style={{ fontSize: 48, lineHeight: 1, marginBottom: 8 }}>{n}</div>
                <div style={{ fontFamily: 'var(--hand)', fontSize: 22, lineHeight: 1.15, marginBottom: 10 }}>{t}</div>
                <div className="muted" style={{ fontSize: 14 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>

        <hr className="scribble" />

        {/* FEATURED — one product, one piece of writing */}
        <div style={{ padding: '40px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
          <div className="box" style={{ padding: 22, background: 'var(--paper-2)' }}>
            <div className="chip chip-accent">LATEST WRITING</div>
            <div style={{ fontFamily: 'var(--hand)', fontSize: 26, lineHeight: 1.1, margin: '14px 0 10px' }}>
              Learning about learning?
            </div>
            <Lines rows={3} widths={['w-90', 'w-80', 'w-70']} />
            <div className="muted mono" style={{ fontSize: 11, marginTop: 12 }}>FEB 23 · FRONTIER RESEARCH</div>
          </div>
          <div className="box box-accent" style={{ padding: 22 }}>
            <div className="chip chip-accent">FEATURED PROJECT</div>
            <div style={{ fontFamily: 'var(--hand)', fontSize: 26, lineHeight: 1.1, margin: '14px 0 10px' }}>
              Open Embeddings
            </div>
            <div className="muted" style={{ fontSize: 14, marginBottom: 14 }}>
              A community registry for high-quality open embeddings.
            </div>
            <PH w="100%" h={90} label="product screenshot" />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
