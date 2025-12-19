import { ref } from 'vue'

type Mode = 'light' | 'dark' | 'amoled'

const mode = ref<Mode>('light')

export function useTheme() {
  const setTheme = (m: Mode) => {
    mode.value = m
    document.documentElement.classList.remove('dark', 'amoled')

    if (m === 'dark') document.documentElement.classList.add('dark')
    if (m === 'amoled') {
      document.documentElement.classList.add('dark', 'amoled')
    }

    localStorage.setItem('theme-mode', m)
  }

  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('theme-mode') as Mode
    if (saved) setTheme(saved)
  }

  return {
    mode,
    setTheme
  }
}
