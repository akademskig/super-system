import { useContext } from 'react'
import { LocaleContext } from '../providers/LocaleProvider/LocaleProvider'

const useLocale = () => useContext(LocaleContext)
export default useLocale
