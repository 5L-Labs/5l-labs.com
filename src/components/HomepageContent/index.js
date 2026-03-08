import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import homepageConfig from '../../config/homepage';

import latestPost from '../../generated/latest-post.json';

function ArrowIcon({ className }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  );
}

function ExternalLinkIcon({ className }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label="(opens in new tab)"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function Section({ title, items }) {
  return (
    <div className={clsx('col col--6')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {(items || []).map((item, idx) => {
            const isExternal = item.link && item.link.startsWith('http');
            return (
              <li key={idx} style={{ marginBottom: '1.5rem' }}>
                <div style={{ marginBottom: '0.25rem' }}>
                  <strong>
                    {item.link ? (
                      <Link to={item.link} className="inline-flex items-center gap-1 group">
                        {item.title}
                        {isExternal ? (
                          <ExternalLinkIcon className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1" />
                        ) : (
                          <ArrowIcon className="transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1" />
                        )}
                      </Link>
                    ) : (
                      item.title
                    )}
                  </strong>
                </div>
                <div className="text--secondary">{item.description}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function LatestPost() {
  if (!latestPost || !latestPost.title) return null;

  return (
    <div className={clsx('col col--6')}>
      <div className="text--center padding-horiz--md">
        <h3>Latest Update</h3>
        <div className="card shadow--md">
          <div className="card__header">
            <h3>
              <Link to={latestPost.url} className="inline-flex items-center gap-1 group">
                {latestPost.title}
                <ArrowIcon className="transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1" />
              </Link>
            </h3>
            <small>
              <time dateTime={latestPost.date}>
                {new Date(latestPost.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  timeZone: 'UTC',
                })}
              </time>
            </small>
          </div>
          <div className="card__body text--center">
            <p>{latestPost.content}</p>
          </div>
          <div className="card__footer">
            <Link
              to={latestPost.url}
              className="button button--primary button--block inline-flex items-center justify-center gap-2 group"
              aria-label={`Read more about ${latestPost.title}`}
            >
              Read More
              <ArrowIcon className="transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomepageContent() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <div className="text--center padding-horiz--md margin-bottom--xl">
              <h2>Mission Statement</h2>
              <p>{homepageConfig.missionStatement}</p>
            </div>
          </div>
        </div>
        <div className="row" style={{ justifyContent: 'center' }}>
          <Section title="Major Research Areas" items={homepageConfig.researchAreas} />
          <LatestPost />
          <Section title="Products/Projects" items={homepageConfig.products || []} />
        </div>
      </div>
    </section>
  );
}
