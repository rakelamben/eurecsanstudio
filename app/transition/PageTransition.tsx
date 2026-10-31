import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
    type ReactNode,
} from "react";
import { useLocation, useNavigate } from "react-router";
import { createPortal } from "react-dom";
import { gsap, ScrollSmoother, ScrollTrigger } from "~/lib/gsap";

type RouteSignConfig = {
    badge: string;
    title: string;
    subtitle: string;
    code: string;
};

const routeSigns: Record<string, RouteSignConfig> = {
    "/": {
        badge: "ROUTE 01",
        title: "HOME",
        subtitle: "ENJOY THE VIEW",
        code: "HWY-01",
    },
    "/about": {
        badge: "ROUTE 24",
        title: "ABOUT ME",
        subtitle: "PROFILE & EXPERIENCE",
        code: "EXP-24",
    },
    "/works": {
        badge: "ROUTE 48",
        title: "SELECTED WORKS",
        subtitle: "PORTFOLIO SHOWCASE",
        code: "WRK-48",
    },
    "/contact": {
        badge: "ROUTE 99",
        title: "CONTACT",
        subtitle: "GET IN TOUCH",
        code: "CNT-99",
    },
};

function getSignConfig(path: string): RouteSignConfig {
    const cleanPath = path.split(/[?#]/)[0];
    return (
        routeSigns[cleanPath] || {
            badge: "EXPRESS",
            title: cleanPath.replace("/", "").toUpperCase() || "DESTINATION",
            subtitle: "ROADWAY CORRIDOR",
            code: "RDW-00",
        }
    );
}

interface TransitionContextType {
    navigateTo: (to: string) => void;
    isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextType>({
    navigateTo: () => {},
    isTransitioning: false,
});

export const usePageTransition = () => useContext(TransitionContext);

export function PageTransition({ children }: { children: ReactNode }) {
    const location = useLocation();
    const navigate = useNavigate();

    const [targetSign, setTargetSign] = useState<RouteSignConfig>(() =>
        getSignConfig(location.pathname),
    );
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [mounted, setMounted] = useState(false);

    const overlayRef = useRef<HTMLDivElement>(null);
    const slatsRef = useRef<(HTMLDivElement | null)[]>([]);
    const badgeRef = useRef<HTMLDivElement>(null);
    const activeTlRef = useRef<gsap.core.Timeline | null>(null);

    // Tracks target route waiting to mount in the DOM
    const pendingDestinationRef = useRef<string | null>(null);
    const isSlatsClosedRef = useRef(false);
    const prevLocationKeyRef = useRef(location.key);

    useEffect(() => {
        setMounted(true);
        return () => {
            if (activeTlRef.current) {
                activeTlRef.current.kill();
            }
        };
    }, []);

    /**
     * Phase 1: Flip IN (Close mechanical slats over current page)
     */
    const playSlatsClose = (onComplete: () => void) => {
        if (!overlayRef.current) {
            onComplete();
            return;
        }

        if (activeTlRef.current && activeTlRef.current.isActive()) {
            activeTlRef.current.kill();
        }

        const validSlats = slatsRef.current.filter(Boolean);
        const smoother = (() => {
            try {
                return ScrollSmoother.get();
            } catch {
                return null;
            }
        })();

        if (smoother) {
            try {
                smoother.paused(true);
            } catch {}
        }

        // Set initial positions for closing flip
        gsap.set(overlayRef.current, { autoAlpha: 1, pointerEvents: "auto" });
        gsap.set(validSlats, {
            rotateX: -90,
            opacity: 0,
            transformPerspective: 1200,
            transformOrigin: "center center",
        });
        if (badgeRef.current) {
            gsap.set(badgeRef.current, { scale: 0.7, opacity: 0 });
        }

        const tl = gsap.timeline({
            onComplete: () => {
                isSlatsClosedRef.current = true;
                onComplete();
            },
        });
        activeTlRef.current = tl;

        // Mechanical Trivision Slats wave flip shut
        tl.to(validSlats, {
            rotateX: 0,
            opacity: 1,
            duration: 0.32,
            stagger: 0.04,
            ease: "power3.out",
        });

        if (badgeRef.current) {
            tl.to(
                badgeRef.current,
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.22,
                    ease: "back.out(1.5)",
                },
                "-=0.15",
            );
        }

        // Brief mechanical settle
        tl.to({}, { duration: 0.04 });
    };

    /**
     * Phase 2: Flip OUT (Open mechanical slats ONLY after Page 2 is mounted)
     */
    const playSlatsOpen = (onComplete?: () => void) => {
        if (!overlayRef.current) {
            setIsTransitioning(false);
            onComplete?.();
            return;
        }

        if (activeTlRef.current && activeTlRef.current.isActive()) {
            activeTlRef.current.kill();
        }

        const validSlats = slatsRef.current.filter(Boolean);

        const tl = gsap.timeline({
            onComplete: () => {
                setIsTransitioning(false);
                isSlatsClosedRef.current = false;
                pendingDestinationRef.current = null;
                gsap.set(overlayRef.current, { autoAlpha: 0, pointerEvents: "none" });

                const smoother = (() => {
                    try {
                        return ScrollSmoother.get();
                    } catch {
                        return null;
                    }
                })();
                if (smoother) {
                    try {
                        smoother.scrollTo(0, false);
                    } catch {}
                }
                const smoothContent = document.getElementById("smooth-content");
                if (smoothContent && location.pathname === "/") {
                    gsap.set(smoothContent, { y: 0, clearProps: "transform" });
                }
                try {
                    ScrollTrigger.refresh();
                } catch {}
                onComplete?.();
            },
        });
        activeTlRef.current = tl;

        // Brief hold so the destination route sign can be comfortably read
        tl.to({}, { duration: 0.12 });

        if (badgeRef.current) {
            tl.to(badgeRef.current, {
                scale: 0.8,
                opacity: 0,
                duration: 0.16,
                ease: "power2.in",
            });
        }

        // Slats flip open to reveal the already-mounted Page 2
        tl.to(
            validSlats,
            {
                rotateX: 90,
                opacity: 0,
                duration: 0.3,
                stagger: 0.04,
                ease: "power3.in",
            },
            "-=0.08",
        );
    };

    /**
     * Navigation Trigger: Closes slats over Page 1, then calls navigate(to).
     * Slats STAY CLOSED until Page 2 has finished rendering in the DOM!
     */
    const navigateTo = (to: string) => {
        const cleanPath = to.split(/[?#]/)[0];
        if (location.pathname === cleanPath) return;
        if (isTransitioning) return;

        const sign = getSignConfig(to);
        setTargetSign(sign);
        setIsTransitioning(true);
        pendingDestinationRef.current = cleanPath;
        isSlatsClosedRef.current = false;

        playSlatsClose(() => {
            // Screen is 100% covered by the closed billboard slats!
            // Start loading Page 2 while completely hidden behind the billboard
            navigate(to);
        });
    };

    /**
     * Watches for Page 2 to actually mount in the DOM.
     * When React Router commits the new route component, we reset scroll and open the slats.
     */
    useEffect(() => {
        if (pendingDestinationRef.current) {
            const cleanCurrent = location.pathname.split(/[?#]/)[0];

            if (cleanCurrent === pendingDestinationRef.current) {
                // PAGE 2 IS MOUNTED IN THE DOM!
                pendingDestinationRef.current = null;

                // 1. Unpause smoother and instantly snap to top without lerp/smoothing
                const smoother = (() => {
                    try {
                        return ScrollSmoother.get();
                    } catch {
                        return null;
                    }
                })();
                if (smoother) {
                    try {
                        smoother.paused(false);
                        smoother.scrollTo(0, false);
                        smoother.scrollTop(0);
                    } catch {}
                }

                // 2. Reset native window scroll
                window.scrollTo(0, 0);

                // 3. For Home ("/") or any clean reset, ensure #smooth-content is pinned at y: 0
                const smoothContent = document.getElementById("smooth-content");
                if (smoothContent && cleanCurrent === "/") {
                    gsap.set(smoothContent, { y: 0, clearProps: "transform" });
                }

                // 4. Refresh ScrollTrigger measurements
                try {
                    ScrollTrigger.refresh();
                } catch {}

                // Double requestAnimationFrame ensures browser paints Page 2 before slats open
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        playSlatsOpen();
                    });
                });
            }
        } else {
            // Browser back / forward button handling
            if (prevLocationKeyRef.current !== location.key) {
                prevLocationKeyRef.current = location.key;
                window.scrollTo(0, 0);
                const smoother = (() => {
                    try {
                        return ScrollSmoother.get();
                    } catch {
                        return null;
                    }
                })();
                if (smoother) {
                    try {
                        smoother.paused(false);
                        smoother.scrollTo(0, false);
                        smoother.scrollTop(0);
                    } catch {}
                }
                const smoothContent = document.getElementById("smooth-content");
                if (smoothContent && location.pathname === "/") {
                    gsap.set(smoothContent, { y: 0, clearProps: "transform" });
                }
                try {
                    ScrollTrigger.refresh();
                } catch {}
            }
        }
    }, [location.pathname, location.key]);

    // Safety timeout: If route takes > 4.5s (e.g. offline/network error), reveal page
    useEffect(() => {
        if (!isTransitioning || !pendingDestinationRef.current) return;

        const timer = setTimeout(() => {
            if (pendingDestinationRef.current) {
                console.warn("Navigation timeout, revealing page");
                pendingDestinationRef.current = null;
                playSlatsOpen();
            }
        }, 4500);

        return () => clearTimeout(timer);
    }, [isTransitioning]);

    return (
        <TransitionContext.Provider value={{ navigateTo, isTransitioning }}>
            {children}

            {/* Portal Mechanical Trivision Slats Overlay */}
            {mounted &&
                createPortal(
                    <div
                        ref={overlayRef}
                        aria-hidden="true"
                        style={{ opacity: 0 }}
                        className="fixed inset-0 z-[999] pointer-events-none flex flex-col justify-between overflow-hidden select-none"
                    >
                        {/* 5 Mechanical 3D Slats spanning the screen */}
                        <div
                            className="w-full h-full flex flex-col"
                            style={{ perspective: "1400px" }}
                        >
                            {[0, 1, 2, 3, 4].map((index) => {
                                const isTop = index === 0;
                                const isCenter = index === 2;
                                const isBottom = index === 4;

                                return (
                                    <div
                                        key={index}
                                        ref={(el) => {
                                            slatsRef.current[index] = el;
                                        }}
                                        style={{ transformStyle: "preserve-3d" }}
                                        className="flex-1 w-full bg-gradient-to-b from-[#067a43] via-[#046738] to-[#024a27] border-b-2 border-black relative flex items-center justify-center shadow-lg -mt-[2px] last:mb-0"
                                    >
                                        {/* Top hazard stripe on first slat */}
                                        {/* {isTop && (
                                            <div
                                                className="absolute top-0 inset-x-0 h-4 border-b-2 border-black"
                                                style={{
                                                    backgroundImage:
                                                        "repeating-linear-gradient(45deg, #FED325, #FED325 16px, #151515 16px, #151515 32px)",
                                                }}
                                            />
                                        )} */}

                                        {/* Left & Right mechanical bolt rivets */}
                                        <div className="absolute left-8 flex flex-col gap-2 z-10">
                                            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-zinc-100 via-zinc-400 to-zinc-700 border border-black shadow-[0_1px_3px_rgba(0,0,0,0.8)] flex items-center justify-center">
                                                <div className="w-1 h-1 rounded-full bg-black/60" />
                                            </div>
                                        </div>
                                        <div className="absolute right-8 flex flex-col gap-2 z-10">
                                            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-zinc-100 via-zinc-400 to-zinc-700 border border-black shadow-[0_1px_3px_rgba(0,0,0,0.8)] flex items-center justify-center">
                                                <div className="w-1 h-1 rounded-full bg-black/60" />
                                            </div>
                                        </div>

                                        {/* Slat groove line */}
                                        <div className="absolute inset-x-12 top-0 h-[2px] bg-[#ABABAB]" />

                                        {/* Mechanical Route Destination Display on Middle Slat */}
                                        {isCenter && (
                                            <div
                                                ref={badgeRef}
                                                className="z-10 flex flex-col items-center justify-center text-center px-4"
                                            >
                                                <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-white tracking-wider uppercase leading-none drop-shadow-md">
                                                    {targetSign.title}
                                                </h2>
                                                <p className="font-mono text-xs text-white/80 tracking-widest uppercase mt-0.5">
                                                    {targetSign.subtitle}
                                                </p>
                                            </div>
                                        )}

                                        {/* Bottom hazard stripe on last slat */}
                                        {/* {isBottom && (
                                            <div
                                                className="absolute bottom-0 inset-x-0 h-4 border-t-2 border-black"
                                                style={{
                                                    backgroundImage:
                                                        "repeating-linear-gradient(-45deg, #FED325, #FED325 16px, #151515 16px, #151515 32px)",
                                                }}
                                            />
                                        )} */}
                                    </div>
                                );
                            })}
                        </div>
                    </div>,
                    document.body,
                )}
        </TransitionContext.Provider>
    );
}

/**
 * Reusable TransitionLink component that hooks into the Mechanical Trivision Slats transition.
 * Prevents premature page redirect and waits for slats to snap shut before navigating.
 */
export function TransitionLink({
    to,
    children,
    className,
    onClick,
    ...props
}: {
    to: string;
    children: ReactNode;
    className?: string | ((props: { isActive: boolean }) => string | undefined);
    onClick?: () => void;
    [key: string]: unknown;
}) {
    const location = useLocation();
    const { navigateTo, isTransitioning } = usePageTransition();
    const cleanTo = to.split(/[?#]/)[0];
    const isActive = location.pathname === cleanTo || (cleanTo !== "/" && location.pathname.startsWith(cleanTo));

    const computedClassName = typeof className === "function" ? className({ isActive }) : className;

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Let middle click or Ctrl/Cmd clicks open new tabs normally
        if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) {
            return;
        }

        e.preventDefault();
        onClick?.();

        if (isTransitioning) return;

        if (location.pathname !== cleanTo) {
            navigateTo(to);
        }
    };

    return (
        <a href={to} onClick={handleClick} className={computedClassName} {...props}>
            {children}
        </a>
    );
}
