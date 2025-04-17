import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { useDark, useToggle } from '@vueuse/core';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: useDark(),
    toggleDark: useToggle(useDark()),
    colorMode: localStorage.getItem('vueuse-color-scheme') || 'auto',
    theme: {
      token: {
        colorPrimary: localStorage.getItem('vueuse-color-scheme') === 'dark' ? '#1eb9ee' : '#f97316',
      },
    },
  }),

  actions: {
    setDarkMode(mode) {
      this.colorMode = mode;
      this.theme.token.colorPrimary = this.colorMode === 'dark' ? '#1eb9ee' : '#f97316';
      localStorage.setItem('vueuse-color-scheme', mode);

      if (mode === 'dark') {
        this.isDark = true;
      } else {
        this.isDark = false;
      }
      this.toggleDark(this.isDark);
    }
  },

});
