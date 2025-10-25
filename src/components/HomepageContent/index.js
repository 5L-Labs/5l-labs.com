import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import homepageConfig from '../../config/homepage';

function Section({ title, items }) {
  return (
    <div className={clsx('col col--6')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <ul>
          {items.map((item, idx) => (
            <li key={idx}>
              <strong>{item.title}</strong>: {item.description}
            </li>
          ))}
        </ul>
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
            <div className="text--center padding-horiz--md">
              <h2>Mission Statement</h2>
              <p>{homepageConfig.missionStatement}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <Section title="Major Research Areas" items={homepageConfig.researchAreas} />
          <Section title="Products" items={homepageConfig.products} />
        </div>
        <div className="row">
          <div className="col col--12">
            <div className="text--center padding-horiz--md">
              <h2>Contact Us</h2>
              <p>
                <a href={`mailto:${homepageConfig.contactInfo.email}`}>Email</a> |{' '}
                <a href={homepageConfig.contactInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a> |{' '}
                <a href={homepageConfig.contactInfo.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
