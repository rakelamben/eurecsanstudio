import WORKINGONIT from "~/assets/illustrations/WORKINGONIT.png"
import STREETWALL from "~/assets/illustrations/STREET_WALL.jpg"

export function ComingSoon() {
    return (
        <div className="relative h-dvh overflow-hidden bg-white">
            <div className="absolute z-10 bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 aspect-[543/721] h-[min(64vh,600px)] drop-shadow-[0_5px_5px_rgba(0,0,0,0.7)]">
                <img src={WORKINGONIT} className="" alt="Working On It" aria-label="Coming Soon" />
            </div>
            <img className="absolute object-cover w-full h-full inset-0" src={STREETWALL} alt="Tembok Jalan" />
        </div>
    );
}