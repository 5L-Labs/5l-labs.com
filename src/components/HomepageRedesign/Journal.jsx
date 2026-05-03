import React from 'react';
import { Nav, Footer, Note, PH } from './shared';

const posts = [
  ['Feb 2026', 'Frontier Research', 'Learning about learning?', 'Transformers, the Platonic Representation Hypothesis, and curiosity-driven learning.', true],
  ['Jan 2026', 'Applied AI', 'Benchmarking private embeddings against OpenAI at 1/40th the cost', 'Open Embeddings v0.4 beats ada-002 on MTEB subsets. Here\'s how.', false],
  ['Dec 2025', 'Self-Hosted IoT', 'Flashing Tasmota on a $4 Zigbee hub: a 2026 guide', 'The cheapest path to a cloudless smart home.', false],
  ['Nov 2025', 'Frontier Research', 'Differential privacy without the accuracy cliff', 'Notes from six months of chasing an ε under 1.', false],
  ['Oct 2025', 'Applied AI', 'What recruiter-ranking data actually measures', 'Our methodology, our biases, our priors.', false],
];

export default function Journal() {
  return (
    <div className="wf wf-browser" data-screen-label="02 Journal">
      <div className="chrome">
        <div className="dot" /><div className="dot" /><div className="dot" />
        <div className="url">5l-labs.com</div>
      </div>
      <div className="page" style={{ padding: '32px 48px' }}>
        <Nav active="Writing" />

        {/* Masthead — magazine-style */}
        <div style={{
          textAlign: 'center',
          borderTop: '2px solid var(--ink)', borderBottom: '2px solid var(--ink)',
          padding: '24px 0', marginBottom: 32, position: 'relative',
        }}>
          <div className="mono muted" style={{ fontSize: 11, letterSpacing: '0.3em' }}>VOL. 03 · NO. 41</div>
          <div style={{ fontFamily: 'var(--hand)', fontSize: 56, lineHeight: 1, margin: '6px 0' }}>
            The 5L Labs Journal
          </div>
          <div className="mono muted" style={{ fontSize: 11, letterSpacing: '0.18em' }}>
            NOTES ON PRIVATE AI · PRIVATE IOT · FROM A COMMERCIAL RESEARCH LAB
          </div>
          <Note top={-10} right={-20} arrow={{
            style: { top: 20, left: -60 },
            d: 'M 70 10 Q 30 30 10 40',
            head: 'M 10 40 L 18 34 M 10 40 L 16 46',
          }}>
            puts the writing<br />front-and-center.<br />currently buried.
          </Note>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 40 }}>
          {/* LEFT: feed */}
          <div>
            {/* Lead story */}
            <div style={{ marginBottom: 32, paddingBottom: 28, borderBottom: '1.2px dashed var(--ink-3)' }}>
              <div className="mono accent" style={{ fontSize: 11, letterSpacing: '0.14em', marginBottom: 10 }}>
                ★ LEAD STORY · FRONTIER RESEARCH
              </div>
              <div style={{ fontFamily: 'var(--hand)', fontSize: 40, lineHeight: 1.05, marginBottom: 12 }}>
                Learning about learning?
              </div>
              <div style={{ fontSize: 16, lineHeight: 1.5, color: 'var(--ink-2)', marginBottom: 14 }}>
                We've been poking at the limits of Transformer architectures for a few months now — and what we found about the
                <span className="hi"> Platonic Representation Hypothesis</span> surprised us. A long read on curiosity-driven learning
                and what comes after scale.
              </div>
              <PH w="100%" h={180} label="hero diagram — training loss curves" />
              <div className="mono muted" style={{ fontSize: 12, marginTop: 10 }}>
                14 MIN READ · FEB 23, 2026
              </div>
            </div>

            {/* Feed */}
            <div className="mono muted" style={{ fontSize: 11, letterSpacing: '0.14em', marginBottom: 14 }}>
              RECENT WRITING
            </div>
            {posts.slice(1).map(([date, tag, title, desc], i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '80px 1fr', gap: 18,
                padding: '16px 0', borderBottom: '1px dashed var(--ink-4)',
              }}>
                <div className="mono muted" style={{ fontSize: 11 }}>
                  {date}<br /><span className="accent">{tag}</span>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--hand)', fontSize: 22, lineHeight: 1.1, marginBottom: 4 }}>{title}</div>
                  <div className="muted" style={{ fontSize: 14 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: sidebar */}
          <div style={{ position: 'relative' }}>
            <div className="box" style={{ padding: 18, background: 'var(--paper-2)', marginBottom: 24 }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', marginBottom: 10 }}>ABOUT THE LAB</div>
              <div style={{ fontFamily: 'var(--hand)', fontSize: 24, lineHeight: 1.1, marginBottom: 10 }}>
                A privacy-first commercial research lab.
              </div>
              <div className="muted" style={{ fontSize: 13 }}>
                We split our time between applied consulting and open research. Writing is the main output.
              </div>
              <div style={{ marginTop: 14 }}><a className="btn">Hire us →</a></div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div className="mono muted" style={{ fontSize: 11, letterSpacing: '0.14em', marginBottom: 10 }}>PROJECTS</div>
              {[
                ['Open Embeddings', 'open community registry'],
                ['Recruiter Rankings', 'verified performance data'],
                ['Overlord Kill Switch', 'hardware network isolator'],
              ].map(([n, d]) => (
                <div key={n} style={{ padding: '10px 0', borderBottom: '1px dashed var(--ink-4)' }}>
                  <div style={{ fontFamily: 'var(--hand)', fontSize: 18 }}>{n} <span className="arrow">↗</span></div>
                  <div className="muted" style={{ fontSize: 12 }}>{d}</div>
                </div>
              ))}
            </div>

            <div className="box box-accent" style={{ padding: 18 }}>
              <div className="mono accent" style={{ fontSize: 11, letterSpacing: '0.14em', marginBottom: 8 }}>SUBSCRIBE</div>
              <div style={{ fontFamily: 'var(--hand)', fontSize: 20, lineHeight: 1.1, marginBottom: 10 }}>
                Get new writing in your inbox.
              </div>
              <div className="box box-dashed" style={{ padding: '8px 10px', fontSize: 13, color: 'var(--ink-3)', marginBottom: 10 }}>
                you@domain.com
              </div>
              <div><a className="btn btn-accent" style={{ width: '100%', justifyContent: 'center' }}>Subscribe</a></div>
            </div>

            <Note top={160} left={-80} arrow={{
              style: { top: 10, right: -60, transform: 'scaleX(-1)' },
              d: 'M 10 40 Q 40 20 70 30',
              head: 'M 70 30 L 62 24 M 70 30 L 64 36',
            }}>
              sidebar keeps products<br />discoverable without<br />stealing the spotlight.
            </Note>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
