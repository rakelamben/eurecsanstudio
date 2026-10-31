import { type ReactNode } from "react";
import { useGSAP, ScrollSmoother } from "~/lib/gsap";

type GsapScrollSmootherProps = {
    children: ReactNode;
}

export function GsapScrollSmoother({ children }: GsapScrollSmootherProps) {
    useGSAP(() => {
        const smoother = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 0.8,
            effects: false,
            smoothTouch: 0.1,
        });

        return () => smoother.kill();
    });

    return (
        <div id="smooth-wrapper">
            <div id="smooth-content" className="will-change-transform [transform:translateZ(0)] [backface-visibility:hidden]">
                {children}
            </div>
        </div>
    )
}
