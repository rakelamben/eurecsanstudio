import DEWA_PEACE from "~/assets/illustrations/DEWA_PEACE.png"
import ROAD_CONE_1 from "~/assets/illustrations/ROAD_CONE_1.svg"
import ROAD_CONE_2 from "~/assets/illustrations/ROAD_CONE_2.svg"
import ROAD_CONE_3 from "~/assets/illustrations/ROAD_CONE_3.svg"
import ROAD_CONE_4 from "~/assets/illustrations/ROAD_CONE_4.svg"
import { LogoInstagram } from "~/assets/logos/LOGO_INSTAGRAM"
import { LogoBehance } from "~/assets/logos/LOGO_BEHANCE"
import { LogoLinkedin } from "~/assets/logos/LOGO_LINKEDIN"
import { LogoGithub } from "~/assets/logos/LOGO_GITHUB"
import { SiArrowRight } from '@sargamicons/react/line';
import { RailingPanel } from "~/assets/illustrations/RailingPanel"
import { RoadwayCardSign } from "~/componets/ui/RoadwaySignCard"
import { SiClick } from '@sargamicons/react/line';
import { StoreBackground } from "~/componets/backgrounds/StoreBackground"
import { AchivementBasket } from "~/assets/illustrations/AchivementBasket"
import { ExperienceBasket } from "~/assets/illustrations/ExperienceBasket"
import { Briefcase } from "~/assets/illustrations/Briefcase"
import { Trophy } from "~/assets/illustrations/Trophy"
import { Footer } from "~/componets/layout/Footer"



