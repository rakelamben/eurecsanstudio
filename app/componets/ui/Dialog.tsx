import { useEffect, useId, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { SiClose } from '@sargamicons/react/line';


type DialogProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  className?: string;
  backdropClassName?: string;
  wrapperClassName?: string;
  closeLabel?: string;
};

export function Dialog({
  open,
  onClose,
  children,
  title,
  className = "",
  wrapperClassName = "",
  backdropClassName = "",
  closeLabel = "Close dialog",
}: DialogProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const scrollContainer = document.getElementById("smooth-wrapper") ?? document.body;
    const previousPaddingRight = scrollContainer.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (scrollbarWidth > 0) {
      const currentPaddingRight =
        Number.parseFloat(window.getComputedStyle(scrollContainer).paddingRight) || 0;
      scrollContainer.style.paddingRight = `${currentPaddingRight + scrollbarWidth}px`;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      scrollContainer.style.paddingRight = previousPaddingRight;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            aria-hidden="true"
            className={`fixed inset-0 z-[100] bg-black/45 backdrop-blur-xs ${backdropClassName}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div  className="fixed inset-0 z-[110] overflow-y-auto overscroll-contain scrollbar-thin scrollbar-thumb-(--brand-yellow) scrollbar-track-transparent"
                onMouseDown={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}  
          >
            <div className="flex min-h-full flex-col items-center justify-center p-4">

              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? titleId : undefined}
                className={`relative my-auto w-[min(92vw,800px)] shrink-0 bg-(--brand-green) rounded-lg ${className}`}
                initial={{ opacity: 0, scale: 0.94, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 8 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 35,
                }}
                onMouseDown={(event) => event.stopPropagation()}
              >
                <div className={`relative ${wrapperClassName}`}>
                  <button type="button"
                    onClick={onClose}
                    aria-label={closeLabel}
                    className="absolute right-[-10px] top-0 bg-transparent w-12 cursor-pointer -rotate-10">
                    {/* Sticker */}
                    <div className="relative bg-(--brand-red) p-2 shadow-md [clip-path:polygon(0_0,100%_0,100%_100%,1rem_100%,0_calc(100%_-_1rem))]"
                    >
                      <SiClose className="w-full h-auto text-white" />

                      {/* Folded corner */}
                      <span
                        className="pointer-events-none absolute bottom-0 left-0 h-4 w-4
                  bg-gray-300
                  [clip-path:polygon(0_0,80%_0,100%_100%)]"
                      />
                    </div>
                  </button>
                    {title && (
                    <div className="flex items-start px-4 mr-2 pt-6 text-white">
                        <h2 id={titleId} className="font-display text-3xl leading-none">
                          {title}
                        </h2>
                    </div>
                    )}
                  <div className="">{children}</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
