import MenuButton from '../../common/MenuButton'
import useLocale from '../../hooks/useLocale'
import messages from '../../../lang'
import { Locales } from '../../../types/locales.type'
import { useMemo } from 'react'
import Flag from 'react-world-flags'
import localeCountryMap from '../../../utils/localeCountryMap'
import styles from './LocaleControl.module.scss'

const LocaleControl = () => {
  const { locale, setLocale } = useLocale()

  const options = useMemo(
    () =>
      Object.keys(messages).map((key) => ({
        label: key,
        action: () => setLocale(key as Locales),
        icon: <Flag code={localeCountryMap[key as Locales]} />,
      })),
    [setLocale]
  )

  return (
    <div className={styles.root}>
      <MenuButton classes={{ menu: styles.menu }} options={options}>
        {locale}
      </MenuButton>
    </div>
  )
}
export default LocaleControl
