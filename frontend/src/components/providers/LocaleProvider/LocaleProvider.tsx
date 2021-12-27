import { PropsWithChildren, useState, createContext } from 'react'
import { IntlProvider } from 'react-intl'
import messages from '../../../lang'
import { Locales } from '../../../types/locales.type'

const getDefaultLocale = () => {
  return navigator.languages[0] as Locales
}
const initialValue = {
  locale: getDefaultLocale(),
  setLocale: (locale: Locales) => {},
}
export const LocaleContext = createContext(initialValue)
const LocaleProvider = ({ children }: PropsWithChildren<any>) => {
  const [locale, setLocale] = useState(initialValue.locale)

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
