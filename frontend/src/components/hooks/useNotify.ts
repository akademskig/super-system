import { useCallback } from 'react'
import { toast, ToastOptions } from 'react-toastify'

type NotifyProps = {
  message: string
  options?: ToastOptions
}
const useNotify = () => {
  const notify = useCallback((type, { message, options }: NotifyProps) => {
    switch (type) {
      case 'info':
        toast.info(message, options)
        break
      case 'success':
        toast.success(message, options)
        break
      case 'warning':
        toast.warn(message, options)
        break
      case 'error':
        toast.error(message, options)
        break
    }
  }, [])
  return notify
}
export default useNotify
