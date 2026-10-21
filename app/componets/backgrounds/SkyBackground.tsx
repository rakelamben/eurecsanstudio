import { useLayoutEffect, useRef } from "react";
import { animateSky } from "~/features/portofolio/animations/sky.animation";
import "./SkyBackground.css";

type SkyBackgroundProps = {
    classname?: string;
}

export function SkyBackground({classname = ""}: SkyBackgroundProps) {
  const skyRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!skyRef.current) return;

    return animateSky(skyRef.current);
  }, []);

  return <div ref={skyRef} className={`sky-background ${classname}`} aria-hidden="true" pointer-events-none />;
}
