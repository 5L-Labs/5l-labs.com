import React, { useState, useEffect, useRef } from 'react';
import { DesignCanvas, DCSection, DCArtboard } from './DesignCanvas';
import Manifesto from './Manifesto';
import Journal from './Journal';
import Terminal from './Terminal';
import Schematic from './Schematic';
import './sketch.css';

const LS_VIEW = '5l-wireframe-view';

const TWEAK_DEFAULTS = {
  density: 'roomy',
  accent: '#1e5f8a',
  notes: 'show',
};

const ACCENT_SWATCHES = ['#c84a1f', '#1e5f8a', '#2a7d4f', '#1a1a1a'];

function Toolbar({ view, onSetView }) {
  const buttons = [
    { id: 'canvas', label: 'All · canvas' },
    { id: '1',      label: '1 · Manifesto' },
    { id: '2',      label: '2 · Journal' },
    { id: '3',      label: '3 · Terminal' },
    { id: '4',      label: '4 · Schematic' },
  ];
  return (
    <div className="preview-toolbar">
      <span className="mono-label">VIEW</span>
      {buttons.map((b, i) => (
        <React.Fragment key={b.id}>
          {i === 1 && <div className="sep" />}
          <button className={view === b.id ? 'active' : ''} onClick={() => onSetView(b.id)}>
            {b.label}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
}

function TweaksPanel({ tweaks, onTweak }) {
  return (
    <div className="tweaks-panel">
      <h5>TWEAKS</h5>

      <div className="tweak-row">
        <label>Density</label>
        <div className="seg">
          {['tight', 'roomy'].map(v => (
            <button key={v} className={tweaks.density === v ? 'on' : ''} onClick={() => onTweak('density', v)}>
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="tweak-row">
        <label>Accent</label>
        <div className="swatches">
          {ACCENT_SWATCHES.map(c => (
            <button
              key={c}
              className={tweaks.accent === c ? 'on' : ''}
              style={{ background: c }}
              onClick={() => onTweak('accent', c)}
            />
          ))}
        </div>
      </div>

      <div className="tweak-row">
        <label>Annotation notes</label>
        <div className="seg">
          {['show', 'hide'].map(v => (
            <button key={v} className={tweaks.notes === v ? 'on' : ''} onClick={() => onTweak('notes', v)}>
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function CanvasView() {
  return (
    <DesignCanvas>
      <DCSection
        title="5L Labs Homepage — 4 directions"
        subtitle="Rough wireframes. Same content, four very different frames. Click a tab above to zoom into one."
      >
        <DCArtboard label="01 · Manifesto — big type, one CTA" width={1100} height={900}>
          <Manifesto />
        </DCArtboard>
        <DCArtboard label="02 · Journal — writing as the centerpiece" width={1100} height={900}>
          <Journal />
        </DCArtboard>
        <DCArtboard label="03 · Terminal — index of everything, for devs" width={1100} height={900}>
          <Terminal />
        </DCArtboard>
        <DCArtboard label="04 · Schematic — diagram of how the lab works" width={1100} height={900}>
          <Schematic />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

function SingleView({ which }) {
  const components = { '1': Manifesto, '2': Journal, '3': Terminal, '4': Schematic };
  const Comp = components[which];
  return (
    <div className="single-stage">
      <div className="frame">
        <Comp />
      </div>
    </div>
  );
}

export default function PreviewApp() {
  const rootRef = useRef(null);

  const [view, setView] = useState(() => {
    try { return localStorage.getItem(LS_VIEW) || 'canvas'; } catch { return 'canvas'; }
  });

  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);

  const handleSetView = (v) => {
    try { localStorage.setItem(LS_VIEW, v); } catch {}
    setView(v);
  };

  const handleTweak = (key, value) => {
    setTweaks(prev => ({ ...prev, [key]: value }));
  };

  // Apply tweaks via CSS custom properties and class toggles on the root element
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    el.style.setProperty('--accent', tweaks.accent);
    el.style.setProperty('--wf-accent', tweaks.accent);
    el.classList.toggle('roomy', tweaks.density === 'roomy');
    el.classList.toggle('notes-hidden', tweaks.notes === 'hide');
  }, [tweaks]);

  const rootClasses = [
    'wf-preview-root',
    tweaks.density === 'roomy' ? 'roomy' : '',
    tweaks.notes === 'hide' ? 'notes-hidden' : '',
  ].filter(Boolean).join(' ');

  return (
    <div ref={rootRef} className={rootClasses} style={{ minHeight: '100vh', position: 'relative' }}>
      <Toolbar view={view} onSetView={handleSetView} />

      {view === 'canvas' ? <CanvasView /> : <SingleView which={view} />}

      {view === 'canvas' && (
        <div className="title-badge">
          <b>5L Labs — Homepage wireframes</b>
          <div>4 rough directions · low-fi, b&amp;w + rust accent.</div>
          <div className="muted-label" style={{ marginTop: 6 }}>Click a tab above to zoom into one.</div>
        </div>
      )}

      <TweaksPanel tweaks={tweaks} onTweak={handleTweak} />
    </div>
  );
}
