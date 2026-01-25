import React, { useState } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./index.module.css"; // Keeping for safety, though we mainly use global custom.css now

function MinimalHero() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <section className="hero-minimal">
      <div className="container">
        <h1 className="hero-minimal__title">
          Applied AI Consulting, Corporate Training, and Early-Stage Investing
        </h1>
        <p className="hero-minimal__subtitle">
          We provide strategic guidance on AI vision, problem-scoping, and implementation roadmaps tailored to your specific business constraints and objectives.
        </p>
        <Link
          className="btn btn-primary btn-lg"
          to="mailto:inquiries@5l-labs.com">
          Let's Talk
        </Link>
      </div>
    </section>
  );
}

function ServiceItem({ number, title, content, children }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div 
      className="service-item" 
      data-expanded={expanded}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="service-header">
        <span className="service-number">{number}</span>
        <h3 className="service-title">{title}</h3>
        <span className="service-icon">+</span>
      </div>
      <div className="service-content">
        <p>{content}</p>
        {children}
      </div>
    </div>
  );
}

function ServicesSection() {
  return (
    <section className="section-services">
      <div className="service-accordion">
        <ServiceItem 
          number="01" 
          title="AI/Security/IOT Advisory"
          content="Strategic guidance tailored to your specific business constraints and objectives."
        >
          <ul>
            <li>AI strategy development and roadmapping</li>
            <li>Technology assessment and feasibility studies</li>
            <li>ROI analysis and business case development</li>
            <li>Risk assessment and mitigation planning</li>
          </ul>
        </ServiceItem>
        
        <ServiceItem 
          number="02" 
          title="Applied AI Engineering"
          content="Hands-on implementation of custom AI solutions, from prototypes to production-grade systems."
        >
           <ul>
             <li>LLM integration and fine-tuning</li>
             <li>RAG (Retrieval-Augmented Generation) pipeline development</li>
             <li>Custom agentic workflow automation</li>
           </ul>
        </ServiceItem>

        <ServiceItem 
          number="03" 
          title="Privacy-First IoT & Infrastructure"
          content="Designing secure, local-first IoT ecosystems and infrastructure that respects data sovereignty."
        >
           <ul>
             <li>Self-hosted home/office automation setups</li>
             <li>Local inference server deployment</li>
             <li>Secure network architecture design</li>
           </ul>
        </ServiceItem>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="section-contact">
      <div className="container">
        <h2 className="contact-title">Get In Touch</h2>
        <p className="hero-minimal__subtitle">
          Ready to transform your AI journey? Let's discuss how we can help.
        </p>
        <Link
          className="btn btn-primary btn-lg"
          to="mailto:inquiries@5l-labs.com">
          Let's Talk
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Applied AI Consulting and Research"
    >
      <main>
        <MinimalHero />
        <ServicesSection />
        <ContactSection />
      </main>
    </Layout>
  );
}
