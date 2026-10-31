import { useRef } from "react";
import { SkyBackground } from "~/componets/backgrounds/SkyBackground";
import { SkyBottomGradient } from "~/componets/backgrounds/SkyBottomGradient";
import { BigCloud } from "~/componets/backgrounds/BigCloud";
import { RoadMirror } from "~/componets/illustrations/RoadMirror";
import { RoadSign } from "~/componets/illustrations/RoadSign";
import { RoadMirrorGlass } from "~/componets/illustrations/RoadMirrorGlass";
import { useGSAP } from "~/lib/gsap";
import { playHomeReveal } from "~/features/portofolio/animations/homeReveal";
import { usePageTransition } from "~/transition/PageTransition";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { isTransitioning } = usePageTransition();
  const isReady = !isTransitioning;

  useGSAP(
    () => {
      if (!containerRef.current) return;
      return playHomeReveal(containerRef.current, isReady);
    },
    { scope: containerRef, dependencies: [isReady] },
  );

  return (
    <section ref={containerRef} className="relative w-full min-h-screen h-screen h-dvh overflow-hidden select-none">
      <SkyBackground classname="" />
      <BigCloud className="hero-cloud" />
      <RoadSign className="hero-road-sign" />
      <RoadMirror className="hero-road-mirror" />
      <RoadMirrorGlass className="hero-road-mirror-glass" />

      {/* Hero Introduction Typography with Masked Staggered Reveal */}
      <div className="hidden sm:block absolute top-auto bottom-1/2 translate-y-1/2 left-1/4 -translate-x-[clamp(7rem,5vw,10rem)]  flex flex-col z-20 pointer-events-none">
        <div className="overflow-hidden">
          <span className="hero-text-line block text-white text-[clamp(0.6rem,10vw,1.2rem)] tracking-wider opacity-90">
            Hi, There,
          </span>
        </div>
        <div className="overflow-hidden my-0.5">
          <h1 className="hero-text-line block font-display text-[clamp(2rem,5vw,3rem)] text-[#009DD6] leading-none ">
            Eurecsan <br className="hidden sm:inline" /> Dewantoro
          </h1>
        </div>
        <div className="overflow-hidden">
          <span className="hero-text-line block text-white text-[clamp(0.6rem,10vw,1.2rem)] tracking-wider opacity-90">
            Here
          </span>
        </div>
      </div>

      <SkyBottomGradient />
    </section>
  );
}
