import Portal from "@/pages/Portal/index";
import { useEffect, useRef, useState } from "react";

export default function App() {
  const containerRef = useRef<HTMLElement>(null);
  const content = <div className="btn">
    <button>按钮</button>
  </div>;
  const [body, setBody] = useState<HTMLElement>();
  useEffect(() => {
    if (document) {
      setBody(document.body);
    }
  }, []);
  return <Portal attach={body} ref={containerRef}>{content}</Portal>;
}