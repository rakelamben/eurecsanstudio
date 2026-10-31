import { gsap } from "~/lib/gsap";

export function playHomeReveal(container: HTMLElement, isReady: boolean = true) {
  const mm = gsap.matchMedia();

  mm.add(
    {
      isDesktop: "(min-width: 640px)",
      isMobile: "(max-width: 639px)",
      reduceMotion: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      const { reduceMotion, isDesktop, isMobile } = context.conditions as {
        isDesktop: boolean;
        isMobile: boolean;
        reduceMotion: boolean;
      };

      const roadSign = container.querySelector<HTMLElement>(".hero-road-sign");
      const roadMirror = container.querySelector<HTMLElement>(".hero-road-mirror");
      const roadMirrorGlass = container.querySelector<HTMLElement>(".hero-road-mirror-glass");
      const textLines = container.querySelectorAll<HTMLElement>(".hero-text-line");
      const cloud = container.querySelector<HTMLElement>(".hero-cloud");

      if (reduceMotion) {
        gsap.set([roadSign, roadMirror, roadMirrorGlass, textLines, cloud], {
          opacity: 1,
          y: 0,
          yPercent: 0,
          scale: 1,
          rotate: 0,
        });
        return;
      }

      // 1. Initial State: Both poles submerged beneath viewport bottom without tilt/wiggle
      if (cloud) {
        gsap.set(cloud, { opacity: 0, scale: 1.12 });
      }

      if (roadSign) {
        gsap.set(roadSign, {
          yPercent: 115,
          opacity: 0,
        });
      }

      if (roadMirror) {
        gsap.set(roadMirror, {
          yPercent: 115,
          opacity: 0,
        });
      }

      if (roadMirrorGlass) {
        gsap.set(roadMirrorGlass, {
          yPercent: 115,
          opacity: 0,
        });
      }

      if (textLines.length) {
        gsap.set(textLines, {
          yPercent: 125,
          opacity: 0,
        });
      }

      if (!isReady) {
        return;
      }

      // Ensure smooth-content is pinned at y: 0 on Home
      const smoothContent = document.getElementById("smooth-content");
      if (smoothContent) {
        gsap.set(smoothContent, { y: 0, clearProps: "transform" });
      }

      // Master Timeline for Home Reveal
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      // 2. TIMELINE CHOREOGRAPHY

      // (T=0.0s) Ambient Cloud softens in
      if (cloud) {
        tl.to(
          cloud,
          {
            opacity: 0.9,
            scale: 1.25,
            duration: 1.3,
            ease: "power2.out",
          },
          0,
        );
      }

      // (T=0.15s) Road Sign & Road Mirror rise together from the ground smoothly and firmly
      if (roadSign) {
        tl.to(
          roadSign,
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.0,
            ease: "power4.out",
          },
          0.15,
        );
      }

      if (roadMirror && isDesktop) {
        tl.to(
          roadMirror,
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.0,
            ease: "power4.out",
          },
          0.15,
        );
      }

      if (roadMirrorGlass && isMobile) {
        tl.to(
          roadMirrorGlass,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power4.out",
          },
          0.15,
        );
      }

      // (T=0.55s) Masked Staggered Typography Reveal
      if (textLines.length) {
        tl.to(
          textLines,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
          },
          0.55,
        );
      }

      // 3. CONTINUOUS IDLE MOTION
      // Subtle cloud horizontal drift
      if (cloud) {
        gsap.to(cloud, {
          x: 24,
          duration: 16,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    },
  );

  return () => {
    mm.revert();
  };
}
