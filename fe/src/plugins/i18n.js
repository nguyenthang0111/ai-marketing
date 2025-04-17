import { createI18n } from 'vue-i18n';
import en from '../locales/en.json';
import ja from '../locales/ja.json';
import vi from '../locales/vi.json';

const i18n = createI18n({
    locale: localStorage.getItem('lang') || 'vi',
    fallbackLocale: 'vi',
    messages: {
        en,
        ja,
        vi
    }
});

export default i18n;