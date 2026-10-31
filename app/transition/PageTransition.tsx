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
import { gsap, useGSAP, ScrollSmoother, ScrollTrigger } from "~/lib/gsap";

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
    return (
        routeSigns[path] || {
            badge: "EXPRESS",
            title: path.replace("/", "").toUpperCase() || "DESTINATION",
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
    const prevLocationKeyRef = useRef(location.key);

    useEffect(() => {
        setMounted(true);
        return () => {
            if (activeTlRef.current) {
                activeTlRef.current.kill();
            }
        };
    }, []);

    const navigateTo = (to: string) => {
        if (location.pathname === to) return;
        if (isTransitioning) return;

        const sign = getSignConfig(to);
        setTargetSign(sign);
        setIsTransitioning(true);

        if (!overlayRef.current) {
            navigate(to);
            return;
        }

        // Kill any pending timeline
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

        const tl = gsap.timeline({
            onComplete: () => {
                setIsTransitioning(false);
                gsap.set(overlayRef.current, { autoAlpha: 0, pointerEvents: "none" });
            },
        });

        activeTlRef.current = tl;

        // 1. Prepare overlay & 3D slats
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

        if (smoother) {
            try {
                smoother.paused(true);
            } catch {}
        }

        // 2. Mechanical Trivision Slats Wave Flip IN (Close screen)
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

        // 3. MIDPOINT: The screen is 100% COVERED by closed mechanical slats!
        // Perform the redirect now while completely hidden!
        tl.add(() => {
            navigate(to);
            window.scrollTo(0, 0);
            if (smoother) {
                try {
                    smoother.scrollTop(0);
                    smoother.paused(false);
                } catch {}
            }
            try {
                ScrollTrigger.refresh();
            } catch {}
        });

        // 4. Brief mechanical pause (0.08s)
        tl.to({}, { duration: 0.1 });

        if (badgeRef.current) {
            tl.to(badgeRef.current, {
                scale: 0.8,
                opacity: 0,
                duration: 0.15,
                ease: "power2.in",
            });
        }

        // 5. Mechanical Trivision Slats Wave Flip OUT (Open and reveal new page)
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

    // Browser back/forward button support
    useGSAP(
        () => {
            if (prevLocationKeyRef.current === location.key) return;
            prevLocationKeyRef.current = location.key;

            // If browser back/forward was pressed and no animation is running, do a fast settle
            if (!isTransitioning && overlayRef.current) {
                const validSlats = slatsRef.current.filter(Boolean);
                gsap.set(overlayRef.current, { autoAlpha: 1, pointerEvents: "auto" });
                gsap.set(validSlats, { rotateX: 0, opacity: 1 });

                const tl = gsap.timeline({
                    onComplete: () => {
                        gsap.set(overlayRef.current, { autoAlpha: 0, pointerEvents: "none" });
                    },
                });

                tl.to(validSlats, {
                    rotateX: 90,
                    opacity: 0,
                    duration: 0.35,
                    stagger: 0.04,
                    ease: "power3.in",
                });
            }
        },
        { dependencies: [location.key] },
    );

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
                                        className="border-2 border-[#ABABAB] flex-1 w-full bg-gradient-to-b from-[#067a43] via-[#046738] to-[#024a27] relative flex items-center justify-center shadow-lg -mt-[5px] last:mb-0"
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
                                        <div className="absolute left-6 flex flex-col gap-1.5 opacity-60 z-5 ">
                                            <div className="w-2.5 h-2.5 rounded-full bg-white" />
                                        </div>
                                        <div className="absolute right-6 flex flex-col gap-1.5 opacity-60 z-5 ">
                                            <div className="w-2.5 h-2.5 rounded-full bg-white" />
                                        </div>

                                        {/* Slat groove line */}
                                        <div className="absolute inset-x-12 top-0 h-[1px]" />

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
    const { navigateTo } = usePageTransition();
    const isActive = location.pathname === to || (to !== "/" && location.pathname.startsWith(to));

    const computedClassName = typeof className === "function" ? className({ isActive }) : className;

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Let middle click or Ctrl/Cmd clicks open new tabs normally
        if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) {
            return;
        }

        e.preventDefault();
        onClick?.();

        if (location.pathname !== to) {
            navigateTo(to);
        }
    };

    return (
        <a href={to} onClick={handleClick} className={computedClassName} {...props}>
            {children}
        </a>
    );
}
