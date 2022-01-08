import { useIntl } from 'react-intl'

type Props = {
  price: number
  currency: string
  label?: string
  className?: string
}
const PriceItem = ({ price = 0, currency, label, className }: Props) => {
  const { formatNumber } = useIntl()
  return (
    <>
      {label && <label>{label}</label>}
      {formatNumber(price, {
        style: 'currency',
        currencyDisplay: 'narrowSymbol',
        currency: currency || 'HRK',
      })}
    </>
  )
}
export default PriceItem
