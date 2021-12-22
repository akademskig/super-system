import { IconType } from "react-icons/lib"

type SvgToImgParams = {
    svg: IconType
    color?: string
    size?: {
      height: number
      width: number
    }
  }
  const svgToImgSrc = ({
    svg,
    color = 'white',
    size = { width: 50, height: 50 },
  }: SvgToImgParams) => {
    const { attr, children, className } = svg({ }).props
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${
      size.width
    }" viewBox="${attr['viewBox']}"><g>${children.map(
      (c: any) =>
        `<${c.type} class="${className}" fill="${color}" d="${c.props.d}"></${c.type}>`
    )}
    </g></svg>`
  }
  export default svgToImgSrc