export function About() {
    return (
        <div className="pt-[4rem] overflow-hidden">
            <section id="about-hero" className="w-full relative h-fit mb-8">
                <div className="mt-8 text-center flex flex-col w-full">
                    <p className="font-display text-[clamp(4rem,7vw,8rem)] text-[#B4CDD8] leading-none">ABOUT ME</p>
                    <p className="font-display text-[clamp(6rem,14vw,13rem)] leading-tight lg:leading-none text-(--brand-red) -mt-6">EURECSAN</p>
                </div>
                <div className="max-w-[clamp(280px,24vw,350px)]  mx-auto -mt-[clamp(9rem,18vw,17rem)]">
                    <img src={DEWA_PEACE} alt="Foto Eurecsan" className="h-full"/>
                </div>
                <div className="absolute  w-[clamp(1380px,120vw,1620px)] h-[calc(100%-8rem)] bottom-0 left-1/2 -translate-x-1/2">
                    <div className="relative w-full h-full">
                        <div className="absolute left-0 bottom-1/2 translate-y-1/4  aspect-[272/479] scale-70  md:scale-80">
                            <img src={ROAD_CONE_1} alt="Road Cone" className="w-full"/>
                        </div>
                        <div className="absolute left-1/5 -translate-x-1/5 bottom-0 -translate-y-1/3  aspect-[279/183] scale-70  md:scale-80">
                            <img src={ROAD_CONE_3} alt="Road Cone" className="w-full"/>
                        </div>
                        <div className="absolute right-1/7 -translate-x-1/5 bottom-0 -translate-y-1/4  aspect-[229/270] scale-70  md:scale-80">
                            <img src={ROAD_CONE_4} alt="Road Cone" className="w-full"/>
                        </div>
                         <div className="absolute right-0 bottom-1/4 -translate-y-1/2  aspect-[291/264] scale-70  md:scale-80">
                            <img src={ROAD_CONE_2} alt="Road Cone" className="w-full"/>
                        </div>
                    </div>
                </div>
            </section>
            <div className="flex flex-row w-full items-center justify-center gap-4 py-4 md:py-24">
                <LogoInstagram className="aspect-square max-w-[36px]"/>
                <LogoBehance className="aspect-square max-w-[36px]"/>
                <LogoLinkedin className="aspect-square max-w-[36px]"/>
                <LogoGithub className="aspect-square max-w-[36px]"/>
            </div>
            <section className="w-full relative mb-8 mt-24 md:mt-0">
                <div className="flex flex-col md:flex-row space-x-12 max-w-[962px] mx-auto px-8">
                    <span className="font-display text-6xl mb-4 md:mb-0">Hi, I'm Eurecsan</span>
                    <div className="flex flex-col space-y-4">
                        <p className="text-2xl font-display">I'm a designer and fullstack developer based in Yogyakarta, Indonesia</p>
                        <div className="flex flex-col space-y-2">
                            <p className="text-lg">
                                I’m a final year Information Technology student, and I haven’t taken on professional clients yet. What I have is a growing body of project work from university. Each one taught me something about turning a rough problem into a working product, and I’m ready to apply that on real projects.
                            </p>
                            <p className="text-lg">
                                I design and build apps that solves your problems in the most effective way. I carry the work from the first wireframe to the final build. I’m happiest when a design survives the trip into code intact. I like solving problems with as little interaction as possible, so people reach what they need faster. I plan projects with a clear structure and method, test on real devices, not just emulators, and keep refining a product until it feels right, not just until it works.
                            </p>

                        </div>
                    </div>
                </div>
            </section>
            <div className="h-24 md:h-42"></div>
            <section className="w-full relative mb-8">
                <div className="max-w-[962px] mx-auto mb-12 px-8">
                    <div className="flex flex-row justify-between items-center">
                        <p className="text-md opacity-50">WHAT I DO</p>
                        <div className="flex flex-row gap-2 items-center">
                            <p className="text-md font-bold">SEE MY WORKS</p>
                            <SiArrowRight />
                        </div>
                    </div>
                </div>
                <div className="relative max-w-[962px] mx-auto z-10">
                    <div className="flex flex-col lg:flex-row justify-between">
                        <RoadwayCardSign services="Websites"/>
                        <RoadwayCardSign services="Mobile Apps"/>
                        <RoadwayCardSign services="AI Integration"/>
                    </div>
                </div>
                <div className="absolute w-full flex flex-col items-center justify-center -bottom-2 gap-28 z-0">
                    <RailingPanel className="max-h-[170px]"/>
                    <RailingPanel className="lg:hidden max-h-[170px]"/>
                    <RailingPanel className="lg:hidden max-h-[170px]"/>
                </div>
            </section>
            <div className="h-52"></div>
            <section className="w-full relative">
                <div className="max-w-[962px] mx-auto mb-32 lg:mb-8 px-8 lg:px-0">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-md opacity-50">EXPERIENCE & ACHIEVEMENT</p>
                        <div className="flex flex-row gap-2 items-center">
                            <SiClick />
                            <p className="text-md ">CLICK TO INTERACT</p>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:block relative mx-auto h-fit max-w-[962px]">
                    <div className=" flex flex-row absolute bottom-11 items-baseline left-1/2 -translate-x-1/2 z-2 gap-0">
                        <ExperienceBasket className="max-h-[220px] w-auto"/>
                        <AchivementBasket className="max-h-[228px] w-auto"/>
                    </div>
                    <div className=" flex flex-row absolute bottom-11 left-1/2 -translate-x-1/2 z-1 gap-32">
                        <Briefcase className="max-h-[220px] w-auto"/>
                        <Trophy className="max-h-[295px] w-auto"/>
                    </div>
                    <StoreBackground className="aspect-[1067/468] w-full h-auto"/>
                </div>
                <div className="lg:hidden mx-auto h-fit px-2 sm:px-8 max-w-[962px]">
                    <div className="rounded-[2rem]  bg-[linear-gradient(180deg,#E7F8FF_calc(50%_-_4rem),#D0E6EF_calc(50%_-_4rem))] flex flex-col gap-20">
                        <div className="relative w-fit mx-auto">
                            <ExperienceBasket className="relative max-h-[220px] w-auto z-2"/>
                            <Briefcase className="absolute bottom-11 max-h-[220px] w-auto z-1 left-1/2 -translate-x-1/2"/>
                        </div>
                        <div className="relative w-fit mx-auto">
                            <AchivementBasket className="relative max-h-[228px] w-auto z-2"/>
                            <Trophy className="absolute bottom-11 max-h-[228px] w-auto z-1 left-1/2 -translate-1-1/2"/>
                        </div>
                    </div>
                </div>
            </section>
            <div className="h-42"></div>
            <Footer />
        </div>
    )
}
    