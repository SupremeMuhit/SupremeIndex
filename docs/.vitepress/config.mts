import { defineConfig } from 'vitepress'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  /* =======================
     Core site config
  ======================= */

  base: '/',
  title: 'Supreme Index',
  description: 'A Free Media Index',

  cleanUrls: true,
  ignoreDeadLinks: true,
  lastUpdated: false,

  sitemap: {
    hostname: 'https://supremeindex.pages.dev'
  },

  /* =======================
     Head / SEO / Social
  ======================= */

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],

    ['meta', { name: 'theme-color', content: '#000000' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Supreme Index' }],
    ['meta', { property: 'og:description', content: 'A Free Media Index' }],
    ['meta', { property: 'og:image', content: '/og.png' }],

    ['meta', { name: 'twitter:card', content: 'summary_large_image' }]
  ],

  /* =======================
     Markdown improvements
  ======================= */

  markdown: {
    headers: {
      level: [2, 3, 4]
    }
  },

  /* =======================
     Vite (plugins, future-proof)
  ======================= */

  vite: {
    plugins: [
      AutoImport({
        imports: ['vue', 'vitepress'],
        dts: '.vitepress/auto-imports.d.ts'
      }),

      // Plugin order safety (FMHY-style but minimal)
      {
        name: 'plugin-order-safety',
        enforce: 'pre'
      }
    ]
  },

  /* =======================
     Theme config
  ======================= */

  themeConfig: {
    /* ---- Search (enhanced local) ---- */
    search: {
      provider: 'local',
      options: {
        detailedView: true,
        disableQueryPersistence: true
      }
    },

    /* ---- Navbar ---- */
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    /* ---- Sidebar ---- */
    sidebar: [
      {
        text: 'Get Started',
        link: '/get-started',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
          { text: 'About Me', link: '/about' },
          { text: 'My Social Links', link: '/social-links' },
          { text: 'Blog', link: '/blog' }
        ]
      },
      {
        text: 'Resources',
        collapsed: false,
        link: '/resources',
        items: [
          { text: 'Privacy', link: '/resource-privacy' },
          { text: 'AI', link: '/resource-ai' },
          { text: 'Otaku / Streaming / Music', link: '/resource-entertainment' },
          { text: 'Gaming', link: '/resource-gaming' },
          { text: 'Education', link: '/resource-education' },
          { text: 'Download / Torrenting', link: '/resource-downloads' },
          { text: 'Android', link: '/resource-android' },
          { text: 'Miscellaneous', link: '/resource-miscellaneous' }
        ]
      },
      {
        text: 'Tools',
        collapsed: false,
        link: '/tools',
        items: [
          { text: 'System / File Tools', link: '/tool-system' },
          { text: 'Internet / Social Tools', link: '/tool-internet' },
          { text: 'Text / Educational Tools', link: '/tool-text' },
          { text: 'Gaming Tools', link: '/tool-gaming' },
          { text: 'Media Tools', link: '/tool-media' },
          { text: 'Developer Tools', link: '/tool-developer' }
        ]
      },
      {
        text: 'Miscellaneous',
        collapsed: false,
        items: [
          { text: 'Storage', link: '/resource-privacy' },
          { text: 'Vault', link: '/vault' }
        ]
      }
    ],

    /* ---- Social links ---- */
    socialLinks: [
      { icon: 'x', link: 'https://x.com/@supreme_muhit' },
      { icon: 'github', link: 'https://github.com/suprememuhit' }
    ],

    /* ---- Footer (FMHY-inspired) ---- */
    footer: {
      message:
        `Made with ❤️ using <a href="https://vitepress.dev" target="_blank">VitePress</a><br/>
         This site does not host any files.`,
      copyright:
        `© ${new Date().getFullYear()} Supreme Index`
    }
  }
})
