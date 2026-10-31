import { useState } from "react";
import { Link } from "react-router";
import { LogoInstagram } from "~/assets/logos/LOGO_INSTAGRAM";
import { LogoBehance } from "~/assets/logos/LOGO_BEHANCE";
import { LogoLinkedin } from "~/assets/logos/LOGO_LINKEDIN";
import { LogoGithub } from "~/assets/logos/LOGO_GITHUB";
import { SiMail, SiPin, SiCopy, SiCheck } from '@sargamicons/react/line';


const EMAIL = "audewaputro15@gmail.com";

export function Footer() {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 2200);
        } catch {
            const textarea = document.createElement("textarea");
            textarea.value = EMAIL;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2200);
        }
    };

    return (
        <section className="w-full">
            <div className="max-w-[962px] mx-auto flex flex-col space-y-10 mb-36 px-8 lg:px-0">
                <div className="flex flex-col space-y-4 w-full">
                    <p className="text-lg">GOT SOMETHING IN MIND?</p>
                    <p className="font-display text-[4rem] sm:text[5rem] md:text-[8rem] leading-none">GET IN TOUCH</p>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3 w-full">
                    <div className="flex flex-row w-full items-center justify-start gap-4">
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
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-row w-fit items-center">
                            <a
                                href={`mailto:${EMAIL}?subject=Project%20Inquiry%20-%20Eurecsan%20Portfolio`}
                                className="font-bold hover:text-[#5EC3F0] transition-colors w-fit"
                            >
                                SEND ME EMAIL
                            </a>
                            <button
                                type="button"
                                onClick={handleCopy}
                                title={copied ? "Copied!" : "Copy email address to clipboard"}
                                aria-label="Copy email address"
                                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 transition-all cursor-pointer text-xs"
                            >
                                {copied ? (
                                    <SiCheck className="h-3.5 w-3.5" />
                                ): (
                                    <SiCopy />
                                )}
                            </button>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <p
                                title="Open in email application"
                                className="flex flex-row gap-2 items-center"
                            >
                                <SiMail className="shrink-0" />
                                <p className="truncate">{EMAIL}</p>
                            </p>
                            
                        </div>
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
    );
}
