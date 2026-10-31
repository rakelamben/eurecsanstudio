import BIG_CLOUD from "~/assets/illustrations/BIG_CLOUD.png"

interface BigCloudProps {
    className?: string;
}

export function BigCloud({ className = "" }: BigCloudProps) {
    return (
        <div className={`fixed opacity-[0.9] w-full overflow-hidden h-full z-[-1] pointer-events-none ${className}`}>
            <img
                src={BIG_CLOUD}
                alt="Awan besar"
                className="absolute bottom-1/3 translate-y-1/2 h-full w-full object-cover scale-125 "
            />
        </div>
    )
}
