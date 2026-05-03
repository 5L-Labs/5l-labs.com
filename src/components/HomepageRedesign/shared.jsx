import React from 'react';

export function Note({ top, left, right, bottom, children, arrow }) {
  return (
    <div className="note" style={{ top, left, right, bottom }}>
      {children}
      {arrow && (
        <svg width="80" height="60" style={arrow.style}>
          <path
            d={arrow.d}
            fill="none" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round"
            strokeDasharray={arrow.dashed ? '4 3' : undefined}
          />
          <path
            d={arrow.head}
            fill="none" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
}

export function PH({ w, h, label, style }) {
  return <div className="ph" style={{ width: w, height: h, ...style }}>{label}</div>;
}

export function Lines({ rows = 3, widths }) {
  const ws = widths || ['w-90', 'w-80', 'w-60'];
  return (
    <div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className={'line ' + ws[i % ws.length]} />
      ))}
    </div>
  );
}

export function Nav({ active, compact }) {
  const links = compact
    ? ['Research', 'Products', 'Consulting', 'GitHub']
    : ['Research', 'Products', 'Writing', 'Consulting', 'GitHub'];
  return (
    <div className="wf-nav">
      <div className="logo">
        <span className="logo-mark">5L</span>
        <span>5L Labs</span>
      </div>
      <div className="links">
        {links.map(l => (
          <span key={l} className={active === l ? 'u-sketch' : ''}>{l}</span>
        ))}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <div className="wf-foot">
      <div>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>5L Labs</div>
        <div className="muted">
          Commercial privacy-first.<br />
          Advancing technology for humans and bots.
        </div>
      </div>
      <div>
        <h5>Research</h5>
        <ul>
          <li>Private AI/ML</li>
          <li>Private IoT</li>
          <li>Frontier</li>
        </ul>
      </div>
      <div>
        <h5>Projects</h5>
        <ul>
          <li>Open Embeddings</li>
          <li>Recruiter Rankings</li>
          <li>Kill Switch</li>
        </ul>
      </div>
      <div>
        <h5>Contact</h5>
        <ul>
          <li>inquiries@5l-labs.com</li>
          <li>GitHub</li>
          <li>LinkedIn</li>
        </ul>
      </div>
    </div>
  );
}
