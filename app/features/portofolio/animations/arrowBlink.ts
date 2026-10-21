import gsap from "gsap";

export const ARROW_BLINK_DURATION = 0.6;

export function setupArrowBlink(
  element: SVGSVGElement,
  duration = ARROW_BLINK_DURATION,
) {
  const context = gsap.context(() => {
    gsap.to(element, {
      autoAlpha: 0,
      duration,
      ease: "steps(1)",
      repeat: -1,
      yoyo: true,
    });
  }, element);

  return () => context.revert();
}
