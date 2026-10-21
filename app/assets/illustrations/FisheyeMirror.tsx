import type { ReactNode } from "react";

type FisheyeMirrorProps = {
    children?: ReactNode;
};

export function FisheyeMirror({ children }: FisheyeMirrorProps) {
    return (
        <svg width="357" height="364" viewBox="0 0 357 364" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="178.503" cy="187.849" r="175.531" fill="#F02D19" />
            <path d="M0 125.407C24.0132 52.6924 94.8518 0 178.503 0C262.147 0 332.981 52.6832 357 125.388L343.564 175.531H13.4307L0 125.407Z" fill-rule="evenodd" clip-rule="evenodd" fill="url(#paint0_linear_538_443)" />
            <path d="M178.503 7.39075C258.227 7.39075 325.63 57.092 349.281 125.637L337.893 168.141H19.1018L7.71851 125.656C31.3632 57.1013 98.7713 7.39075 178.503 7.39075Z" fill="#CD2413" />
            <path d="M178.503 20.3246C271.024 20.3246 346.028 95.328 346.028 187.849C346.028 280.371 271.024 355.374 178.503 355.374C85.9817 355.374 10.9784 280.371 10.9784 187.849C10.9784 95.328 85.9817 20.3246 178.503 20.3246Z" fill="white" />
            {children ? (
                <foreignObject x="11" y="20" width="335" height="336">
                    <div style={{ height: "100%", width: "100%", overflow: "hidden", borderRadius: "50%" }}>
                        {children}
                    </div>
                </foreignObject>
            ) : null}
            <defs>
                <linearGradient id="paint0_linear_538_443" x1="178.5" y1="-1.41885e-05" x2="178.5" y2="175.531" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FF6859" />
                    <stop offset="1" stop-color="#F02D19" />
                </linearGradient>
            </defs>
        </svg>
    )
}
