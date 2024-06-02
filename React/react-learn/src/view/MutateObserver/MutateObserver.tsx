import { cloneElement, FC, ReactElement, useCallback, useLayoutEffect, useRef, useState } from "react";
import useMutateObserver from './useMutateObserver';

interface MutationObserverProps{
  options?: MutationObserverInit;
  onMutate?: (mutations: MutationRecord[], observer: MutationObserver) => void;
  children: ReactElement;
}

const MutateObserver: FC<MutationObserverProps> = props => {
  const {
    options,
    onMutate = () => {},
    children,
  } = props;

  const elementRef = useRef<HTMLElement>(null);

  const [target, setTarget] = useState<HTMLElement>();

  useMutateObserver(target!, useCallback(onMutate, []), options);

  useLayoutEffect(() => {
    setTarget(elementRef.current!);
  }, []);

  if (!children) {
    return null;
  }

  return cloneElement(children, { ref: elementRef });
}

export default MutateObserver;
