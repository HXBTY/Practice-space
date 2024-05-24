import React, { useEffect } from "react";
import { Icon, IconProps } from "@/pages/Icon/index";

const loadedSet = new Set<string>()

export function CreateIconfont(scriptUrl: string) {

  return React.forwardRef<SVGSVGElement, IconProps>((props, ref) => {
    const { type, ...rest } = props;
    useEffect(() => {
      if (window && scriptUrl.length && !loadedSet.has(scriptUrl)) {
        const script = document.createElement('script');
        script.setAttribute('src', scriptUrl);
        script.setAttribute('data-namespace', scriptUrl);
        document.body.appendChild(script);
        loadedSet.add(scriptUrl);
      }
    }, []);
    return (
      <Icon {...rest} ref={ref}>
        {type ? <use xlinkHref={`#${type}`} /> : null}
      </Icon>
    );
  });
}

