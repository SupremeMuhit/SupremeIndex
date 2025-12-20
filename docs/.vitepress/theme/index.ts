import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import SidebarFooter from './components/SidebarFooter.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(ThemeSwitcher),
      'sidebar-nav-after': () => h(SidebarFooter)
    })
  }
} satisfies Theme
