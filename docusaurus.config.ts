import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {config as loadEnv} from 'dotenv';

loadEnv({path: '.env'});
loadEnv({path: '.env.local', override: true});

const tayaChatBotEntryPoint = process.env.DOCUSAURUS_TAYA_ENTRY_POINT ?? '';
const tayaChatBotLocale = process.env.DOCUSAURUS_TAYA_LOCALE ?? 'ru';
const tayaChatBotTheme = process.env.DOCUSAURUS_TAYA_THEME ?? '';
const tayaChatBotOpenOnLoad = process.env.DOCUSAURUS_TAYA_OPEN_ON_LOAD ?? 'false';

const config: Config = {
  title: 'CDEK Avito',
  tagline: 'Avito + CDEK = ❤️',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://cdek-it.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/avito/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'cdek-it', // Usually your GitHub org/user name.
  projectName: 'avito', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru'],
  },

  customFields: {
    tayaChatBotEntryPoint,
    tayaChatBotLocale,
    tayaChatBotTheme,
    tayaChatBotOpenOnLoad,
  },

  plugins: [
      [
        '@docusaurus/plugin-ideal-image',
        {},
      ],
      [
        'docusaurus-plugin-yandex-metrica',
        {
          counterID: '108091708',
          webvisor: true,
        }
      ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.json',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/banner.png',
    algolia: {
      appId: 'X22O3RCFN8',
      apiKey: '66bf4ae3650f1b4b010e61f4d442186f',
      indexName: 'avito',
    },
    navbar: {
      hideOnScroll: true,
      title: 'Avito',
      logo: {
        alt: 'Логотип CDEK',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Официальные ресурсы',
          items: [
            {
              label: 'Заключить договор',
              href: 'https://www.cdek.ru/ru/contract/',
            },
            {
              label: 'Личный кабинет',
              href: 'https://lk.cdek.ru/',
            },
          ],
        },
        {
          title: 'Полезные ссылки',
          items: [
            {
              label: 'Рассчитать стоимость доставки',
              href: 'https://www.cdek.ru/ru/',
            },
            {
              label: 'Техническая поддержка',
              href: 'mailto:integrator@cdek.ru',
            },
          ],
        },
      ],
      copyright: `Copyright © 2026 ООО "СДЭК ДИДЖИТАЛ"`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      defaultLanguage: 'php',
      magicComments: [],
      additionalLanguages: [],
    },
  } satisfies Preset.ThemeConfig,
};

// noinspection JSUnusedGlobalSymbols
export default config;
