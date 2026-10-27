import { LogoInstagram } from "~/assets/logos/LOGO_INSTAGRAM"
import { LogoBehance } from "~/assets/logos/LOGO_BEHANCE"
import { LogoLinkedin } from "~/assets/logos/LOGO_LINKEDIN"
import { LogoGithub } from "~/assets/logos/LOGO_GITHUB"
import { SiMail } from '@sargamicons/react/line';
import { SiPin } from '@sargamicons/react/line';




export function Footer() {
    return (
        <section className="w-full">
            <div className="max-w-[962px] mx-auto flex flex-col space-y-10 mb-36 px-8 lg:px-0">
                <div className="flex flex-col space-y-4 w-full">
                    <p className="text-lg">GOT SOMETHING IN MIND?</p>
                    <p className="font-display text-[4rem] sm:text[5rem] md:text-[8rem] leading-none">GET IN TOUCH</p>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3 w-full">
                    <div className="flex flex-row w-full items-center justify-start gap-4">
                        <LogoInstagram className="aspect-square max-w-[36px]"/>
                        <LogoBehance className="aspect-square max-w-[36px]"/>
                        <LogoLinkedin className="aspect-square max-w-[36px]"/>
                        <LogoGithub className="aspect-square max-w-[36px]"/>
                    </div>
                    <div className="flex flex-col gap-0 ">
                        <p className="font-bold">SEND ME EMAIL</p>
                        <div className="flex flex-row gap-2 items-center"><SiMail /><p>audewaputro15@gmail.com</p></div>
                    </div>
                    <div className="flex flex-col gap-0 ">
                        <p className="font-bold">RN IM IN</p>
                        <div className="flex flex-row gap-2 items-center"><SiPin /><p>Yogyakarta, Indonesia</p></div>
                    </div>
                </div>
            </div>
            <div className="px-8 py-2 w-full mx-auto ">
                <div className="flex flex-row gap-6 justify-between">
                    <p className="text-xs md:text-sm opacity-50">♡ MADE BY EURECSANWORKS</p>
                    <p className="text-xs md:text-sm opacity-50">© {
                        new Date().getUTCFullYear()
                    } EURECSAN</p>
                </div>
            </div>
        </section>
    )
}