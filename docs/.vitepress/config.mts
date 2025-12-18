import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/',
  ignoreDeadLinks: true,
  title: "Supreme Index",
  description: "A Free Media Index",
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Get Started',
        link: '/get-started',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
          { text: 'About Me', link: '/about' },
          { text: 'My Social Links', link: '/social-links' },
          { text: 'Blog', link: '/blog' },
        ]
      },
      {
        text: 'Resorces',
        collapsed: false,
        link: '/resources',
        items: [
          { text: 'Privacy', link: '/resource-privacy' },
          { text: 'AI', link: '/resource-ai' },
          { text: 'Otaku/Streaming/Music', link: '/resource-entertainment' },
          { text: 'Gaming', link: '/resource-gaming' },
          { text: 'Education', link: '/resource-education' },
          { text: 'Download/Torrenting', link: '/resource-downloads' },
          { text: 'Android', link: '/resource-android' },
          { text: 'Miscellaneous', link: '/resource-miscellaneous' }
        ]
      },
      {
        text: 'Tools',
        collapsed: false,
        link:'/tools',
        items: [
          { text: 'System/File Tools', link: '/tool-system' },
          { text: 'Internet/Social Tools', link: '/tool-internet' },
          { text: 'Text/Educational Tools', link: '/tool-text' },
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
          { text: 'Vault', link: '/vault' },
        ]
      }
    ],

socialLinks: [
  { icon: 'x', link: 'https://x.com/@supreme_muhit' },
  { icon: 'github', link: 'https://github.com/suprememuhit' }
]

  }
})
