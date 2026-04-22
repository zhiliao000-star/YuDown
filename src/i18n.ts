import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "welcome.title": "Your Files, Your Rules.",
      "welcome.subtitle": "The ultimate web-based suite for all your document needs. Free, Fast, and Secure.",
      "welcome.getStarted": "Get Started",
      "welcome.explore": "Explore Tools",
      "nav.tools": "All Tools",
      "nav.about": "About Us",
      "nav.privacy": "Privacy Policy"
    }
  },
  zh: {
    translation: {
      "welcome.title": "你的文件，由你掌控。",
      "welcome.subtitle": "最全面、最快的在线文档处理套件。安全、免费、纯本地优先。",
      "welcome.getStarted": "立即开始",
      "welcome.explore": "浏览工具库",
      "nav.tools": "全部工具",
      "nav.about": "关于我们",
      "nav.privacy": "隐私政策"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "zh", // Default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;