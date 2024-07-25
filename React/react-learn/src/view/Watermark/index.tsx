import { CSSProperties, FC, PropsWithChildren, useCallback, useEffect, useRef } from "react";
import useWatermark from "./useWatermark";

export interface WatermarkProps extends PropsWithChildren {
  style?: CSSProperties;
  className?: string;
  zIndex?: number | string;
  width?: number;
  height?: number;
  rotate?: number;
  image?: string;
  content?: string[] | string;
  fontStyle?: {
    color?: string;
    fontFamily?: string;
    fontSize?: string | number;
    fontWeight?: number | string;
  };
  gap?: [number, number]; // 两个水印的间距
  offset?: [number, number]; // 水印相对于容器的偏移距离
  getContainer?: () => HTMLElement;
}

const Watermark: FC<WatermarkProps> = (props) => {
  const {
    className,
    height,
    zIndex,
    width,
    rotate,
    style,
    image,
    content,
    fontStyle,
    gap,
    offset
  } = props

  const containerRef = useRef<HTMLDivElement>(null)

  const getContainer = useCallback(() => {
    return props.getContainer ? props.getContainer() : containerRef.current!;
  }, [containerRef.current, props.getContainer])

  const {generateWatermark} = useWatermark({
    zIndex,
    width,
    height,
    rotate,
    image,
    content,
    fontStyle,
    gap,
    offset,
    getContainer
  })

  useEffect(() => {
    generateWatermark({
      zIndex,
      width,
      height,
      rotate,
      image,
      content,
      fontStyle,
      gap,
      offset,
      getContainer
    })
  }, [

      zIndex,
      width,
      height,
      rotate,
      image,
      content,
      JSON.stringify(fontStyle),
      JSON.stringify(gap),
      JSON.stringify(offset),
      getContainer
  ]);

  return props.children ? (
    <div className={className} style={style} ref={containerRef}>
      {props.children}
    </div>
  ) : null
}

export default Watermark