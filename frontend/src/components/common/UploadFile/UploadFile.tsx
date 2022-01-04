import { ForwardedRef, forwardRef, InputHTMLAttributes, useMemo } from 'react'
import styles from './UploadFile.module.scss'
import placeholder from './placeholder.png'

type Props = {
  logoUrl?: string
  label?: string
}
const UploadFile = (
  props: Props & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const { logoUrl, value, label, ...rest } = props
  const selectedFileUrl = useMemo(() => {
    const file = (value as any)?.[0]
    if (file) {
      return URL.createObjectURL(file)
    }
    return ''
  }, [value])
  return (
    <>
      <label>{label}</label>
      <div className={styles.root}>
        <label className={styles.label}>
          <img
            width={120}
            src={selectedFileUrl || (logoUrl as string) || placeholder}
            alt={'Company logo'}
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
    </>
  )
}
export default forwardRef(UploadFile)
