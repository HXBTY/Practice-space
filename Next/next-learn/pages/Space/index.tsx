import React, { Fragment } from "react";
import classNames from "classnames";
import { ConfigContext } from "@/pages/Space/ConfigProvider";

export type SizeType = "small" | "middle" | "large" | number | undefined

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  class?: string;
  style?: React.CSSProperties;
  size?: SizeType | [SizeType, SizeType];
  direction?: "horizontal" | "vertical";
  align?: "start" | "end" | "center" | "baseline";
  split?: React.ReactNode;
  wrap?: boolean;
}

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24
};

function getNumberSize(size: SizeType) {
  return typeof size === "string" ? spaceSize[size] : size || 0;
}

const Space: React.FC<SpaceProps> = props => {
  const { space } = React.useContext(ConfigContext)

  const {
    className,
    style,
    children,
    size = space?.size || "small",
    direction = "horizontal",
    align,
    split,
    wrap = false,
    ...otherProps
  } = props;

  const childNodes = React.Children.toArray(props.children);

  const mergeAlign = direction === "horizontal" && align === void 0 ? "center" : align;

  const cs = classNames(
    "space",
    `space-${direction}`,
    {
      [`space-align-${mergeAlign}`]: mergeAlign
    },
    className
  );

  const nodes = childNodes.map((child: any, i) => {
    const key = child && child.key || `space-item-${i}`;
    // Fragment 设置一个不会插入dom标签，<Fragment></Fragment> === <></>
    // 这边的key需要写在最外层，否则编辑器会提示警告
    return <Fragment key={key}>
      <div className="space-item">
        {child}
      </div>
      {i < childNodes.length && split && (
        <span className={`${className}-split`} style={style}>
          {split}
        </span>
      )}
    </Fragment>;
  });

  const otherStyles: React.CSSProperties = {};

  const [horizontalSize, verticalSize] = React.useMemo(
    () => (
      (Array.isArray(size) ? size : [size, size] as [SizeType, SizeType]).map(item => getNumberSize(item))
    ),
    [size]
  );

  otherStyles.columnGap = horizontalSize;
  otherStyles.rowGap = verticalSize;

  if (wrap) {
    otherStyles.flexWrap = "wrap";
  }

  return <div className={cs} style={{
    ...otherStyles,
    ...style
  }} {...otherProps}>
    {nodes}
  </div>;
};
export default Space;