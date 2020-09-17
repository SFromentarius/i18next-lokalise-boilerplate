import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend) //load translation using http -> /public/locales
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: 'fr',
    debug: true,

    interpolation: {
      escapeValue: false //not needed for react as it escapes by default
    }
  });

export default i18n;