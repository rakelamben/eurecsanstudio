import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { FisheyeMirror } from "../../assets/illustrations/FisheyeMirror";
import { FisheyeCameraView } from "./FisheyeCameraView";
import { SiDragHandle } from '@sargamicons/react/fill';
import { SiClose } from '@sargamicons/react/fill';

type FisheyeCameraModalProps = {
  open: boolean;
  onClose: () => void;
  backdropColor?: string;
};

const DEFAULT_BACKDROP_COLOR = "rgba(0, 0, 0, 0.72)";

export function FisheyeCameraModal({
  open,
  onClose,
  backdropColor = DEFAULT_BACKDROP_COLOR,
}: FisheyeCameraModalProps) {
  const mirrorRef = useRef<HTMLDivElement>(null);
  const lastMirrorPointerDownRef = useRef(0);
  const dragStateRef = useRef<{
    pointerId: number;
    startPointerX: number;
    startPointerY: number;
    startPositionX: number;
    startPositionY: number;
    dragRect: DOMRect;
  } | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  useEffect(() => {
    if (open) {
      setPosition({ x: 0, y: 0 });
      lastMirrorPointerDownRef.current = 0;
    }
  }, [open]);

  const startDrag = (event: ReactPointerEvent<HTMLDivElement | HTMLButtonElement>) => {
    const dragRect = event.currentTarget.getBoundingClientRect();

    dragStateRef.current = {
      pointerId: event.pointerId,
      startPointerX: event.clientX,
      startPointerY: event.clientY,
      startPositionX: position.x,
      startPositionY: position.y,
      dragRect,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement | HTMLButtonElement>) => {
    const dragState = dragStateRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) return;

    const nextX = dragState.startPositionX + (event.clientX - dragState.startPointerX);
    const nextY = dragState.startPositionY + (event.clientY - dragState.startPointerY);
    const minX = -dragState.dragRect.left;
    const maxX = window.innerWidth - dragState.dragRect.right;
    const minY = -dragState.dragRect.top;
    const maxY = window.innerHeight - dragState.dragRect.bottom;

    setPosition({
      x: Math.min(Math.max(nextX, minX), maxX),
      y: Math.min(Math.max(nextY, minY), maxY),
    });
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement | HTMLButtonElement>) => {
    if (dragStateRef.current?.pointerId !== event.pointerId) return;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    dragStateRef.current = null;
  };

  if (!open) return null;

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center"
      role="dialog"
      style={{ backgroundColor: backdropColor }}
    >
      <div
        className="relative w-fit h-fit"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      >
        <div className="absolute -bottom-1/6 left-1/2 z-10 flex -translate-x-1/2 flex-row items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close camera modal"
            className="rounded-full bg-white p-2"
          >
            <SiClose className="h-8 w-8" />
          </button>
          <button
            type="button"
            onPointerDown={(event) => startDrag(event)}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            aria-label="Move camera modal"
            className="touch-none select-none rounded-full bg-(--brand-red) p-2 text-white cursor-grab active:cursor-grabbing"
          >
            <SiDragHandle className="h-8 w-12" />
          </button>
        </div>
        <div
          ref={mirrorRef}
          onPointerDown={(event) => {
            const now = performance.now();
            const isSecondClick = now - lastMirrorPointerDownRef.current <= 400;

            lastMirrorPointerDownRef.current = now;

            if (!isSecondClick) return;

            lastMirrorPointerDownRef.current = 0;
            startDrag(event);
          }}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="touch-none select-none w-[min(86vw,500px)]  [&>svg]:block [&>svg]:h-auto [&>svg]:w-full"
          aria-label="Double-click and drag to move camera mirror"
        >
          <FisheyeMirror>
            <FisheyeCameraView />
          </FisheyeMirror>
        </div>
      </div>
    </div>
  );
}
