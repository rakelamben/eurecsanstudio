
import { ArrowUpLeft } from "~/assets/illustrations/ArrowUpLeft"
import { DistanceSign } from "~/assets/illustrations/DistanceSign"
import { RoadwaySignGrid } from "~/assets/illustrations/RoadwaySignGrid"

type RoadwayCardSignProps = {
    services?:string,
    onSeeMore?: () => void,
    className?: string
}

export function RoadwayCardSign({ className = "", services = "", onSeeMore }: RoadwayCardSignProps) {
    return (
        <div className="flex flex-col items-center">
            <div className={`relative z-7 flex flex-col space-y-[5px] justify-start items-start w-fit ${className}`}>
                <div className="flex flex-row items-center gap-2 px-4 text-white rounded-md py-0 bg-(--brand-green) ring-[#368560] ring-2 ring-offset outline-white outline-2 outline-offset-2">
                    <p className="font-bold text-xl tracking-widest leading-none text-center">CHAT ME</p>
                    <p className="font-accent font-bold text-3xl tracking-tight">24</p>
                </div>
                <div className="flex flex-col gap-0 justify-center ring-[#368560] ring-2 ring-offset outline-white outline-2 outline-offset-2 rounded-2xl">
                    <div className="flex flex-col bg-(--brand-green) justify-center py-6 px-6 gap-4 text-white rounded-t-2xl">
                        <div className="flex flex-row gap-6 items-start">
                            
                            <ArrowUpLeft className="max-w-[42px] h-auto"/>
                            <p className="font-bold text-2xl tracking-widest leading-none text-center">SERVICES</p>
                            <DistanceSign className="max-w-[42px] h-auto"/>
                        </div>
                        <p className="font-bold text-3xl text-center">{services}</p>
                    </div>
                    <button
                        type="button"
                        onClick={onSeeMore}
                        className="w-full cursor-pointer rounded-b-2xl bg-(--brand-yellow) py-2"
                    >
                        <p className="font-bold text-2xl tracking-widest text-center ">SEE MORE</p>
                    </button>
                </div>
            </div>
            <RoadwaySignGrid className="relative z-5 -mt-6"/>
        </div>

    )
}
