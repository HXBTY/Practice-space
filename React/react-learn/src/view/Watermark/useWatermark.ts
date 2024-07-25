import { WatermarkProps } from "./index";
import { useEffect, useRef, useState } from "react";
import { merge } from "lodash-es";

// Omit 用于剔除不想要的 从WatermarkProps中剔除className， style，children
export type WatermarkOptions = Omit<WatermarkProps, "className" | "style" | "children">

export function isNumber(obj: any): obj is number {
  return Object.prototype.toString.call(obj) === "[object Number]" && obj === obj;
}

const toNumber = (value?: string | number, defaultValue?: number) => {
  if (value === undefined) {
    return defaultValue;
  }
  if (isNumber(value)) {
    return value;
  }
  const numberVal = parseFloat(value);
  return isNumber(numberVal) ? numberVal : defaultValue;
};

const defaultOptions = {
  rotate: 200,
  zIndex: 1,
  width: 100,
  gap: [100, 100],
  fontStyle: {
    fontSize: "16px",
    color: "rgba(0,0,0,0.15)",
    fontFamily: "sans-serif",
    fontWeight: "normal"
  },
  getContainer: () => document.body
};

const getMergedOptions = (o: Partial<WatermarkOptions>) => {
  const options = o || {};
  const mergedOptions = {
    ...options,
    rotate: options.rotate || defaultOptions.rotate,
    zIndex: options.zIndex || defaultOptions.zIndex,
    fontStyle: { ...defaultOptions.fontStyle, ...options.fontStyle },
    width: toNumber(options.width, options.image ? defaultOptions.width : undefined),
    height: toNumber(options.height, undefined)!,
    getContainer: options.getContainer!,
    gap: [
      toNumber(options.gap?.[0], defaultOptions.gap[0]),
      toNumber(options.gap?.[1], defaultOptions.gap[1])
    ]
  } as Required<WatermarkOptions>; // Required把接口类型中的所有项，都变成必选项

  const mergedOffsetX = toNumber(mergedOptions.offset?.[0], 0)!;
  const mergedOffsetY = toNumber(mergedOptions.offset?.[1] || mergedOptions.offset?.[0], 0)!;
  mergedOptions.offset = [mergedOffsetX, mergedOffsetY];

  return mergedOptions;
};

// 用于测量文字尺寸
const measureTextSize = (
  ctx: CanvasRenderingContext2D,
  content: string[],
  rotate: number
) => {
  let width = 0;
  let height = 0;
  const lineSize: Array<{ width: number, height: number }> = [];
  content.forEach(item => {
    // fontBoundingBoxAscent 基线到顶部的距离
    // fontBoundingBoxDescent 基线到底部的距离
    const {
      width: textWidth,
      fontBoundingBoxDescent,
      fontBoundingBoxAscent
    } = ctx.measureText(item);
    const textHeight = fontBoundingBoxDescent + fontBoundingBoxAscent; // 行高
    if (textWidth > width) {
      width = textWidth;
    }
    height += textHeight;
    lineSize.push({ width: textWidth, height: textHeight });
  });
  const angle = (rotate * Math.PI) / 180;
  return {
    originWidth: width,
    originHeight: height,
    width: Math.ceil(Math.abs(Math.sin(angle) * height) + Math.abs(Math.cos(angle) * width)),
    height: Math.ceil(Math.abs(Math.sin(angle) * width) + Math.abs(height * Math.cos(angle))),
    lineSize
  };
};

