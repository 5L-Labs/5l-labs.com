import areaLabels from './areas.json';

const homepageConfig = {
  missionStatement: "Advancing Technology for Humans and Bots with Privacy in mind.",

  contactInfo: {
    email: "inquiries@5l-labs.com",
    linkedin: "https://www.linkedin.com/company/5l-labs/",
    twitter: "https://twitter.com/5l_labs",
  },

  // Canonical list derived from src/config/areas.json (shared with generate-latest-post.js)
  areas: Object.values(areaLabels),

  consulting: {
    availability: 'Q3 2026',
    blurb: 'We take on a small number of engagements each quarter.',
    services: 'Private ML systems, on-device inference, and IoT architecture audits.',
    inquireUrl: '/inquiry',
  },

  researchAreas: [
    {
      title: "Private AI/ML",
      description: "Developing machine learning models that learn from sensitive data without compromising individual privacy.",
      link: "/applied-ai-engineering",
    },
    {
      title: "Private IoT",
      description: "Building secure and decentralized IoT solutions that protect user data and privacy.",
      link: "/self-hosted-iot",
    },
  ],

  products: [
    {
      title: "Recruiter Rankings (Preview)",
      description: "The industry standard for evaluating and ranking recruitment firms based on verified performance and data.",
      link: "https://www.recruiter-rankings.com",
    },
    {
      title: "Open Embeddings",
      description: "A community-driven standard and registry for high-quality, open-source vector embeddings for AI applications.",
      link: "https://www.open-embeddings.org",
    },
    {
      title: "Overlord Network Kill Switch",
      description: "A hardware-independent network control system designed for immediate and complete network isolation in commercial environments.",
      link: "https://github.com/5L-Labs/overlord-network-kill-switch",
    },
  ],
};

export default homepageConfig;
