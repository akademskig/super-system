import { useEffect, useState } from 'react'

export default function useScreenSize() {
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)

  useEffect(() => {
    const setScreenParam = () => {
      setHeight(window.innerHeight)
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', setScreenParam)
    setScreenParam()
    return () => {
      window.removeEventListener('resize', setScreenParam)
    }
  }, [setWidth, width])

  return {
    width,
    height,
  }
}