const getCanvasData = async (
  options: Required<WatermarkOptions>
): Promise<{ width: number; height: number; base64Url: string }> => {
  const { rotate, image, content, fontStyle, gap } = options;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  const ratio = window.devicePixelRatio; // 获取物理像素与css像素之间的比例
  const configCanvas = (size: { width: number, height: number }) => {
    const canvasWidth = gap[0] + size.width;
    const canvasHeight = gap[1] + size.height;
    canvas.setAttribute("width", `${canvasWidth * ratio}px`);
    canvas.setAttribute("height", `${canvasHeight * ratio}px`);
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    ctx.translate((canvasWidth * ratio) / 2, (canvasHeight * ratio) / 2);
    ctx.scale(ratio, ratio);

    const RotateAngle = (rotate * Math.PI) / 180;
    ctx.rotate(RotateAngle);
  };

  const drawText = () => {
    const { fontSize, fontWeight, fontFamily, color } = fontStyle;
    const realFontSize = toNumber(fontSize, 0) || fontStyle.fontSize;
    ctx.font = `${fontWeight} ${realFontSize}px ${fontFamily}`;
    const contentArray = typeof content === "string" ? [content] : [...content];

    const measureSize = measureTextSize(ctx, contentArray, rotate);
    const width = options.width || measureSize.width;
    const height = options.height || measureSize.height;
    configCanvas({ width, height });
    ctx.fillStyle = color!;
    ctx.font = `${fontWeight} ${realFontSize}px ${fontFamily}`;
    ctx.textBaseline = "top";

    contentArray.forEach((item, index) => {
      const { height: lineHeight, width: lineWidth } = measureSize.lineSize[index];
      const xStartPoint = -lineWidth / 2;
      const yStartPoint = -(options.height || measureSize.originHeight) / 2 + lineHeight * index;
      ctx.fillText(
        item,
        xStartPoint,
        yStartPoint,
        options.width || measureSize.originWidth
      );
    });
    return Promise.resolve({ base64Url: canvas.toDataURL(), height, width });
  };

  function drawImage() {
    return new Promise<{ width: number; height: number; base64Url: string }>((resolve) => {
      const img = new Image();
      // crossOrigin 用于图片的跨域请求
      // canvas读取跨域图片时，需要对图片设置crossOrigin配置，否则会遇到跨域问题
      img.crossOrigin = "anonymous"; // anonymous 发送不包含用户凭证的跨域请求
      // referrerPolicy 用于设置img标签的引用策略，告知浏览器是否以及如何发送所引用的资源请求到目标服务器
      img.referrerPolicy = "no-referrer"; // no-referrer 不发送任何引用信息
      img.src = image;
      img.onload = () => {
        let { width, height } = options;
        if (!width || !height) {
          if (width) {
            height = (img.height / img.width) * +width;
          } else {
            width = (img.width / img.height) * +height;
          }
        }
        configCanvas({ width, height });
        ctx.drawImage(img, -width / 2, -height / 2, width, height);
        return resolve({ base64Url: canvas.toDataURL(), width, height });
      };
      img.onerror = () => {
        return drawText();
      };
    });
  }

  return image ? drawImage() : drawText();
};


export default function useWatermark(params: WatermarkOptions) {
  const [options, setOptions] = useState(params || {});
  const mergedOptions = getMergedOptions(options);
  const watermarkDiv = useRef<HTMLDivElement>();
  const mutationObserver = useRef<MutationObserver>()

  const container = mergedOptions.getContainer();
  const { zIndex, gap } = mergedOptions;

  function drawWatermark() {
    if (!container) {

      return;
    }
    getCanvasData(mergedOptions).then(({ base64Url, width, height }) => {
      const offsetLeft = mergedOptions.offset[0] + "px";
      const offsetTop = mergedOptions.offset[1] + "px";
      // pointer-events: none; 设置不响应鼠标事件
      const wmStyle = `
      width:calc(100% - ${offsetLeft});
      height:calc(100% - ${offsetTop});
      position:absolute;
      top:${offsetTop};
      left:${offsetLeft};
      bottom:0;
      right:0;
      pointer-events: none;
      z-index:${zIndex};
      background-position: 0 0;
      background-size:${gap[0] + width}px ${gap[1] + height}px;
      background-repeat: repeat;
      background-image:url(${base64Url})`;

      if (!watermarkDiv.current) {
        const div = document.createElement("div");
        watermarkDiv.current = div;
        container.append(div);
        container.style.position = "relative";
      }
      watermarkDiv.current?.setAttribute("style", wmStyle.trim());

      if (container) {
        mutationObserver.current?.disconnect()
        mutationObserver.current = new MutationObserver(mutations => {
          const isChange = mutations.some(mutation => {
            let flag = false
            // 判断是否修改了水印节点
            if (mutation.removedNodes.length) {
              flag = Array.from(mutation.removedNodes).some(node => node === watermarkDiv.current)
            }
            if (mutation.type === "attributes" && mutation.target === watermarkDiv.current) {
              flag = true
            }
            return flag
          })
          if (isChange) {
            // 如果发生了变化，则进行重新绘制，从而达到避免水印被手动删除的效果
            watermarkDiv.current = undefined
            drawWatermark()
          }
        })
        mutationObserver.current.observe(container, {
          attributes: true,
          subtree: true,
          childList: true
        })
      }
    });
  }

  useEffect(() => {
    drawWatermark();
  }, [options]);

  return {
    generateWatermark: (newOptions: Partial<WatermarkOptions>) => {
      setOptions(merge({}, options, newOptions));
    }
  };
}