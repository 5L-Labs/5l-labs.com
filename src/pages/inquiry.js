import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import homepageConfig from '../config/homepage';
import styles from './inquiry.module.css';

// To wire up form submission, create a free account at https://formspree.io,
// create a form, and replace null with your form ID string e.g. 'xpwzabcd'
const FORMSPREE_ID = null;

const INITIAL = { name: '', email: '', phone: '', message: '', smsConsent: false };

export default function Inquiry() {
  const [fields, setFields] = useState(INITIAL);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const set = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFields(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    if (FORMSPREE_ID) {
      try {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: fields.name,
            email: fields.email,
            phone: fields.phone || '(not provided)',
            message: fields.message,
            sms_consent: fields.smsConsent ? 'Yes — consented to SMS' : 'No',
          }),
        });
        setStatus(res.ok ? 'success' : 'error');
      } catch {
        setStatus('error');
      }
    } else {
      // Fallback: open email client with pre-filled body
      const body = encodeURIComponent(
        `Name: ${fields.name}\nEmail: ${fields.email}\nPhone: ${fields.phone || 'N/A'}\n\n${fields.message}\n\nSMS consent: ${fields.smsConsent ? 'Yes' : 'No'}`
      );
      if (typeof window !== 'undefined') {
        window.location.href = `mailto:${homepageConfig.contactInfo.email}?subject=Consulting%20Inquiry&body=${body}`;
      }
      setStatus('success');
    }
  };

  if (status === 'success') {
    return (
      <Layout title="Inquiry sent — 5L Labs">
        <main className={styles.page}>
          <div className={styles.success}>
            <div className={styles.successIcon}>✓</div>
            <h1>Got it.</h1>
            <p>We'll be in touch at <strong>{fields.email}</strong>.</p>
            <p className={styles.muted}>We take on 1–2 engagements per quarter — expect a response within a few business days.</p>
            <Link to="/" className={styles.backLink}>← back to home</Link>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout
      title="Start an Inquiry — 5L Labs"
      description="Get in touch about consulting engagements. Private ML, on-device inference, and IoT architecture."
    >
      <main className={styles.page}>
        <div className={styles.header}>
          <div className={styles.label}>~/consulting/inquire</div>
          <h1 className={styles.title}>Start an inquiry</h1>
          <p className={styles.subtitle}>
            We take <strong>1–2 engagements per quarter</strong>. Current availability:{' '}
            <span className={styles.availability}>{homepageConfig.consulting.availability}</span>.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>

          <div className={styles.row}>
            <label className={styles.fieldLabel} htmlFor="name">Name *</label>
            <input
              id="name"
              className={styles.input}
              type="text"
              value={fields.name}
              onChange={set('name')}
              required
              autoComplete="name"
            />
          </div>

          <div className={styles.row}>
            <label className={styles.fieldLabel} htmlFor="email">Email *</label>
            <input
              id="email"
              className={styles.input}
              type="email"
              value={fields.email}
              onChange={set('email')}
              required
              autoComplete="email"
            />
          </div>

          <div className={styles.row}>
            <label className={styles.fieldLabel} htmlFor="phone">
              Phone <span className={styles.optional}>(optional)</span>
            </label>
            <input
              id="phone"
              className={styles.input}
              type="tel"
              value={fields.phone}
              onChange={set('phone')}
              autoComplete="tel"
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div className={styles.row}>
            <label className={styles.fieldLabel} htmlFor="message">Tell us about your project *</label>
            <textarea
              id="message"
              className={styles.textarea}
              value={fields.message}
              onChange={set('message')}
              required
              rows={6}
              placeholder="What are you trying to build? What's the data sensitivity? Timeline?"
            />
          </div>

          {/* SMS opt-in — required for Twilio toll-free verification */}
          <div className={styles.consentRow}>
            <input
              id="smsConsent"
              className={styles.checkbox}
              type="checkbox"
              checked={fields.smsConsent}
              onChange={set('smsConsent')}
            />
            <label htmlFor="smsConsent" className={styles.consentLabel}>
              I agree to receive SMS messages from 5L Labs regarding my inquiry and project
              updates at the phone number provided. Message &amp; data rates may apply.
              Message frequency varies. Reply <strong>STOP</strong> to opt out at any time,{' '}
              <strong>HELP</strong> for help. View our{' '}
              <Link to="/privacy-policy">Privacy Policy</Link>.
            </label>
          </div>

          {status === 'error' && (
            <div className={styles.errorMsg}>
              Something went wrong. Please email us directly at{' '}
              <a href={`mailto:${homepageConfig.contactInfo.email}`}>
                {homepageConfig.contactInfo.email}
              </a>.
            </div>
          )}

          <button
            type="submit"
            className={styles.submit}
            disabled={status === 'submitting' || !fields.name || !fields.email || !fields.message || !fields.smsConsent}
          >
            {status === 'submitting' ? 'Sending…' : './send-inquiry →'}
          </button>

        </form>

        <div className={styles.footer}>
          <span className={styles.muted}>Or reach us directly:</span>{' '}
          <a href={`mailto:${homepageConfig.contactInfo.email}`}>
            {homepageConfig.contactInfo.email}
          </a>
        </div>
      </main>
    </Layout>
  );
}
