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
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
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
            onMouseDown={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            className={`fixed left-1/2 top-1/2 z-[110] max-h-[min(85vh,680px)] w-[min(92vw,620px)]  -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-(--brand-green) rounded-lg scrollbar-thin scrollbar-thumb-(--brand-yellow) scrollbar-track-(--brand-green) ${className}`}
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
              <div className="flex items-start px-4 mx-2 pt-6 text-white">
                {title ? (
                  <h2 id={titleId} className="font-display text-3xl leading-none">
                    {title}
                  </h2>
                ) : (
                  <span />
                )}
              </div>
              <div className="px-4 mx-2 mt-3 mb-2">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
