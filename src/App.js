import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  useTranslation,
  withTranslation,
  Trans,
  Translation
} from 'react-i18next';

const lng = ['fr', 'en', 'de'];

// useTranslation hook, inside functionnal components.
// options argument: a namespace or an array of namespaces to load (as for withTranslation)
function Title() {
  const { t } = useTranslation(['translation', 'info']);
  //t function is load to the first ns by default
  return (
    <React.Fragment>
      <h1>{t('title')}</h1> {/* will be looked from 'translation' ns */}
      <h3>{t('info:author.firstname')}</h3>
    </React.Fragment>
  );
}

// Component using the Trans Component
// not useful except when we need to integrate react nodes into a translated text (text formatting, like strong, i...) or adding some link component.
// (it does only interpolation)
function Description() {
  return (
    <Trans i18nKey='description.part1'>
      Pour commencer, changez <code>src/App.js</code> et sauvegardez.
    </Trans>
  );
}

//use hoc for class based components
class Welcome extends React.Component {
  changeLng = lng => {
    const { i18n } = this.props;
    i18n.changeLanguage(lng);
  };

  render() {
    const { t } = this.props;
    //testing Multiple fallback keys. Change for another code error to test.
    const error = '404';
    //testing interpolation with models
    const author = { name: 'Victor Hugo', country: 'France' };
    //testing Objects and Arrays
    const obj = t('tree', { returnObjects: true, what: 'i18n' });

    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <Title />
          {lng.map(l => (
            <button key={l} onClick={() => this.changeLng(l)}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <div className='App-intro'>
          <Description />
        </div>
        {/* we can also use the Translation render prop inside any component (class or function) */}
        <Translation ns='translation'>
          {(t, { i18n }) => <div>{t('description.part2')}</div>}
        </Translation>
        {/* PLURALS can be used: with variable name 'count' and adding '_plural' to the key in translations files */}
        <div>
          {[1, 2, 3].map((a, i) => (
            <div key={i}>{t('info:author.age', { count: a })}</div>
          ))}
        </div>
        {/* We can pass default value for cases the key could not be found in translations */}
        {/*  <div>{t('notExistingKey', 'This is a default value set in App.')}</div> */}
        {/* Multiple fallback keys: calling t with an array of keys */}
        <div>
          Error code test:{' '}
          {t([`fallbackKeyError.${error}`, 'fallbackKeyError.unspecific'])}
        </div>
        {/* INTERPOLATION can be basic or done with models*/}
        <div>{t('info:like', { author, what: 'i18next' })}</div>
        {/* FORMATTING 
        we can add formatting using moment.js, numeral.js or the intl api (see in i18n.js for config)
        */}
        <div>{t('info:date', { date: new Date() })}</div>
        {/* NESTING, allows us to reference keyx in a translation (see in translation) */}
        <div>{t('statement')}</div>
        {/* CONTEXT, allows us to reference keyx in a translation (see in translation) */}
        <div>{t('info:friend', { context: 'female', count: 3 })}</div>
        {/* OBJECTS and ARRAYS, can return them */}
        <div>{t('array', { returnObjects: true })}</div>
        <div>{t('array', { joinArrays: '/' })}</div>
        <div>{obj.res}</div>
      </div>
    );
  }
}

const WelcomeT = withTranslation(['translation', 'info'])(Welcome);

// loading component for suspence fallback
const Loader = () => (
  <div className='App'>
    <img src={logo} className='App-logo' alt='logo' />
    <div>loading...</div>
  </div>
);

// app catches the suspense from page in case translations are not yet loaded
export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <WelcomeT />
    </Suspense>
  );
}
