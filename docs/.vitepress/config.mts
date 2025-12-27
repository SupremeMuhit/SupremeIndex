import { defineConfig } from 'vitepress'
import AutoImport from 'unplugin-auto-import/vite'
import { execSync } from 'child_process'
import { abbr } from '@mdit/plugin-abbr'
import { sub } from '@mdit/plugin-sub'
import { sup } from '@mdit/plugin-sup'
import { attrs } from '@mdit/plugin-attrs'
import { footnote } from '@mdit/plugin-footnote'
import { spoiler } from '@mdit/plugin-spoiler'
import { ins } from '@mdit/plugin-ins'
import { tasklist } from '@mdit/plugin-tasklist'
import { mark } from '@mdit/plugin-mark'
import { icon } from '@mdit/plugin-icon'
import { align } from '@mdit/plugin-align'
import { imgSize } from '@mdit/plugin-img-size'
import { demo } from '@mdit/plugin-demo'
import { tab } from '@mdit/plugin-tab'

// --- Get latest git commit title and short hash ---
let commitTitle = 'development'
let commitHash = '0000000'
try {
  commitTitle = execSync('git log -1 --pretty=%s').toString().trim()
  commitHash = execSync('git log -1 --pretty=%h').toString().trim()
} catch (e) {
  // fallback if Git is unavailable (Cloudflare Pages preview)
}

// GitHub commit URL
const commitUrl = `https://github.com/SupremeMuhit/SupremeIndex/commit/${commitHash}`

export default defineConfig({
  base: '/',
  title: 'Supreme Index',
  description: 'A free media, resource, and tool index',

  cleanUrls: true,
  ignoreDeadLinks: true,
  lastUpdated: false,

  sitemap: {
    hostname: 'https://supremeindex.pages.dev'
  },

  head: [
    // Favicons
    ['link', { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon.png' }],
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    // SEO description
    ['meta', { name: 'description', content: 'Supreme Index is a free media, resource, and tool index featuring alternatives, curated lists, and a digital vault.' }],
    // Open Graph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Supreme Index' }],
    ['meta', { property: 'og:description', content: 'A free media, resource, and tool index with alternatives, curated lists, and a digital vault.' }],
    ['meta', { property: 'og:site_name', content: 'Supreme Index' }],
    ['meta', { property: 'og:url', content: 'https://supremeindex.pages.dev' }],
    ['meta', { property: 'og:image', content: 'https://supremeindex.pages.dev/og.png' }],
    // Twitter / X
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Supreme Index' }],
    ['meta', { name: 'twitter:description', content: 'A free media, resource, and tool index with alternatives and curated resources.' }],
    ['meta', { name: 'twitter:image', content: 'https://supremeindex.pages.dev/og.png' }],
    // Theme color
    ['meta', { name: 'theme-color', content: '#000000' }]
  ],

  markdown: {
    headers: { level: [2, 3, 4] },
    config(md) {
      md.use(abbr)
      md.use(sub)
      md.use(sup)
      md.use(attrs)
      md.use(footnote)
      md.use(spoiler)
      md.use(ins)
      md.use(tasklist)
      md.use(mark)
      md.use(align)
      md.use(icon)
      md.use(demo)
      md.use(tab)
      md.use(imgSize)
    }
  },

  vite: {
    plugins: [
      AutoImport({
        imports: ['vue', 'vitepress'],
        dts: '.vitepress/auto-imports.d.ts'
      }),
      { name: 'plugin-order-safety', enforce: 'pre' }
    ]
  },

  appearance: false,

  themeConfig: {
    search: { provider: 'local' },
    logo: { src: '/favicon.ico', alt: 'SI Logo' },
    outline: [2, 6],
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Ecosystem',
        items: [
          { text: 'Feature 1 (SOON!!)', link: '/' },
          { text: 'Feature 2 (SOON!!)', link: '/' },
          { text: 'Feature 3 (SOON!!)', link: '/' },
          { text: 'Feature 4 (SOON!!)', link: '/' },
          { text: 'Feature 5 (SOON!!)', link: '/' }
        ]
      }
    ],

    sidebar: [
      {
        text: 'Get Started',
        link: '/get-started',
        items: [
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
          { text: 'Otaku', link: '/resource-otaku' },
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
          { text: 'Gaming', link: '/tool-gaming' },
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

    socialLinks: [
      { icon: 'x', link: 'https://x.com/@supreme_muhit' },
      { icon: 'github', link: 'https://github.com/SupremeMuhit' }
    ],

    footer: {
      message: `Made with 💔, version: <a href="${commitUrl}" target="_blank">${commitTitle}</a><br/>This site does not host any files.`,
      copyright: `© ${new Date().getFullYear()}, Estd 2025. Supreme Index`
    }
  }
})
