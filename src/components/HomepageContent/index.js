import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import homepageConfig from '../../config/homepage';

import latestPost from '../../generated/latest-post.json';

function Section({ title, items }) {
  return (
    <div className={clsx('col col--6')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {items.map((item, idx) => (
            <li key={idx} style={{ marginBottom: '1rem' }}>
              <strong>
                {item.link ? <Link to={item.link}>{item.title}</Link> : item.title}
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
            <h3><Link to={latestPost.url}>{latestPost.title}</Link></h3>
            <small>{new Date(latestPost.date).toLocaleDateString('en-US', { timeZone: 'UTC' })}</small>
          </div>
          <div className="card__body text--center">
            <p>{latestPost.content}</p>
          </div>
          <div className="card__footer">
            <Link to={latestPost.url} className="button button--primary button--block" aria-label={`Read more about ${latestPost.title}`}>Read More</Link>
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
        {/* Mission Statement Section */}
        <div className="row margin-bottom--xl">
          <div className="col col--8 col--offset-2">
            <div className="text--center padding-horiz--md">
              <h1 className="hero__title margin-bottom--md">Mission Statement</h1>
              <p className="hero__subtitle shadow--lw padding--md" style={{ borderRadius: 'var(--radius)', background: 'var(--bg-card)' }}>
                {homepageConfig.missionStatement}
              </p>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="row margin-bottom--xl">
          <div className="col col--10 col--offset-1">
            <div className="text--center margin-bottom--lg">
              <h2 style={{ fontSize: '2.5rem' }}>Products</h2>
            </div>
            <div className="row">
              {homepageConfig.products.map((product, idx) => (
                <div key={idx} className="col col--6 margin-bottom--md">
                  <div className="card shadow--md h-100">
                    <div className="card__header">
                      <h3>{product.link ? <Link to={product.link}>{product.title}</Link> : product.title}</h3>
                    </div>
                    <div className="card__body">
                      <p>{product.description}</p>
                    </div>
                    {product.link && (
                      <div className="card__footer">
                        <Link to={product.link} className="button button--outline button--primary button--block" aria-label={`Learn more about ${product.title}`}>Learn More</Link>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Research Areas & Latest Update Section */}
        <div className="row" style={{ justifyContent: 'center' }}>
          <div className="col col--10 col--offset-1">
            <div className="text--center margin-bottom--lg">
              <h2 style={{ fontSize: '2.5rem' }}>Research & Updates</h2>
            </div>
            <div className="row">
              <Section title="Major Research Areas" items={homepageConfig.researchAreas} />
              <LatestPost />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
