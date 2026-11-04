import { useRef } from "react";
import { SiClose } from "@sargamicons/react/fill";
import { gsap, useGSAP } from "~/lib/gsap";

export interface FeedbackData {
  id?: number | string;
  type: "success" | "error";
  text: string;
}

interface FeedbackToastProps {
  feedback: FeedbackData;
  onClose: () => void;
  duration?: number;
}

// 2 * PI * r (r = 9 -> ~56.548)
const CIRCUMFERENCE = 2 * Math.PI * 9;

export function FeedbackToast({
  feedback,
  onClose,
  duration = 5,
}: FeedbackToastProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const isClosingRef = useRef(false);

  const handleDismiss = () => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    timelineRef.current?.kill();

    if (containerRef.current) {
      gsap.to(containerRef.current, {
        y: -100,
        opacity: 0,
        scale: 0.95,
        duration: 0.45,
        ease: "back.in(1.4)",
        onComplete: onClose,
      });
    } else {
      onClose();
    }
  };

  useGSAP(
    () => {
      if (!containerRef.current || !circleRef.current) return;

      isClosingRef.current = false;
      const tl = gsap.timeline();
      timelineRef.current = tl;

      // 1. Initial State (di atas viewport)
      gsap.set(containerRef.current, {
        y: -100,
        opacity: 0,
        scale: 0.95,
      });
      gsap.set(circleRef.current, {
        strokeDashoffset: 0,
      });

      // 2. Slide in dari atas viewport dengan sedikit spring
      tl.to(containerRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.55,
        ease: "back.out(1.5)",
      });

      // 3. Progress indikator lingkaran sinkron 5 detik
      tl.to(
        circleRef.current,
        {
          strokeDashoffset: CIRCUMFERENCE,
          duration: duration,
          ease: "none",
        },
        "+=0.05"
      );

      // 4. Slide out ke atas viewport dengan sedikit spring otomatis setelah 5 detik
      tl.to(containerRef.current, {
        y: -100,
        opacity: 0,
        scale: 0.95,
        duration: 0.45,
        ease: "back.in(1.4)",
        onComplete: () => {
          isClosingRef.current = true;
          onClose();
        },
      });

      return () => {
        tl.kill();
      };
    },
    { dependencies: [feedback.id, feedback.text], revertOnUpdate: true }
  );

  return (
    <aside
      aria-label="Notifikasi Feedback"
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-none flex justify-center w-full px-4"
    >
      <div
        ref={containerRef}
        role="alert"
        aria-live="polite"
        className={`pointer-events-auto w-fit max-w-[90vw] px-4 py-2.5 rounded-full border text-xs tracking-wide flex items-center justify-between gap-3 shadow-lg backdrop-blur-md bg-white/95 ${
          feedback.type === "success"
            ? "border-(--brand-green) text-neutral-900"
            : "border-(--brand-red) text-neutral-900"
        }`}
      >
        <span className="font-medium truncate max-w-[65vw] sm:max-w-md">
          {feedback.text}
        </span>

        <div className="flex items-center gap-2.5 shrink-0 pl-1">
          {/* Progress Indikator Lingkaran (sinkron dengan durasi 5s) */}
          <div className="relative flex items-center justify-center w-5 h-5">
            <svg
              className="w-5 h-5 -rotate-90"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {/* Background Track */}
              <circle
                cx="12"
                cy="12"
                r="9"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="opacity-15 text-neutral-400"
              />
              {/* Animated Countdown Ring */}
              <circle
                ref={circleRef}
                cx="12"
                cy="12"
                r="9"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={0}
                strokeLinecap="round"
                className={
                  feedback.type === "success"
                    ? "text-(--brand-green)"
                    : "text-(--brand-red)"
                }
              />
            </svg>
          </div>

          {/* Tombol X */}
          <button
            type="button"
            onClick={handleDismiss}
            className="text-neutral-500 hover:text-black cursor-pointer font-bold text-base flex items-center justify-center transition-colors p-0.5"
            aria-label="Tutup notifikasi"
          >
            <SiClose />
          </button>
        </div>
      </div>
    </aside>
  );
}
