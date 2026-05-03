import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import homepageConfig from '../config/homepage';
import allPosts from '../generated/all-posts.json';
import styles from './index.module.css';

const PREVIEW_COUNT = 7;
const AREAS = ['all', ...homepageConfig.areas];

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const [area, setArea] = useState('all');

  const filtered = area === 'all' ? allPosts : allPosts.filter(p => p.area === area);
  const entries = filtered.slice(0, PREVIEW_COUNT);
  const remaining = filtered.length - PREVIEW_COUNT;

  const { consulting, areas } = homepageConfig;

  return (
    <Layout
      title={siteConfig.title}
      description={homepageConfig.missionStatement}
    >
      <main className={styles.page}>

        {/* Terminal banner */}
        <div className={styles.terminal}>
          <div><span className={styles.terminalPrompt}>$ whoami</span></div>
          <div>5L Labs — commercial privacy-first research, est. 2023 (NYC)</div>
          <div style={{ marginTop: 8 }}><span className={styles.terminalPrompt}>$ cat mission.txt</span></div>
          <div>{homepageConfig.missionStatement}</div>
          <div style={{ marginTop: 8 }}><span className={styles.terminalPrompt}>$ ls areas/</span></div>
          <div>
            {areas.map(a => (
              <span key={a} className={styles.terminalDir}>{a}/ </span>
            ))}
          </div>
          <div style={{ marginTop: 8 }}>
            <span className={styles.terminalPrompt}>$ ./hire-us --consulting</span>{' '}
            <span className={styles.terminalCursor}>▊</span>
          </div>
        </div>

        {/* Index */}
        <section className={styles.indexSection}>
          <div className={styles.indexHeader}>
            <span>INDEX OF /</span>
            <span>·</span>
            <span>FILTER:</span>
            {AREAS.map(a => (
              <button
                key={a}
                type="button"
                className={`${styles.chip} ${area === a ? styles.chipActive : ''}`}
                onClick={() => setArea(a)}
                aria-label={`Filter by ${a === 'all' ? 'all areas' : a}`}
                aria-pressed={area === a}
              >
                {a}
              </button>
            ))}
          </div>

          <table className={styles.indexTable}>
            <colgroup>
              <col className={styles.colDate} />
              <col className={styles.colType} />
              <col className={styles.colArea} />
              <col className={styles.colTitle} />
              <col className={styles.colMeta} />
            </colgroup>
            <thead>
              <tr>
                <th className={styles.hideOnMobile}>DATE</th>
                <th>TYPE</th>
                <th className={styles.hideOnMobile}>AREA</th>
                <th>TITLE</th>
                <th>↗</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                    No entries found.
                  </td>
                </tr>
              ) : entries.map((entry) => (
                <tr key={entry.url}>
                  <td className={styles.hideOnMobile}>{entry.dateLabel}</td>
                  <td>
                    <span className={`${styles.chip} ${styles.chipActive}`}>{entry.type}</span>
                  </td>
                  <td className={`${styles.hideOnMobile}`}>{entry.area}</td>
                  <td className={styles.colTitle}>
                    <Link to={entry.url}>{entry.title}</Link>
                  </td>
                  <td><Link to={entry.url}>↗</Link></td>
                </tr>
              ))}
            </tbody>
          </table>

          {remaining > 0 && (
            <div className={styles.loadMore}>
              <Link to={`/archive${area !== 'all' ? `#${area}` : ''}`}>
                — {remaining} more → full archive —
              </Link>
            </div>
          )}
        </section>

        {/* Projects + Consulting */}
        <div className={styles.twoCol}>

          <div className={styles.box}>
            <div className={styles.boxLabel}>~/projects</div>
            {homepageConfig.products.map((p) => (
              <div key={p.title} className={styles.projectGroup}>
                <div className={styles.projectRow}>
                  <Link to={p.link} className={styles.projectName}>
                    {p.title.toLowerCase().replace(/\s*\(.*?\)/, '')}
                  </Link>
                  <span className={styles.projectMeta}>↗</span>
                </div>
                <div className={styles.projectDesc}>{p.description}</div>
              </div>
            ))}
          </div>

          <div className={styles.box}>
            <div className={styles.boxLabel}>~/consulting</div>
            <div className={styles.consultTitle}>{consulting.blurb}</div>
            <div className={styles.consultDesc}>{consulting.services}</div>
            <div className={styles.availability}>
              CURRENT AVAILABILITY:{' '}
              <span className={styles.availabilityVal}>{consulting.availability}</span>
            </div>
            <Link to={consulting.inquireUrl} className={styles.btnAccent}>
              ./inquire →
            </Link>
          </div>

        </div>
      </main>
    </Layout>
  );
}
