import { useState } from "react"
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
import { InteractiveBriefcase } from "./InteractiveBriefcase"
import { ExperienceDialogContent } from "./ExperienceDialogContent"
import { InteractiveTrophy } from "./InteractiveTrophy"
import { AchievementDialogContent } from "./AchievementDialogContent"
import { Link } from "react-router"


import { Footer } from "~/componets/layout/Footer"
import { Dialog } from "~/componets/ui/Dialog"
import {
    eurecsanServiceCards,
    type EurecsanService,
} from "~/features/data/EurecsanServices"
import FLUTTER_LOGO from '~/assets/logos/FLUTTER_LOGO.png'
import REACTNATIVE_LOGO from '~/assets/logos/REACTNATIVE_LOGO.webp'



export function About() {
    const [activeService, setActiveService] = useState<EurecsanService | null>(null)
    const [isExperienceOpen, setIsExperienceOpen] = useState(false)
    const [isBriefcasePopped, setIsBriefcasePopped] = useState(false)
    const [isAchievementOpen, setIsAchievementOpen] = useState(false)
    const [isTrophyPopped, setIsTrophyPopped] = useState(false)

    const handleOpenExperience = () => {
        setIsExperienceOpen(true);
    };

    const handleCloseExperience = () => {
        setIsExperienceOpen(false);
        setIsBriefcasePopped(false);
    };

    const handleOpenAchievement = () => {
        setIsAchievementOpen(true);
    };

    const handleCloseAchievement = () => {
        setIsAchievementOpen(false);
        setIsTrophyPopped(false);
    };
    const details = activeService?.details ?? [];

    return (
        <>
            <div className="pt-[4rem] overflow-hidden">
                <section id="about-hero" className="w-full relative h-fit mb-8">
                    <div className="mt-8 text-center flex flex-col w-full">
                        <p className="font-display text-[clamp(4rem,7vw,8rem)] text-[#B4CDD8] leading-none">ABOUT ME</p>
                        <p className="font-display text-[clamp(6rem,14vw,13rem)] leading-tight lg:leading-none text-(--brand-red) -mt-6">EURECSAN</p>
                    </div>
                    <div className="max-w-[clamp(280px,24vw,350px)]  mx-auto -mt-[clamp(9rem,18vw,17rem)]">
                        <img src={DEWA_PEACE} alt="Foto Eurecsan" className="h-full [transform:translateZ(0)]" loading="eager" decoding="async" />
                    </div>
                    <div className="absolute  w-[clamp(1380px,120vw,1620px)] h-[calc(100%-8rem)] bottom-0 left-1/2 -translate-x-1/2">
                        <div className="relative w-full h-full">
                            <div className="absolute left-0 bottom-1/2 translate-y-1/4  aspect-[272/479] scale-70  md:scale-80">
                                <img src={ROAD_CONE_1} alt="Road Cone" className="w-full" />
                            </div>
                            <div className="absolute left-1/5 -translate-x-1/5 bottom-0 -translate-y-1/3  aspect-[279/183] scale-70  md:scale-80">
                                <img src={ROAD_CONE_3} alt="Road Cone" className="w-full" />
                            </div>
                            <div className="absolute right-1/7 -translate-x-1/5 bottom-0 -translate-y-1/4  aspect-[229/270] scale-70  md:scale-80">
                                <img src={ROAD_CONE_4} alt="Road Cone" className="w-full" />
                            </div>
                            <div className="absolute right-0 bottom-1/4 -translate-y-1/2  aspect-[291/264] scale-70  md:scale-80">
                                <img src={ROAD_CONE_2} alt="Road Cone" className="w-full" />
                            </div>
                        </div>
                    </div>
                </section>
                <div className="flex flex-row w-full items-center justify-center gap-4 py-4 md:py-24">
                    <Link to={"https://github.com/rakelamben"} target="_blank" rel="noopener noreferrer">
                        <LogoInstagram className="aspect-square max-w-[36px] text-[#B4CDD8] hover:text-[#5EC3F0] transition-colors" />
                    </Link>
                    <Link to={"https://www.behance.net/audewaputro15"} target="_blank" rel="noopener noreferrer">
                        <LogoBehance className="aspect-square max-w-[36px] text-[#B4CDD8] hover:text-[#5EC3F0] transition-colors" />
                    </Link>
                    <Link to={"https://www.linkedin.com/in/eurecsan-dewantoro"} target="_blank" rel="noopener noreferrer">
                        <LogoLinkedin className="aspect-square max-w-[36px] text-[#B4CDD8] hover:text-[#5EC3F0] transition-colors" />
                    </Link>
                    <Link to={"https://github.com/rakelamben"} target="_blank" rel="noopener noreferrer">
                        <LogoGithub className="aspect-square max-w-[36px] text-[#B4CDD8] hover:text-[#5EC3F0] transition-colors" />
                    </Link>
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
                            {eurecsanServiceCards.map((service) => (
                                <RoadwayCardSign
                                    key={service.id}
                                    services={service.label}
                                    onSeeMore={() => setActiveService(service)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="absolute w-full flex flex-col items-center justify-center -bottom-2 gap-28 z-0 [transform:translateZ(0)] contain-paint pointer-events-none">
                        <RailingPanel className="max-h-[170px]" />
                        <RailingPanel className="lg:hidden max-h-[170px]" />
                        <RailingPanel className="lg:hidden max-h-[170px]" />
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
                        <div className=" flex flex-row absolute bottom-8 items-baseline left-1/2 -translate-x-1/2 z-2 gap-0 [transform:translateZ(0)] contain-paint">
                            <ExperienceBasket className="max-h-[220px] w-auto pointer-events-none" />
                            <AchivementBasket className="max-h-[228px] w-auto pointer-events-none" />
                        </div>
                        <div className={` flex flex-row absolute bottom-11 left-1/2 -translate-x-1/2 gap-32`}>
                            <InteractiveBriefcase
                                className="max-h-[220px] w-auto"
                                isPopped={isBriefcasePopped}
                                onTogglePop={setIsBriefcasePopped}
                                onOpenDialog={handleOpenExperience}
                                isDialogOpen={isExperienceOpen}
                            />
                            <InteractiveTrophy
                                className="max-h-[280px] w-auto"
                                isPopped={isTrophyPopped}
                                onTogglePop={setIsTrophyPopped}
                                onOpenDialog={handleOpenAchievement}
                                isDialogOpen={isAchievementOpen}
                            />
                        </div>
                        <StoreBackground className="aspect-[1067/468] w-full h-auto" />
                    </div>
                    <div className="lg:hidden mx-auto h-fit px-2 sm:px-8 max-w-[962px] [transform:translateZ(0)]">
                        <div className="rounded-[2rem]  bg-[linear-gradient(180deg,#E7F8FF_calc(50%_-_4rem),#D0E6EF_calc(50%_-_4rem))] flex flex-col gap-20">
                            <div className="relative w-fit mx-auto">
                                <ExperienceBasket className="relative max-h-[220px] w-auto z-2 pointer-events-none" />
                                <InteractiveBriefcase
                                    wrapperClassName="absolute bottom-11 left-1/2 -translate-x-1/2"
                                    className="max-h-[220px] w-auto"
                                    isPopped={isBriefcasePopped}
                                    onTogglePop={setIsBriefcasePopped}
                                    onOpenDialog={handleOpenExperience}
                                isDialogOpen={isExperienceOpen}
                                />
                            </div>
                            <div className="relative h-fit w-fit mx-auto">
                                <AchivementBasket className="relative max-h-[228px] w-auto z-4 pointer-events-none" />
                                <InteractiveTrophy
                                    wrapperClassName="absolute bottom-2 left-1/2 -translate-x-1/3 z-3"
                                    className="max-h-[280px] w-auto"
                                    isPopped={isTrophyPopped}
                                    onTogglePop={setIsTrophyPopped}
                                    onOpenDialog={handleOpenAchievement}
                                    isDialogOpen={isAchievementOpen}
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <div className="h-42"></div>
                <Footer />
            </div>
            <Dialog
                open={activeService !== null}
                onClose={() => setActiveService(null)}
                title={activeService?.title}
                wrapperClassName="overflow-hidden pb-4"
            >
                <div className="absolute bottom-[-1rem] right-0 w-[120px] -rotate-[25deg]">
                    {/* Sticker */}
                    <div className="relative bg-white p-2 shadow-md
        [clip-path:polygon(0_0,100%_0,100%_calc(100%-1rem),calc(100%-1rem)_100%,0_100%)]"
                    >
                        <img
                            className="block h-auto w-full"
                            src={FLUTTER_LOGO}
                            alt="Logo Flutter"
                        />

                        {/* Folded corner */}
                        <span
                            className="pointer-events-none absolute bottom-0 right-0 h-4 w-4
                bg-gray-300
                [clip-path:polygon(50%_0,0%_100%,100%_0%)]"
                        />
                    </div>
                </div>
                <div className="absolute top-12 left-[-1rem] right-0 w-[50px] h-fit rotate-[25deg]">
                    {/* Sticker */}
                    <div className="relative bg-white p-2 shadow-md
        [clip-path:polygon(0_0,100%_0,100%_calc(100%-1rem),calc(100%-1rem)_100%,0_100%)]"
                    >
                        <img className="block w-full h-auto" src={REACTNATIVE_LOGO} alt="Logo Flutter" />

                        {/* Folded corner */}
                        <span
                            className="pointer-events-none absolute bottom-0 right-0 h-4 w-4
                bg-gray-300
                [clip-path:polygon(50%_0,0%_100%,100%_0%)]"
                        />
                    </div>
                </div>
                {activeService && (
                    <div className="space-y-6 z-5 text-white">
                        <p className="text-lg leading-relaxed">
                            {activeService.description}
                        </p>
                        {details.length > 0 && (
                            <ul className="list-disc space-y-2 pl-6 text-lg">
                                {details.map((detail) => (
                                    <li key={detail}>{detail}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </Dialog>
            <Dialog
                open={isExperienceOpen}
                onClose={handleCloseExperience}
                title="EXPERIENCE"
                className="!w-[min(94vw,900px)] !max-w-[900px]"
                wrapperClassName="overflow-hidden pb-4"
            >
                <div className="z-5 mt-4">
                    <ExperienceDialogContent />
                </div>
            </Dialog>
            <Dialog
                open={isAchievementOpen}
                onClose={handleCloseAchievement}
                title="ACHIEVEMENTS"
                className="!w-[min(94vw,900px)] !max-w-[900px]"
                wrapperClassName="overflow-hidden pb-4"
            >
                <div className="z-5 mt-4">
                    <AchievementDialogContent />
                </div>
            </Dialog>
        </>
    )
}
