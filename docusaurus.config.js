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
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

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
  markdown: {
    format: "detect",
    mermaid: true,
  },
  plugins: [
    [
      "@docusaurus/plugin-content-blog",
      {
        /**
         * Required for any multi-instance plugin
         */
        id: "privatehome",
        /**
         * URL route for the blog section of your site.
         * *DO NOT* include a trailing slash.
         */
        routeBasePath: "privatehome",
        /**
         * Path to data on filesystem relative to site dir.
         */
        path: "./blog-privatehome",
        showReadingTime: true,
        // Please change this to your repo.
        // Remove this to remove the "edit this page" links.
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
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },

        theme: {
          customCss: require.resolve("./src/css/custom.css"),
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
          src: "img/5L-Labs.svg",
        },
        items: [
          { to: "/privatehome", label: "Private IoT", position: "left" },
          { to: "/blog", label: "Blog", position: "left" },
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
                label: "Blog",
                to: "/blog/",
              },
            ],
          },
          {
            title: "Private IoT",
            items: [
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
