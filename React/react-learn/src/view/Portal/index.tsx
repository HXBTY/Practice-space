import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

export interface PortalProps {
  attach?: HTMLElement | string,
  children: React.ReactNode
}

const Portal = forwardRef((props: PortalProps, ref) => {
  const { attach , children } = props;
  // 添加状态，判断是否已经挂载到浏览器上
  const [mounted, setMounted] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    // 如果 containerRef.current 为空，则创建一个新的元素?
    if (!containerRef.current) {
      // @ts-ignore
      containerRef.current = document.createElement("div");
      containerRef.current.className = `portal-wrapper`;
    }
    const parentElement = getAttach(attach);
    parentElement?.appendChild?.(containerRef.current);

    return () => {
      setMounted(false)
      // 在变量末尾加上一个 ”！“ 表示非空断言，作用是告诉编辑器这个变量一定不为空，就会跳过编辑器的判断
      // parentElement?.removeChild?.(containerRef.current!);
      // 也可以使用这种方式提前进行非空判断
      containerRef.current && parentElement?.removeChild?.(containerRef.current);
    };
  }, [attach]);

  useImperativeHandle(ref, () => containerRef.current);

  return mounted && containerRef.current ? createPortal(children, containerRef.current) : null;

});

export function getAttach(attach: PortalProps["attach"]) {
  if (typeof attach === "string") {
    return document.querySelector(attach);
  }
  if (typeof attach === "object" && attach instanceof window.HTMLElement) {
    return attach;
  }
  return document.body;
}

export default Portal;