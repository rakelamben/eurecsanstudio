import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const TRANSITION_DURATION = 200;

type CardHoverBorderProps = {
    targetElement: HTMLElement | null;
    borderColor: string;
}

type Box = {
    top: number;
    left: number;
    width: number;
    height: number;
}

export function CardHoverBorder({ targetElement, borderColor }: CardHoverBorderProps) {
  const [box, setBox] = useState<Box | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    if (!targetElement) {
      isVisibleRef.current = false;
      setIsVisible(false);
      const timeoutId = window.setTimeout(() => setBox(null), TRANSITION_DURATION);
      return () => window.clearTimeout(timeoutId);
    }

    const updatePosition = () => {
      const rect = targetElement.getBoundingClientRect();
      setBox({ 
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    };

    updatePosition();
    let frameId: number | undefined;
    if (!isVisibleRef.current) {
      frameId = window.requestAnimationFrame(() => {
        isVisibleRef.current = true;
        setIsVisible(true);
      });
    }

    // Pantau jika target container berubah ukuran saat masih di-hover
    const observer = new ResizeObserver(updatePosition);
    observer.observe(targetElement);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      if (frameId !== undefined) window.cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [targetElement]);

  if (!box) return null;

  return createPortal(
    <div

      style={{
        transform: `translate(${box.left}px, ${box.top}px)`,
        width: box.width,
        height: box.height,
        opacity: isVisible ? 1 : 0,
        transition: [
          `transform ${TRANSITION_DURATION}ms ease`,
          `width ${TRANSITION_DURATION}ms ease`,
          `height ${TRANSITION_DURATION}ms ease`,
          `opacity ${TRANSITION_DURATION}ms ease`,
          `border-color ${TRANSITION_DURATION}ms ease`,
        ].join(', '),
      }}
      className={`rounded-md pointer-events-none fixed top-0 left-0 z-50 border-2 ${borderColor} ring-2 ring-white `}
      >
    </div>,
    document.body,
  );
}