import { useReducer, useRef } from 'react'
import useScreenSize from '../../../hooks/useScreenSize'
import { GiAlienBug } from 'react-icons/gi'
import svgToImgSrc from '../utils/svgToImgSrc'
import { Stage, Sprite, useTick } from '@inlet/react-pixi'

const Bunny = () => {
  const { width, height } = useScreenSize()

  const initialState = {
    x: width / 2,
    y: height / 2,
    rotation: 0,
    anchor: width / 2,
  }
  const reducer = (_: any, { data }: any) => data
  const [motion, update] = useReducer(reducer, initialState)
  const iter = useRef(0)
  useTick((delta) => {
    const i = (iter.current += 0.05 * delta)
    update({
      type: 'update',
      data: {
        x: (width / 2) + Math.sin(i) * 100,
        y: (height / 2) + Math.sin(i / 1.5) * 100,
        rotation: Math.sin(i) * Math.PI,
        anchor: Math.sin(width / 2),
      },
    })
  })
  return <Sprite image={svgToImgSrc({ svg: GiAlienBug })} {...motion} />
}
const Screen = () => {
  const { width, height } = useScreenSize()
  return (
    <Stage width={width} height={height}>
      <Bunny />
    </Stage>
  )
}

export default Screen
