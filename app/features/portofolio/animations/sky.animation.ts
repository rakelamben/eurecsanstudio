import gsap from "gsap";

export function animateSky(element: HTMLElement) {
  const media = gsap.matchMedia();

  media.add("(prefers-reduced-motion: no-preference)", () => {
    gsap.to(element, {
      "--sky-top": "#3b58d7",
      "--sky-bottom": "#a4cef2",
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  });

  return () => {
    media.revert();
  };
}
