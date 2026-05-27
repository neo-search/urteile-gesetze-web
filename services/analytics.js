// react-ga4 (GA4-kompatibel) statt veraltetes react-ga (UA)
import ReactGA from 'react-ga4'

export const initGA = () => {
  // GA4 Measurement ID (G-...). Hinweis: UA-IDs werden von Google nicht mehr unterstützt.
  ReactGA.initialize('UA-102965034-1');
}

export const logPageView = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname })
}

export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action })
  }
}

export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.event('exception', { description, fatal })
  }
}