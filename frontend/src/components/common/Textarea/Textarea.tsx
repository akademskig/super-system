import classNames from 'classnames'
import {
  forwardRef,
  ReactNode,
  RefCallback,
  TextareaHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import { ChangeHandler } from 'react-hook-form'
import styles from './Textarea.module.scss'

type Props = {
  label?: string | ReactNode
  name: string
  onChange: ChangeHandler
  error?: any
  ref: RefCallback<any>
  classes?: Record<string, string>
  withMessage?: boolean
  autoExpand?: boolean
  watch?: ChangeHandler
}

const Textarea = (
  {
    label,
    value,
    name,
    onChange,
    error,
    classes,
    withMessage,
    autoExpand,
    defaultValue,
    watch,
    ...rest
  }: Props & TextareaHTMLAttributes<HTMLTextAreaElement>,
  ref: any
) => {
  const inputRef = useRef<HTMLTextAreaElement>()
  // enable automatic resizing of textarea
  const autoResize = useCallback(() => {
    if (!autoExpand) {
      return
    }
    const tx = inputRef.current
    const onInput = () => {
      if (tx) {
        tx.style.height = 'auto'
        tx.style.height = `${tx?.scrollHeight}px`
      }
    }
    tx?.setAttribute(
      'style',
      `height: ${Number(tx.scrollHeight) + 2}px;overflow-y:hidden;`
    )
    tx?.addEventListener('input', onInput, false)
    return () => tx?.removeEventListener('input', onInput, false)
  }, [autoExpand, inputRef])

  const handleChange = useCallback(
    (e) => {
      onChange &&
        onChange({
          target: {
            value: e.target.value,
            name,
          },
        })
      watch &&
        watch({
          target: {
            value: e.target.value,
            name,
          },
        })
    },
    [name, onChange, watch]
  )
  useEffect(() => {
    autoResize()
  }, [autoExpand, autoResize, inputRef, value])

  return (
    <div className={classNames(styles.root, classes?.root)}>
      <label className={classNames(classes?.label)}>{label}</label>
      <textarea
        {...rest}
        name={name}
        defaultValue={defaultValue}
        value={value}
        ref={(refValue: HTMLTextAreaElement | null) => {
          inputRef.current = refValue ? refValue : undefined
          if (ref && refValue) {
            if (!refValue.value && defaultValue) {
              onChange &&
                onChange({
                  target: {
                    value: defaultValue,
                    name,
                  },
                })
            }
            ref(refValue)
          }
        }}
        onChange={handleChange}
        className={classNames(styles.input, { [styles.error]: error })}
      />
      {error && withMessage && (
        <small className={styles.errorMessage}>{error.message}</small>
      )}
    </div>
  )
}
export default forwardRef(Textarea)
