import { ForwardedRef, forwardRef, InputHTMLAttributes, useMemo } from 'react'
import styles from './UploadFile.module.scss'

type Props = {
  logoUrl?: string
}
const UploadFile = (
  props: Props & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const { logoUrl, value, ...rest } = props
  const selectedFileUrl = useMemo(() => {
    //@ts-ignore
    const file = value?.[0]
    if (file) {
      return URL.createObjectURL(file)
    }
    return ''
  }, [value])
  return (
    <div className={styles.root}>
      <label className={styles.label}>
        <img
          width={120}
          src={selectedFileUrl || (logoUrl as string) || ''}
          alt={'logo'}
        />
        <input
          id="file-input"
          className={styles.input}
          type="file"
          ref={ref}
          {...rest}
        />
      </label>
    </div>
  )
}
export default forwardRef(UploadFile)
