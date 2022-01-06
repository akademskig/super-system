import { PropsWithChildren, useState, createContext, useEffect } from 'react'
import { IntlProvider } from 'react-intl'
import messages from '../../../lang'
import { Locales } from '../../../types/locales.type'
import Cookie from 'js-cookie'
import { hr, enUS } from 'date-fns/locale'
import { registerLocale } from 'react-datepicker'

const localesMap = {
  [Locales.HR]: hr,
  [Locales.EN]: enUS,
}
export const localesDateFormats = {
  [Locales.HR]: 'dd/MM/yyyy',
  [Locales.EN]: 'MM/dd/yyyy',
}
const getDefaultLocale = () => {
  return navigator.languages[0] as Locales
}
const initialValue = {
  locale: getDefaultLocale(),
  setLocale: (locale: Locales) => {},
}
export const LOCALE_KEY = 'locale'

export const cacheLocale = (locale: string) => {
  localStorage.setItem(LOCALE_KEY, locale)
}
export const getCacheLocale = () => {
  return localStorage.getItem(LOCALE_KEY)
}
export const LocaleContext = createContext(initialValue)
const LocaleProvider = ({ children }: PropsWithChildren<any>) => {
  const [locale, setLocale] = useState(initialValue.locale)

  useEffect(() => {
    Cookie.set(LOCALE_KEY, locale)
    registerLocale(locale, localesMap[locale])
  }, [locale])

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <IntlProvider
        locale={locale}
        defaultLocale="en"
        messages={messages?.[locale] ? messages?.[locale] : {}}
      >
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  )
}
export default LocaleProvider
