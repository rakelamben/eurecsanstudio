import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Trophy } from "~/assets/illustrations/Trophy";
import { SiClick } from "@sargamicons/react/line";

interface InteractiveTrophyProps {
    className?: string;
    wrapperClassName?: string;
    onOpenDialog: () => void;
    isPopped?: boolean;
    onTogglePop?: (popped: boolean) => void;
    isDialogOpen?: boolean;
}

export function InteractiveTrophy({
    className = "",
    wrapperClassName = "",
    onOpenDialog,
    isPopped: controlledPopped,
    onTogglePop,
    isDialogOpen = false,
}: InteractiveTrophyProps) {
    const [internalPopped, setInternalPopped] = useState(false);
    const isPopped = controlledPopped !== undefined ? controlledPopped : internalPopped;

    const setPopped = (next: boolean) => {
        if (controlledPopped === undefined) {
            setInternalPopped(next);
        }
        onTogglePop?.(next);
    };

    const containerRef = useRef<HTMLDivElement>(null);

    // Click outside listener: when popped and dialog is not open, clicking anywhere else resets the trophy
    useEffect(() => {
        if (!isPopped || isDialogOpen) return;

        // Ignore hidden instance (e.g. mobile instance when on desktop viewport)
        if (containerRef.current && containerRef.current.offsetParent === null) {
            return;
        }

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node | null;
            if (containerRef.current && target && !containerRef.current.contains(target)) {
                setPopped(false);
            }
        };

        const timer = setTimeout(() => {
            window.addEventListener("click", handleClickOutside);
        }, 50);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("click", handleClickOutside);
        };
    }, [isPopped, isDialogOpen]);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isPopped) {
            // First click: Pop up from the basket with 25deg rotation
            setPopped(true);
        } else {
            // Second click: Open modal dialog
            onOpenDialog();
        }
    };

    return (
        <div
            ref={containerRef}
            className={`lg:relative select-none cursor-pointer ${wrapperClassName}`}
            onClick={handleClick}
            onPointerDown={(e) => {
                // Prevent outside click handler from firing when interacting with this container
                e.stopPropagation();
            }}
        >
            {/* Floating "Click Again" Badge */}
            <AnimatePresence>
                {isPopped && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: -70, x: "-50%" }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: -160,
                            x: "-50%",
                            transition: {
                                type: "spring",
                                stiffness: 360,
                                damping: 18,
                                delay: 0.08,
                            },
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.6,
                            y: -110,
                            x: "-50%",
                            transition: { duration: 0.2, ease: "easeInOut" },
                        }}
                        className="absolute left-1/2 top-0 pointer-events-auto cursor-pointer z-30"
                    >
                        <motion.div
                            animate={{
                                y: [0, -6, 0],
                            }}
                            transition={{
                                duration: 1.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-3.5 py-1.5 bg-(--brand-yellow) text-black rounded-full shadow-xl border-2 border-white ring-2 ring-black/20"
                        >
                            <SiClick className="w-4 h-4 text-black animate-pulse" />
                            <span className="font-display text-sm tracking-wider uppercase font-bold whitespace-nowrap">
                                Click Again
                            </span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Animated Trophy with Spring physics (stays behind AchivementBasket) */}
            <motion.div
                animate={
                    isPopped
                        ? {
                              y: -140,
                              rotate: 10,
                          }
                        : {
                              y: 0,
                              rotate: 0,
                          }
                }
                whileHover={!isPopped ? { y: -8 } : { scale: 1.03 }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 14,
                    mass: 0.8,
                }}
            >
                <Trophy className={className} />
            </motion.div>
        </div>
    );
}
