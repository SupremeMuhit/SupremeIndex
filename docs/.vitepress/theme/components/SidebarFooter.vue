<script setup lang="ts">
import { ref, onMounted } from 'vue'

const currentThemeName = ref('Indigo')

// Standard Themes
const standardThemes = [
  { name: 'Indigo', color: '#6366f1', vars: { '--vp-c-brand-1': '#6366f1', '--vp-c-brand-2': '#4f46e5', '--vp-c-brand-3': '#4338ca', '--vp-c-brand-soft': 'rgba(99, 102, 241, 0.14)' } },
  { name: 'Blue', color: '#3b82f6', vars: { '--vp-c-brand-1': '#3b82f6', '--vp-c-brand-2': '#2563eb', '--vp-c-brand-3': '#1d4ed8', '--vp-c-brand-soft': 'rgba(59, 130, 246, 0.14)' } },
  { name: 'Cyan', color: '#06b6d4', vars: { '--vp-c-brand-1': '#06b6d4', '--vp-c-brand-2': '#0891b2', '--vp-c-brand-3': '#0e7490', '--vp-c-brand-soft': 'rgba(6, 182, 212, 0.14)' } },
  { name: 'Green', color: '#10b981', vars: { '--vp-c-brand-1': '#10b981', '--vp-c-brand-2': '#059669', '--vp-c-brand-3': '#047857', '--vp-c-brand-soft': 'rgba(16, 185, 129, 0.14)' } },
  { name: 'Yellow', color: '#eab308', vars: { '--vp-c-brand-1': '#eab308', '--vp-c-brand-2': '#ca8a04', '--vp-c-brand-3': '#a16207', '--vp-c-brand-soft': 'rgba(234, 179, 8, 0.14)' } },
  { name: 'Orange', color: '#f97316', vars: { '--vp-c-brand-1': '#f97316', '--vp-c-brand-2': '#ea580c', '--vp-c-brand-3': '#c2410c', '--vp-c-brand-soft': 'rgba(249, 115, 22, 0.14)' } },
  { name: 'Red', color: '#ef4444', vars: { '--vp-c-brand-1': '#ef4444', '--vp-c-brand-2': '#dc2626', '--vp-c-brand-3': '#b91c1c', '--vp-c-brand-soft': 'rgba(239, 68, 68, 0.14)' } },
  { name: 'Pink', color: '#ec4899', vars: { '--vp-c-brand-1': '#ec4899', '--vp-c-brand-2': '#db2777', '--vp-c-brand-3': '#be185d', '--vp-c-brand-soft': 'rgba(236, 72, 153, 0.14)' } },
  { name: 'Purple', color: '#8b5cf6', vars: { '--vp-c-brand-1': '#8b5cf6', '--vp-c-brand-2': '#7c3aed', '--vp-c-brand-3': '#6d28d9', '--vp-c-brand-soft': 'rgba(139, 92, 246, 0.14)' } },
]

// Amoled Themes (Glow Enabled)
const amoledThemes = [
  { name: 'Ultra Instinct', color: '#e5e7eb', vars: { '--vp-c-brand-1': '#ffffff', '--vp-c-brand-2': '#f3f4f6', '--vp-c-brand-3': '#e5e7eb', '--vp-c-brand-soft': 'rgba(255, 255, 255, 0.25)' }, glow: true },
  { name: 'SSG', color: '#ef4444', vars: { '--vp-c-brand-1': '#ef4444', '--vp-c-brand-2': '#dc2626', '--vp-c-brand-3': '#b91c1c', '--vp-c-brand-soft': 'rgba(239, 68, 68, 0.25)' }, glow: true },
  { name: 'SSB', color: '#06b6d4', vars: { '--vp-c-brand-1': '#06b6d4', '--vp-c-brand-2': '#0891b2', '--vp-c-brand-3': '#0e7490', '--vp-c-brand-soft': 'rgba(6, 182, 212, 0.25)' }, glow: true },
  { name: 'SSJ', color: '#eab308', vars: { '--vp-c-brand-1': '#facc15', '--vp-c-brand-2': '#ca8a04', '--vp-c-brand-3': '#a16207', '--vp-c-brand-soft': 'rgba(234, 179, 8, 0.25)' }, glow: true },
  { name: 'SSJ Legendary', color: '#00ff00', vars: { '--vp-c-brand-1': '#00ff00', '--vp-c-brand-2': '#00cc00', '--vp-c-brand-3': '#009900', '--vp-c-brand-soft': 'rgba(0, 255, 0, 0.25)' }, glow: true },
  { name: 'Ultra Ego', color: '#8b5cf6', vars: { '--vp-c-brand-1': '#8b5cf6', '--vp-c-brand-2': '#7c3aed', '--vp-c-brand-3': '#6d28d9', '--vp-c-brand-soft': 'rgba(139, 92, 246, 0.25)' }, glow: true },
]

// Combined for easy lookup
const allThemes = [...standardThemes, ...amoledThemes]

