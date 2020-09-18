import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import moment from 'moment';
//need to import manually locales, since Moment.js locales are missing in Create React App app
//https://create-react-app.dev/docs/troubleshooting/#momentjs-locales-are-missing
import 'moment/locale/fr';
import 'moment/locale/de';

i18n
  .use(Backend) //load translation using http -> /public/locales
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: 'fr',
    debug: true,

    interpolation: {
      escapeValue: false, //not needed for react as it escapes by default
      //for formatting
      format: function(value, format, lng) {
        if (format === 'uppercase') return value.toUppercase();
        if (value instanceof Date) return moment(value).format(format);
        return value;
      }
    }
  });

//for formatting
i18n.on('languageChanged', function(lng) {
  moment.locale(lng);
});

export default i18n;
