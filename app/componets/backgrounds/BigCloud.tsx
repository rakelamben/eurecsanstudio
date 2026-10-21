import BIG_CLOUD from "~/assets/illustrations/BIG_CLOUD.png"

export function BigCloud() {
    return (
        <div className="fixed opacity-[0.9] w-full overflow-hidden h-full z-[-1] pointer-events-none">
            <img
                src={BIG_CLOUD}
                alt="Awan besar"
                className="absolute bottom-1/3 translate-y-1/2 h-full w-full object-cover scale-125 "
            />
        </div>
    )
}
