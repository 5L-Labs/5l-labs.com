import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { useLocation } from '@docusaurus/router';
import homepageConfig from '../config/homepage';
import allPosts from '../generated/all-posts.json';
import styles from './index.module.css';

const AREAS = ['all', ...homepageConfig.areas];

export default function Archive() {
  const location = useLocation();
  const [area, setArea] = useState('all');

  // Honour deep-links from homepage "load more" (e.g. /archive#home-ml-iot)
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && AREAS.includes(hash)) {
      setArea(hash);
    }
  }, [location.hash]);

  const entries = area === 'all' ? allPosts : allPosts.filter(p => p.area === area);

  return (
    <Layout
      title="Archive — 5L Labs"
      description="All writing from 5L Labs across research areas."
    >
      <main className={styles.page}>

        <div className={styles.terminal}>
          <div><span className={styles.terminalPrompt}>$ ls -lt writing/</span></div>
          <div>
            {allPosts.length} entries across{' '}
            {homepageConfig.areas.map((a, i) => (
              <span key={a}>
                <span className={styles.terminalDir}>{a}/</span>
                {i < homepageConfig.areas.length - 1 ? ' ' : ''}
              </span>
            ))}
          </div>
        </div>

        <section className={styles.indexSection}>
          <div className={styles.indexHeader}>
            <span>INDEX OF /writing</span>
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
                  <td className={styles.hideOnMobile}>{entry.area}</td>
                  <td className={styles.colTitle}>
                    <Link to={entry.url}>{entry.title}</Link>
                  </td>
                  <td><Link to={entry.url}>↗</Link></td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.loadMore}>
            {entries.length} {area === 'all' ? 'total' : area} entr{entries.length === 1 ? 'y' : 'ies'}
          </div>
        </section>

      </main>
    </Layout>
  );
}
