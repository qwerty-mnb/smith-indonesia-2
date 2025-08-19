import { createI18n } from "vue-i18n";
import enTranslation from "./en.il8n";
import koTranslation from "./ko.il8n";

const messages = {
  en: enTranslation,
  ko: koTranslation,
};

const numberFormats = {
  ko: {
    currency: {
      style: "currency",
      currency: "KRW",
    },
  },
  en: {
    currency: {
      style: "currency",
      currency: "KRW",
    },
  },
};

const i18n = createI18n({
  legacy: false,
  locale: "ko",
  fallbackLocale: "ko",
  globalInjection: true,
  messages,
  numberFormats,
});

export default i18n;