const applyTheme = (theme: any) => {
  const root = document.documentElement
  for (const [key, value] of Object.entries(theme.vars)) {
    root.style.setProperty(key, value as string)
  }
  currentThemeName.value = theme.name
  localStorage.setItem('docs-theme-color', JSON.stringify(theme))

  // Apply generic glow class if theme has glow property
  if (theme.glow) {
    document.documentElement.classList.add('theme-glow')
    // Set glow color variable for CSS to pick up
    // Using --vp-c-brand-1 for the glow color base
    root.style.setProperty('--theme-glow-color', theme.vars['--vp-c-brand-1'])
  } else {
    document.documentElement.classList.remove('theme-glow')
    root.style.removeProperty('--theme-glow-color')
  }
}

const selectTheme = (theme: any) => {
  applyTheme(theme)
}

onMounted(() => {
  const saved = localStorage.getItem('docs-theme-color')
  if (saved) {
    try {
      const theme = JSON.parse(saved)
      const matched = allThemes.find(t => t.name === theme.name)
      if (matched) {
        currentThemeName.value = matched.name
        applyTheme(matched)
      } else {
        applyTheme(theme)
      }
    } catch (e) {
      console.error('Failed to load theme', e)
    }
  }
})

const isSelected = (themeName: string) => currentThemeName.value === themeName
</script>

<template>
  <div class="sidebar-card">
    <div class="card-header">
      <div class="card-title">Emoji Legend</div>
    </div>
    
    <div class="card-field">
      <div class="icon-wrapper">
        <span class="icon">🌐</span>
      </div>
      <div class="label">Indexes</div>
    </div>
    <div class="card-field">
      <div class="icon-wrapper">
        <span class="icon">🔄</span>
      </div>
      <div class="label">Storage Links</div>
    </div>
    <div class="card-field">
      <div class="icon-wrapper">
        <span class="icon">⭐</span>
      </div>
      <div class="label">Favourite</div>
    </div>
    <div class="card-field">
      <div class="icon-wrapper">
        <span class="icon">🌟</span>
      </div>
      <div class="label">The Last You Need</div>
    </div>


    <!-- Standard Themes -->
    <div class="card-header mt-4">
      <div class="card-title">Themes</div>
    </div>
    <div class="color-picker-section">
      <div class="color-grid">
        <button
          v-for="t in standardThemes"
          :key="t.name"
          class="color-btn"
          :class="{ selected: isSelected(t.name) }"
          :style="{ backgroundColor: t.color }"
          :title="t.name"
          @click="selectTheme(t)"
        ></button>
      </div>
    </div>

    <!-- Amoled Themes -->
    <div class="card-header mt-4">
      <div class="card-title">Amoled Themes</div>
    </div>
    <div class="color-picker-section">
      <div class="color-grid">
        <button
          v-for="t in amoledThemes"
          :key="t.name"
          class="color-btn"
          :class="{ selected: isSelected(t.name), 'glow-effect': t.glow }"
          :style="{ backgroundColor: t.color, '--btn-glow-color': t.vars['--vp-c-brand-1'] }"
          :title="t.name"
          @click="selectTheme(t)"
        ></button>
      </div>
    </div>

    <div class="theme-status">
      <span class="theme-label">Theme:</span>
      <span class="theme-value">{{ currentThemeName }}</span>
    </div>
  </div>
</template>

<style scoped>
.sidebar-card {
  margin-top: 1rem;
  padding: 1.25rem;
  border-radius: 0.5rem;
  border: 2px solid var(--vp-c-default-soft);
  background-color: var(--vp-c-bg);
  transition: border-color 0.5s;
}

.sidebar-card:hover {
  border-color: var(--vp-c-brand-1);
  background-color: rgba(var(--vp-c-bg), 0.4);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.mt-4 {
  margin-top: 1rem;
}

.card-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  line-height: 1.625;
}

.card-field {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  gap: 12px;
}

.icon-wrapper {
  display: flex;
  align-items: center;
}

.icon {
  font-size: 1.5rem;
  line-height: 1;
}

.label {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  margin-left: 0.5rem;
}

.color-picker-section {
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}

.color-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.color-btn {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0;
  display: inline-block;
  position: relative;
}

.color-btn.selected {
  border-color: var(--vp-c-text-2);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.color-btn:hover {
  transform: scale(1.1);
}

.glow-effect {
  /* Use CSS variable for button glow color */
  box-shadow: 0 0 15px var(--btn-glow-color, rgba(255,255,255,0.8)), 0 0 30px var(--btn-glow-color, rgba(255,255,255,0.4));
  border: 1px solid white;
  animation: ultra-pulse 2s infinite;
}

@keyframes ultra-pulse {
  0% {
    box-shadow: 0 0 0 0 var(--btn-glow-color, rgba(255,255,255,0.7));
  }
  70% {
    box-shadow: 0 0 10px 10px rgba(0,0,0,0); /* Fade to transparent */
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0,0,0,0);
  }
}

.theme-status {
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.theme-label {
  font-weight: 500;
}

.theme-value {
  margin-left: 0.25rem;
}
</style>
