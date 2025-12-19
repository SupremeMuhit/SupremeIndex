<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'

type ThemeName = 'light' | 'dark' | 'amoled'

// Current theme
const theme = ref<ThemeName>('light')

// Dropdown state
const open = ref(false)

// Available themes
const themes: ThemeName[] = ['light', 'dark', 'amoled']

// Apply theme to DOM
const applyTheme = (t: ThemeName) => {
  const el = document.documentElement
  
  if (t === 'light') {
    el.classList.remove('dark', 'amoled')
  } else if (t === 'dark') {
    el.classList.add('dark')
    el.classList.remove('amoled')
  } else if (t === 'amoled') {
    el.classList.add('dark', 'amoled')
  }
}

// Detect saved preference or system preference
onMounted(() => {
  const saved = localStorage.getItem('theme') as ThemeName
  if (saved && themes.includes(saved)) {
    theme.value = saved
    applyTheme(saved)
  } else {
    applyTheme(theme.value)
  }
})

// Switch theme
const setTheme = (t: ThemeName) => {
  theme.value = t
  applyTheme(t)
  localStorage.setItem('theme', t)
  open.value = false
}
</script>

<template>
  <div class="theme-switcher" @click.stop>
    <button class="theme-button" @click="open = !open" :aria-label="'Switch to ' + theme + ' theme'">
      <!-- Light Icon -->
      <svg v-if="theme === 'light'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-icon lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
      
      <!-- Dark Icon -->
      <svg v-if="theme === 'dark'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon-icon lucide-moon"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>
      
      <!-- AMOLED Icon -->
      <svg v-if="theme === 'amoled'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon-star-icon lucide-moon-star"><path d="M18 5h4"/><path d="M20 3v4"/><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>
    </button>

    <div v-if="open" class="theme-popup">
      <div
        v-for="t in themes"
        :key="t"
        :class="['theme-option', { selected: t === theme }]"
        @click="setTheme(t)"
      >
        <span class="theme-icon-small">
           <svg v-if="t === 'light'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
           <svg v-if="t === 'dark'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>
           <svg v-if="t === 'amoled'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 5h4"/><path d="M20 3v4"/><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>
        </span>
        <span class="theme-label">
          {{ t.charAt(0).toUpperCase() + t.slice(1) }}
        </span>
        <span v-if="t === theme" class="check-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.theme-switcher {
  position: relative;
  display: flex;
  align-items: center;
}

.theme-button {
  font-size: 1.2rem;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 8px;
  transition: background 0.2s, border-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-1);
}

.theme-button:hover {
  background: var(--vp-c-bg-alt);
}

.theme-popup {
  position: absolute;
  top: calc(100% + 8px);
  right: -8px; 
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  box-shadow: 0 12px 32px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.08);
  padding: 6px;
  z-index: 100;
  min-width: 140px;
}

.theme-option {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 6px;
  transition: color 0.25s, background-color 0.25s;
  color: var(--vp-c-text-1);
  font-size: 14px;
}

.theme-option:hover {
  background-color: var(--vp-c-bg-alt);
  color: var(--vp-c-brand-1);
}

.theme-option.selected {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.theme-icon-small {
  display: flex;
  align-items: center;
  margin-right: 8px;
  color: inherit;
}

.theme-label {
  flex-grow: 1;
}

.check-icon {
  margin-left: 8px;
  display: flex;
  align-items: center;
}

html.dark .theme-popup {
  box-shadow: 0 12px 32px rgba(0,0,0,0.35), 0 2px 6px rgba(0,0,0,0.2);
}
</style>
