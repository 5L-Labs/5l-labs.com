// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require("prism-react-renderer");
const lightTheme = themes.github;
const darkTheme = themes.dracula;
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "5L Labs",
  tagline: "Commercial Privacy First.",
  url: "https://www.5l-labs.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  favicon: "img/favicon.svg",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "5L-Labs", // Usually your GitHub org/user name.
  projectName: "5L-labs.com", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ja"],
  },
  stylesheets: [
    // Preconnect to Google Fonts domains to reduce connection latency
    {
      href: "https://fonts.googleapis.com",
      rel: "preconnect",
    },
    {
      href: "https://fonts.gstatic.com",
      rel: "preconnect",
      crossorigin: true,
    },
    // Load fonts via stylesheet link instead of @import for faster First Contentful Paint (FCP)
    // and parallel downloading
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap",
  ],
  markdown: {
    format: "detect",
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },
  plugins: [
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "self-hosted-iot",
        routeBasePath: "self-hosted-iot",
        path: "./blog-self-hosted-iot",
        showReadingTime: true,
      },
    ],
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "applied-home-ml-iot",
        routeBasePath: "applied-home-ml-iot",
        path: "./blog-applied-home-ml-iot",
        showReadingTime: true,
      },
    ],
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "applied-ai-engineering",
        routeBasePath: "applied-ai-engineering",
        path: "./blog-applied-ai-engineering",
        showReadingTime: true,
      },
    ],
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "frontier-research",
        routeBasePath: "frontier-research",
        path: "./blog-frontier-research",
        showReadingTime: true,
      },
    ],
  ],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
        },
        blog: false, // Disable the default blog
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "G-P85W9ZNZTP",
          anonymizeIP: true,
        },
        sitemap: {
          lastmod: "date",
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
          filename: "sitemap.xml",
          createSitemapItems: async (params) => {
            const { defaultCreateSitemapItems, ...rest } = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.filter((item) => !item.url.includes("/page/"));
          },
        },
      }),
    ],
  ],
  themes: ["@docusaurus/theme-mermaid"],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "5L-Labs",
        logo: {
          alt: "5L Labs Logo",
          src: "img/5L-Labs-Blue.svg",
        },
        items: [
          {
            label: "Blog(s)",
            position: "left",
            items: [
              { to: "/self-hosted-iot", label: "Self-Hosted IOT" },
              { to: "/applied-home-ml-iot", label: "Applied Home ML IOT" },
              { to: "/applied-ai-engineering", label: "Applied AI Engineering" },
              { to: "/frontier-research", label: "Frontier Research" },
            ],
          },
          {
            label: "Products/Projects",
            position: "left",
            items: [
              {
                label: "Open Embeddings",
                href: "http://www.open-embeddings.org",
              },
              {
                label: "Recruiter Rankings (Preview)",
                href: "http://recruiter-rankings.com",
              },
              {
                label: "Overlord Network Kill Switch",
                href: "https://github.com/5L-Labs/overlord-network-kill-switch",
              },
            ],
          },
          { to: "/docs", label: "Consulting Services", position: "left" },
          {
            href: "https://github.com/orgs/5L-Labs/",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      mermaid: {
        theme: {
          light: "dark",
          dark: "forest",
        },
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Private AI",
            items: [
              {
                label: "Applied AI Engineering",
                to: "/applied-ai-engineering",
              },
              {
                label: "Frontier Research",
                to: "/frontier-research",
              },
            ],
          },
          {
            title: "Private IoT",
            items: [
              {
                label: "Self-Hosted IOT",
                to: "/self-hosted-iot",
              },
              {
                label: "Applied Home ML IOT",
                to: "/applied-home-ml-iot",
              },
              {
                label: "Tasmota Templates",
                href: "https://templates.blakadder.com/",
              },
              {
                label: "Zigbee Templates",
                href: "https://zigbee.blakadder.com/",
              },
            ],
          },
          {
            title: "Contact Us",
            items: [
              {
                label: "Email",
                href: "mailto:inquiries@5l-labs.com",
              },
              {
                label: "Google Maps",
                href: "https://www.google.com/maps/place/5L+Labs,+LLC/@40.7127281,-74.005973,17z/data=!3m1!4b1!4m5!3m4!1s0x89c2585e2b8b0b3b:0x5b0a5a5a5a5a5a5a!8m2!3d40.7127281!4d-74.0037843",
              },
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/company/5l-labs/",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/5l_labs",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} 5L Labs, LLC. Built with Docusaurus.`,
      },
      prism: {
        theme: lightTheme,
        darkTheme: darkTheme,
      },
    }),
};

module.exports = config;
