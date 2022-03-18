// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Adrian Iannantuono',
  tagline: 'Computer Engineering student.',
  url: 'https://adrianiannantuono.ca',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'https://github.com/adrianiannantuono.png',
  organizationName: 'adrianiannantuono', // Usually your GitHub org/user name.
  projectName: 'personal-website', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/adrianiannantuono/personal-website/tree/main',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/adrianiannantuono/personal-website/tree/main',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Adrian Iannantuono',
        logo: {
          alt: 'My Site Logo',
          src: 'https://github.com/adrianiannantuono.png',
        },
        items: [
          {to: '/about', label: 'About Me', position: 'left'},
          {to: '/about', label: 'Projects', position: 'left'},
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            type: 'doc',
            docId: 'intro',
            position: 'right',
            label: 'Docs',
          },
          {
            href: 'https://github.com/adrianiannantuono',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        links: [
          {
            title: 'Site',
            items: [
              {
                label: 'Home',
                to: '/',
              },
              {
                label: 'About Me',
                to: '/about',
              },
              {
                label: 'Projects',
                to: '/about',
              },
              {
                label: 'Blog',
                to: '/blog',
              },
            ],
          },
          {
            title: 'Quick Links',
            items: [
              {
                label: 'Docs',
                to: '/docs/intro',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'Contact',
            items: [
              {
                label: 'Email',
                href: 'mailto:aiannantuono@me.com',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/adrianiannantuono',
              },
              {
                label: 'LinkedIn',
                href: 'https://linkedin.com/in/adrianiannantuono',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} adrianiannantuono.ca`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
