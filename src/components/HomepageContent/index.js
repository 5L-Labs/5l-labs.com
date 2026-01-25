import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import homepageConfig from '../../config/homepage';

import latestPost from '../../generated/latest-post.json';
import ReactMarkdown from 'react-markdown';

function Section({ title, items }) {
  return (
    <div className={clsx('col col--6')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {items.map((item, idx) => (
            <li key={idx} style={{ marginBottom: '1rem' }}>
              <strong>
                {item.link ? <a href={item.link}>{item.title}</a> : item.title}
              </strong>
              : {item.description}
            </li>
          ))}
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
            <h3><a href={latestPost.url}>{latestPost.title}</a></h3>
            <small>{new Date(latestPost.date).toLocaleDateString()}</small>
          </div>
          <div className="card__body text--center">
            <ReactMarkdown>{latestPost.content}</ReactMarkdown>
          </div>
          <div className="card__footer">
            <a
              href={latestPost.url}
              className="button button--primary button--block"
              aria-label={`Read more about ${latestPost.title}`}
            >
              Read More
            </a>
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
        </div>
      </div>
    </section>
  );
}
