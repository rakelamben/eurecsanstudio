import BOTTOM_SKY_GRADIENT from "~/assets/effects/BOTTOM_SKY_GRADIENT.png"

export function SkyBottomGradient() {
    return (
        <div className="fixed inset-0 bottom-0 z-[-1] pointer-events-none">
            <img className="opacity-0.7 inset-0 object-cover absolute bottom-[-10rem] w-full h-full" src={BOTTOM_SKY_GRADIENT} alt="Langit gradient bawah" />
        </div>
    )
}